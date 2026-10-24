import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const r={checks:[],axe:[],errors:[],requests:[]};const check=(name,pass)=>r.checks.push({name,pass});
await fs.mkdir('audit/screenshots',{recursive:true});
const base='http://127.0.0.1:4321';
for(const width of [1440,900,768,390]){
 const context=await browser.newContext({viewport:{width,height:width===390?844:1000},reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>r.errors.push(e.message));page.on('response',resp=>{if(resp.status()>=400)r.requests.push({url:resp.url(),status:resp.status()})});
 for(const route of ['/','/products/','/media/','/about/locations/','/products/business-loan/']){
  await page.goto(base+route);if(route==='/'){await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.documentElement.classList.contains('welcome-active'));}
  await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(img=>img.loading='eager');await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));});
  if(route==='/about/locations/')await page.locator('.leaflet-control-zoom').waitFor();
  check(`${route} overflow ${width}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  check(`${route} images loaded ${width}`,await page.locator('img').evaluateAll(imgs=>imgs.every(img=>img.naturalWidth>0)));
  await page.screenshot({path:`audit/screenshots/concept-${route==='/'?'home':route.split('/').filter(Boolean).join('-')}-${width}.png`,fullPage:true});
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();r.axe.push({width,route,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  if(route==='/'){
   check(`Four product cards ${width}`,await page.locator('.cinema-product').count()===4);check(`Four quick actions ${width}`,await page.locator('.concept-quick-actions>a').count()===4);
   await page.locator('[data-next]').click();check(`Slide next ${width}`,await page.locator('[data-current]').textContent()==='02');await page.locator('[data-previous]').click();check(`Slide previous ${width}`,await page.locator('[data-current]').textContent()==='01');
   if(width<=1100){await page.locator('#mobile-toggle').click();check(`Mobile navigation ${width}`,await page.locator('#primary-nav').isVisible());await page.keyboard.press('Escape');check(`Mobile Escape ${width}`,await page.locator('#mobile-toggle').getAttribute('aria-expanded')==='false');}
   await page.locator('#open-search').click();await page.locator('#site-search-input').fill('MiCash');check(`Site search ${width}`,await page.locator('.site-search-results a').count()>0);check(`Search links local ${width}`,await page.locator('.site-search-results a').evaluateAll(links=>links.every(a=>a.origin===location.origin)));await page.keyboard.press('Escape');check(`Search Escape ${width}`,!await page.locator('#site-search').evaluate(d=>d.open));
  }
  if(route==='/media/'){await page.locator('#media-search').fill('Sola PayGo');check(`Media search ${width}`,await page.locator('[data-news-item]:visible').count()===1);await page.locator('#media-search').fill('no matching story exists');await page.locator('#media-reset').click();check(`49 original stories ${width}`,await page.locator('[data-news-item]:visible').count()===49);await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));const bottom=await new AxeBuilder({page}).withTags(['wcag22aa']).analyze();r.axe.push({width,route,position:'footer',violations:bottom.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});}
  if(route==='/about/locations/'){await page.locator('#location-search').fill('Lihir');await page.locator('.location-select:visible').first().click();check(`Map popup ${width}`,await page.locator('.leaflet-popup-content').isVisible());}
 }
 await context.close();
}
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:900,height:1000}});const p=await nojs.newPage();await p.goto(base);check('No JS navigation at tablet',await p.locator('#primary-nav').isVisible());check('No JS hero visible',await p.locator('.cinema-slide h1').isVisible());check('No JS intro closed',!await p.locator('[data-welcome-intro]').evaluate(d=>d.open));await nojs.close();
const intro=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});const ip=await intro.newPage();await ip.goto(base);check('Intro opens',await ip.locator('[data-welcome-intro]').evaluate(d=>d.open));check('Intro border removed',await ip.locator('[data-welcome-intro]').evaluate(d=>getComputedStyle(d).borderTopWidth==='0px'));check('Intro decorative lines removed',await ip.locator('.welcome-frame,.welcome-rule,.welcome-timeline').count()===0);await ip.waitForTimeout(1800);await ip.screenshot({path:'audit/screenshots/concept-intro-1440.png'});await ip.keyboard.press('Escape');check('Escape releases page',!await ip.locator('[data-welcome-intro]').evaluate(d=>d.open));await intro.close();
await browser.close();await fs.writeFile('audit/client-concept-results.json',JSON.stringify(r,null,2));console.log(JSON.stringify({checks:r.checks.length,failed:r.checks.filter(c=>!c.pass),axe:r.axe.filter(a=>a.violations.length),errors:r.errors,requests:r.requests},null,2));if(r.checks.some(c=>!c.pass)||r.axe.some(a=>a.violations.length)||r.errors.length||r.requests.length)process.exitCode=1;
