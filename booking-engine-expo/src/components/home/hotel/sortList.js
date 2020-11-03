import React from 'react'

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native'
import Color from '@common/color';
import Ionicons from '@expo/vector-icons/Ionicons'

const defaultTitleList = ['Recommended', 'Rating', 'Name', 'Price', 'Customer Rating']

const Item=({title, selected, onPress, direction})=>(
    <TouchableOpacity onPress={()=>onPress()} style={styles.itemContainer}>
        <Text style={[styles.itemText,selected?{color:Color.orange}:{}]}>{title}</Text>
        <View style={styles.directionContainer}>
            <Ionicons name="md-arrow-dropup" size={10} color={direction==1&&selected?Color.orange:Color.lightText} style={{marginBottom:-5}}/>
            <Ionicons name="md-arrow-dropdown" size={10} color={direction==-1&&selected?Color.orange:Color.lightText}/>
        </View>
    </TouchableOpacity>
)

export default SortList = ({ selected, list, onPress }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Sort by:</Text>
        {list.map((item, index) => <Item
            title={item.name}
            key={index}
            selected={item.name == selected.name}
            onPress={()=>onPress(index)}
            direction={selected.order}/>
        )}
    </View>
)


const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title:{
        fontSize:14,
        color:'black',
        fontWeight:'bold',
        marginBottom:10
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:Color.border,
        borderBottomWidth: 0.5,
        height:40
    },
    itemText:{
        fontSize:13,
    },
    directionContainer:{
        marginLeft:10
    }
})