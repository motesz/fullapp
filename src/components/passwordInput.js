import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import {  Input, Icon,  } from '@ui-kitten/components';

const PasswordInput = ({value, setValue}) => {

  const [password, setPassword] = useState(value)
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  useEffect(() => {
    if(value) setPassword(value)
  }, [value])

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
    
  const renderEyeIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      placeholder='Password'
      value={password}
      accessoryRight={renderEyeIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={nextValue => {
        setPassword(nextValue)
        setValue(nextValue)
      }}
      style={{paddingHorizontal: 16, paddingVertical: 8}}
    />
  )
}

export default PasswordInput;