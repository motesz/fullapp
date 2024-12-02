import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, ScrollView, TouchableOpacity, ImageBackground, Image } from "react-native";
import { IndexPath, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Icon, Select, SelectItem, Spinner } from '@ui-kitten/components';
import { pick } from "react-native-document-picker";

const GENDERS = ["Male", "Female"]
const defaultProfilePhoto = require("../../assets/images/default-avatar.jpg")

const TutorUpdateForm = ({onSubmit}) => {

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

    const onSelectProfilePhoto = async () => {
        try {
            setProfilePhotoUploading(true)
            const [pickResult] = await pick()
            console.log(pickResult)
            setProfilePhoto(pickResult)
            setProfilePhotoUploading(false)
        } catch (err) {
            console.log(err)
            setProfilePhotoUploading(false)
        }
    }

    const handleSubmit = () => {
        onSubmit({
            fname,
            lname,
            email,
            password,
            age,
            gender,
            address,
            contact,
            resume
        })
    }

    return (
        <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
            <View style={{marginBottom: 25, marginTop: 20}}>
                <TouchableOpacity onPress={onSelectProfilePhoto} style={{width: 90, height: 90, borderRadius: 45}}>
                    <Image source={profilePhoto != null ? profilePhoto?.uri : defaultProfilePhoto}                        
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: 45
                        }}
                    />
                    <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 10}}>Upload Photo</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
            <Input
                placeholder='Password'
                value={password}
                accessoryRight={renderEyeIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={nextValue => {
                    setPassword(nextValue)
                    setError(false)
                }}
                style={{paddingHorizontal: 16, paddingVertical: 8}}
            />
            <View style={{height: 10}} />
        
            {error && <View style={{height: 0}}>
                <Text>Invalid username or password</Text>
            </View>}
            <Button onPress={() => handleSubmit()} style={{paddingVertical: 16, marginTop: 8, width: '50%'}}>
                SAVE
            </Button>
            <View style={{height: 20}}></View>
        </ScrollView>
    )
}

export default TutorUpdateForm;