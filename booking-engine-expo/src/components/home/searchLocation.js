import React, {PureComponent} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    Image
} from 'react-native'
import Color from '@common/color'
import Ionicons from '@expo/vector-icons/Ionicons';
import { navigationIcon } from '@common/image';

export default class SearchLocation extends PureComponent{
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        let {onPress, location} = this.props
        return(
            <TouchableOpacity onPress={()=>onPress()} style={styles.container}>
                <Ionicons name="ios-search" size={28} color={Color.lightText}/>
                <Text numberOfLines={1} style={styles.locationText}>{location?location:'Location'}</Text>
                <Image source={navigationIcon} style={styles.rightIcon}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:44,
        backgroundColor:'white',
        flexDirection:'row',
        marginTop:5,
        alignItems:'center',
        paddingHorizontal:10,
    },
    locationText:{
        color:Color.lightText,
        fontSize:14,
        marginLeft:10,
        flex:1,
        marginRight:10,
    },
    rightIcon:{
        width:16,
        height:16,
        resizeMode:'contain'
    }
})