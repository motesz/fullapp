import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';

import { fetchWords } from '../utils/api';

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
        console.log("Got Suggestions: ", suggestions)
    }

    const onSelect = (title) => {
        setInputValue(title)
        setValue(title)
    }
    
    const onChangeText = useCallback((query) => {
        setInputValue(query)
    }, [])
    
    const clearInput = () => {
        let newvalue = inputValue.slice(0, inputValue.length - 1)
        setInputValue(newvalue)
        setValue(newvalue)
        setData([])
        setSuggestions([])
    }

    const RenderSuggestions = () => {
        if(suggestions.length == 0) return null

        return <FlatList 
            keyExtractor={item => item.id}
            data={data}
            renderItem={({item}) => <SuggestionItem item={item} />}
            horizontal={true}
            contentContainerStyle={{alignItems: "stretch"}}
            ListEmptyComponent={() => null}
        />
    }
    
    const SuggestionItem = ({item}) => (
        <View>
            <TouchableOpacity style={styles.badge} onPress={() => onSelect(item?.title)}>
                <Text style={styles.badgeText}>{item?.title}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderCloseIcon = (props) => (
        <TouchableWithoutFeedback onPress={clearInput}>
          <Icon
            {...props}
            name='backspace-outline'
          />
        </TouchableWithoutFeedback>
      );

    return (        
        <View style={styles.container}>
            <RenderSuggestions />
            <View style={{paddingHorizontal: 10}}>                
                <Input
                    placeholder='Input text'
                    value={inputValue}
                    onChangeText={onChangeText}
                    accessoryRight={renderCloseIcon}
                    readOnly={true}
                />                
            </View>
            <View style={{height: 20}}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.75,
        paddingTop: 8,
        fontSize: 18,
        backgroundColor: '#f8f8f9'
    },
    badgesContainer: {
        flex: 1, flexDirection: 'row',
        flexBasis: 'auto',
        flexWrap: 'wrap'
    },
    badgeContainer: {

    },
    badge: {
        // backgroundColor: '#7151d4', 
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#7151d4',
        padding: 4,
        margin: 4, 
        paddingHorizontal: 8,        
        borderRadius: 8,
        flexWrap: 'wrap'
    },
    badgeText: {
        // textAlign: 'center',
        color: '#000',
        fontSize: 13
    }
})

export default InputTypeAhead