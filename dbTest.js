const Connection = require('mysql/lib/Connection');
const oracledb = require('oracledb');
const { connect } = require('puppeteer');
const { Book } = require('./Book.js');

// oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;




// https://stackoverflow.com/questions/47039002/express-js-promise-pending-in-database-connection



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



async function executeQuery(conn) {
    // let sql = `select ID, MAX(price) AS PRICE, count(title) AS COUNT from books where title='Gangsta Granny' AND author='David Walliams' group by ID`;
    let sql = `select ID, MAX(price) AS PRICE, count(title) AS COUNT from books where title='Gangsdddta Granny' AND author='David Walliams' group by ID`;


    return conn.execute(
      sql,
      {},
      {
      outFormat: oracledb.OBJECT
      }
     )
     .then(function(result) {
    //   conn.close();
      
      // console.log('Fechou conexão')        
      
      return result.rows
     })

}



function closeConnection(conn) {
 conn.close(function(err) {
  if (err) {
   console.log('Error closing connection', err);
  } else {
   console.log('Connection closed');
  }
 });
}







// Nice if we could make this into a trigger in db.
/**
 * Check if book exists in db
 * @param {Book} my_book "book object"
 * @return {boolean}
 */
async function book_exists()
{
    console.log("test", )

    let conn = await getConnection();

    let result = await executeQuery(conn);
    console.log("executeQuery test", result[0]);

    if (typeof promise == 'undefined') {                                              // No record of book
        console.log("aAAAAAAAA");
  
      }


    closeConnection(conn);
}




book_exists();





// async function executeStatement(conn, sqlStatement) {

  
//     try {
//       return conn.execute(
//         sqlStatement,
//         {},
//         {
//         outFormat: oracledb.OBJECT
//         }
//        )
//        .then(function(result) {
//         // conn.commit();
//         // conn.release();
        
//         // console.log('Fechou conexão')        
        
//         return result.rows;
//        })
  
//     } catch (e) {
//       // if (e.errorNum != 942)
//       console.error("ExectuteStatement error: ", e);
//       console.error("         SQL statement here -------->: ", sqlStatement);
  
//     }
  

  
    
//   }

// async function main() {
//     let conn = await getConnection();


//     var my_book = new Book();
//     my_book.ID = 19498;
//     my_book.title = 'Gangsta Gran';
//     my_book.author = 'KKKKKK';
//     my_book.price = 987654.0;


//     var sqlStatement = `UPDATE Books SET (ISBN, title, author, price, page) VALUES (`+ my_book.sql_format() +`) WHERE ID='`+ my_book.ID +`'`;
//     await executeStatement(conn, sqlStatement);


//     closeConnection(conn);
// }
  

// main();




// UPDATE Books SET title='Gangsta Gran', author='KKKKKK', price=987654.0 WHERE ID=19498;