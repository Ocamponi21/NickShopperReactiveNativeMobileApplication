/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import type { Node } from 'react';
import Router from './src/navigation/Router';
//bcrypt is a secure way to save passwords uin a database 
// its algorithms encrypt a password into a  long string of char
//called a hash that is alomst impossible to decryt 
//it makes a database more secure - if someone hacks into it, he wont be able to steal the users password
//import bcrypt from 'react-native-bcrypt';
import { openDatabase } from "react-native-sqlite-storage"
import { LogBox } from 'react-native';

const db = require('./src/components/Handlers/database.js');

const shopperDB = openDatabase({ name: 'Shopper.db' });
const usersTableName = 'users';

//create a salt that will beused by bcrypt when create the hash
//a salt is a random value that will be appended to the password
//before its encrypted to make it more secure
//let salt = bcrypt.genSaltSync(10)

const App: () => Node = () => {
  try {
    db.createListsTable();
  } catch (error) {
    console.log('Failed to create lists table ' + error);
  }

  try {
    db.createItemsTable();
  } catch (error) {
    console.log('Failed to create items table ' + error);
  }

  try {
    db.createListItemsTable();
  } catch (error) {
    console.log('Failed to create list items table ' + error);
  }

  try {
    db.createUsersTable();
  } catch (error) {
    console.log('Failed to create users table ' + error);
  }

 /* try {
  //create the hash 
  let hash = bcrypt.hashSync('Sports22', salt);
    db.addUser('OcampoN', hash);  
  } catch (error) { 
    console.log('Failed to create users' + error);
  }*/
  return <Router />;
};


LogBox.ignoreLogs(['Math.random']);
export default App;