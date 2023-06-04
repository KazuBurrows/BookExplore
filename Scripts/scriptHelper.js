const { Stack } = require('../Stack.js');
const { Book } = require('../Book.js');



/**
 * Public function called by scripts
 * @param {array} book_list
 * @param {Stack} my_stack
 */
function pushRawBooks(book_list, my_stack) {
    var r_book_list = book_list[0];                     /**Original 'book_list' = [[],[],[]] format*/
    var my_books = handleRawBooks(r_book_list);         /**'my_books' = array of book objects*/

    pushToStack(my_books, my_stack);
}




/**
 * Private function
 * @param {*} my_books 
 * @param {*} my_stack 
 */
function pushToStack(my_books, my_stack) {

    let my_book;
    var my_end = my_books.length;

    while(my_books.length > 0) {
        my_book = my_books[my_end-1];

        if(my_stack.requestBlock()) {         /**Request a block on stack*/

            my_stack.add(my_book);
            my_books.pop();
        }

        my_end-=1;
        
    }


}




/**
 * Take an array of raw 'books' and construct 'Book' objects
 * @param {array} book_list "list of books in raw form(not as object)"
 * @return {array} "returns array of 'Book' objects"
 */
function handleRawBooks(book_list)
{
    var my_books = []

    let my_book;
    for (let i=0; i<book_list.length; i++) {
        
        my_book = construct_book(book_list[i]);
        my_books.push(my_book);
    }


    return my_books;
}





/**
 * Helper for 'handle_raw_books'
 * @param {array} book_contents "['Title', 'Author', 'Price']"
 * @returns {Book}
 */
function construct_book(book_contents)
{
    var my_book = new Book();

    my_book.title = format_book_content(book_contents[0], 'str');
    my_book.author = format_book_content(book_contents[1], 'str');
    my_book.price = format_book_content(book_contents[2], 'float');


    return my_book;
}




//Greek AE character found in db table must fix
/**
 * 
 */
function format_book_content(str_content, format_type)
{

    switch(format_type) {
        case 'str':
            // return str_content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            new_str = str_content.replace(/'/g, '')
            if (new_str.length > 1) {
                
                return new_str.charAt(0).toUpperCase() + new_str.slice(1);
            } else {
                new_str.toUpperCase();
            }
            

        case 'float':
            if (str_content.length > 4) {
                str_content = str_content.slice(0, 4);

            }


            let float_content = parseFloat(str_content);
            if (isNaN(float_content)) {
                return 0.00;
            }

            return float_content.toFixed(2);

        default:
          return 0;
      }


    var fixed_str_content = str_content.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    

    return fixed_str_content;
}





/**
 * Public methods for exports
 */
 var methods = {
    pushRawBooks: function(book_list, stack) {
        pushRawBooks(book_list, stack);

    }

    
  };
  
  exports.method = methods;