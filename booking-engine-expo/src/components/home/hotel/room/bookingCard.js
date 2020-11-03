import React from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'

import Color from '@common/color'
import Ionicons from '@expo/vector-icons/Ionicons';
import { chatIcon, removeIcon, infoIcon } from '@common/image'

const ActionText = ({ image, text, onPress }) => (
    <TouchableOpacity onPress={() => onPress()} style={styles.actionTextContainer}>
        <Image source={image} style={styles.icon} />
        <Text style={styles.actionText}>{text}</Text>
    </TouchableOpacity>
)

export default BookingCard = ({ title, roomInfo, duration, durationInfo, price, location, onPolicy, onRemove, onSpecial }) => (
    <View style={styles.cardContainer}>
        <View style={styles.cardHeaderContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.cardBottomContainer}>
                <ActionText
                    image={chatIcon}
                    text='Special Request'
                    onPress={() => onSpecial()}
                />
                <ActionText
                    image={removeIcon}
                    text='Remove'
                    onPress={() => onRemove()}
                />
            </View>
        </View>
        <View style={styles.content}>
            <View style={styles.locationContainer}>
                <Ionicons name="ios-pin" size={16} color={Color.orange} />
                <Text style={styles.location}>{location}</Text>
            </View>
            <Text style={styles.roomInfo}>{roomInfo}</Text>
            <Text style={styles.durationInfo}>{durationInfo}</Text>
            <View style={styles.cardContentBottom}>
                <ActionText
                    image={infoIcon}
                    text='Booking Policies'
                    onPress={() => onPolicy()}
                />

                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>USD {price}</Text>
                    <Text style={styles.smallText}>For {duration} Nights</Text>
                </View>
            </View>
        </View>
    </View>
)


const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderColor: Color.lightText,
        borderRadius: 4,
        overflow: 'hidden',
        marginTop:10,
    },
    cardHeaderContainer: {
        borderBottomColor: Color.lightText,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 8,
        backgroundColor: Color.lightBack
    },
    cardTitle: {
        fontSize: 20,
        color: Color.darkText,
        fontWeight: 'bold'
    },
    cardBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop:8
    },
    content: {
        padding: 8,
    },
    actionTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginHorizontal: 8
    },
    actionText: {
        color: Color.orange,
        fontSize: 12,
    },
    content: {
        padding: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems:'center'
    },
    cardContentBottom: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent:'space-between'
    },
    priceContainer: {
        alignItems: 'flex-end',
        marginTop: 10
    },
    location: {
        marginLeft: 8,
        fontSize: 12,
        color: Color.text
    },
    durationInfo: {
        fontSize: 16,
        color: Color.primary,
        fontWeight: 'bold',
        marginTop: 10
    },
    roomInfo: {
        fontSize: 14,
        color: Color.darkText,
        fontWeight: 'bold',
        marginTop: 10
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.middlePrimary
    },
    smallText: {
        fontSize: 12,
        color: Color.lightText
    },
})