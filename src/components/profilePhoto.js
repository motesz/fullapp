import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import {  Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { MenuItem, OverflowMenu } from '@ui-kitten/components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import HELPERS from "../utils/helpers";

const defaultProfilePhoto = require("../assets/images/default-avatar.jpg")

const ProfilePhoto = ({photo, setPhoto}) => {

  const [visible, setVisible] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [profilePhoto, setProfilePhoto] = useState(null)

  useEffect(() => {
    if(photo) {
      if(typeof photo === 'string'){
        setProfilePhoto({uri: HELPERS.getUploadedFile(photo)})
      }else{
        setProfilePhoto(photo)
      }      
    }
  }, [photo])

  const onSelectTakePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo'
    });
    if(result?.assets){
      if(result?.assets[0]){
        setProfilePhoto(result?.assets[0])
        setPhoto(result?.assets[0])
      }
    }
  }

  const onSelectUploadPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo'
    });
    if(result?.assets){
      if(result?.assets[0]){
        setProfilePhoto(result?.assets[0])
        setPhoto(result?.assets[0])
      }
    }
  }

  const onItemSelect = (index) => {
      setSelectedIndex(index)
      setVisible(false)
  }

  const renderAvatar = () => {
      return (
          <View style={{marginBottom: 25, marginTop: 20}}>
              <TouchableOpacity onPress={() => setVisible(true)} style={{width: 90, height: 90, borderRadius: 45}}>
                  {!profilePhoto && <Image source={defaultProfilePhoto}                        
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 45
                    }}
                  />}
                  {profilePhoto && profilePhoto?.uri && 
                  <Image source={{uri: profilePhoto?.uri}}                        
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 45
                    }}
                  />}
                  <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                      <Text style={{fontSize: 10}}>Upload Photo</Text>
                  </View>
              </TouchableOpacity>
          </View>
      )
  }

  return (
      <OverflowMenu
          anchor={renderAvatar}
          backdropStyle={styles.backdrop}
          visible={visible}
          selectedIndex={selectedIndex}
          onSelect={onItemSelect}
          onBackdropPress={() => setVisible(false)}
      >
          <MenuItem onPress={onSelectTakePhoto} title='Take Photo' />
          <MenuItem onPress={onSelectUploadPhoto} title='Upload Photo' />
      </OverflowMenu>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 144,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ProfilePhoto;