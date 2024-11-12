import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Tts from "react-native-tts";

import InputTypeAhead from "./components/input";
import MenuSection from "./components/menu";
import BoundingBox from "./components/boundingBox";

import { postDetect } from "./utils/api";

const ScannerScreen = () => {
  
  const cameraRef = useRef(null)
  const [detecting, setDetecting] = useState(false)
  const [cameraDevice, setCameraDevice] = useState(useCameraDevice('back'))
  const [boxes, setBoxes] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      if(detecting) {
        handleDetect()
      }else{
        setBoxes([])
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [detecting])

  const handleSwitchCamera = () => {
    setCameraDevice(cameraDevice == 'back' ? useCameraDevice('front') : useCameraDevice('back'))
  }

  const handleStartStop = async () => {
    setDetecting(!detecting)
  }

  const handleSetValue = (value) => {
    setMessage(value)
  }

  const handleSpeak = () => {
    Tts.speak(
      outputValue,  
      {
        androidParams: {
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      }
    )
  }

  const handleDetect = async () => {

    const snapshot = await cameraRef.current.takeSnapshot({
      quality: 90
    })

    setDetecting(true)
    console.log("detecting...")

    const result = await postDetect(snapshot)
    const {predictions} = result
    setBoxes(predictions)

    let letters = ''
    predictions.forEach(prediction => {
      letters += prediction?.class || ''
    })
    setMessage(letters)

    console.log("Predictions:", predictions)
    console.log("Message:", message)
    
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 4}}>
        <Camera
          ref={cameraRef}
          style={styles.cameraStyle}
          device={cameraDevice}
          isActive={true}
        />
      </View>
      <InputTypeAhead value={message} setValue={handleSetValue} />
      <MenuSection 
        onToggle={handleStartStop} 
        onSpeak={handleSpeak} 
        onSwitch={handleSwitchCamera} 
      />
      <BoundingBox boxes={ [{"class": "C", "class_id": 2, "confidence": 0.7007904052734375, "detection_id": "cd69b3e6-fda6-4f50-90e3-154433e69ec6", "height": 639, "width": 546, "x": 370, "y": 678.5}]} />
      {/* <BoundingBox boxes={boxes} /> */}
    </View>
  )
}

const styles = {
  container: {
    ...StyleSheet.absoluteFill, 
    flex: 1
  },
  cameraStyle: {
    ...StyleSheet.absoluteFill,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height - 300
  }
}

export default ScannerScreen;