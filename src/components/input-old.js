import React, { useState, useEffect, useCallback } from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Autocomplete, AutocompleteItem, Icon, IconElement } from '@ui-kitten/components';
import { fetchWords } from '../utils/api';

const movies = [
  { title: 'Star Wars' },
  { title: 'Back to the Future' },
  { title: 'The Matrix' },
  { title: 'Inception' },
  { title: 'Interstellar' },
];

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props) => (
  <Icon
    {...props}
    name='star'
  />
);

const InputTypeAhead = ({value, setValue}) => {

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if(inputValue != ''){
      getSuggestionsByInput(inputValue)
    }else if(inputValue == ''){
      setSuggestions([])
    }
  }, [inputValue])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const getSuggestionsByInput = async (val) => {
    console.log("Got input value:", val)
    console.log("Getting word suggestions...")
    const res = await fetchWords(val)
    setSuggestions(res)
    setData(res)
  }

  const onSelect = useCallback((index) => {
    setInputValue(data[index].title);
    setValue(data[index].title);
  }, [data]);

  const onChangeText = useCallback((query) => {
    setInputValue(query);    
    setData(suggestions.filter(item => filter(item, query)));
  }, []);

  const clearInput = () => {
    setInputValue('');
    setValue('');
    setData([]);
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
      accessoryLeft={StarIcon}
    />
  );

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon
        {...props}
        name='close'
      />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10}}>
        <Autocomplete
          placeholder=''
          value={inputValue}
          placement='inner top'
          accessoryRight={renderCloseIcon}
          onChangeText={onChangeText}
          onSelect={onSelect}
        >
          {data.map(renderOption)}
        </Autocomplete>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 0.75,
      paddingTop: 8,
      fontSize: 18,
      backgroundColor: '#f8f8f9'
    },
})

export default InputTypeAhead