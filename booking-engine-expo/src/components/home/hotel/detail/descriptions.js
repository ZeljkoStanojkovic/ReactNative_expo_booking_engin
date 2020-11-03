import React, { PureComponent } from 'react'

import{
    View,
    Text,
    StyleSheet
} from 'react-native'

import Color from '@common/color'

export default class Descriptions extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showAll : false
        }
    }
    render() {
        let {descriptions} = this.props
        let {showAll} = this.state
        return (
            <View style={styles.container}>
                {descriptions.map((item, index)=>(
                    <View key={index} style={[styles.itemContainer, {borderTopWidth:index!=0?0.5:0}]}>
                        <Text style={styles.title} >{item.title.toUpperCase()}</Text>
                        <Text style={styles.desc} numberOfLines={showAll?0:3}>
                            {item.description.replace(/<[^>]+>/g, '')}
                        </Text>
                        <Text onPress={()=>this.setState({showAll:!showAll})} style={styles.link}>{showAll?'Show Less':'Read More'}</Text>
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