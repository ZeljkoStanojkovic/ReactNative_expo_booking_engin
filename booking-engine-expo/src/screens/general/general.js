import React, {PureComponent} from 'react'
import {
    ImageBackground,
    StyleSheet
} from 'react-native'

import {offline, maintenance} from '@common/image'
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";

class General extends PureComponent{

    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps){
        if ( nextProps.hasInternetConnection ){
            Actions.pop()
        }
    }
    render(){
        return(
            <ImageBackground 
                style={styles.background}
                source={
                    this.props.screenType=='offline'?offline:maintenance
                }/>
        )
    }
}

export default connect(
    state => ({
      hasInternetConnection: state.common.internetConnection,
    }),
    dispatch => ({})
)(General);

const styles = StyleSheet.create({
    background:{
        flex:1,
        alignItems:'center',
        justifyContent: 'flex-end'
    }
})