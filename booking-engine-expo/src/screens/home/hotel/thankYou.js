import React, {PureComponent} from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class Booking extends PureComponent {

    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.navigation.setParams({
            onRight: this.done.bind(this),
            rightTitle: 'DONE',
            title: 'Thank You'
        });
    }

    done(){
        Actions.pop()
    }

    render(){
        return(
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})