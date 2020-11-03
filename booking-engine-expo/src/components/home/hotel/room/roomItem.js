import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'

import Color from '@common/color'
import { facilityIcon1 } from '@common/image';
import Ionicons from '@expo/vector-icons/Ionicons';

const Facility = ({ icon, desc }) => (
    <View style={styles.facilityContainer}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.desc}>{desc}</Text>
    </View>
)

const OptionItem = ({ title, optionDesc, price, desc, facilities, isRefundable, info, isChecked, onPress }) => (
    <View style={styles.optionContainer}>
        <View style={styles.firstContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.optionDesc}>{optionDesc}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.night}>Per Night</Text>
            </View>
            <TouchableOpacity onPress={() => onPress()} style={styles.buttonContainer}>
                <Ionicons name="ios-checkmark-circle" size={30} color={isChecked ? Color.orange : Color.lightText} />
            </TouchableOpacity>
        </View>
        {facilities.map((item, index) => <Facility {...item} key={index} />)}
        <Text style={[styles.desc, { marginLeft: 0, marginTop: 10 }]}>{desc}</Text>
        {!isRefundable && <Text style={styles.warn}>Non Refundable</Text>}
        <Text style={styles.info}>{info}</Text>
    </View>
)

export default class RoomItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        let { image, title, option1, option2, onPress } = this.props
        return (
            <View style={styles.container}>
                <Image source={image} style={styles.image} />
                <View style={styles.headerContainer}>
                    <View style={styles.flexRow}>
                        <Text style={styles.title1}>{title}</Text>
                        <TouchableOpacity onPress={()=>onPress(0)}>
                            <Ionicons name="ios-information-circle" size={20} color={Color.lightText}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flexRow}>
                        <Image source={facilityIcon1} style={styles.icon} />
                        <Text style={styles.desc}>1 KING BED</Text>
                    </View>
                </View>
                <OptionItem
                    {...option1}
                    onPress={() => onPress(1)}
                />
                <OptionItem
                    {...option2}
                    onPress={() => onPress(2)}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: '100%',
        height: 180,
    },
    headerContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
        width:'100%',
    },
    title1: {
        fontSize: 16,
        color: Color.text,
        fontWeight: 'bold',
        flex:1,
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: 'contain'
    },
    desc: {
        fontSize: 14,
        color: Color.lightText,
        marginLeft: 10
    },
    optionContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        marginBottom: 10
    },
    info: {
        fontSize: 10,
        color: Color.orange,
        fontWeight: 'bold',
        marginTop: 10
    },
    warn: {
        color: 'red',
        fontSize: 10,
        marginTop: 10
    },
    firstContainer: {
        flexDirection: 'row',
        marginBottom:10
    },
    titleContainer: {
        flex: 1
    },
    priceContainer: {
        marginRight: 10
    },
    buttonContainer: {
        paddingHorizontal: 5
    },
    title: {
        fontSize: 14,
        color: Color.orange,
        fontWeight: 'bold'
    },
    optionDesc: {
        fontSize: 12,
        color: Color.darkText,
        marginTop: 5
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.middlePrimary
    },
    night: {
        fontSize: 10,
        color: Color.lightText,
        marginTop: 5
    },
    facilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        width:'100%',
    }
})