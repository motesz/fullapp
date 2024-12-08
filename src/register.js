import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import { Avatar, IndexPath, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { Button, Input, Icon, Select, SelectItem } from '@ui-kitten/components';

import TutorRegisterForm from "./components/forms/tutor";
import LearnerRegisterForm from "./components/forms/learner";
import { PostFormApiCall } from "./utils/api";
import ALERTS from "./utils/alert";

const tutorImage = require("./assets/images/teacher.png")
const learnerImage = require("./assets/images/students.png")

const RegisterScreen = () => {

    const navigation = useNavigation()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userType, setUserType] = useState('')

    const handleOnSubmit = async (payload, files) => {
        
        setLoading(true)

        let postdata = {
            ...payload, 
            firstname: payload.fname, 
            lastname: payload.lname, 
            user_type: userType == 'tutor' ? '1' : '2'
        }

        const result = await PostFormApiCall('/register.php', postdata, files)
        console.log(result)
        if(result.status == 500){
            setError(true)
            setLoading(false)
        }else{
            setLoading(false)
            ALERTS.message(
                "Account Registration", 
                "Registered successfully! You can now login to continue", 
                [{
                    type: 'OK',
                    onPress: () => navigation.navigate('Login')
                }]
            )
        }

        //FOR TESTING
        // ASSUME REGISTRATION SUCCESS
        // navigation.navigate('Login')

    }

    if(userType == '') {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => setUserType('learner')} style={{alignItems: 'center'}}>
                    <Image source={learnerImage} style={{width: 150, height: 150}} />
                    <Text>Register as Learner</Text>
                </TouchableOpacity>
                <View style={{height: 80}} />
                <TouchableOpacity onPress={() => setUserType('tutor')} style={{alignItems: 'center'}}>
                    <Image source={tutorImage} style={{width: 150, height: 150}} />
                    <Text>Register as Tutor</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if(userType == 'tutor'){
        return <TutorRegisterForm onSubmit={handleOnSubmit} loading={loading} />
    }

    if(userType == 'learner'){
        return <LearnerRegisterForm onSubmit={handleOnSubmit} loading={loading} />
    }

    return (
        <View></View>
    )
}

export default RegisterScreen;