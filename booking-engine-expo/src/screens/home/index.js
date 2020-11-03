import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet,
    ImageBackground,
    Image,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native'

import Color from '@common/color'
import {logo, homeBack, mapPin} from '@common/image'
import ScrollTabView from '@components/home/scrollTabView'
import Hotel from '@screens/home/hotel'
import Flights from '@screens/home/flights'
import Activities from '@screens/home/activities'
import Buses from '@screens/home/buses'
import Curies from '@screens/home/curies'
import Cars from '@screens/home/cars'

export default class  Home extends PureComponent{

    constructor(props){
        super(props)
        this.state={
            titles:['HOTELS', 'FLIGHTS', 'BUSES', 'ACTIVITIES', 'CURIES', 'CARS'],
            selected:0,
            
        }
    }
    changeTab(item, index){
        this.setState({selected:index})
    }

    renderSubview(){
        let {selected, titles} = this.state
        switch (titles[selected]){
            case 'HOTELS':
                return <Hotel/>
            case 'FLIGHTS':
                return <Flights/>
            case 'BUSES':
                return <Buses/>
            case 'ACTIVITIES':
                return <Activities/>
            case 'CURIES':
                return <Curies/>
            case 'CARS':
                return <Cars/>
        }
    }
    render(){
        let {titles, selected, deals, items} = this.state
        
        return(
            <ImageBackground source={homeBack} style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}/>
                </View>
                <ScrollView>
                    <View style={styles.content}>
                        <ScrollTabView
                            titles={titles}
                            selected={selected}
                            onPress={(item, index)=>this.changeTab(item, index)}
                        />
                    </View>
                    {this.renderSubview()}
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    logoContainer:{
        backgroundColor:'white',
        height:100,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        paddingTop:20,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'#ccc'
    },
    logo:{
        height:50,
        resizeMode:'contain'
    },
    content:{
        paddingHorizontal:15,
        marginTop:15,
    },
})