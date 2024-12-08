import React, {useState, useEffect} from "react";
import { Text, Button, Icon, Divider } from "@ui-kitten/components";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SESSION from "../utils/session";
import LearnerUpdateForm from "../components/forms/updatelearner";
import HELPERS from "../utils/helpers";
import { PostFormApiCall } from "../utils/api";


const LearnerProfileScreen = () => {

    const navigation = useNavigation();
    const [profileData, setProfileData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        HELPERS.getLearnerAccountData(setProfileData)
        setLoading(false)
    }, [])

    const handleSubmit = async (payload, files) => {
        setLoading(true)
        let result = await PostFormApiCall('/profile.php', payload, files)
        if(result?.status == 200){            
            HELPERS.getLearnerAccountData(setProfileData)
            setLoading(false)
        }else{
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await SESSION.logout("user", navigation)
    }

    return (
        <View style={{flex: 1}}>

            <View style={{height: 50, flexDirection: 'row', padding: 12}}>
                <View style={{flex: 2}}></View>
                <View style={{flex: 9, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Your Profile</Text>
                </View>
                <View style={{flex: 2}}>
                    <TouchableOpacity onPress={handleLogout}>
                        {/* <Icon name='log-out-outline' /> */}
                       <Text> Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Divider />

            <LearnerUpdateForm 
                data={profileData} 
                loading={loading}
                onSubmit={handleSubmit}
            />
            
        </View>
    )
}

export default LearnerProfileScreen;