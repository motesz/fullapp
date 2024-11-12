import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const BoundingBox = ({boxes}) => {

    const [boundingBoxes, setBoundingBoxes] = useState(boxes ? boxes : [])

    useEffect(() => {
        setBoundingBoxes(boxes)
    }, [boxes])

    if(boundingBoxes?.length == 0) return null

    return (
        <>
            {boundingBoxes?.map((box, index) => {

                const getAdjustedValue = (num, thres) => {
                    let threshold = thres ? thres : 300
                    return num - threshold
                }

                return (
                    <View key={index} style={{
                        ...styles.boundingBox,
                        width: getAdjustedValue(box?.width),
                        height: getAdjustedValue(box?.height / 2, 0),
                        left: getAdjustedValue(box?.x, 0),
                        top: getAdjustedValue(box?.y, 300)
                        }}>
                        <Text style={styles.boundingBoxText}>{box?.class}</Text>
                    </View>
                )
            })}
        </>
    )
}

const styles = StyleSheet.create({
    boundingBox: {
        flex: 1,
        zIndex: 9999,
        position:'absolute',
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    boundingBoxText: {
        color: 'blue'
    },
})

export default BoundingBox;