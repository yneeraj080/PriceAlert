const getSelector= require('./getSelector');
const puppeteer= require('puppeteer')

let browser;

async function getPrice(url){
  if(!browser) browser = await puppeteer.launch({headless:"new"});
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({width: 1080, height: 1024});
  const priceSelector = getSelector(url);
  const elm = await page.$(priceSelector)
  let priceText = await (await elm.getProperty('textContent')).jsonValue();
  const price= parseInt(priceText.replace(',', '').replace('₹', ''));
  await page.close();
  return price;
}

module.exports = getPrice;