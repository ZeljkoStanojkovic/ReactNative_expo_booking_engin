import React, { PureComponent } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { roomImage, facilityIcon1 } from '@common/image'
import Color from '@common/color'
import GroupTitle from '@components/home/groupTitle'
import RoundButton from '@components/general/roundButton'

export default class RoomDetail extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            title: 'Bunk Bed Family Room',
            nights:1,
            rooms:1,
            remain: 5,
            price: 43.6,
            facilities:[
                {image:facilityIcon1, name: 'Lunch'},
                {image:facilityIcon1, name: 'TV'},
                {image:facilityIcon1, name: 'Shower'},
                {image:facilityIcon1, name: 'Extra Bed'},
            ],
            secondaryFailities:[
                {desc:'lsoife fis illif sifd feee'},
                {desc:'lsoife fis illif sifd feee'},
                {desc:'lsoife fis illif sifd feee'},
            ]
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            onRight: this.done.bind(this),
            rightTitle: 'DONE',
            title: 'Paradiso Hotel',
            description: 'Bangkok, Thailand'
        });
    }

    done() {
        Actions.pop()
    }

    render() {
        let { title, nights, rooms, remain, price, facilities, secondaryFailities } = this.state
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image source={roomImage} style={styles.image} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceDesc}>TOTAL PRICE {nights}NIGHT, {rooms}ROOM</Text>
                        <View style={styles.priceValueContainer}>
                            <Text style={styles.rooms}>Our last {remain} rooms</Text>
                            <Text style={styles.price}>USD {price}</Text>
                        </View>
                    </View>
                    <GroupTitle title="Main Facility" />
                    <View style={styles.facilityContainer}>
                        {facilities.map((item, index) => (
                            <View key={index} style={styles.facilityIconContainer}>
                                <Image source={item.image} style={styles.facilityIcon} />
                                <Text style={styles.facilityName}>{item.name}</Text>
                            </View>
                        ))}
                    </View>
                    <GroupTitle title="Secondary Facility" />
                    <View style={styles.secondaryContainer}>
                        {secondaryFailities.map((item, index) => (
                            <View key={index} style={styles.secondaryItemContainer}>
                                <View style={styles.dot} />
                                <Text style={styles.itemDesc}>{item.desc}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <RoundButton
                        title="ADD TO CARD"
                        onPress={()=>Actions.Booking()}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        height: 180,
        width: '100%',
        resizeMode: 'cover'
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc'
    },
    title: {
        fontSize: 16,
        color: Color.text,
        fontWeight: 'bold'
    },
    priceContainer: {
        height: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc'
    },
    priceDesc: {
        fontSize: 10,
        color: Color.lightText,
        flex: 1
    },
    priceValueContainer: {
        alignItems: 'flex-end',
    },
    rooms: {
        fontSize: 9,
        color: Color.orange
    },
    price: {
        color: Color.middlePrimary,
        fontWeight: 'bold',
        fontSize: 20
    },
    bottomContainer:{
        height:80,
        backgroundColor:Color.lightBack,
        justifyContent:'center',
        paddingHorizontal:20,
    },
    facilityContainer:{
        paddingVertical: 20,
        width:'100%',
        flexDirection:'row'
    },
    facilityIconContainer:{
        flex:1,
        alignItems:'center'
    },
    facilityIcon:{
        width:24,
        height:24,
        resizeMode:'contain'
    },
    facilityName:{
        marginTop:8,
        color: Color.primary,
        fontSize:10,
        fontWeight:'bold'
    },
    secondaryContainer:{
        paddingHorizontal:20,
        paddingVertical:10
    },
    secondaryItemContainer:{
        flexDirection:'row',
        marginVertical:5
    },
    dot:{
        width:6,
        height:6,
        borderRadius:3,
        backgroundColor:'#ccc',
        marginTop:5
    },
    itemDesc:{
        color:Color.text,
        fontSize:12,
        marginLeft:10
    }
})