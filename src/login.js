import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Icon } from '@ui-kitten/components';

import SESSION from "./utils/session";

const LoginScreen = () => {

    const navigation = useNavigation()
    const [session, setSession] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        checkpoint()
    }, [])

    useEffect(() => {
        if(session){
            const {user_type} = session
            if(user_type == 1){
                navigation.navigate("Tutor")
            }else if(user_type == 2){
                navigation.navigate("Learner")
            }
        }
        console.log("SESSION CHECK RUNNING", session)
    }, [])

    const checkpoint = async () => {
        let _session = await SESSION.get("user")
        setSession(_session)
    }

    const handleSubmit = async () => {
        console.log(username, password)
        if(username == "test" && password == "12345"){
            let user = await SESSION.set("user", {
                user_type: 2,
                email: username,
                name: "Sample User",
                password                
            })
            if(user){
                console.log(user)
                if(user?.user_type == 1){
                    navigation.navigate("Tutor")
                }else if(user?.user_type == 2){
                    navigation.navigate("Learner")
                }
            }
        }else{
            setError(true)
        }
    }

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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style="">Sign In</Text>
            <View style={{height: 80}}></View>
            <Input
                placeholder='Username'
                value={username}
                onChangeText={nextValue => {
                    setUsername(nextValue)
                    setError(false)
                }}
                style={{paddingHorizontal: 16, paddingVertical: 0}}
            />
            <Input
                placeholder='Password'
                value={password}
                accessoryRight={renderEyeIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={nextValue => {
                    setPassword(nextValue)
                    setError(false)
                }}
                style={{paddingHorizontal: 16, paddingVertical: 0}}
            />
            {error && <View style={{height: 20}}>
                <Text>Invalid username or password</Text>
            </View>}
            <Button onPress={handleSubmit} style={{paddingVertical: 16, marginTop: 16, width: '50%'}}>
                SIGN IN
            </Button>
            <View style={{marginTop: 16, paddingVertical: 8}}><Text>Don't have an account?</Text></View>
            <Button appearance="outline" onPress={() => navigation.navigate("Register")} style={{paddingVertical: 16, width: '50%'}}>
                SIGN UP
            </Button>
        </View>
    )
}

export default LoginScreen;