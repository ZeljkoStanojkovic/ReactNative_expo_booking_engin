import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'

import Color from '@common/color'
const {width:screenWidth} = Dimensions.get('window')
import { facilityIcon1 } from '@common/image'
export default ContactDetail = ({facilities }) => (
    <View style={styles.container}>
        <Text style={styles.title}>FACILITY</Text>
        <FlatList
            numColumns={4}
            style={styles.flatlist}
            data={facilities}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
                return (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity style={styles.iconContainer}>
                            <Image source={facilityIcon1} style={styles.icon}/>
                        </TouchableOpacity>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
                )
            }}
        />
    </View>
)

const styles = StyleSheet.create({
    container: {
        paddingVertical:15,
        borderBottomColor:Color.border,
        borderBottomWidth:0.5
    },
    title:{
        textAlign:'center',
        fontSize:14,
        color:Color.text,
        fontWeight:'bold'
    },
    flatlist:{
        
    },
    itemContainer:{
        width:screenWidth/4,
        alignItems:'center',
        marginTop:20
    },
    iconContainer:{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        backgroundColor:Color.lightBack,
        borderWidth:0.5,
        borderColor: Color.orange,
        
    },
    name:{
        fontSize:10,
        color:Color.orange,
        marginTop:5,
        fontWeight:'bold'
    },
    icon:{
        width:24,
        height:24,
        resizeMode:'contain'
    }
})