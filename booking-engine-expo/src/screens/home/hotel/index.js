import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image
} from 'react-native'

import SearchLocation from '@components/home/searchLocation'
import DateView from '@components/home/dateView'
import RoomView from '@components/home/roomView'
import RecentSearchs from '@components/home/recentSearchs'
import HotDeals from '@components/home/hotDeals'
import Ionicons from '@expo/vector-icons/Ionicons';
import Color from '@common/color'
import {mapPin} from '@common/image'
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hotelAction from '@store/hotel';
import moment from 'moment'
import UtilService from '../../../utils/utils';
import Global from "@utils/global";

class HotelC extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            deals:[
                {}, {}, {}, {}
            ],
            items:[
                {},{},{},{}
            ],
            location:''
        }

        this.props.actions.recentSearch()
    }

    searchHotel(){
        let {selectedLocation, fromDate, toDate, rooms} = this.props.hotel
        if(!selectedLocation) {
            alert('Please select a location first')
            return
        }
        let searchRequest = {
            "request": {
                "criteriaInfo":[{
                    "locationInfo": {fromLocation: selectedLocation},
                    "DateInfo": {
                        "StartDate": moment(fromDate).format('YYYY-MM-DDTHH:mm:ss'),
                        "EndDate": moment(toDate).format('YYYY-MM-DDTHH:mm:ss')
                    }
                }],
                "paxInfo":UtilService.makePaxInfo(rooms),
                "status": "Available",
                "code": null,
                "business": "hotel"
            },
            "flags": {}
        }

        //console.log('searchRequest', searchRequest)
        var nights = moment(toDate).diff(moment(fromDate), 'days')
        Global.searchLocation = selectedLocation.name
        Global.searchDetail = moment(fromDate).format('D MMM YYYY') + `, ${nights} Night` + (nights>1?'s':'')

        this.props.actions.searchHotel(searchRequest).then(({error, result, token})=>{
            if(error) {
                console.log('searchHotel error', error)
                //alert('Failed to search') 
                return
            }
            Global.searchToken = token
        })
        Actions.HotelList()
    }
    render() {
        let {deals, items, location} = this.state
        let {selectedLocation, fromDate, toDate, rooms, recentSearches} = this.props.hotel
        let adults = 0, infants = 0, children = 0
        rooms.map((room)=>{
            adults += room.adults
            children += room.children.length
            infants += room.infants
        })

        let hotelRecentSearches = (recentSearches||[]).filter((o)=>o.info.business=='hotel')
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <SearchLocation 
                        location={selectedLocation?selectedLocation.name:''}
                        onPress={()=>Actions.SelectLocation()}
                    />
                    <DateView
                        fromDate={fromDate}
                        toDate={toDate}
                        onPress={()=>Actions.SelectDate()}
                    />
                    <RoomView 
                        rooms={rooms.length}
                        adults={adults}
                        kids={children}
                        onPress={()=>Actions.SelectRoom()}
                    />
                    <View style={styles.searchContainer}>
                        <TouchableOpacity onPress={this.searchHotel.bind(this)} style={styles.searchButton}>
                            <Text style={styles.searchButtonText}>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mapButton}>
                            <Image source={mapPin} style={styles.mapPin} />
                        </TouchableOpacity>
                    </View>
                </View>
                <RecentSearchs items={hotelRecentSearches} />
                <HotDeals deals={deals} />
            </View>
        )
    }
}
const mapStateToProps = ({ hotel }) => ({ hotel });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...hotelAction }, dispatch)
});

export default Hotel = connect(mapStateToProps, mapDispatchToProps)(HotelC);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content:{
        paddingHorizontal:15,
    },
    searchContainer:{
        flexDirection:'row',
        marginTop:5,
    },
    searchButton:{
        flex:1,
        height:44,
        backgroundColor:Color.primary,
        alignItems:'center',
        justifyContent:'center',
        marginRight:5,
    },
    searchButtonText:{
        fontSize:16,
        color:'white'
    },
    mapButton:{
        width:44,
        height:44,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    mapPin:{
        width:30,
        height:30,
        resizeMode:'contain'
    }
})