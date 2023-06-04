// String.prototype.format = function () {
//     var a = this;
//     if (a == undefined) {
//       a = null;
//     }
//     // for (var k in arguments) {
//     //     a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
//     // }

//     // a = a.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
//     a = a.replace(/[^a-zA-Z ]/g, '')
//     return a;
//   }
  
const util = require('util');



class Book {
  constructor(ISBN, title, author, price, page, store) 
  {
    this.type = "Book";
    this.ID = 0;
    this.ISBN = 0;
    this.title = title;
    this.author = author;
    this.price = price;
    this.page = page;
    this.store = store;
  }


  static class(obj) {
    return new MyBook(
      obj.ID,
      obj.ISBN,
      obj.title,
      obj.author,
      obj.price,
      obj.page,
      obj.store
      );
  }


  /**
   * "Format cpu object to string"
   * @returns {string} "Cpu object formatted for sql statement"
   */
  sql_format()
  {

    // a = a.replace(/[^a-zA-Z ]/g, '')

    

    return util.format(`%s, '%s', '%s', '%s', %s, '%s', '%s'`, 
      this.ID,
      this.ISBN,
      this.title,
      this.author,
      this.price,
      this.page,
      this.store
    );




    // return "'{0}', '{1}', '{2}', '{3}', '{4}', '{5}'".format(
    return `"{0}", "{1}", "{2}", "{3}", "{4}", "{5}", "{6}"`.format(
      this.ID,
      this.ISBN,
      this.title,
      this.author,
      this.price,
      this.page,
      this.store
    );
  }





}


exports.Book = Book;