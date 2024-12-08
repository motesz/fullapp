import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Card, Modal, Text, Spinner } from '@ui-kitten/components';

const alertDefaultButtons = {
  "OK": {text: 'OK', onPress: null},
  "CANCEL": {text: 'CANCEL', onPress: null},
  "DONE": {text: 'DONE', onPress: null},
}

const message = (title, message, buttons) => {
  let btns = buttons.map((btn) => {
    return {...alertDefaultButtons[btn?.type], onPress: btn?.onPress}
  })
  return Alert.alert(title, message, btns)
}

const loading = ({isLoading, text}) => {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isLoading)
  }, [isLoading])

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
    >
      <Card disabled={true}>
        <Spinner size='giant' />
        {text && <Text>{text}</Text>}
      </Card>
    </Modal>
  );
}

const prompt = () => {

}

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const ALERTS = {
  message,
  loading,
  prompt
}

export default ALERTS;