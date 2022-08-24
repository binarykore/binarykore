const puppeteer = require('puppeteer');
const https = require('https');
const axie = [];
const globeScope = [];
const options = {
	hostname: 'api.snowkel.us',
	port: 443,
	path: '/freenom',
	method: 'GET',
};
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
			//await freenom.login()
			//await this.close()
		} catch (e) {
			//console.error('[INIT] Failed', e)
			await freenom.close()
		} finally {
			await freenom.close()
		}
	},
	statusVar: async () => {
		globeScope['greetings'] = 'Hello, World!'
	},
	login: async () => {
		var blobData = [];
		axie['username'] = 'technical.geek@icloud.com'
		axie['password'] = 'zebra123321@Ilovepn'
		axie['fetched'] = 'Fetching Complete'
		axie['statusLogin'] = null
		try {
			await freenom.page.type('input[name="username"]', axie['username'], { delay: 35 }).then(async () => axie['statusLogin'] = 'Username Complete')
			await freenom.page.waitForTimeout(500)
			await freenom.page.type('input[name="password"]', axie['password'], { delay: 35 }).then(async () => axie['statusLogin'] = 'Password Complete')
			await freenom.page.evaluate(() => document.getElementsByTagName('form')[0].submit())
			await freenom.page.waitForSelector('.renewalContent')
			axie['statusLogin'] = 'Login Complete'
			globeScope['username'] = axie['username']
			globeScope['password'] = axie['password']
			globeScope['fetched'] = axie['fetched']
			globeScope['statusLogin'] = axie['statusLogin']
			globeScope['blob'] = axie['blob']
			//await freenom.close()
		} catch (error) {
			axie['statusLogin'] = 'Login Error'
			globeScope['statusLogin'] = axie['statusLogin']
			await freenom.close()
		}
	}
}
class FreenomService {
  browser;
  page;
  async starter() {
	  await freenom.init();
	  await freenom.login();
	  await freenom.statusVar();
	  return(globeScope);
  }
  async close(){
    await freenom.page.close();
    await freenom.browser.close();
  }
}

const freenomService = new FreenomService();

module.exports = freenomService;