import React, {useState} from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './styles';

const AddList = props => {

    const [ name, setName] = useState('');
    const [ store, setStore] = useState('');
    const [ date, setDate] = useState('');
  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value= {name}
                onChangeText ={value => setName (value)} 
                style={styles.name}
                clearButtonMode={'while-editing'}
                placeholder={'Enter List Name'}
                placeholderTextColor={'grey'}
            /> 
            <TextInput 
                value= {store}
                onChangeText ={value => setStore (value)} 
                style={styles.store}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Store'}
                placeholderTextColor={'grey'}
            /> 
            <TextInput 
                value= {data}
                onChangeText ={value => setDate (value)} 
                style={styles.date}
                clearButtonMode={'while-editing'}
                placeholder={'Enter List Date in format YYYY-MM-DD'}
                placeholderTextColor={'grey'}
            /> 
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onListAdd}>
                
            </Pressable>
        </View>
    </View>
  );
};

export default AddList;