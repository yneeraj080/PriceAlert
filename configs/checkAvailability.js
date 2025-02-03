var CronJob = require('cron').CronJob;
const getPrice = require('../utils/getPrice');
const Urls = require('../models/urls');
const isValidURL= require('../utils/isValidURL')
const bot = require('./bot');

var job = new CronJob(
    '1 * * * * *',
    async function () {
        const urls = await Urls.find({});
        await urls.forEach(async element => {
            if (isValidURL(element.url)) {
                const curPrice= (await getPrice(element.url));
                if (curPrice <= element.setPrice) {
                    bot.sendMessage(element.chatId, `Price is below the set price of the product with url ${element.url}!`);
                    await Urls.deleteMany(element)
                }else{
                    console.log("Price is still less")
                }
            }
        });
    },
    null,
    true,
    'America/Los_Angeles'
);

module.exports = job;