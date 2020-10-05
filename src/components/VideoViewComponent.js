import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const VideoViewComponent = (props) => {
    return (
        <View style={styles.videoBox}>
            <Text style={styles.videoHeader}>VideoURL</Text>
            <Text style={styles.videoText}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    videoBox: {
        margin: 15,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: 'black'
    },
    videoText: {
        textAlign: 'center',
        color: 'violet',
        fontSize: 15
    },
    videoHeader: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20
    }
})
export default VideoViewComponent
