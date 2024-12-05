import React, {useState, useEffect} from "react";
import { Text, Button, Icon, Divider } from "@ui-kitten/components";
import { TouchableOpacity, View } from "react-native";
import SESSION from "../utils/session";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import TutorUpdateForm from "../components/forms/updatetutor";
import PendingApplicationPage from "../components/pendingApplication";
import HELPERS from "../utils/helpers";
import { PostApiCall, PostFormApiCall } from "../utils/api";

const TutorProfileScreen = () => {

    const navigation = useNavigation();
    const [accountStatus, setAccountStatus] = useState('active')
    const [profileData, setProfileData] = useState(null)

    useEffect(() => {
        HELPERS.getAccountStatus(setAccountStatus)
        HELPERS.getAccountData(setProfileData)
    }, [])

    const handleSubmit = async (payload, files) => {
        let result = await PostFormApiCall('/profile.php', payload, files)
        if(result?.status == 200){
            HELPERS.getAccountData(setProfileData)
        }
    }

    const handleLogout = async () => {
        await SESSION.logout("user", navigation)
    }

    if(accountStatus == 'pending') {
        return <PendingApplicationPage />
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

            <TutorUpdateForm 
                data={profileData} 
                onSubmit={handleSubmit}
            />
            
        </View>
    )
}

export default TutorProfileScreen;