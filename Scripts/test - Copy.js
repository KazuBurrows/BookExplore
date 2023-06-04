const puppeteer = require('puppeteer');

try {
    (async () => {
        const browser = await puppeteer.launch({
            headless: false,     //Gui toggle
            defaultViewport: null
            
        });
        const page = await browser.newPage();

        
        /**
         * Block images from loading/ rendered
        */
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() === 'image'){
                req.abort();
            }
            else {
                req.continue();
            }
        });


        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.paperplus.co.nz/shop/books', {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0 });



        /**
         * Click next page
         * and
         * Iterator
         */
        for (let i = 0; i < 3; i++) {
            var data_page = i+1;                //Next page number, webpage js - data-page="#"

            if (i == 0) {
                await page.waitForSelector('[class="pagination pull-right"]');
                await page.click('[alt="First page"]');

            } else {
                await page.waitForSelector('[data-page="'+ data_page +'"]', '[title="Next Page"]', '[alt="First page"]');
                await page.click('[data-page="'+ data_page +'"]', '[title="Next Page"]', '[alt="First page"]');

            }

            scrapePage(page);

            // console.log("click loop " + data_page);
        }
    })();

} catch (err) {
    console.error(err);
};





/**
 * Scrape all books on webpage
 * @param {puppeteer.page} page
 * @returns {Array} "Scraped item from webpage"
 */
 async function scrapePage(page)
 {
    const max_element_i = 12;
    let element_i = 0;
    let book = Array(4);




    /**USE LOOP FROM NOTEPAD */

    //Iterate through each book on webpage
    for (element_i; element_i < max_element_i; element_i++) {
        // console.log("element_i loop " + element_i);

        book = getBook(page, element_i, book);
        declareBook(book);
    }

    // console.log(book[0], book[1], book[2]);
 }





/**
 * Get single book data
 * @param {puppeteer.page} page
 * @param {integer} element_i
 * @param {Array} book
 * @return {Array} "Single scraped book from webpage"
 */
 async function getBook(page, element_i, book)
 {
    await page.evaluate(() => {
        return document.querySelector('[title="Next Page"]');
    });
    // const linkElement = item.querySelector('.item_line_name');
    // var link = linkElement.href;
    // book[0] = isbn;

    // const priceElement = item.querySelector('.price_full');
    // var price = priceElement ? priceElement.innerText : '';
    // book[1] = title;
    
    
    // book[2] = author;


    // book[3] = price;

    return book;
 }





/**
 * Send book array to server for it add to or edit the database
 * @param {*} book 
 */
 async function declareBook(book)
 {


    
 }
