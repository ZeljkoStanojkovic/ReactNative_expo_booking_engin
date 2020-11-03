import React from 'react'

import{
    View,
    Text,
    StyleSheet
} from 'react-native'

import Color from '@common/color'
import Ionicons from '@expo/vector-icons/Ionicons';

const Item=({icon, value})=>{
    if(!value || value == '') return null
    return (
        <View style={styles.itemContainer}>
            <Ionicons name={icon} size={18} color={Color.primary} style={{width:20}}/>
            <Text style={styles.itemText}>{value}</Text>
        </View>
    )
}

export default ContactDetail=({name, description, phoneNumber, location, email, fax, instagram, twitter, facebook, web})=>(
    <View style={styles.container}>
        <Text style={styles.title}>DETAILS</Text>
        <View style={styles.content}>
            <View style={styles.leftContainer}>
                <Item icon="md-call" value={phoneNumber}/>
                {/* <View style={styles.horizontalDashLine}/> */}
                <Item icon="md-pin" value={location}/>
                <Item icon="md-mail" value={email}/>
                <Item icon="md-mail" value={fax}/>
                <Item icon="logo-instagram" value={instagram}/>
                <Item icon="logo-twitter" value={twitter}/>
                <Item icon="md-facebook" value={facebook}/>
                <Item icon="md-planet" value={web}/>
            </View>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container:{
        padding:15,
        backgroundColor:Color.lightPrimaryBack,
        borderBottomWidth:0.5,
        borderBottomColor:Color.border,
    },
    title:{
        textAlign:'center',
        fontSize:14,
        color:Color.text,
        fontWeight:'bold'
    },
    content:{
        flexDirection:'row',
        marginTop:15,
    },
    leftContainer:{
        flex:1,
    },
    rightContainer:{
        flex:1
    },
    verticalDashLine:{
        borderColor:Color.primary,
        borderWidth:0.5,
        borderStyle:'dashed',
        width:1,
        height:'100%'
    },
    horizontalDashLine:{
        borderColor:Color.primary,
        borderWidth:0.5,
        borderStyle:'dashed',
        width:'100%',
        height:1,
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        height:40,
        marginLeft:15,
    },
    itemText:{
        marginLeft:10,
        color:Color.lightPrimary,
        fontSize:10,
        flex:1,
    },
})