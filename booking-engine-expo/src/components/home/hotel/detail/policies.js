import React, { PureComponent } from 'react'

import{
    View,
    Text,
    StyleSheet
} from 'react-native'

import Color from '@common/color'

export default class Polices extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        let {policies} = this.props
        return (
            <View style={styles.container}>
                {policies.map((item, index)=>(
                    <View key={index} style={[styles.itemContainer, {borderTopWidth:index!=0?0.5:0}]}>
                        <Text style={styles.title}>{item.title}</Text>
                        {
                            item.descriptions.map((desc)=>(
                                <Text style={styles.desc}>
                                    {item.description}
                                </Text>
                            ))
                        }
                    </View>
                ))}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:15
    },
    itemContainer:{
        paddingVertical:20,
        borderTopColor:Color.border
    }, 
    title:{
        fontSize:13,
        color:Color.darkText,
        fontWeight:'bold'
    },
    desc:{
        fontSize:12,
        color:Color.text,
        marginTop:10,
    },
    link:{
        fontSize:13,
        color:Color.primary,
        marginTop:10
    }
})