import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet } from "react-native";
import { Text, List, ListItem, Icon, Button, Input } from "@ui-kitten/components";
import HELPERS from "../../utils/helpers";

const defaultProfilePhoto = require("../../assets/images/default-avatar.jpg")

const ListTutors = ({payload, accessoryRight = false, onPressAccessoryRight, maxHeight}) => {

  const [data, setData] = useState([])
  const [_maxHeight, setMaxHeight] = useState(250)

  useEffect(() => {
    if(payload) setData(payload)
      console.log(payload)
  }, [payload])

  useEffect(() => {
    setMaxHeight(maxHeight)
  }, [maxHeight])
  
  const renderItemAccessory = ({data}) => (
    <Button onPress={() => onPressAccessoryRight ? onPressAccessoryRight(data) : null} size='tiny'>VIEW PROFILE</Button>
  )
  
  const renderItemIcon = (props) => (
    <Icon
      {...props}
      name='person'
    />
  )

  const renderProfileAvatar = ({uri}) => {
    if(uri){
      return <Image source={{uri: HELPERS.getUploadedFile(uri)}} style={{width: 45, height: 45, borderRadius: 45 / 2}} />
    }
    if(!uri){
      return <Image source={defaultProfilePhoto} style={{width: 45, height: 45, borderRadius: 45 / 2}} />
    }
  }
  
  const renderItem = ({ item, index }) => (
      <ListItem
          title={`${item.firstname} ${item.lastname}`}
          description={`${item.address} ${index + 1}`}
          accessoryLeft={() => renderProfileAvatar({uri: item.profile_photo})}
      />
  );

  const renderItemWithRightOptions = ({ item, index }) => (
    <ListItem
      title={`${item.firstname} ${item.lastname}`}
      description={`${item.address} ${index + 1}`}
      accessoryLeft={() => renderProfileAvatar({uri: item.profile_photo})}
      accessoryRight={() => renderItemAccessory({data: item})}
    />
  );

  if(accessoryRight === true){
    return (
      <List
        style={{maxHeight: _maxHeight}}
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