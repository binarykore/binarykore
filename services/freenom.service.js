const puppeteer = require('puppeteer');
const axie = [];
const globeScope = [];
const freenom = {
	browser: null,
	page: null,
	url: 'https://my.freenom.com/domains.php?a=renewals',
	close: async () => {
		if (!this.browser) return true
		await this.browser.close().then(async () => {
			this.browser = null
		})
	},
	init: async () => {
		freenom.browser = await puppeteer.launch({
			headless: true,
			ignoreDefaultArgs: ['--disable-extensions'],
			args: [
				'--disable-gpu',
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-dev-shm-usage',
				'--no-first-run',
				'--no-zygote',
				'--disable-infobars',
				'--window-position=0,0',
				'--ignore-certifcate-errors',
				'--ignore-certifcate-errors-spki-list',
				// '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"', //
			],
		});
		try {
			this.page = await this.browser.newPage()
			//await this.page.setViewport({width: 1900, height: 1000, deviceScaleFactor: 1})
			await this.page.goto(this.url, {waitUntil: 'networkidle2'})
			const title = await this.page.title()
			globeScope['page_title'] = title
			//await this.close()
		} catch (e) {
			await this.close()
		} finally {
			await this.close()
		}
	},
	login: async (public_token,private_token) => {
		try {
			await this.page.type('input[name="username"]', public_token, { delay: 35 }).then(async () => console.log('Username complete'))
			await this.page.waitForTimeout(500)
			await this.page.type('input[name="password"]', private_token, { delay: 35 }).then(async () => console.log('Password complete'))
			await this.page.evaluate(() => document.getElementsByTagName('form')[0].submit())
			await this.page.waitForSelector('.renewalContent')
			axie['statusLogin'] = 'Login Complete'
			globeScope['username'] = public_token
			globeScope['statusLogin'] = axie['statusLogin']
		} catch (e) {
			axie['statusLogin'] = 'Login Error'
			globeScope['statusLogin'] = axie['statusLogin']
			await this.close()
		}
	},
	greetings: async (greeting) => {
		globeScope['greetings'] = greeting
	},
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