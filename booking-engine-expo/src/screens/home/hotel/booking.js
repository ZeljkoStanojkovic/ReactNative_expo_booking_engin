import React, { PureComponent } from 'react'

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import RoundButton from '@components/general/roundButton'
import Color from '@common/color'
import BookingInput from '@hotel_room/bookingInput'
import BookingCard from '@hotel_room/bookingCard'

const LoginTypes = {
    loggedIn: 'LOGGED_IN',
    guest: 'GUEST',
    none: 'NONE'
}


export default class Booking extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            cards: [
                { title: 'Paradiso Hotel', location: 'lorem lpsum Street, Dolor sit amet 455\nBangkok, Thailand', roomInfo: '1 Room | 2 people', durationInfo: '12 Aug - 14 Aug ( 2 Nights)', price: 43.6, duration: 2 },
                { title: 'Shiration Bangkok Hotel', location: 'lorem lpsum Street, Dolor sit amet 455\nBangkok, Thailand', roomInfo: '1 Room | 2 people', durationInfo: '12 Aug - 14 Aug ( 2 Nights)', price: 43.6, duration: 2 },
            ],
            loginType: LoginTypes.none
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            onRight: this.done.bind(this),
            rightTitle: 'DONE',
            title: 'Details'
        });
    }

    done() {
        Actions.pop()
    }

    render() {
        let { cards, requires } = this.state
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.padding}>
                        {cards.map((card, index) => (
                            <BookingCard
                                key={index}
                                {...card}
                                onRemove={() => alert('remove')}
                                onPolicy={() => alert('policy')}
                                onSpecial={() => alert('special')}
                            />
                        ))}
                    </View>
                    {requires.map((require, index)=>(
                        <BookingInput
                            key={index}
                            {...require}
                            onChange={require=>{
                                this.state.requires[index] = require
                                this.setState({requires:[...this.state.requires]})
                            }}
                        />
                    ))}
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <RoundButton
                            title={'LOGIN &\nCONTINUE'}
                            onPress={() => alert('login')}
                            textStyle={styles.buttonText}
                        />
                    </View>
                    <View style={styles.ORContainer}>
                        <Text style={styles.ORText}>OR</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <RoundButton
                            title={'CONTINUE\nAS GUEST'}
                            onPress={() => alert('guest')}
                            style={{ backgroundColor: Color.primary }}
                            textStyle={styles.buttonText}
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
        backgroundColor:'white'
    },
    bottomContainer: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    ORContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc'
    },
    ORText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 10
    },
    padding:{
        padding:15,
    }
})