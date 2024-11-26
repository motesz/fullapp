import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Camera, getCameraDevice } from 'react-native-vision-camera';
import Tts from "react-native-tts";

import InputTypeAhead from "./components/input";
import MenuSection from "./components/menu";
import BoundingBox from "./components/boundingBox";

import { postDetect } from "./utils/api";

const ScannerScreen = () => {
  
  const cameraRef = useRef(null)
  
  const devices = Camera.getAvailableCameraDevices()
  const [cameraDevice, setCameraDevice] = useState(getCameraDevice(devices, 'back'))
  
  const [detecting, setDetecting] = useState(false)

  const [boxes, setBoxes] = useState([])
  const [message, setMessage] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      if(detecting) {
        handleDetect()
      }else{
        setBoxes([])
      }
    }, 3000) // 1000 is 1 seconds
    return () => clearInterval(interval)
  }, [detecting])

  const handleSwitchCamera = () => {
    const position = cameraDevice?.position == 'front' ? 'back' : 'front'
    setCameraDevice(getCameraDevice(devices, position))
  }

  const handleStartStop = async () => {
    setDetecting(!detecting)
  }

  const handleSetValue = (value) => {
    setMessage(value)
  }

  const handleSpeak = () => {
    Tts.speak(
      message,  
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

    console.log("Predictions:", predictions)

    if(predictions.length > 0){

      const topPrediction = predictions.reduce((max, current) =>
        current.confidence > max.confidence ? current : max
      );

      let letters = [topPrediction].map((classes) => classes?.class).join("")
      setMessage((prev) => `${prev}${letters}`)
      setBoxes([topPrediction])

      
    console.log("Top Prediction:", topPrediction)
      console.log("Letters:", letters)
      console.log("Message:", message)
    }

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
      <BoundingBox boxes={boxes} />
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