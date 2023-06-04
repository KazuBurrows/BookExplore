const fish_pond_route = require('./FishPondScript.js');
const mighty_ape_route = require('./MightyApeScript.js');
const paper_plus_route = require('./PaperPlusScript.js');
// const whitcoulls_route = require('./.js');




function runAllScript(my_stack) {

  console.log("testing all scripts func");

}



function runFishPondScript(my_stack) {

    // console.log("testing fishpond scripts func");
    fish_pond_route.method.runScript(my_stack);


}



function runMightyApeScript(my_stack) {

    // console.log("testing mightyape scripts func");
    mighty_ape_route.method.runScript(my_stack);


}



function runPaperPlusScript(my_stack) {
  paper_plus_route.method.runScript(my_stack);



}



function runWhitcoullsScript(my_stack) {
  whitcoulls_route.method.runScript(my_stack);



}







/**
 * Public methods for exports
 */
 var methods = {
    runAllScript: function(my_stack) {
      runAllScript(my_stack);
  
    },
    runFishPondScript: function(my_stack) {
      runFishPondScript(my_stack);
  
    },
    runMightyApeScript: function(my_stack) {
      runMightyApeScript(my_stack);
  
    },
    runPaperPlusScript: function(my_stack) {
      runPaperPlusScript(my_stack);

    },
    runWhitcoullsScript: function(my_stack) {
      runWhitcoullsScript(my_stack);

    }
  };
  
  exports.method = methods;