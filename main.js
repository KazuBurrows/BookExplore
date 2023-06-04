const prompt = require('prompt-sync')();
const scriptCommand = require('./Scripts/scriptCommands.js');
const governor_con_route = require('./governor_controller.js');

const { Stack } = require('./Stack.js');






/**Get user input via console to select what script to run*/
const userScriptCommand = prompt('Choose script command: ');
console.log(`Running "${userScriptCommand}" script`);


/**Initialise global stack that will be used by 2 async programs */
var my_stack = new Stack();




/**Run both async scripts at the same time. */
// Promise.all([callScriptCommand(userScriptCommand), governor_con_route.method.runGovMain(my_stack)]);






/**
 * Use user input as parameter and run chosen script.
 */
switch(userScriptCommand) {
  case 'fishpond':
    scriptCommand.method.runFishPondScript(my_stack)
    // Promise.all([scriptCommand.method.runFishPondScript(my_stack), governor_con_route.method.runGovMain(my_stack)]);
    break;
  case 'mightyape':
    // scriptCommand.method.runMightyApeScript(my_stack)
    Promise.all([scriptCommand.method.runMightyApeScript(my_stack), governor_con_route.method.runGovMain(my_stack)]);
    break;
  case 'paperplus':
    // scriptCommand.method.runPaperPlusScript(my_stack)
    Promise.all([scriptCommand.method.runPaperPlusScript(my_stack), governor_con_route.method.runGovMain(my_stack)]);
    break;
    
}






// /**
//  * Object literal that calls user selected function
//  * @param {userScriptCommand} 'user input from prompt'
//  */
// function callScriptCommand(userScriptCommand) {
//     var scripts = {
//         'all': function() {
//             scriptCommand.method.runAllScript(my_stack);
//         },
//         'fishpond': function() {
//             scriptCommand.method.runFishPondScript(my_stack)
//         },
//         'mightyape': function() {
//             scriptCommand.method.runMightyApeScript(my_stack)
//         },
//         'paperplus': function() {
//             scriptCommand.method.runPaperPlusScript(myStack)
//         },
//         'whitcoulls': function() {
//             scriptCommand.method.runWhitcoullsScript(myStack)
//         },

//     };
    
//     return scripts[userScriptCommand]();

// }




