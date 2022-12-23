import puppeteer from 'puppeteer';

const headlessMode = true;

const urlWebPontoLoginEmpresa = "https://empresa.com.br/";
const urlWebPontoPunchEmpressa = "https://empresa.com.br/ponto/marcarPonto.asp";
const codEmpresa = "999";
const login = "666";
const password = "QueDeliciaAutomatizar";

(async () => {
    const browser = await puppeteer.launch(({ headless: headlessMode }));
    const page = await browser.newPage();

    await page.goto(urlWebPontoLoginEmpresa);

    await page.type('#CodEmpresa', codEmpresa);
    await page.type('#inputUsuario', login);
    await page.type('#inputSenha', password);
    await page.click('#botaoSubmit');

    await page.goto(urlWebPontoPunchEmpressa);
    await page.screenshot({ path: `screenshots/pptr-empresa-ponto/${new Date().toISOString()}.jpg`, type: 'jpeg', quality: 90 });

    await page.click('.baterPontoBtn');

    console.log("THE END");
    await browser.close();
})();