import React from 'react'

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image
} from 'react-native'
import Color from '@common/color';
import Ionicons from '@expo/vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

export default HotelItem = ({ image, title, rating, location, before, current, desc, onPress }) => (
    <TouchableOpacity onPress={() => onPress()} style={styles.itemContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.centerItemContainer}>
            <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
            <StarRating
                disabled={true}
                maxStars={5}
                rating={rating}
                starSize={10}
                containerStyle={{ width: 50, marginTop: 5 }}
                fullStarColor={Color.orange}
            />
            <View style={styles.flexRow}>
                <View style={styles.scoreContainer} >
                    <Text style={styles.scoreText}>{rating}</Text>
                </View>
                <Text style={styles.markText}>{rating > 8 ? 'Excellent' : (rating > 6 ? 'Good' : 'Normal')}</Text>
            </View>
            <View style={styles.locationContainer} >
                <Ionicons name="ios-pin" size={12} color={Color.lightText} />
                <Text style={styles.locationText}>{location}</Text>
            </View>
            <View style={styles.rightItemContainer}>
                <View style={styles.rowLayout}>
                    {before!=0&&<Text style={styles.beforeTextPrefix} >
                        Was
                    </Text>}
                    {before!=0&&<Text style={styles.beforeText} >
                        {before}
                    </Text>}
                    <Text style={styles.current}> {current}</Text>
                </View>
                <Text style={styles.descText} >{desc}</Text>
            </View>
        </View>

    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Color.comment,
        paddingVertical: 10,
    },
    image: {
        width: 80,
        height: 100,
        resizeMode: 'cover'
    },
    centerItemContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    titleText: {
        fontSize: 14,
        color: Color.primary
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    scoreContainer: {
        padding: 2,
        borderRadius: 2,
        backgroundColor: Color.lightPrimary
    },
    scoreText: {
        fontSize: 10,
        color: 'white'
    },
    markText: {
        marginLeft: 8,
        color: Color.lightPrimary,
        fontSize: 12
    },
    locationContainer: {
        flexDirection: 'row',
        marginTop: 2
    },
    rowLayout: {
        flexDirection: 'row',
    },
    locationText: {
        color: Color.lightText,
        fontSize: 10,
        marginLeft: 5
    },
    rightItemContainer: {
        width:'100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    beforeTextPrefix: {
        paddingTop:2,
        fontSize: 10,
        color: Color.lightText,
        fontWeight: 'bold',
        paddingRight:4,
    },
    beforeText: {
        paddingTop:2,
        fontSize: 10,
        color: Color.lightText,
        textDecorationLine: 'line-through',
        fontWeight: 'bold'
    },
    current: {
        fontSize: 12,
        color: Color.orange,
        fontWeight: 'bold'
    },
    descText: {
        color: Color.primary,
        fontSize: 10,
    }
})