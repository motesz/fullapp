import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, ScrollView, StyleSheet } from "react-native";
import { IndexPath, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Icon, Select, SelectItem, Spinner } from '@ui-kitten/components';

import ProfilePhoto from "../profilePhoto";
import PasswordInput from "../passwordInput";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const GENDERS = ["Male", "Female"]

const LearnerUpdateForm = ({data, onSubmit}) => {

    const navigation = useNavigation()

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('Male')
    const [selectedGenderIndex, setSelectedGenderIndex] = useState(new IndexPath(0))
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [userType, setUserType] = useState('')

    const [resume, setResume] = useState(null)
    const [profilePhoto, setProfilePhoto] = useState(null)

    const [resumeUploading, setResumeUploading] = useState(false)
    const [profilePhotoUploading, setProfilePhotoUploading] = useState(false)

    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setFname(data?.firstname)
        setLname(data?.lastname)
        setEmail(data?.email)
        setPassword(data?.password)
        setAge(data?.age)
        setGender(data?.gender)
        setContact(data?.contact)
        setAddress(data?.address)
        setProfilePhoto(data?.profile_photo)
    }, [data])

    const handleSubmit = () => {
        let payload = {
            id: data?.id,            
            firstname: fname,
            lastname: lname,
            email,
            password,
            age,
            gender,
            address,
            contact,
        }
        let files = [
            {
                name: 'profile_photo',
                data: profilePhoto
            }
        ]
        onSubmit(payload, files)
    }

    return (
        <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
            
            <ProfilePhoto photo={profilePhoto} setPhoto={setProfilePhoto} />
            <Input
                placeholder='First Name'
                value={fname}
                onChangeText={nextValue => {
                    setFname(nextValue)
                    setError(false)
                }}
                style={{paddingHorizontal: 16, paddingVertical: 4}}
            />
            <Input
                placeholder='Last Name'
                value={lname}
                onChangeText={nextValue => {
                    setLname(nextValue)
                    setError(false)
                }}
                style={{paddingHorizontal: 16, paddingVertical: 4}}
            />            
            <Input
                placeholder='Age'
                value={age}
                onChangeText={nextValue => {
                    setAge(nextValue)
                    setError(false)
                }}
                style={{paddingHorizontal: 16, paddingVertical: 4}}
            />            
            <Select
                placeholder='Gender'
                selectedIndex={selectedGenderIndex}
                value={gender}
                onSelect={index => {
                    setSelectedGenderIndex(index)
                    setGender(GENDERS[index - 1])
                }}
                style={{width: '100%', paddingHorizontal: 16, paddingVertical: 4}}
            >
                {GENDERS.map((gender, index) => <SelectItem key={index} title={gender} />)}
            </Select>
            <Input
                placeholder='Contact Number'
                value={contact}
                onChangeText={nextValue => {
                    setContact(nextValue)
                    setError(false)
                }}
                style={{paddingHorizontal: 16, paddingVertical: 4}}
            />
            <Input
                multiline={true}
                placeholder='Address'
                value={address}
                onChangeText={nextValue => {
                    setAddress(nextValue)
                    setError(false)
                }}
                textStyle={{minHeight: 64}}
                style={{paddingHorizontal: 16, paddingVertical: 4}}
            />
            <Input
                placeholder='Email'
                value={email}
                onChangeText={nextValue => {
                    setEmail(nextValue)
                    setError(false)
                }}
                style={{paddingHorizontal: 16, paddingVertical: 4}}
            />
            <PasswordInput value={password} setValue={setPassword} />
            <View style={{height: 10}} />
        
            {error && <View style={{height: 0}}>
                <Text>Invalid username or password</Text>
            </View>}
            <Button onPress={() => handleSubmit()} style={{paddingVertical: 16, marginTop: 8, width: '50%'}}>
                SAVE
            </Button>
            <View style={{height: 20}}></View>
        </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
    )
}


export default LearnerUpdateForm;