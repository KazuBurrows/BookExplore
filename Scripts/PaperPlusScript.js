const puppeteer = require('puppeteer');
const script_helper = require('./scriptHelper.js');


/**
 * Puppeteer setup
 * @param {Stack} my_stack
 */
async function runScript(my_stack) {
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
        await page.goto('https://www.paperplus.co.nz/shop/books#!query=&categoryId=2&author=&productName=&type=pl&bestseller=&newrelease=&page=1', {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0 });



        scrapeData(page, my_stack);

    })();

} catch (err) {
    console.error(err);
};
}




/**
 * Main
 * @param {puppeteer.page} page
 * @param {Stack} my_stack
 */
async function scrapeData(page, my_stack)
{
    
    let data_page = 1;                                                  //Current page number, webpage js - data-page="#"
    while (await nextPageExists(page, data_page))
    {
        await scrapePage(page, my_stack);

        // navigationValues = await navigatePage(page, data_page);
        page = await navigatePage(page, data_page);
        // page = navigationValues[0];
        // data_page = navigationValues[1];

        
        data_page += 1;
        console.log("Next page: " + data_page.toString());

        if (data_page > 4) {
            break;
        }
    }
}





/**
 * Scrape single page
 * @param {puppeteer.page} page
 * @param {Stack} my_stack
 */
async function scrapePage(page, my_stack)
{
    // const max_element_i = 12;
    // let element_i = 0;
    // let book = Array(4);

    const url = await page.evaluate(() => document.location.href);
    console.log(url);


    await page.waitForSelector('[class="flex-row js-productcontentview item-list"]');

    const results = await page.$$eval('[class="flex-row js-productcontentview item-list"]', rows => {      //CSS selector and lambda function( x => y)
        return rows.map(row => {
            var return_list = [];

            const listItems = row.children;
            const listArray = Array.from(listItems);


            listArray.forEach((item) => {

                const titleElement = item.querySelector('.item-title').childNodes[1];           // from 'item-title' class select child node ('a tag')
                var title = "";
                if (titleElement !== null){
                    title = titleElement.textContent;
                }
                

                const authorElement = item.querySelector('.item-author');
                var author = "";
                if (authorElement !== null)
                {
                    author = authorElement.textContent.slice(3);                                // slice cuts off unwanted "by " text
                }


                const priceDollarElement = item.querySelector(':scope .item-price .dollar');    // ':scope' sort of lets me traverse parent to child nodes
                const priceCentElement = item.querySelector(':scope .item-price .cent');
                var price = "";
                if (priceDollarElement !== null & priceCentElement !== null)
                {
                    price = priceDollarElement.textContent + priceCentElement.textContent;
                }

                
                const isbnElement = item.querySelector('[data-id]');                            // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
                var isbn = isbnElement.dataset.id;
                
                // if (title == 'No Plan B') {
                //     return_list.push([title, author, price, isbn]);
                // }
                return_list.push([title, author, price, isbn]);
            });

        
            return return_list;
        });
    });



    script_helper.method.pushRawBooks(results, my_stack);


    let i_book;
    for (let i=0; i<results.length; i++)
    {
        i_book = results[i];

        // if (i_book[0] == 'No Plan B') {
        //     console.log('\n\nFOUND BOOK');
        //     console.log(i_book);

        // }
        console.log(i_book);

    }
}





/**
 * Navigating webpage
 * @param {puppeteer.page} page
 * @param {integer} data_page
 * @returns {Array}
 */
async function navigatePage(page, data_page)
{
    data_page += 1;
    try {
        await page.waitForSelector(':scope [class="pagination pull-right"] [data-page="' + data_page.toString() + '"]', {timeout: 5000});
    } catch {
        console.log("Navi failed.");

    }

    // await page.$eval(('[data-page="' + data_page.toString() + '"]', ' [title="Page ' + data_page.toString() + '"]'), elem => elem.click());
    await page.click(':scope [class="pagination pull-right"] > li > [title="Page ' + data_page.toString() + '"]');
    // console.log("data_page:" + data_page)


    // let my_array = new Array();
    // my_array.push(page);
    // my_array.push(data_page);

    // return my_array;
    return page;
}





/**
 * Check if next page exists in pagination
 * @param {puppeteer.page} page
 * @param {integer} data_page
 * @returns {Boolean}
 */
 async function nextPageExists(page, data_page)
{
    try {
        // await page.waitForSelector('[data-page="'+ data_page +'"]', '[title="Next Page"]', '[alt="First page"]', { timeout: 5000 })
        // await page.waitForSelector('[class="pagination pull-right"] > li > [title="Next Page"]', { timeout: 5000 })
        data_page += 1;
        await page.waitForSelector(':scope [class="pagination pull-right"] [data-page="' + data_page.toString() + '"]', {timeout: 5000});
        return 1;

      } catch (error) {
          console.log("END OF PAGINATION.");
        return 0;

      }
}







/**
 * Public methods for exports
 */
var methods = {
    runScript: async function(my_stack) {
        runScript(my_stack);

    }

    
  };
  
  exports.method = methods;