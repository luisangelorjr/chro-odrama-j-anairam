import puppeteer from 'puppeteer';
import { environment } from './enviroments.mjs';

const headlessMode = false;

const urlWebPontoLoginEmpresa = environment.urlWebPontoLoginEmpresa;
const urlWebPontoPunchEmpresa = environment.urlWebPontoPunchEmpresa;
const login = environment.login;
const password = environment.password;

(async () => {
    const browser = await puppeteer.launch(({ headless: headlessMode }));
    const page = await browser.newPage();

    await page.goto(urlWebPontoLoginEmpresa);

    await page.type('input[name=email]', login);
    await page.click('button');

    // Login SSO Microsoft
    // START
    await page.waitForSelector('input[name=loginfmt]');
    await page.type('input[name=loginfmt]', login);
    await page.click('input[type=submit]');

    await page.waitForSelector('input[name=passwd]');
    await page.type('input[name=passwd]', password);

    console.log('before waiting');
    await delay(2000);
    console.log('after waiting');
    

    await page.waitForSelector('input[id=idSIButton9]');
    await page.click('input[id=idSIButton9]');

    console.log('before waiting');
    await delay(2000);
    console.log('after waiting');

    await page.waitForSelector('input[id=idSIButton9]');
    await page.click('input[id=idSIButton9]');
    // Login SSO Microsoft
    // END

    console.log('before waiting');
    await delay(8000);
    console.log('after waiting');

    await page.waitForSelector('button[data-for=web-punch-button]');
    await page.click('button[data-for=web-punch-button]');


    console.log('before waiting');
    await delay(2000);
    console.log('after waiting');

    await page.waitForSelector('.iTejjP');
    await page.click('.iTejjP');

    console.log('before waiting');
    await delay(2000);
    console.log('after waiting');

    await page.screenshot({ path: `screenshots/${new Date().toISOString()}.jpg`, type: 'jpeg', quality: 90 });

    console.log("THE END");
    await browser.close();
})();

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
 