const getPrice = require('./utils/getPrice');
const isValidURL= require('./utils/isValidURL');

const bot = require('./configs/bot');
const job= require('./configs/checkAvailability');
const mongoose = require('./configs/mongoose');
const Urls = require('./models/urls');

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Please send the url of the product in the format `/bookmark <url> <price>`');
});

bot.onText(/\/bookmark/, async (msg, match) => {
    const chatId = msg.chat.id;
    const url = match.input.split(' ')[1];
    const upperLimit = parseInt(match.input.split(' ')[2]);
    if (url === undefined || isValidURL(url) === false) {
        bot.sendMessage(
            chatId,
            'Please provide URL of article!',
        );
        return;
    }
    const price= (await getPrice(url));
    if(price<=upperLimit){
        bot.sendMessage(
            chatId,
            'Price is below the set price of the product!',
        );
        return;
    }
    await Urls.create({chatId:chatId, url: url, setPrice: upperLimit})
    bot.sendMessage(
        chatId,
        'URL added to the list!',
    );
    return;
});
