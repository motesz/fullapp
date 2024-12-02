import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import { Avatar, IndexPath, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { Button, Input, Icon, Select, SelectItem } from '@ui-kitten/components';

import TutorRegisterForm from "./components/forms/tutor";
import LearnerRegisterForm from "./components/forms/learner";

const tutorImage = require("./assets/images/teacher.png")
const learnerImage = require("./assets/images/students.png")

const RegisterScreen = () => {

    const navigation = useNavigation()

    const [error, setError] = useState(false)
    const [userType, setUserType] = useState('')

    const handleOnSubmit = async (payload) => {
        console.log(payload)

        //FOR TESTING
        // ASSUME REGISTRATION SUCCESS
        navigation.navigate('Login')

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
        return <TutorRegisterForm onSubmit={handleOnSubmit} />
    }

    if(userType == 'learner'){
        return <LearnerRegisterForm onSubmit={handleOnSubmit} />
    }

    return (
        <View></View>
    )
}

export default RegisterScreen;