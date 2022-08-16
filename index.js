require('dotenv').config();
const Mustache = require('mustache');
const fs = require('fs');
const puppeteerService = require('./services/puppeteer.service');
const MUSTACHE_MAIN_DIR = './main.mustache';

let DATA = {
	profile_name: 'Jaede Sy',
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

async function setInstagramPosts() {
  const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount('binarymako.ph', 6);
  DATA.img1 = instagramImages[1];
  DATA.img2 = instagramImages[2];
  DATA.img3 = instagramImages[3];
  DATA.img4 = instagramImages[4];
  DATA.img5 = instagramImages[5];
  DATA.img6 = instagramImages[6];
}

async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {
  await setInstagramPosts();
  await generateReadMe();
  await puppeteerService.close();
}

action();
