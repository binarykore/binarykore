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
  const instagramImages = await puppeteerService.getLatestInstagramPostsFromAccount('binarymako.ph', 4);
  DATA.img1 = instagramImages[Math.floor(Math.random()*instagramImages.length)];
  DATA.img2 = instagramImages[Math.floor(Math.random()*instagramImages.length)];
  DATA.img3 = instagramImages[Math.floor(Math.random()*instagramImages.length)];
  DATA.img4 = instagramImages[Math.floor(Math.random()*instagramImages.length)];
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
