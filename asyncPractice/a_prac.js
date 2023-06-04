




const { Stack } = require('../Stack.js');
const { Book } = require('../Book.js');





var myFunc01 = async function(my_stack) {
    var my_book = new Book();
    my_book.title = "Bible";


    let stack_response = false;
    var i = 0;
    while (i < 5) {
        (function(i) {
            setTimeout(function() {


                if(my_stack.requestBlock()) {         /**Request a block on stack*/
                    // console.log("\nRequest Block Test.");
                    // my_stack.printStack();

                    my_stack.add(my_book);
                    console.log("A_sync pushed: ");
                    my_stack.printStack();
                    console.log("\n\n");

                }
                


                // stack_response = my_stack.requestBlock();
                // // console.log("stack response", stack_response);
                // my_stack.printStack();
                // my_stack.add(i);

                // console.log("\nA_ASYNC pushed: ");
                // my_stack.printStack();
            }, 1000 * i)
        })(i++)
    }
};




/**
 * Public methods for exports
 */
 var methods = {
    myFunc01: async function(Stack) {
        myFunc01(Stack);

    }

    
  };
  
  exports.method = methods;