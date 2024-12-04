import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Modal, Text } from '@ui-kitten/components';


const defaultProfilePhoto = require("../assets/images/default-avatar.jpg")

const TutorProfileModal = ({show, setShow, data}) => {

  const [visible, setVisible] = useState(false)
  const [details, setDetails] = useState(data)

  useEffect(() => {
    setVisible(show)
  }, [show])

  useEffect(() => {
    if(data) setDetails(data)
  }, [data])

  const handleOnClose = () => {
    setVisible(false)
    setShow(false)
  }

  return (
    <View style={styles.container}>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={handleOnClose}
      >
        <Card disabled={true} style={{width: Dimensions.get('screen').width - 80}}>

          <View style={{paddingVertical: 16}}>
            <Text style={{fontWeight: 'bold'}}>Tutor Profile</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 30}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Avatar size='giant' source={defaultProfilePhoto} />
            </View>
            <View style={{flex: 1}}></View>
            <View style={{flex: 9, marginLeft: 16}}>
              <Text style={{fontSize: 22, marginBottom: 4}}>
                {details?.firstname} {details?.lastname}
              </Text>
              <Text style={{fontSize: 14}}>
                {details?.address}
              </Text>
              <Text style={{fontSize: 13}}>
              {details?.age} Years Old - {details?.gender} 
              </Text>
              <Text style={{fontSize: 13}}>
              {details?.email}
              </Text>
              <Text style={{fontSize: 13}}>
              {details?.contact}
              </Text>
            </View>
          </View>

          
          <Button appearance='filled' onPress={handleOnClose}>
            HIRE TUTOR
          </Button>
          <Button appearance='ghost' onPress={handleOnClose}>
            CLOSE
          </Button>
        </Card>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 500
    // minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default TutorProfileModal;