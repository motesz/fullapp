import React from "react";
import { Text, Button } from "@ui-kitten/components";
import { View } from "react-native";
import SESSION from "../utils/session";
import { useNavigation } from "@react-navigation/native";

const TutorProfileScreen = () => {

    const navigation = useNavigation();

    const handleLogout = async () => {
        await SESSION.logout("user", navigation)
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Tutor Profile Screen</Text>
            <Button onPress={handleLogout}>Log Out</Button>
        </View>
    )
}

export default TutorProfileScreen;