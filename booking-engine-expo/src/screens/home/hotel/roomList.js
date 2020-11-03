import React, { PureComponent } from 'react'

import {
    View,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native'


import InfoBar from '@hotel_room/infoBar'
import RoomItem from '@hotel_room/roomItem'
import RoundButton from '@components/general/roundButton'
import Color from '@common/color'
import { Actions } from 'react-native-router-flux'
import { roomImage, facilityIcon1 } from '@common/image'

export default class RoomList extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            rooms: [
                {
                    image: roomImage, title: 'Bunk Bed Family Room',
                    option1: {
                        title: 'Option1',
                        optionDesc: 'Room With Breakfast',
                        price: 'USD 43.6',
                        desc: 'Occupancy : 4 Adults, 2 Children',
                        facilities: [
                            { icon: facilityIcon1, desc: 'Breakfast' },
                            { icon: facilityIcon1, desc: 'Wifi For 4 Devices' },
                        ],
                        isRefundable: false,
                        info: 'Get 20% Off If Book Within 24 Hours',
                        isChecked:true
                    },
                    option2: {
                        title: 'Option2',
                        optionDesc: 'Room With Breakfast',
                        price: 'USD 43.6',
                        desc: 'Occupancy : 4 Adults, 2 Children',
                        facilities: [
                            { icon: facilityIcon1, desc: 'Breakfast' },
                            { icon: facilityIcon1, desc: 'Wifi For 4 Devices' },
                        ],
                        isRefundable: false,
                        info: 'Get 20% Off If Book Within 24 Hours',
                        isChecked: false
                    },
                },
                {
                    image: roomImage, title: 'Bunk Bed Family Room',
                    option1: {
                        title: 'Option1',
                        optionDesc: 'Room With Breakfast',
                        price: 'USD 43.6',
                        desc: 'Occupancy : 4 Adults, 2 Children',
                        facilities: [
                            { icon: facilityIcon1, desc: 'Breakfast' },
                            { icon: facilityIcon1, desc: 'Wifi For 4 Devices' },
                        ],
                        isRefundable: false,
                        info: 'Get 20% Off If Book Within 24 Hours',
                        isChecked:true
                    },
                    option2: {
                        title: 'Option2',
                        optionDesc: 'Room With Breakfast',
                        price: 'USD 43.6',
                        desc: 'Occupancy : 4 Adults, 2 Children',
                        facilities: [
                            { icon: facilityIcon1, desc: 'Breakfast' },
                            { icon: facilityIcon1, desc: 'Wifi For 4 Devices' },
                        ],
                        isRefundable: false,
                        info: 'Get 20% Off If Book Within 24 Hours',
                        isChecked:false
                    },
                },
            ],
            totalPrice: 130.8,
            totalRoomCount: 3
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            onRight: this.done,
            rightTitle: 'DONE',
            title: 'Paradiso Hotel',
            description: 'Bangkok, Thailand'
        });
    }
    done() {
        Actions.pop()
    }

    onChangeRoomCount(room, count) {
        room.requested = count
        this.setState({ rooms: [...this.state.rooms] })
    }

    render() {
        let { rooms, totalRoomCount, totalPrice } = this.state
        return (
            <View style={styles.container}>
                <InfoBar
                    checkIn={new Date()}
                    duration={3}
                    rooms={0}
                />
                <ScrollView>
                    <View style={styles.content}>
                        {rooms.map((room, index) => <RoomItem
                            key={index}
                            {...room}
                            onPress={(num) => num==0&&Actions.RoomDetail()}
                        />)}
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.totalPrice}>$ {totalPrice}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <RoundButton
                            title={'Book'}
                            onPress={() => Actions.Booking()}
                        />
                    </View>
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
    bottomContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: Color.lightBack
    },
    leftContainer: {
        width: 120,
        marginRight: 15
    },
    rightContainer: {
        flex: 1
    },
    totalPrice: {
        fontSize: 14,
        color: Color.lightPrimary,
        fontWeight: 'bold'
    },
    roomCount: {
        fontSize: 14,
        color: Color.primary,
        fontWeight: 'bold'
    },
    content: {
        padding: 15
    }
})