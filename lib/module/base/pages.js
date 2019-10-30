const collectPage = require('magepack/lib/module/base/page');

const isArray = require('lodash.isArray');
const isString = require('lodash.isString');
const merge = require('lodash.merge');
const map = require('lodash.map');
const pick = require('lodash.pick');
const omit = require('lodash.omit');

module.exports = async (browser, config) => {
    let urls;

    if (config.urls) {
        urls = config.urls;
    } else if (config.url) {
        urls = config.url;
    }

    if (isString(urls)) {
        urls = [urls];
    }

    if (!isArray(urls) || !urls.length) {
        throw console.log(`[${config.module.name}] Error: No URLs found - define 'url' or 'urls' config key!`);
    }

    if (config.url) {
        console.log(`[${config.module.name}] Warning: Ignoring unnecessary 'url' config key - using 'urls'.`);
    }

    const pageConfigBase = omit(config, ['urls']);

    if (config.urls.length === 1) {
        return collectPage(browser, 
            merge({}, pageConfigBase, {url: config.urls[0]})
        );
    }

    console.log(`[${config.module.name}] Visiting ${config.urls.length} pages...`);

    const collectedModules = await Promise.all(
        config.urls.map(async (_url) => {
            return await collectPage(browser,
                merge({}, pageConfigBase, {_url})
            );
        })
    );

    return merge(
        {},
        config.module,
        map(
            collectedModules, 
            (_module) => omit(_module, 'include')
        ),
        {
            include: union(
                map(
                    collectedModules, 
                    (_module) => pick(_module, 'include')
                )
            ) 
        }
    );
}