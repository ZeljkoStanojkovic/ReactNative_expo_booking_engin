import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    Switch
} from 'react-native'

import Color from '@common/color'
import TitleBar from './TitleBar';

export default SwitchEditor = ({ title, value, onChanged }) => (
    <View style={styles.container}>
        <TitleBar title={title}/>
        <View style={styles.content}>
            {value.map((item, index)=>(
                <View key={index} style={styles.itemContainer}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Switch
                        trackColor={{true:Color.orange,false:Color.lightBack}}
                        value={item.value}
                        onValueChange={()=>onChanged(index)}
                    />
                </View>
            ))}
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
    },
    content:{
        padding:10,
        paddingTop:0,
    },
    itemContainer:{
        flexDirection:'row',
        paddingLeft:15,
        borderBottomWidth:0.5,
        borderBottomColor:Color.border,
        height:50,
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center'
    },
    text:{
        fontSize:18,
        color:Color.lightText
    }
})