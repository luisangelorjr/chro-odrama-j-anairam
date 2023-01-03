import puppeteer from 'puppeteer';

const headlessMode = false;

const urlWebPontoLoginEmpresa = "https://admin.oitchau.com.br/sso-login";
const urlWebPontoPunchEmpressa = "https://admin.oitchau.com.br/punches/";
const codEmpresa = "999";
const login = "re042784@qintess.com";
const password = "k4js6z2Y!";

(async () => {
    const browser = await puppeteer.launch(({ headless: headlessMode }));
    const page = await browser.newPage();

    await page.goto(urlWebPontoLoginEmpresa);

    await page.type('input[name=email]', login);
    await page.click('button');

    //Login SSO Microsoft
    await page.waitForSelector('input[name=loginfmt]');
    await page.type('input[name=loginfmt]', login);
    await page.click('input[type=submit]');

    await page.waitForSelector('input[name=passwd]');
    await page.type('input[name=passwd]', password);

    console.log('before waiting');
    await delay(4000);
    console.log('after waiting');

    await page.waitForSelector('input[id=idSIButton9]');
    await page.click('input[id=idSIButton9]');

    console.log('before waiting');
    await delay(4000);
    console.log('after waiting');

    await page.waitForSelector('input[id=idSIButton9]');
    await page.click('input[id=idSIButton9]');

    await page.waitForSelector('button[data-for=web-punch-button]');
    await page.click('button[data-for=web-punch-button]');

    //<button data-tip="true" data-for="web-punch-button" class="PunchNowButton-sc-1weavqm-1 fuWjdI" currentitem="false" aria-describedby="teded704e-86ca-435c-9583-2b4398141b47"><img id="web-punch-button" src="/static/media/logo.4571cb05.png" alt="Bater ponto"></button>
    //<button class="Button-sc-jryu0u-2 iTejjP"></button>

    await page.waitForSelector('button[class=Button-sc-jryu0u-2]');
    await page.click('button[class=Button-sc-jryu0u-2]');

    await page.screenshot({ path: `screenshots/pptr-empresa-ponto/${new Date().toISOString()}.jpg`, type: 'jpeg', quality: 90 });

    await page.click('.baterPontoBtn');

    console.log("THE END");
    await browser.close();
})();

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
 