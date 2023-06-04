const { Stack } = require('../Stack.js');
const a_sync_prac = require('./a_prac.js');
const b_sync_prac = require('./b_prac.js');
const { Book } = require('../Book.js');
var db_route = require('../db_controller.js');


var myStack = new Stack();


// a_sync_prac.method.myFunc01(myStack)




// myStack.add("a");
// myStack.add("b");
// myStack.add("c");
// console.log(myStack.get());






console.log(parseFloat("0.10"));
console.log(parseFloat("0.00"));
console.log(parseFloat("2.0"));
console.log(parseFloat("02.10"));







// Promise.all([a_sync_prac.method.myFunc01(myStack), b_sync_prac.method.myFunc02(myStack)]);



// const util = require('util');

// var a = util.format('"%s", "%s", %s', 
//       "abc",
//       "bbb",
//       "ccc"
//       );

// console.log(a);





var my_book = new Book('9780007103072', 'Bible', 'Moses', 15.75, 'test.com', 'test store');

// console.log(my_book.ISBN);

// db_route.method.insert_book(my_book);
// db_route.method.book_exists();












// function sleep(ms) {
//     return new Promise((resolve) => {
        
//         setTimeout(resolve, ms);
//     });
// }


// var my_func = async function() {
//     // const currentDate = new Date();
//     // const timestamp = currentDate.getTime();

//     first_date = new Date();
//     first_stamp = first_date.getTime();
//     first_time = (first_stamp / 1000 | 0);

//     await sleep(20000);

//     second_date = new Date();
//     second_stamp = second_date.getTime();
//     second_time = (second_stamp / 1000 | 0);


    
//     console.log(first_time);
//     console.log(second_time);
//     console.log(second_time - first_time);

// }



// my_func();










// // Returns a Promise that resolves after "ms" Milliseconds
// const timer = ms => new Promise(res => setTimeout(res, ms))

// async function load () { // We need to wrap the loop into an async function for this to work
//   for (var i = 0; i < 10; i++) {
//     console.log(i);
//     await timer(3000); // then the created Promise can be awaited
//   }
// }

// load();




// function stackPush(boo) {
//     myStack.add(boo);
//     console.log("Push");
//     myStack.printStack();

// }


// function stackPop() {
//     myStack.remove();
//     console.log("Pop");
//     myStack.printStack();

// }









// /**
//  * Public methods for exports
//  */
//  var methods = {
//     stackPush: function(boo) {
//         stackPush(boo);
  
//       },
//       stackPop: function() {
//         stackPop();

//     }
//   };
  
//   exports.method = methods;








// var char_stack = ['a', 'b', 'c', 'd'];
// var free_stack = [];



// function recursivePush(char_list, my_stack) {
//     if (char_list.length <= 0) {
//         return;

//     }


//     var last = char_list.length-1;
//     var my_char = char_list[last];

//     if(1) {
//         my_stack.push(my_char);

//         char_list.pop();
        
//     }



//     console.log(my_stack);


//     recursivePush(char_list, my_stack)
    


// }


// recursivePush(char_stack, free_stack)