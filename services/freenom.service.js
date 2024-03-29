const puppeteer = require('puppeteer');
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
	greetings: async (greeting) => {
		globeScope['greetings'] = greeting
	},
	login: async (public_token,private_token) => {
		axie['statusLogin'] = null
		try {
			await freenom.page.type('input[name="username"]', public_token, { delay: 35 }).then(async () => console.log('Username complete'))
			await freenom.page.waitForTimeout(500)
			await freenom.page.type('input[name="password"]', private_token, { delay: 35 }).then(async () => console.log('Password complete'))
			await freenom.page.evaluate(() => document.getElementsByTagName('form')[0].submit())
			await freenom.page.waitForSelector('.renewalContent')
			axie['statusLogin'] = 'Login Complete'
			globeScope['username'] = public_token
			globeScope['statusLogin'] = axie['statusLogin']
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
  async starter(greeting,public_token,private_token) {
	  await freenom.init();
	  await freenom.login(public_token,private_token);
	  await freenom.greetings(greeting);
	  return(globeScope);
  }
  async close(){
    await freenom.page.close();
    await freenom.browser.close();
  }
}

const freenomService = new FreenomService();

module.exports = freenomService;