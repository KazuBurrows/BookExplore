const Connection = require('mysql/lib/Connection');
const oracledb = require('oracledb');
const { connect } = require('puppeteer');
const { Book } = require('./Book.js');

// oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


/**
 * 
 * @returns 
 */
async function getConnection() {
  try {
      return await oracledb.getConnection({
          user: "freezerz",
          password: "Rockstar03",
          connectionString: "kazu-burrows"
      });

  } catch (error) {
      console.log("Oracle DB connection error.", error);
      return;
  }

} 



/**
 * 
 * @param {String} sqlStatement 
 */
async function executeStatement(conn, sqlStatement) {

  // const s = `INSERT INTO Books (ISBN, TITLE, AUTHOR, PRICE, PAGE) VALUES ('9780007103072', 'Bible', 'Moses', 15.75, 'test.com')`;



  // return conn.execute(
  //   sqlStatement,
  //   {},
  //   {
  //   outFormat: oracledb.OBJECT
  //   }
  //  )
  //  .then(function(result) {
  //   // conn.close();
    
  //   // console.log('Fechou conexão')        
    
  //   return result.rows
  //  })

  try {
    return conn.execute(
      sqlStatement,
      {},
      {
      outFormat: oracledb.OBJECT
      }
     )
     .then(function(result) {
      conn.commit();
      // conn.release();
      
      console.log('executeStatement', result.rows);
      
      return result.rows;
     })

  } catch (e) {
    // if (e.errorNum != 942)
    console.error("ExectuteStatement error: ", e);
    console.error("         SQL statement here -------->: ", sqlStatement);

  }

  // conn.release();
  


  // oracledb.getConnection({
  //   user: "freezerz",
  //   password: "Rockstar03",
  //   connectString: "localhost"
  
  // }, async function(err, connection) {
  //     if (err) {
  //         console.error(err.message);
  //         return;
  //     }
  
  //     // const s = `INSERT INTO Books (ISBN, TITLE, AUTHOR, PRICE, PAGE) VALUES ('9780007103072', 'Bible', 'Moses', 15.75, 'test.com')`;
      

      
  //     try {
  //       const db_response = await connection.execute(sqlStatement);
  //       console.log("Database response: ", db_response.rows);                   // STILL BUGGED
  //       connection.commit();
  //       connection.release();
  //       return db_response;

  //     } catch (e) {
  //       // if (e.errorNum != 942)
  //       console.error("ExectuteStatement error: ", e);
  //       console.error("         SQL statement here -------->: ", sqlStatement);

  //     }
  
  //     connection.release();

  //   });

  
}



/**
 * 
 */
async function insert_book(conn, my_book)
{
  // var sqlStatement = "INSERT INTO Books (ISBN, TITLE, AUTHOR, PRICE, PAGE) VALUES ("+ my_book.sql_format() +")";
  // console.log("\n\nTESTING BOOK FORMAT: ", my_book.sql_format());
  var sqlStatement = `INSERT INTO Books VALUES (`+ my_book.sql_format() +`)`;
  // var sqlStatement = `INSERT INTO Books (ISBN, TITLE, AUTHOR, PRICE, PAGE) VALUES ('9780007103072', 'Bible', 'Moses', 15.75, 'test.com')`;
  // var sqlStatement = `INSERT INTO Books VALUES (0, '9780007103072', 'Bible', 'Moses', 15.75, 'test.com')`;

  var conn = await getConnection()


  try {
    var promise = await book_exists(conn, my_book);
    

    if (typeof promise == 'undefined') {                                              // No record of book
      console.log("UNDEFINED")
      executeStatement(conn, sqlStatement);
      return;
    }

    let price_float = parseFloat((promise.PRICE).toString().slice(0, 4)).toFixed(2);
    if (promise.COUNT > 0 && price_float != my_book.price) {       // if book exists
      // console.log(parseFloat((promise.PRICE).toString().slice(0, 4)).toFixed(2) + " " + my_book.price);

      update_book(conn, my_book, promise.ID);
      console.log("Successfully executed UPDATE statement.");
    }

  } catch (err) {
    console.log("Failed to execute statement.", err);

  }
}



/**
 * This won't be invoked by the scripts, have to find a way to deal with this
 *  I think making a Time To Live column.
 * @param {Book} my_book
 */
function delete_book(conn, my_book)
{
  var sqlStatement = "DELETE FROM Books WHERE ID='"+ my_book.ID +"'";

  try {
    executeStatement(conn, sqlStatement);
    console.log("Successfully executed statement.");
    
  } catch (err) {
    console.log("Failed to execute statement.");

  }
}




/**
 * Get Id then update
 * @param {Book} my_book
 */
function update_book(conn, my_book, book_id)
{
  var sqlStatement = `UPDATE Books SET price=` + my_book.price + ` WHERE ID=` + book_id + ``;
  // `UPDATE Books (ISBN, TITLE, AUTHOR, PRICE, PAGE) VALUES ('9780007103072', 'Bible', 'Moses', 15.75, 'test.com')`;
  // var sqlStatement = `UPDATE Books SET (ISBN, title, author, price, page) VALUES (`+ my_book.sql_format() +`) WHERE ID='`+ my_book.ID +`'`;

  try {
    executeStatement(conn, sqlStatement);
    console.log("Successfully executed statement.");
    
  } catch (err) {
    console.log("Failed to execute statement.");

  }
}




// Nice if we could make this into a trigger in db.
/**
 * Check if book exists in db
 * @param {Book} my_book "book object"
 * @return {Promise}
 */
async function book_exists(conn, my_book)
{
  // var sqlStatement = `SELECT ID, MAX(PRICE) AS PRICE, COUNT(TITLE) FROM Books WHERE ID=19498 GROUP BY ID`;
  var sqlStatement = `SELECT ID, MAX(PRICE) AS PRICE, COUNT(title) AS COUNT FROM Books WHERE title='` + my_book.title + `' AND author='` + my_book.author + `' GROUP BY ID`;
  // select ID, count(title) AS COUNT from books where title='Demon Slayer: Kimetsu no Yaiba, Vol. 16' AND author='Koyoharu Gotouge' group by ID;



async function getCount(conn, sqlStatement) {

  return conn.execute(
    sqlStatement,
    {},
    {
    outFormat: oracledb.OBJECT
    }
   )
   .then(function(result) {
    // conn.close();
    
    // console.log('Fechou conexão')        
    
    return result.rows
   })

}
  


  try {
    var promise = await getCount(conn, sqlStatement);
    console.log("Successfully executed 'book_exists' statement.");
    console.log("exists promise: ", promise[0]);

    return promise[0];

    // if (promise[0].COUNT > 0) {             // if count > 0 then book exists in db.
    //   console.log("Books DOES exists promise: ", promise[0]);

    //   return true;
    // }


    // console.log("Books DOES NOT exists promise: ", promise[0]);
    // return false;

    


    
  } catch (err) {
    console.log("Failed to execute 'book_exists' statement.");
    return;

  }
}






/**
 * Public methods for exports
 */
var methods = {
  getConnection: function() {
    getConnection();
  },
  insert_book: function(conn, book) {
    insert_book(conn, book);

	},
	delete_book: function(conn, book) {
	  delete_book(conn, book);

	},
	update_book: function(conn, book) {
	  update_book(conn, book);

  },
  book_exists: function(conn, book) {
    book_exists(conn, book);
  }
};

exports.method = methods;
