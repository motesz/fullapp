import React from "react";
import { View, Image } from "react-native";
import { Text, List, ListItem, Icon, Button, Input } from "@ui-kitten/components";
import ListLearners from "../components/list/learners";

const LearnerConnectionScreen = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
            <View style={{marginTop: 20, marginBottom: 10}}>
                <View style={{flexDirection: 'row', backgroundColor: '#A2CE6F', borderRadius: 15, marginBottom: 4}}>
                    <Image source={require("../assets/images/students.png")} style={{width: 150, height: 75, resizeMode: 'contain'}} />
                    <View style={{flex: 2, alignItems:"flex-end", justifyContent: 'flex-end', padding: 10}}>
                        <Text style={{backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 8}}>Your Tutors </Text>
                    </View>
                </View>
                <ListLearners customMaxHeight={'full'} />
            </View>
        </View>
    )
}

export default LearnerConnectionScreen;