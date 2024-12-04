import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet } from "react-native";
import { Text, List, ListItem, Icon, Button, Input } from "@ui-kitten/components";

const ListTutors = ({payload, accessoryRight = false, onPressAccessoryRight}) => {

  const [data, setData] = useState([])

  useEffect(() => {
    if(payload) setData(payload)
      console.log(payload)
  }, [payload])
  
  const renderItemAccessory = ({data}) => (
    <Button onPress={() => onPressAccessoryRight ? onPressAccessoryRight(data) : null} size='tiny'>VIEW PROFILE</Button>
  )
  
  const renderItemIcon = (props) => (
    <Icon
      {...props}
      name='person'
    />
  )
  
  const renderItem = ({ item, index }) => (
      <ListItem
          title={`${item.firstname} ${item.lastname}`}
          description={`${item.address} ${index + 1}`}
          accessoryLeft={renderItemIcon}
      />
  );

  const renderItemWithRightOptions = ({ item, index }) => (
    <ListItem
      title={`${item.firstname} ${item.lastname}`}
      description={`${item.address} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderItemAccessory({data: item})}
    />
  );

  if(accessoryRight === true){
    return (
      <List
        style={styles.container}
        data={data}
        renderItem={renderItemWithRightOptions}
        maxToRenderPerBatch={10}
      />
  );
  }

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