import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet, Dimensions } from "react-native";
import { Text, List, ListItem, Icon, Button, Input } from "@ui-kitten/components";

import SearchBar from "../components/search";
import ListTutors from "../components/list/tutors";
import TutorProfileModal from "../components/tutorprofilemodal";
import HELPERS from "../utils/helpers";
import { PostApiCall } from "../utils/api";
import SESSION from "../utils/session";
import ALERTS from "../utils/alert";

const LearnerHomeScreen = () => {

    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tutors, setTutors] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [selectedTutorData, setSelectedTutorData] = useState(null)

    useEffect(() => {
        HELPERS.getTutorsExceptHired((result) => {
            setTutors(result)
            setSearchQuery(result)
        })
    }, [])

    const onSelect = (data) => {
        setShowModal(true)
        setSelectedTutorData(data)
    }

    const onHire = async (tutorData) => {

        setLoading(true)
        const learnerData = await SESSION.get_current_user_id('user')
        const payload = {learner_id: learnerData?.id, tutor_id: tutorData?.id}
        let result = await PostApiCall('/hire.php', payload)

        if(result?.status == 200){
            setLoading(false)
            ALERTS.message(
                "Hire Tutor",
                "Tutor hired successfully!",
                [{
                    type: "OK",
                    onPress: () => setLoading(false)
                }]
            )
        }else{
            setLoading(false)
            ALERTS.message(
                "Hire Tutor",
                "Unable to process hiring. Please try again later.",
                [{
                    type: "OK",
                    onPress: () => setLoading(false)
                }]
            )
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>

            <SearchBar 
                payload={searchQuery} 
                list={tutors} 
                value={searchValue}
                onChange={setSearchValue}
                onSearch={setSearchQuery} 
            />

            <View style={{marginTop: 20, marginBottom: 10}}>
                <View style={{flexDirection: 'row', backgroundColor: '#FF7043', borderRadius: 15, marginBottom: 4}}>
                    <View style={{flex: 2, alignItems:"flex-start", justifyContent: 'flex-end', padding: 10}}>
                        <Text style={{backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 8}}>Available Tutors </Text>
                    </View>
                    <Image source={require("../assets/images/teacher.png")} style={{width: 150, height: 75, resizeMode: 'contain'}} />                    
                </View>
                <ListTutors 
                    payload={searchValue != "" ? searchQuery : tutors} 
                    accessoryRight={true} 
                    onPressAccessoryRight={onSelect} 
                    maxHeight={Dimensions.get('screen').height - 300}
                />
            </View>

            <TutorProfileModal 
                show={showModal} 
                setShow={setShowModal} 
                data={selectedTutorData} 
                onSubmit={onHire}
                loading={loading}
            />

        </View>
    )
}


export default LearnerHomeScreen;