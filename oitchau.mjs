import puppeteer from 'puppeteer';
import { environment } from './enviroments.mjs';
import * as fs from 'fs';

const headlessMode = environment.production;

const urlWebPontoLoginEmpresa = environment.urlWebPontoLoginEmpresa;
const urlWebPontoPunchEmpresa = environment.urlWebPontoPunchEmpresa;
const tratamento = environment.tratamento;
const firstName = environment.firstName;

const login = environment.login;
const password = environment.password;

(async () => {
    console.log(`${localISOTime()} - Bom dia ${tratamento} ${firstName}!`);
    console.log(`${localISOTime()} - Sou Odrama J. Anairam! O seu CHRO pessoal para bater ponto`)
    console.log(`${localISOTime()} - Sem mais delongas, vou começar agora`)
    const browser = await puppeteer.launch(({ headless: headlessMode }));
    const page = await browser.newPage();

    await page.goto(urlWebPontoLoginEmpresa);

    await page.waitForSelector('input[name=email]');
    await page.type('input[name=email]', login);
    await page.click('button');

    // Login SSO Microsoft
    // START
    await page.waitForSelector('input[name=loginfmt]');
    await page.type('input[name=loginfmt]', login);
    await page.click('input[type=submit]');

    await page.waitForSelector('input[name=passwd]');
    await page.type('input[name=passwd]', password);


    await delay(2000, "Aguardando botão 01 de confirmação Microsoft");

    await page.waitForSelector('input[id=idSIButton9]');
    await page.click('input[id=idSIButton9]');

    await delay(2000, "Aguardando botão 02 de confirmação Microsoft");

    await page.waitForSelector('input[id=idSIButton9]');
    await page.click('input[id=idSIButton9]');
    // Login SSO Microsoft
    // END

    await delay(8000, "Aguardando botão flutuante da oitchau");

    await page.waitForSelector('button[data-for=web-punch-button]');
    await page.click('button[data-for=web-punch-button]');

    await delay(2000, "Aguardando botão de 'Marcar Ponto' da oitchau");

    const today = localISOTime().toString().substring(0, 10);
    if (!fs.existsSync(`screenshots/${today}`)){
        fs.mkdirSync(`screenshots/${today}`);
    }

    await page.waitForSelector('.iTejjP');
    await page.click('.iTejjP');

    await delay(2000, "Aguardando tela com ponto marcado da oitchau para print");

 
    await page.screenshot({ path: `screenshots/${today}/${localISOTime()}.jpg`, type: 'jpeg', quality: 90 });
    console.log(`${localISOTime()} - ${tratamento} ${firstName}, bati seu ponto com sucesso agorinha`);
    console.log(`${localISOTime()} - To indo agora. Desculpa qualquer coisa`);

    await browser.close();
})();

function delay(time, texto) {
    console.log(`${localISOTime()} - ${texto.toUpperCase()} - Inicio da chamada`);
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
        console.log(`${localISOTime()} - ${texto.toUpperCase()} - Término da chamada`);
    })
 }
 
 function localISOTime(){
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
}
