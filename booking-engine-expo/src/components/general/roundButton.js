import React, {PureComponent} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator
} from 'react-native'
import Color from '@common/color'

export default class RoundButton extends PureComponent{
    render(){
        let {style, title, onPress, isLoading, disabled, disabledUI, textStyle} = this.props
        return(
            <TouchableOpacity disabled={disabled} style={[styles.container,style, disabledUI?styles.disabled:{}]} onPress={onPress}>
                {isLoading&&<ActivityIndicator color='white' style={styles.spinner}/>}
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:44,
        borderRadius:22,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Color.orange,
        flexDirection:'row'
    },
    buttonText:{
        fontSize:13,
        color:'white',
        // fontWeight:'bold'
    },
    spinner:{
        marginRight:10,
    },
    disabled:{
        backgroundColor:'grey'
    }
})