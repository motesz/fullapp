import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet } from "react-native";
import { Text, List, ListItem, Icon, Button, Input } from "@ui-kitten/components";

const SearchBar = ({payload, list, value, onChange, onSearch}) => {

  const [listItems, setListItems] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    setData(payload)
  }, [payload])

  useEffect(() => {    
    setListItems(list)
  }, [list])

  const handleSearch = (val) => {
    setInputValue(val)
    onChange(val)

    if(val == ""){
      console.log("SHOULD HAVE THIS VALUES: ", list)
      setData(list)
      onSearch(list)
    }else{
      const filteredData = data.filter(item => {
        let name = `${item.firstname} ${item.lastname}`
        return name.toLowerCase().includes(val)
      })
      onSearch(filteredData)
    }
    
  }

  return (
    <Input value={inputValue} placeholder="Search" onChangeText={(val) => handleSearch(val)} />
  )
}

export default SearchBar;