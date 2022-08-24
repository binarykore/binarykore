const puppeteer = require('puppeteer');
const axios = require('axios').default;
const util = require('util');
const freenom = {
	browser: null,
	page: null,
}
let axie = {
	
};
class FreenomService {
  browser;
  page;
  url;
  async axieOS() {
	 axios.get('https://api.snowkel.us/freenom').then(function (response) {
		const data = JSON.parse(response);
		return(['username' => data[0],'password' => data[1]]);
	})
	.catch(function (error) {
		return(['username' => 'error','password' => 'error']);
	})
	.then(function () {
	});
  }
  async init() {
	this.url = 'https://my.freenom.com/domains.php?a=renewals';
    this.browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--incognito',
        '--proxy-server=http=194.67.37.90:3128',
        // '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"', //
      ],
      // headless: false,
    });
	this.page = await this.browser.newPage()
	await this.page.setViewport({width: 1900, height: 1000, deviceScaleFactor: 1})
    await this.page.goto(this.url, {waitUntil: 'networkidle2'})
	//await this.login()
  }
  async login() {
	axie.username = axieOS()['username'];
	axie.passwd = axieOS()['password'];
	axie.statusLogin = '[status]: ';
	try {
      await this.page
        .type('input[name="username"]', axie.username, { delay: 35 })
        .then(async () => axie.statusLogin = '[status]: Username Complete')
      await this.page.waitForTimeout(500)
      await this.page
        .type('input[name="password"]', axie.passwd, { delay: 35 })
        .then(async () => axie.statusLogin = '[status]: Password Complete')
      await this.page.evaluate(() => document.getElementsByTagName('form')[0].submit())
      await this.page.waitForSelector('.renewalContent')
      return(axie)
    } catch (e) {
      axie.statusLogin = '[status]: Login Failed'
      return(axie)
      await this.close()
    }
  }
}

const freenomService = new FreenomService();

module.exports = freenomService;