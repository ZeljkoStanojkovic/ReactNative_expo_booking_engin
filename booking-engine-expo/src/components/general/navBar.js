import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Color from '@common/color'
import * as Const from '@common/const'
import Device from '@common/device'

export default class NavBar extends React.Component {
    constructor(props){
        super(props)
    }

  render() {
      let {onRight, rightTitle, title, description, scenes}  = this.props
    return (
        <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
                {description&&description!='' && <Text style={styles.description}>{description}</Text>}
            </View>
            {scenes.length>1&&<TouchableOpacity onPress={()=>Actions.pop()} style={styles.left}>
                <Ionicons name="ios-arrow-back" size={30} color='white'/>
            </TouchableOpacity>}
            {onRight&&rightTitle!='' && <TouchableOpacity onPress={()=>onRight()} style={styles.right}>
                <Text style={styles.rightText}>{rightTitle}</Text>
            </TouchableOpacity>}
        </View>
    )
  }
}

const styles=StyleSheet.create({
    headerContainer:{
        width:'100%', 
        height: Const.navBarHeight + Device.ToolbarHeight, 
        paddingTop: Device.ToolbarHeight,
        flexDirection:'row', 
        alignItems:'center', 
        backgroundColor:Color.primary,
        paddingHorizontal: 20
    },
    
    title:{
        fontSize:16,
        // fontWeight:'bold',
        color:'white',
    },

    description:{
        marginTop:5,
        fontSize:12,
        color:'white',
    },

    titleContainer:{
        flex:1,
        alignItems:'center',
        marginHorizontal:40
    },

    left:{
        paddingVertical:8,
        paddingHorizontal:20,
        position:'absolute',
        bottom:0,
    },
    right:{
        position: 'absolute',
        paddingVertical:8,
        paddingHorizontal:20,
        bottom:8,
        right:0
    },
    rightText:{
        fontSize:12,
        color:'white',
        // fontWeight:'bold'
    }
})