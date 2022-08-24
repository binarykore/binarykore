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
		var data = JSON.parse(response);
		var credentials = [];
		credentials['username'] = data[0];
		credentials['password'] = data[1];
		return(credentials);
	})
	.catch(function (error) {
		var credentials = [];
		credentials['username'] = 'error';
		credentials['password'] = 'error';
		return(credentials);
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
    try {
		this.page = await this.browser.newPage()
		await this.page.setViewport({width: 1900, height: 1000, deviceScaleFactor: 1})
		await this.page.goto(this.url, {waitUntil: 'networkidle2'})
		await this.login()
		//await this.close()
	} catch (e) {
		//console.error('[INIT] Failed', e)
 		await this.close()
   } finally {
		await this.close()
    }
  }
  async login() {
	axie.username = this.axieOS()['username'];
	axie.passwd = this.axieOS()['password'];
	axie.statusLogin = '[status]:';
	try {
      await this.page.type('input[name="username"]', axie.username, { delay: 35 }).then(async () => axie.statusLogin = '[status]: Username Complete')
      await this.page.waitForTimeout(500)
      await this.page.type('input[name="password"]', axie.passwd, { delay: 35 }).then(async () => axie.statusLogin = '[status]: Password Complete')
      await this.page.evaluate(() => document.getElementsByTagName('form')[0].submit())
      await this.page.waitForSelector('.renewalContent')
      return(axie)
    } catch (e) {
      console.error('[login] Error', e)
      await this.close()
    }
  }
  async close() {
    await this.page.close();
    await this.browser.close();
  }
}

const freenomService = new FreenomService();

module.exports = freenomService;