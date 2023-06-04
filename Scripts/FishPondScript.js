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
            await page.goto('https://www.fishpond.co.nz/Books?order_by=in_stock', {
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
async function scrapeData(page, my_stack) {
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
 
    // await page.waitForSelector('.b-list > .browse__wrapper ');
    // console.log('how many?', (await page.$$('.b-list > .browse__wrapper')).length);
    
    // await page.waitForSelector(() => document.querySelectorAll('.b-list').length >= 27);
    await page.waitForSelector('.b-list');
    
    
    const results = await page.$$eval('.b-list', rows => {      //CSS selector and lambda function( x => y)
        return rows.map(row => {
            
            function correctTitle(myText)                        // Had no choice, had to embed helper function here
            {
                var title = "";


                var newLinePosition = myText.search("\n");
                var longSpacePosition = myText.search("  ");
                var endLongSpacePosition = myText.length;
                
                var firstPart = myText.slice(0, newLinePosition);

                
                for (var i=longSpacePosition; i < myText.length-1; i++)                 // -1 so we don't go beyond the string index range
                {
                    var nextChar = myText[i+1];

                    if (nextChar != " ") {
                        endLongSpacePosition = i;
                        break;
                    }
                }


                // console.log(endLongSpacePosition);
                var secondPart = myText.slice(endLongSpacePosition);
                title = (firstPart + secondPart);



                // console.log(title);

                return title;
            }

            
            var return_list = [row.children[1].textContent.split('\n')];

            
            const listItems = row.children;
            const listArray = Array.from(listItems);


            // var my_list = row.children[1].textContent.split('\n');
            // for (i=0; i<my_list.length; i+=3) {
            //     bookA = my_list[i];
            //     // bookB = my_list[i+1];
            //     bookC = my_list[i+2];

            //     return_list.push([bookA, bookC]);

            // }

            // listArray.forEach((item) => {

            //     const titleElement = item.querySelector('[class="item-block__title d-lg-none d-xl-none d-md-none"] > a');           // from 'item' class select child node ('a tag')
            //     var title = "";
            //     if (titleElement !== null){
            //         title = correctTitle(titleElement.textContent);
            //     }
                

            //     const authorElement = item.querySelector('[class="item-block__brand d-lg-none d-xl-none d-md-none"] > span > a');
            //     var author = "";
            //     if (authorElement !== null)
            //     {
            //         author = authorElement.textContent;
            //     }

                
            //     const priceElement = item.querySelector('.item-block__price');
            //     // const priceCentElement = item.querySelector('.cents');
            //     var price = "";
            //     if (priceElement !== null)
            //     {
            //         price = priceElement.textContent;
            //     }

                
            //     // const isbnElement = item.querySelector('[data-id]');                            // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
            //     // var isbn = isbnElement.dataset.id;
                
                
            //     // return_list.push([title, author, price]);
            //     return_list.push(0);
            // });


            return return_list;
        });
    });
  
  




// score = await page.$eval('.b-list', el => el.innerText);

// console.log('\n', score);



    //  /**SEND DATA TO MEDIATOR */
    //  mediator.method.handle_raw_books(results);



    // script_helper.method.pushRawBooks(results, my_stack);




    
    /**Print all data in console */
    for (let i=0; i<results.length; i++)
    {

        console.log(results[i]);
        
    }
 }




 /**
 * Navigating webpage
 * @param {puppeteer.page} page
 * @returns {Array}
 */
  async function navigatePage(page)
  {
    // await page.waitForSelector('[class="pages xs-small-d-none"] > .next-page > a.page_link');
    
    
    // console.log('how many?', (await page.$$('[class="pages xs-small-d-none"] > .next-page > a.page_link')).length)
    await page.click('[class="pages xs-small-d-none"] > .next-page > a.page_link');
    
    
    // await page.evaluate(() => {
    //     return document.querySelector('.next-page > a.page_link').click();
    // });
  
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
          await page.waitForSelector('[class="pages xs-small-d-none"] > .next-page > a.page_link', { timeout: 5000 });
          console.log("Found next page.");
          return 1;
  
      } catch (error) {
          console.log("\n\nDid not find next page.\n\n");
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