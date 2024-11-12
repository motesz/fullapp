import React, {useState,useEffect} from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { Camera } from 'react-native-vision-camera';

import ScannerScreen from './src/scanner';

const NoPermissionScreen = () => {
  return (
    <Layout style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text category='c1'>Enable camera permissions to continue</Text>
    </Layout>      
  )
}

export default () => {

  const [hasPermission, setHasPermission] = useState(false)
 
  useEffect(() => {
    Camera.requestCameraPermission().then((p) =>
      setHasPermission(p === 'granted')
    )
  }, [])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {hasPermission ? <ScannerScreen /> : <NoPermissionScreen />}
      </ApplicationProvider>
    </>
  )
};