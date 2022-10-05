// import openDatabase hook
import { openDatabase} from "react-native-sqlite-storage"

//use the hook to create database
const shopperDB = openDatabase({name: 'Shopper.db'});
const listsTableName = 'lists';

module.exports = {
        //Declare the function that create the lists table
        createListsTable: async function () {
                //Declare a transaction that will execute a Sql statement
                (await shopperDB).transaction(txn => {
                        //Execute the Sql
                        txn.executeSql(
                                `CREATE TABLE IF NOT EXISTS ${listsTableName}(
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        name TEXT,
                                        store TEXT,
                                        date TEXT
                                );`,
                                //arguments while using an SQL prepared statemtn
                                [],
                                //call back function to handle results of SQL query
                                () => {
                                        console.log(' Lists table created successfully');
                                },
                                error => {
                                        console.log ('Error creating lists table ' + error.message);
                                },

                        );
                });
        },

        //Declare a function that will insert a row of data into the lists table
        addList: async function (name, store, date) {
                //Declare a transaction that will execute an Sql statement
                (await shopperDB).transaction(txn => {
                        //execute the Sql
                        txn.executeSql(
                                `INSERT INTO ${listsTableName} (name, store, date) VALUES ("${name}", "${store}", "${date}")`,
                                //Arguments passed when using Sql prepared statement
                                [],
                                //Callback function to handle results of Sql query
                                () => {
                                        console.log(name + ' added successfully');
                                },
                                error => {
                                console.log('Error  adding list ' + error.message);
                                },
                        );
                });
        },
};