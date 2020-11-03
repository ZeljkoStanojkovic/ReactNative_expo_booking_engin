import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import HotelOverview from './hotelOverview'
import HotelReviews from './hotelReviews'
import HotelLocation from './hotelLocation'
import ImageHeader from '@hotel_detail/imageHeader'
import Color from '@common/color'
import { roomImage } from '@common/image';
import { Actions } from 'react-native-router-flux';
import RoundButton from '@components/general/roundButton'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hotelAction from '@store/hotel';
import moment from 'moment'
import UtilService from '@utils/utils';
import Global from "@utils/global";

const TabLabel=({route, title})=>(
    <Text style={[styles.tabLabel, {color:title==route.title?Color.primary:Color.text}]}>{route.title}</Text>
)

class HotelDetailC extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            images: [roomImage,roomImage,roomImage,roomImage,roomImage,roomImage ],
            index: 0,
            routes: [
                { key: 'first', title: 'OVERVIEW' },
                { key: 'second', title: 'LOCATION' },
                { key: 'third', title: 'REVIEWS' },
            ],
            price1: 109,
            price2: 120
        }

        this.loading = true
    }
    componentWillMount() {
        let locationInfo = Global.currentHotel.locationInfo?Global.currentHotel.locationInfo.fromLocation:null
        this.props.navigation.setParams({
            // onRight: this.done,
            // rightTitle: 'DONE',
            title: Global.currentHotel.name,
            description: locationInfo?`${locationInfo.city},${locationInfo.country}`:''
        });
        Actions.Loading({searchType:'hotel'})
    }

    componentWillReceiveProps(next) {
        let {status} = next.hotel

        if(status != hotelAction.LOADING && this.loading) {
            this.loading = false
            Actions.pop()
            return
        }
    }
    // done() {
    //     Actions.pop()
    // }
    render() {
        let { index, routes, price1, price2, } = this.state
        let {hotel, status} = this.props.hotel
        hotel = hotel||{}
        let items = hotel.items?hotel.items:[]
        let showImages = []

        if(hotel.images) {
            showImages = hotel.images.map(imageObj=>{
                return {
                        image:{uri:imageObj.url},
                        title:imageObj.title
                    }
            })
        }
        
        return (
            <View style={styles.container}>
                <ImageHeader
                    images={showImages}
                    minPrice={Global.currentHotel.displayAmount}
                    isAmountPerNight={Global.currentHotel.flags.isAmountPerNight}
                    hotelName={hotel.name}
                    rating={Global.currentHotel.rating}
                />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: () => <HotelOverview />,
                        second: () => <HotelLocation />,
                        third: () => <HotelReviews />,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    // initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            renderLabel={props=><TabLabel {...props} title={routes[index].title}/>}
                            style={styles.tabBar}
                            indicatorStyle={styles.indicator}
                        />
                    }
                />
                <View style={styles.bottomContainer}>
                    <View style={styles.leftContainer}>
                        {Global.currentHotel.strikeThroughAmount > 0 && <Text style={styles.price1}>{Global.currentHotel.displayOriginalAmount}</Text>}
                        <Text style={styles.price2}>{Global.currentHotel.displayAmount}</Text>
                        {Global.currentHotel.flags.isAmountPerNight&&<Text style={styles.smallText}>Nightly Average</Text>}
                    </View>
                    <View style={styles.rightContainer}>
                        <RoundButton
                            title='CHOOSE ROOM'
                            onPress={() => Actions.RoomList()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ hotel }) => ({ hotel });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...hotelAction }, dispatch)
});

export default HotelDetail = connect(mapStateToProps, mapDispatchToProps)(HotelDetailC);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabLabel:{
        fontSize:12,
    },
    tabBar:{
        backgroundColor:'white', 
        borderBottomWidth:0.5, 
        borderBottomColor:'#ccc', 
        height:50,
        justifyContent:'center'
    },
    indicator:{ 
        backgroundColor: Color.primary ,
        height:3
    },


    bottomContainer: {
        backgroundColor: Color.lightBack,
        borderTopColor: Color.border,
        borderTopWidth: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    leftContainer: {
        alignItems: 'flex-end',
        width: 120,
        marginRight: 10
    },
    rightContainer: {
        flex: 1,
    },
    price1: {
        fontSize: 10,
        textDecorationLine: 'line-through',
        color: Color.text,
    },
    price2: {
        color: Color.primary,
        fontSize: 20,
        fontWeight: 'bold'
    },
    smallText: {
        color: Color.text,
        fontSize: 9
    }
})