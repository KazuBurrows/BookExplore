const { Stack } = require('../Stack.js');





// var myFunc02 = async function(my_stack) {
//     var i = 0;
//     while (i < 5) {
//         console.log("\n\nTESTING LOOP TIMEOUT.\n\n");
//         (function(i) {
//             setTimeout(function() {

// 				//console.log("test: ", myStack[myStack.length-1]);
//                 my_stack.remove();
                
//                 console.log("\nB_ASYNC popped: ");
//                 my_stack.printStack();
//             }, 15000)
//         })(i++)
//     }
// };



var TIMETOLIVE = 0;




// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

async function myFunc02(my_stack) { // We need to wrap the loop into an async function for this to work
    for (var i = 0; i < 10; i++) {

        // console.log("\nIs stack empty? ", my_stack.isEmpty());
        // my_stack.printStack();        
        

        console.log("\nB_sync popped: ");
        console.log(my_stack.get());

        my_stack.remove();

        my_stack.printStack();
        console.log("\n\n");
        
        // console.log(i);
        await timer(3000); // then the created Promise can be awaited








    }
}




/**
 * Public methods for exports
 */
 var methods = {
    myFunc02: async function(Stack) {
        myFunc02(Stack);

    }

    
  };
  
  exports.method = methods;