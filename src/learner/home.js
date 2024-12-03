import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet } from "react-native";
import { Text, List, ListItem, Icon, Button, Input } from "@ui-kitten/components";

import SearchBar from "../components/search";
import ListTutors from "../components/list/tutors";
import TutorProfileModal from "../components/tutorprofilemodal";

const LearnerHomeScreen = () => {

    const [showModal, setShowModal] = useState(false)
    const [selectedTutorData, setSelectedTutorData] = useState(null)

    const onSelect = (data) => {
        setShowModal(true)
        setSelectedTutorData(data)
    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>

            <SearchBar />

            <View style={{marginTop: 20, marginBottom: 10}}>
                <View style={{flexDirection: 'row', backgroundColor: '#FF7043', borderRadius: 15, marginBottom: 4}}>
                    <View style={{flex: 2, alignItems:"flex-start", justifyContent: 'flex-end', padding: 10}}>
                        <Text style={{backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 8}}>Tutors </Text>
                    </View>
                    <Image source={require("../assets/images/teacher.png")} style={{width: 150, height: 75, resizeMode: 'contain'}} />                    
                </View>
                <ListTutors accessoryRight={true} onPressAccessoryRight={onSelect} />
            </View>

            <TutorProfileModal show={showModal} setShow={setShowModal} data={setSelectedTutorData} />

        </View>
    )
}


export default LearnerHomeScreen;