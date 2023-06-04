const puppeteer = require('puppeteer');
const script_helper = require('./scriptHelper.js');

// const mediator = require('../../Controller/mediator.js');
// const { Stack } = require('../Stack.js');



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
            await page.goto('https://www.mightyape.co.nz/books/all', {
                waitUntil: 'load',
                // Remove the timeout
                timeout: 0 });
    
    
            // console.log("Fish test");
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

    while (await nextPageExists(page))
    {
        await scrapePage(page, my_stack);
        page = await navigatePage(page);

        console.log("NEW PAGE.");
    }

}



    /**
     * Scrape single page
     * @param {puppeteer.page} page
     * @param {Stack} my_stack
     */
    async function scrapePage(page, my_stack)
    {

    await page.waitForSelector('[class="product-list gallery-view"]');

    const results = await page.$$eval('[class="product-list gallery-view"]', rows => {      //CSS selector and lambda function( x => y)
        return rows.map(row => {
            var return_list = [];

            const listItems = row.children;
            const listArray = Array.from(listItems);


            listArray.forEach((item) => {

                const titleElement = item.querySelector(':scope .title > a');           // from 'item' class select child node ('a tag')
                var title = "";
                if (titleElement !== null){
                    title = titleElement.textContent;
                }
                

                const authorElement = item.querySelector(':scope .format .creator');
                var author = "";
                if (authorElement !== null)
                {
                    author = authorElement.textContent;
                }

                
                const priceDollarElement = item.querySelector('.dollars');
                const priceCentElement = item.querySelector('.cents');
                var price = "";
                if (priceDollarElement !== null & priceCentElement !== null)
                {
                    price = priceDollarElement.textContent + priceCentElement.textContent;
                }

                
                // const isbnElement = item.querySelector('[data-id]');                            // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
                // var isbn = isbnElement.dataset.id;
                

                return_list.push([title, author, price]);
            });

        
            return return_list;
        });
    });




    script_helper.method.pushRawBooks(results, my_stack);

    // for (let i=0; i<results.length; i++)
    // {

    //     console.log(results[i]);

    // }
}




 /**
 * Navigating webpage
 * @param {puppeteer.page} page
 * @returns {Array}
 */
async function navigatePage(page)
{
    await page.waitForSelector('[rel="next"]');
    await page.click('[rel="next"]');

    return page;
}
  
  
  
  
  
  
  /**
   * Check if next page exists in pagination
   * @param {puppeteer.page} page
   * @returns {Boolean}
   */
  async function nextPageExists(page)
  {
    try {
        await page.waitForSelector('[rel="next"]', { timeout: 5000 });
        // console.log("Found next page.");
        return 1;

    } catch (error) {
        return 0;

    }
  }



















// runScript();


/**
 * Public methods for exports
 */
 var methods = {
    runScript: async function(my_stack) {
        runScript(my_stack);

    }

    
  };
  
  exports.method = methods;