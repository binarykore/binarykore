const puppeteer = require('puppeteer');
const globeScope = [];
class DomainService {
	browser;
	page;
	async init() {
		this.browser = await puppeteer.launch({
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-infobars',
				'--window-position=0,0',
				'--ignore-certifcate-errors',
				'--ignore-certifcate-errors-spki-list',
				'--incognito',
				// '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"', //
			],
			// headless: false,
		});
	}
	async goToPage(url) {
		if (!this.browser) {
			await this.init();
		}
		this.page = await this.browser.newPage();

		await this.page.setExtraHTTPHeaders({
			'Accept-Language': 'en-US',
		});
		
		await this.page.setViewport({width: 1900, height: 1000, deviceScaleFactor: 1});

		await this.page.goto(url, {
			waitUntil: `networkidle2`,
		});
	}
	async close() {
		await this.page.close();
		await this.browser.close();
	}	
	async starter(greeting,public_token,private_token) {
		const page = 'https://my.freenom.com/domains.php?a=renewals';
		await this.goToPage(page);
		await this.page.type('input[name="username"]', public_token, { delay: 35 }).then(async () => console.log('Username complete'));
		await this.page.waitForTimeout(500);
		await this.page.type('input[name="password"]', private_token, { delay: 35 }).then(async () => console.log('Password complete'));
		await this.page.evaluate(() => document.getElementsByTagName('form')[0].submit());
		await this.page.waitForSelector('.renewalContent');
		globeScope['greetings'] = greeting;
		globeScope['statusLogin'] = 'Login Complete';
		globeScope['username'] = public_token;
		return(globeScope);
	}
}

const domainService = new DomainService();

module.exports = domainService;