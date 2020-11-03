import React, {PureComponent} from 'react'
import {
    ImageBackground,
    StyleSheet
} from 'react-native'

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

import Color from '@common/color'
import {carLoading, flightLoading, hotelLoading, activityLoading, transferLoading} from '@common/image'

export default class General extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            car:carLoading,
            flight:flightLoading,
            hotel:hotelLoading,
            activity:activityLoading,
            transfer:transferLoading
        }
    }
    render(){
        return(
            <ImageBackground 
                source={this.state[this.props.searchType]} 
                style={styles.background}
            >
                <BallIndicator 
                    color={Color.primary}
                    style={styles.indicator}
                />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        alignItems:'center',
        justifyContent: 'flex-end'
    },
    indicator:{
        
        marginTop: 400,
    }
})