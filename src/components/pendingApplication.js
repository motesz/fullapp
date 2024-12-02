import React, { useEffect, useState } from "react";
import { FlatList, Image, View, StyleSheet } from "react-native";
import { Text, List, ListItem, Icon, Button, Input } from "@ui-kitten/components";

const PendingApplicationPage = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require("../assets/images/pending-application.png")} style={{width: 150, height: 150}} />
            <Text style={{marginTop: 20, fontSize: 25, fontWeight: 'bold'}}>Waiting for Approval</Text>
            <View style={{height: 30}}></View>
            <Text style={{paddingHorizontal: 20, textAlign: 'center'}}>Your application is yet to be approved by the administrator. Please wait for some time to your application be approved.</Text>
        </View>
    )
}

export default PendingApplicationPage;