import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'

import Color from '@common/color'
import {bedIcon, nightIcon, calendarIcon} from '@common/image'
import moment from 'moment';

export default InfoBar=({checkIn, duration, rooms})=>(
    <View style={styles.container}>
        <View style={styles.itemContainer}>
            <Image source={calendarIcon} style={styles.icon}/>
            <View style={styles.right}>
                <Text style={styles.title}>Check-in</Text>
                <Text style={styles.value}>{moment(checkIn).format('D MMM YY')}</Text>
            </View>
        </View>
        <View style={styles.spacer}/>
        <View style={styles.itemContainer}>
            <Image source={nightIcon} style={styles.icon}/>
            <View style={styles.right}>
                <Text style={styles.title}>Duration</Text>
                <Text style={styles.value}>{duration} Night</Text>
            </View>
        </View>
        <View style={styles.spacer}/>
        <View style={styles.itemContainer}>
            <Image source={bedIcon} style={styles.icon}/>
            <View style={styles.right}>
                <Text style={styles.title}>Room</Text>
                <Text style={styles.value}>{rooms} Rooms</Text>
            </View>
        </View>
    </View>
)

const styles=StyleSheet.create({
    container:{
        height:50,
        borderBottomWidth:0.5,
        borderBottomColor:'#eee',
        flexDirection:'row'
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    icon:{
        width:16,
        height:16,
        marginRight:8,
        resizeMode:'contain'
    },
    title:{
        fontSize:13,
        color:Color.lightText
    },
    value:{
        fontSize:13,
        color:Color.darkText,
        fontWeight:'bold',
        marginTop:5
    },
    spacer:{
        height:'100%',
        width:0.5,
        backgroundColor:'#eee'
    }
})