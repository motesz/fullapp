import React, {useState, useEffect} from "react";
import { Text, Button, Icon, Divider } from "@ui-kitten/components";
import { TouchableOpacity, View } from "react-native";
import SESSION from "../utils/session";
import { useNavigation } from "@react-navigation/native";

import TutorUpdateForm from "../components/forms/updatetutor";
import PendingApplicationPage from "../components/pendingApplication";

const TutorProfileScreen = () => {

    const navigation = useNavigation();
    const [accountStatus, setAccountStatus] = useState('active')

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

            <TutorUpdateForm />
            
        </View>
    )
}

export default TutorProfileScreen;