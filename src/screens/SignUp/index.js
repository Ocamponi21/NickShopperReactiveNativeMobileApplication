import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, TextInput, TouchableOpacity, Alert, Touchable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import reactNativeBcrypt from 'react-native-bcrypt';
import { openDatabase } from "react-native-sqlite-storage"
import database from '../../components/Handlers/database'
import bcrypt from 'react-native-bcrypt';

const shopperDB = openDatabase({ name: 'Shopper.db' });
const usersTableName = 'users';

const HomeScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityTextEntry, setSecurityTextEntry] = useState(true);

  const onIconPress = () => {
    setSecurityTextEntry(!securityTextEntry);
  };

  const onSubmit = () => {
    if (!username || !password) {
      Alert.alert('Invalid Input', 'Username and passoword are required!');
      return;
    }

    shopperDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${usersTableName} WHERE username = "${username}"`,
        [],
        (_, res) => {
          let user = res.rows.length;
          if (user >= 1) {
            Alert.alert('Invalid User', 'Username already exsists!');
            return;
          } else {
            //console.log('Testing');
            console.log(username);
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            
            database.addUser(username,hash);
            navigation.navigate('Home');
          }
        },
        error => {
          console.log('Error getting user ' + error.message);
        },
      );
    });
  };

  const navigation = useNavigation();
  return (
    <View
      style={styles.container}>
      <SafeAreaView style={{ flex: 0.0 }} />
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Shopper </Text>
        <TextInput
          placeholder='Enter Username'
          placeholderTextColor='grey'
          value={username}
          autoCapitalize='none'
          onChangeText={setUsername}
          style={{
            color: 'black',
            fontSize: 16,
            width: '100%',
            marginVertical: 15,
            borderColor: 'lightgray',
            borderBottomWidth: 1.0,
            paddingTop: 100,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 1.0,
            borderColor: 'light-grey',
            marginVertical: 15,
          }}
        >
          <TextInput
            placeholder='Enter Password'
            placeholderTextColor='grey'
            value={password}
            autoCapitalize='none'
            onChangeText={setPassword}
            secureTextEntry={securityTextEntry}
            style={{
              color: 'black',
              fontSize: 16,
              width: '100%',
              flex: 1,
            }}
          />
          <TouchableOpacity onPress={onIconPress}>
            {securityTextEntry === true ? (
              <Entypo name='eye' size={20} />
            ) : (
              <Entypo name='eye-with-line' size={20} />

            )}
          </TouchableOpacity>
        </View>
      </View>
      <Pressable
        accessible={true}
        accessibilityRole='button'
        accessibilityLabel='Tap to start shopper'
        accessibilityHint='Goes to list screen'
        style={styles.button}
        onPress={() => onSubmit()}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;