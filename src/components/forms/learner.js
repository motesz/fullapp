import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { IndexPath, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Icon, Select, SelectItem } from '@ui-kitten/components';
import PasswordInput from "../passwordInput";
import ALERTS from "../../utils/alert";

const GENDERS = ["Male", "Female"]

const LearnerRegisterForm = ({onSubmit, loading}) => {

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

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(loading)
    }, [loading])

    const handleSubmit = () => {
        onSubmit({
            fname,
            lname,
            email,
            password,
            age,
            gender,
            address,
            contact
        })
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            {<ALERTS.loading isLoading={isLoading} />}

            <Text style="">Sign Up as Learner</Text>
            <View style={{height: 80}}></View>
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
            {error && <View style={{height: 20}}>
                <Text>Invalid username or password</Text>
            </View>}
            <Button onPress={() => handleSubmit()} style={{paddingVertical: 16, marginTop: 16, width: '50%'}}>
                SIGN UP
            </Button>
            <View style={{marginTop: 16, paddingVertical: 8}}><Text>Already have an account?</Text></View>
            <Button appearance="outline" onPress={() => navigation.navigate("Login")} style={{paddingVertical: 16, width: '50%'}}>
                SIGN IN
            </Button>
        </View>
    )
}

export default LearnerRegisterForm;