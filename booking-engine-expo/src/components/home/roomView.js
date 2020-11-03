import React, {PureComponent} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    View
} from 'react-native'
import Color from '@common/color'

export default class RoomView extends PureComponent{
    constructor(props){
        super(props)
        this.state={
        }
    }
    render(){
        let {onPress, rooms, adults, kids } = this.props
        return(
            <TouchableOpacity onPress={()=>onPress()} style={styles.container}>
                <Text style={styles.number}>
                    {rooms||1}<Text style={styles.text}> Room </Text>
                    {adults||1}<Text style={styles.text}> Adults </Text>
                    {kids||0}<Text style={styles.text}> Children</Text>
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:'white',
        marginTop:5,
        height:44,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    number:{
        color:Color.orange,
        fontSize:16,
    },
    text:{
        color:Color.lightText,
        fontSize:14
    }
})