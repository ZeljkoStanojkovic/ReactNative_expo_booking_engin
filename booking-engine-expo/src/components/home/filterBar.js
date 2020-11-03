import React from 'react'

import{
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import Color from '@common/color';
import {filterIcon, sortIcon, mapIcon} from '@common/image'

const TabItem=({title, image, onPress, disabled})=>(
    <TouchableOpacity disabled={disabled} onPress={()=>onPress()} style={styles.tabItemContainer}>
        <Image source={image} style={styles.image}/>
        <Text style={styles.tabItemText}>{title}</Text>
    </TouchableOpacity>
)

export default FilterBar=({onPress, type, disabled})=>(
    <View style={styles.container}>
        <TabItem
            title="Sort"
            image={sortIcon}
            onPress={()=>onPress(0)}
            disabled={disabled}
        />
        <View style={styles.spacer}/>
        <TabItem
            title="Filter"
            image={filterIcon}
            onPress={()=>onPress(1)}
            disabled={disabled}
        />
        <View style={styles.spacer}/>
        <TabItem
            title={type=='LIST'?"Map":'List'}
            image={type=='LIST'?mapIcon:mapIcon}
            onPress={()=>onPress(2)}
            disabled={disabled}
        />
    </View>
)

const styles=StyleSheet.create({
    container:{
        height:50,
        flexDirection:'row',
        width:'100%',
        backgroundColor:Color.lightBack,
        paddingVertical:8,
        borderBottomWidth:0.5,
        borderBottomColor:Color.border
    },
    tabItemContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    tabItemText:{
        fontSize:12,
        color: Color.text,
        marginLeft:5
    },
    image:{
        width:12,
        height:12,
        resizeMode:'contain'
    },
    spacer:{
        height:'100%',
        width:1,
        backgroundColor:Color.border
    }
})