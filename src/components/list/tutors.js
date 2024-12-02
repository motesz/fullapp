import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet } from "react-native";
import { Text, List, ListItem, Icon, Button, Input } from "@ui-kitten/components";

const ListTutors = ({payload}) => {

  const [data, setData] = useState([
      {name: 'Juan dela Cruz', age: 20, address: 'Lingayan Pangasinan'},
      {name: 'Juan dela Cruz', age: 20, address: 'Lingayan Pangasinan'},
      {name: 'Juan dela Cruz', age: 20, address: 'Lingayan Pangasinan'},
      {name: 'Juan dela Cruz', age: 20, address: 'Lingayan Pangasinan'},
      {name: 'Juan dela Cruz', age: 20, address: 'Lingayan Pangasinan'}
  ])

  useEffect(() => {
      if(payload) setData(payload)
  }, [payload])
  
  const renderItemAccessory = () => (
      <Button size='tiny'>FOLLOW</Button>
  )
  
  const renderItemIcon = (props) => (
      <Icon
        {...props}
        name='person'
      />
  )
  
  const renderItem = ({ item, index }) => (
      <ListItem
          title={`${item.name}`}
          description={`${item.address} ${index + 1}`}
          accessoryLeft={renderItemIcon}
          // accessoryRight={renderItemAccessory}
      />
  );

  return (
      <List
          style={styles.container}
          data={data}
          renderItem={renderItem}
          maxToRenderPerBatch={10}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 250,
  }
})

export default ListTutors;