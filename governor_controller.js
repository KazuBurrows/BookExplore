const { Stack } = require('./Stack.js');
var db_route = require('./db_controller.js');





/** */
function sleep(ms) {
    return new Promise((resolve) => {
        
        setTimeout(resolve, ms);
    });
}





/**
 * 
 * @returns {number} "format '1656634331'"
 */
function getTimeStamp() {

    var date_now = new Date();
    var stamp = date_now.getTime();
    var time_stamp = (stamp / 1000 | 0);

    
    return time_stamp;
}





/**
 * 
 * @param {Stack} my_stack 
 */
async function runGovMain(my_stack) {

    console.log("Governor main function running.");

    var conn = await db_route.method.getConnection()
    // try {
    //     conn = await db_route.method.getConnection();
    //     console.log("DB Conn made.");
    // } catch (error) {
    //     return;
    // }
    

    await sleep(15000);
    console.log("after sleep");

    

    var TTL = getTimeStamp();
    while (1) {
        let time_stamp = getTimeStamp();
        
        
        /**If Stack is empty*/
        if (my_stack.isEmpty()){
            console.log("Stack is empty.");
            my_stack.printStackSize();


            /**If TTL exceeds 120 seconds, kill loop*/
            if ((time_stamp - TTL) > 120) {
                console.log("BREAKING GOVERNOR LOOP\n");
                break;

            } else {
                console.log("Go to sleep.\n");
                //**If loop is empty and TTL has not expired then sleep for 10 seconds */
                await sleep(10000);

            }
        }


        /**Request a block on Stack then do something on Stack */
        else if (my_stack.requestBlock()) { 
            console.log("\nI am the governor.");
            

            let my_book = my_stack.get();

            // console.log("\nINSERT THIS BOOK TO DB.");
            // console.log(my_book);

            db_route.method.insert_book(conn, my_book);

            my_stack.remove();              // This also unlocks blocking on stack.

            // console.log("\nCURRENT STACK");
            // console.log(my_stack);

            /**Reset TTL to new time */
            TTL = getTimeStamp();
            
        }



        /**Gives the script a chance to push Books to Stack */
        await sleep(300);

        

        


    }

    console.log("\nGOVERNOR HAS FINISHED\n");

    conn.close(function(err) {
        if (err) {
         console.log('Error closing connection', err);
        } else {
         console.log('Connection closed');
        }
       });
};













/**
 * Public methods for exports
 */
 var methods = {
    runGovMain: async function(Stack) {
        runGovMain(Stack);

    }

    
  };
  
  exports.method = methods;