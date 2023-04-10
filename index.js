require('dotenv').config();
const Mustache = require('mustache');
const fs = require('fs');
//const puppeteerService = require('./services/puppeteer.service');
const axioService = require('./services/axios.service');
const MUSTACHE_MAIN_DIR = './main.mustache';

let DATA = {
	profile_name: 'Digital Korra',
	refresh_date: new Date().toLocaleDateString('en-GB', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		timeZoneName: 'short',
		timeZone: 'Asia/Manila',
	}),
};

/*
async function setInstagramPosts() {
  const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount('binarymako.ph', 6);
  DATA.img1 = instagramImages[0];
  DATA.img2 = instagramImages[1];
  DATA.img3 = instagramImages[2];
  DATA.img4 = instagramImages[3];
  DATA.img5 = instagramImages[4];
  DATA.img6 = instagramImages[5];
}
*/

async function setForexUpdates() {
  const forexForecast = await axioService.getForexUpdates('https://watch.snowkel.us/api/watch', 5);
  DATA.USDPHP = forexForecast[0];//USD to PHP
  DATA.THBPHP = forexForecast[1];//THB to PHP
  DATA.IDRPHP = forexForecast[2];//IDR to PHP
  DATA.SGDPHP = forexForecast[3];//SGD to PHP
  DATA.EURPHP = forexForecast[4];//EUR to PHP
}

async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {
  //await setInstagramPosts();
  await setForexUpdates();
  await generateReadMe();
  //await puppeteerService.close();
}

action();
