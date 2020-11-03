import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native'

import {MapView} from 'expo'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Color from '@common/color'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hotelAction from '@store/hotel';
import moment from 'moment'
import UtilService from '../../../utils/utils';
import Global from "@utils/global";

class HotelLocationC extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            address:Global.currentHotel.locationInfo.fromLocation.address,
            coordinate:{
                longitude: Global.currentHotel.locationInfo.fromLocation.longitude,
                latitude: Global.currentHotel.locationInfo.fromLocation.latitude,
            },
            roads:[
                {desc:'Lorem ipsume', dist: '20 m'},
                {desc:'Lorem ipsume', dist: '20 m'},
                {desc:'Lorem ipsume', dist: '20 m'},
                {desc:'Lorem ipsume', dist: '20 m'},
                {desc:'Lorem ipsume', dist: '20 m'},
            ]
        }
    }
    render(){
        let {coordinate, roads, address} = this.state
        return(
            <View style={styles.container}>
                <ScrollView>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            longitude:coordinate.longitude,
                            latitude:coordinate.latitude,
                            latitudeDelta:0.05,
                            longitudeDelta:0.03
                        }}
                    >
                        <MapView.Marker
                            coordinate={coordinate}
                        >
                            <FontAwesome name="map-marker" color={Color.orange} size={40}/>
                        </MapView.Marker>
                        <View pointerEvents='none' style={styles.markerDescContainer}>
                            <FontAwesome name="map-marker" size={16} color={Color.orange}/>
                            <Text style={styles.markerDescText}>{address}</Text>
                        </View>
                    </MapView>
                    <View style={styles.content}>
                        {roads.map((road, index)=>(
                            <TouchableOpacity style={styles.itemContainer} key={index} onPress={()=>alert('okay')}>
                                <View style={styles.iconContainer}>
                                    <FontAwesome name="map-marker" size={30} color={Color.middlePrimary}/>
                                    <Text style={styles.numberText}>{index+1}</Text>
                                </View>
                                <View style={styles.descContainer}>
                                    <Text style={styles.descText}>{road.desc}</Text>
                                    <Text style={styles.distText}>{road.dist}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({ hotel }) => ({ hotel });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...hotelAction }, dispatch)
});

export default HotelLocation = connect(mapStateToProps, mapDispatchToProps)(HotelLocationC);

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    map:{
        width:'100%',
        height:250,
    },
    content:{
        padding:15,
    },
    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#eee',
        height:50
    },
    iconContainer:{
        width:50,
        alignItems:'center',
        justifyContent:'center'
    },
    descContainer:{

    },
    descText:{
        fontSize:14, 
        color:Color.darkText,
        fontWeight:'bold'
    },
    distText:{
        fontSize:12,
        color:Color.text
    },
    numberText:{
        position:'absolute',
        left:18,
        top:5,
        color:'white',
        fontWeight:'bold',
        fontSize:10,
        backgroundColor:Color.middlePrimary,
        width:12,
        height:12,
        textAlign:'center'
    },
    markerDescContainer:{
        paddingLeft:20,
        paddingTop:10,
        flexDirection:'row',
        alignItems:'center'
    },
    markerDescText:{
        marginLeft:10,
        fontSize:10,
        color:Color.darkText
    }
})