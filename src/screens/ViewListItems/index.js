import React, { useState, useEffect} from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Item from '../../components/Item';
import { View, FlatList} from 'react-native';
import { openDatabase } from "react-native-sqlite-storage"

//use the hook to create database
const shopperDB = openDatabase({ name: 'Shopper.db' });
const itemsTableName = 'items';
const listItemsTableName = 'list_items';

const ViewListItemsScreen = props => {

  const post = props.route.params.post;

  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare an empty array that will store the results of the 
      // SELECT
      let results = [];
      //declare a transaction that will declare the SELECT
      shopperDB.transaction(txn => {
        //execute SELECT
        txn.executeSql(
          `SELECT items.id, name, price, quantity FROM ${itemsTableName},
          ${listItemsTableName} WHERE items.id = item_id AND list_id = ${post.id}`,
          [],
          // callback function to handle the results from the SELECT 
          (_, res) => {
            // get number of rows of data selected
            let len = res.rows.length;
            console.log('Length of items ' + len)
            // if more than one row was returned 
            if (len > 0) {
              // loop through the rows 
              for (let i = 0; i < len; i++) {
                // push a row of data at a tiem onto the 
                // result array 
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                });
              }
              // assign results array to item state variable 
              setItems(results);
            
            } else {
              //if no rows of data were returned,
              // set item state variable to an empty array
              setItems([]);
            }
          },
          error => {
            console.log('Error getting items' + error.message);
          },
        )
      }); 
    });
    return listener;
  });


  return (
    <View style={styles.container}>
       <FlatList
          data={items}
          renderItem={({ item }) => <Item post={item} />}
          keyExtractor={item => item.id}
        />
    </View>
  );
};

export default ViewListItemsScreen;