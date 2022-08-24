const puppeteer = require('puppeteer');
const axios = require('axios').default;
const util = require('util');
const axie = [];
const globeScope = [];
const freenom = {
	browser: null,
	page: null,
	url: 'https://my.freenom.com/domains.php?a=renewals',
	close: async () => {
		if (!freenom.browser) return true
		await freenom.browser.close().then(async () => {
		  freenom.browser = null
		})
	},
	axieOS: async () => {
		axios.get('https://api.snowkel.us/freenom').then(function (response) {
			const blobData = JSON.parse(response);
			const credentials = [];
			credentials['username'] = blobData[0]
			credentials['password'] = blobData[1]
			return(credentials);
		})
		.catch(function (error) {
			const credentials = [];
			credentials['username'] = 'error'
			credentials['password'] = 'error'
			return(credentials);
		})
		.then(function () {
		});
  },
  init: async () => {
	freenom.browser = await puppeteer.launch({
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
		freenom.page = await freenom.browser.newPage()
		await freenom.page.setViewport({width: 1900, height: 1000, deviceScaleFactor: 1})
		await freenom.page.goto(freenom.url, {waitUntil: 'networkidle2'})
		await freenom.login()
		//await this.close()
	} catch (e) {
		//console.error('[INIT] Failed', e)
		await freenom.close()
	} finally {
		await freenom.close()
	}
  },
  login: async () => {
		axie['username'] = freenom.axieOS()['username']
		axie['password'] = freenom.axieOS()['password']
		axie['statusLogin'] = '[status]:'
		try {
			await freenom.page.type('input[name="username"]', axie.username, { delay: 35 }).then(async () => axie.statusLogin = '[status]: Username Complete')
			await freenom.page.waitForTimeout(500)
			await freenom.page.type('input[name="password"]', axie.passwd, { delay: 35 }).then(async () => axie.statusLogin = '[status]: Password Complete')
			await freenom.page.evaluate(() => document.getElementsByTagName('form')[0].submit())
			await freenom.page.waitForSelector('.renewalContent')
			axie.statusLogin = '[status]: Login Complete'
			globeScope['username'] = axie['username']
			globeScope['password'] = axie['password']
			globeScope['statusLogin'] = axie['statusLogin']
			return(globeScope)
			//await freenom.close()
		} catch (e) {
			console.error('[login] Error', e)
			await freenom.close()
		}
	}
}
class FreenomService {
  browser;
  page;
  async starter() {
	  globeScope['test'] = 'Hello, World!';
	  await freenom.init();
	  return(globeScope);
  }
  async close(){
    await freenom.page.close();
    await freenom.browser.close();
  }
}

const freenomService = new FreenomService();

module.exports = freenomService;