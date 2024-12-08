import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, ScrollView, Alert } from "react-native";
import { IndexPath, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Icon, Select, SelectItem, Spinner } from '@ui-kitten/components';
import { pick } from "react-native-document-picker";
import PasswordInput from "../passwordInput";
import ALERTS from "../../utils/alert";
import VALIDATOR from "../../utils/validator";

const GENDERS = ["Male", "Female"]

const TutorRegisterForm = ({onSubmit, loading}) => {

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
    const [resumeUploading, setResumeUploading] = useState(false)

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(loading)
    }, [loading])

    const handlePickFile = async () => {
        try {
            setResumeUploading(true)
            const [pickResult] = await pick()
            console.log(pickResult)
            setResume(pickResult)
            setResumeUploading(false)
        } catch (err) {
            console.log(err)
            setResumeUploading(false)
        }
    }

    const handleSubmit = () => {

        let payload = {
            fname,
            lname,
            email,
            password,
            age,
            gender,
            address,
            contact,            
        }

        let emptyVals = VALIDATOR.checkForEmptyValues(payload)
        if(emptyVals.length > 0){
            ALERTS.message(
                "Form Validation", 
                "Fields cannot be empty:\n\n" + emptyVals.map((val) => val?.field).join("\n"), 
                [{type: "OK"}]
            )
            return
        }

        let contactVal = VALIDATOR.phoneNumber(contact)
        if(!contactVal){
            ALERTS.message("Form Validation", "Invalid contact number.", [{type: "OK"}])
            return
        }

        let emailVal = VALIDATOR.email(email)
        if(!emailVal){
            ALERTS.message("Form Validation", "Invalid email address.", [{type: "OK"}])
            return
        }

        let pwdVal = VALIDATOR.password(password)
        if(!pwdVal){
            ALERTS.message("Form Validation", "Password must be 6 or more characters", [{type: "OK"}])
            return
        }

        let files = VALIDATOR.file(resume?.name ? [{...resume, attributeName: 'resume'}] : null)

        onSubmit(payload, files)
    }

    return (
        <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            {<ALERTS.loading isLoading={isLoading} />}

            <View style={{height: 40}}></View>
            <Text style="">Sign Up as Tutor</Text>
            <View style={{height: 40}}></View>
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
            
            <View style={{
                flex: 1, 
                position: 'relative', 
                alignItems: 'flex-start', 
                justifyContent: 'flex-start', 
                alignContent: 'flex-start', 
                alignSelf: 'flex-start',
                paddingHorizontal: 16, 
                paddingVertical: 0
            }}>
                <Text>Resume</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Button onPress={handlePickFile} appearance="outline">{ "Upload File" }</Button>
                    <Text style={{flexWrap: 'no-wrap'}}> &nbsp;&nbsp;
                        {resume == null ? "No File Chosen" : 
                            resume?.name ? resume?.name.slice(0, 30) + '...' : '' || ''}
                    </Text>
                </View>
            </View>

            {error && <View style={{height: 0}}>
                <Text>Invalid username or password</Text>
            </View>}
            <Button onPress={() => handleSubmit()} style={{paddingVertical: 16, marginTop: 8, width: '50%'}}>
                SIGN UP
            </Button>
            <View style={{marginTop: 16, paddingVertical: 8}}><Text>Already have an account?</Text></View>
            <Button size="small" appearance="outline" onPress={() => navigation.navigate("Login")} style={{paddingVertical: 16, width: '50%'}}>
                SIGN IN
            </Button>
            <View style={{height: 20}}></View>
        </ScrollView>
    )
}

export default TutorRegisterForm;