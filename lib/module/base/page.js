const merge = require('lodash.merge');

module.exports = async (browser, config) => {
    const url = config.url;

    console.log(`[${config.module.name}][${url}] Visiting page...`);

    const context = browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.setCacheEnabled(false);
    await page.goto(url, { waitUntil: 'networkidle0' });

    console.log(`[${config.module.name}][${url}] Collecting page deps...`);

    const deps = await collectDependencies(
        page,
        config.excludeRegExp
    );

    console.log(`[${config.module.name}][${url}] Page deps collected.`);

    (async () => {
        await page.close();
        return context.close();
    })();

    return merge({}, config.module, {include: deps})
}