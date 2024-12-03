import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

const TutorProfileModal = ({show, setShow, data}) => {

  const [visible, setVisible] = useState(false)
  const [details, setDetails] = useState(data)

  useEffect(() => {
    setVisible(show)
  }, [show])

  useEffect(() => {
    setDetails(data)
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
        <Card disabled={true}>
          <Text>
            Welcome to UI Kitten 😻
          </Text>
          <Button onPress={handleOnClose}>
            DISMISS
          </Button>
        </Card>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default TutorProfileModal;