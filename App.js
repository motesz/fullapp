import React, {useState,useEffect} from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { Camera } from 'react-native-vision-camera';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//TAB BARS
import { TutorBottomTabBar } from './src/components/bottomTab';

// GLOBAL SCREENS
import ScannerScreen from './src/scanner';
import LoginScreen from './src/login';
import RegisterScreen from './src/register';

//TUTOR SCREENS
import TutorHomeScreen from './src/tutor/home';
import TutorProfileScreen from './src/tutor/profile';
import TutorConnectionScreen from './src/tutor/connection';

//LEARNER SCREENS
import LearnerHomeScreen from './src/learner/home';
import LearnerProfileScreen from './src/learner/profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TutorTabs = () => {
  return (
    <Tab.Navigator 
      initialRouteName='Home'  
      tabBar={(props) => <TutorBottomTabBar {...props} />}
    >
      <Tab.Screen name="Scan" options={{headerShown: false}} component={ScannerScreen} />
      <Tab.Screen name="Home" options={{headerShown: false}} component={TutorHomeScreen} />
      <Tab.Screen name="Connections" options={{headerShown: false}} component={TutorConnectionScreen} />
      <Tab.Screen name="Profile" options={{headerShown: false}} component={TutorProfileScreen} />
    </Tab.Navigator>
  );
}

const LearnerTabs = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Scan" options={{headerShown: false}} component={ScannerScreen} />
      <Tab.Screen name="Home" options={{headerShown: false}} component={LearnerHomeScreen} />
      <Tab.Screen name="Profile" options={{headerShown: false}} component={LearnerProfileScreen} />
    </Tab.Navigator>
  );
}

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>

      {/* GLOBAL SCREENS */}
      <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
      <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />

      {/* BOTTOM TABS */}
      <Stack.Screen name="Tutor" options={{headerShown: false}} component={TutorTabs} />
      <Stack.Screen name="Learner" options={{headerShown: false}} component={LearnerTabs} />
    </Stack.Navigator>
  );
}

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
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>        
      </ApplicationProvider>
    </>
  )
};