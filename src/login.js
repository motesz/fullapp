import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Icon } from '@ui-kitten/components';

import PasswordInput from "./components/passwordInput";

import SESSION from "./utils/session";
import { PostApiCall } from "./utils/api";
import ALERTS from "./utils/alert";

const LoginScreen = () => {

    const navigation = useNavigation()
    const [session, setSession] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        const result = await PostApiCall('/login.php', {username, password})
        if(result.status == 500){
            setError(true)
            setLoading(false)
        }else{
            if(result?.data){
                let user = await SESSION.set("user", result?.data)
                if(user){
                    setLoading(false)
                    console.log(user)
                    if(user?.user_type == 1) navigation.navigate("Tutor")
                    else if(user?.user_type == 2) navigation.navigate("Learner")
                }
            }
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            
            {<ALERTS.loading isLoading={loading} />}

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
            <PasswordInput value={password} setValue={setPassword} />
            {error && <View style={{height: 20}}>
                <Text style={{color: 'red'}}>Invalid username or password</Text>
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