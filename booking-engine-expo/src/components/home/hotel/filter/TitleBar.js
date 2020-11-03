import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Color from '@common/color'

export default TitleBar = ({ title }) => (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor:Color.lightBack,
        paddingHorizontal:15,
        justifyContent:'center',
        height:36,
        borderBottomColor:Color.border,
        borderBottomWidth:1,
        borderTopColor:Color.border,
        borderTopWidth:0.5
    },
    title:{
        color:Color.lightText,
        fontSize:13,
        fontWeight:'bold'
    }
})