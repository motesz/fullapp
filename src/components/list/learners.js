import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet, Dimensions } from "react-native";
import { Text, List, ListItem, Icon, Button, Input } from "@ui-kitten/components";

const ListLearners = ({payload, customMaxHeight}) => {

  const [maxH, setMaxH] = useState(250)
  const [data, setData] = useState([])

  useEffect(() => {
    if(payload) setData(payload)
      console.log(payload)
  }, [payload])

  useEffect(() => {
    if(customMaxHeight == 'full') setMaxH(Dimensions.get("screen").height - 200)
  }, [customMaxHeight])
  
  const renderItemAccessory = () => (
    // <Button size='tiny'>CONTACT</Button>
    <View><Text>Active</Text></View>
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
      description={`${item.address}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
      <List
          style={{...styles.container, maxHeight: maxH}}
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

export default ListLearners;