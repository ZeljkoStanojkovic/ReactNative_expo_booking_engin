import React, { PureComponent } from "react";

import { KeyboardAvoidingView, NetInfo, StyleSheet, StatusBar } from "react-native";
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';
import { Asset, AppLoading, DangerZone } from 'expo';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { connect } from "react-redux";
import * as commonActions from '@store/common/actions'
import * as authActions from '@store/auth/actions'
import { bindActionCreators } from "redux";
import Global from '@utils/global'
import Color from "@common/color";

import api from "@services"
import async from 'async'

import TabBarIcon from '@components/general/tabBarIcon'
import NavBar from '@components/general/navBar'
import MyToast from '@components/general/myToast'

// General
import General from '@screens/general/general'
import Loading from '@screens/general/loading'
import ImageList from '@screens/general/imageList'

// *********** Home ************
import Home from '@screens/home'
import SelectLocation from '@screens/home/selectLocation'
import SelectDate from '@screens/home/selectDate'
//-hotel
import SelectRoom from '@screens/home/hotel/selectRoom'
import HotelList from '@screens/home/hotel/searchResult'
import HotelDetail from '@screens/home/hotel/hotelDetail'
import HotelFilter from '@screens/home/hotel/hotelFilter'
import RoomList from '@screens/home/hotel/roomList'
import RoomDetail from '@screens/home/hotel/roomDetail'
import ThankYou from '@screens/home/hotel/thankYou'
import Booking from '@screens/home/hotel/booking'

// *********** Package ************
import Packages from '@screens/packages'

// *********** Hot Deals ************
import HotDeal from '@screens/hotDeal'

// *********** My Cart ************
import MyCart from '@screens/myCart'

// *********** Profile ************
import Profile from '@screens/profile'
import Login from '@screens/auth/login'
import Register from '@screens/auth/register'
import ForgotPassword from '@screens/auth/forgotPassword'
import VerifyNumber from '@screens/auth/verifyNumber'
import ChangePassword from '@screens/auth/changePassword'

const transitionConfig = () => ({
    screenInterpolator:
        StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            setting: {}
        };

        this._cacheResourcesAsync.bind(this)
        console.disableYellowBox = true;
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            "connectionChange",
            hasInternetConnection => {
                this.props.commonActions.setInternetConnection(hasInternetConnection)
                if (!hasInternetConnection) {
                    Actions.Offline()
                }
            }
        );

    }
    componentWillReceiveProps(next) {
        // if ( next.types==actionTypes.LOGOUT ){
        //     this.refs.toast.show('You have been logged out!');
        // }
    }
    _cacheResourcesAsync = async () => {
        const images = [
            require('@images/background.png'),
            require('@images/offline.jpeg'),
            require('@images/maintenance.png'),
            require('@images/transfer-loading.png'),
            require('@images/hotel-loading.png'),
            require('@images/activity-loading.png'),
            require('@images/car-loading.png'),
            require('@images/flight-loading.png'),
            require('@images/logo.png'),
            require('@images/home_back.png'),
            require('@images/map-pin.png'),
            require('@images/placeholder.jpg'),
            require('@images/tabIcons/home_grey.png'),
            require('@images/tabIcons/home_primary.png'),
            require('@images/tabIcons/package_grey.png'),
            require('@images/tabIcons/package_primary.png'),
            require('@images/tabIcons/hotdeal_grey.png'),
            require('@images/tabIcons/hotdeal_primary.png'),
            require('@images/tabIcons/mycart_grey.png'),
            require('@images/tabIcons/mycart_primary.png'),
            require('@images/tabIcons/profile_grey.png'),
            require('@images/tabIcons/profile_primary.png'),
            require('@images/icons/sortIcon.png'),
            require('@images/icons/filterIcon.png'),
            require('@images/icons/mapIcon.png'),
            require('@images/placeholder.jpg'),
            require('@images/location.png'),
            require('@images/hotel1.png'),
            require('@images/icons/message_black.png'),
            require('@images/icons/message_white.png'),
            require('@images/icons/message_green.png'),
            require('@images/icons/mobile_black.png'),
            require('@images/icons/mobile_white.png'),
            require('@images/icons/mobile_green.png'),
            require('@images/icons/locked.png'),
            require('@images/icons/ios7-close-empty.png'),
        ];

        const promises = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });

        promises.push(new Promise((resolve, reject) => {
            api.auth.init((err) => {
                if (err) {
                    return reject(err)
                }
                async.parallel([
                    (cb) => {
                        api.auth.getApplicationEnvironment((err, ret) => {
                            if (err) {
                                return cb(err)
                            }
                            this.setState({
                                setting: ret
                            })
                            cb(err)
                        })
                    },
                    (cb) => {
                        api.user.getUserDetail((err, user) => {
                            if (!err) {
                                this.props.authActions.setAuthUser(user)
                            }
                            cb(null)
                        })
                    }
                ], (err) => {
                    if (err) {
                        return reject()
                    }
                    resolve()
                })
            })
        }))

        return Promise.all(promises)

    }

    render() {
        let { isReady, setting } = this.state

        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }

        //temporary setting until this flag sets
        setting.isLoginRequired = true

        const scenes = Actions.create(
            <Overlay key="overlay">
                <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
                    <Lightbox key="lightbox">
                        <Stack key="root" hideNavBar>
                            <Scene hideNavBar>
                                <Tabs
                                    key="TabBar"
                                    backToInitial
                                    onTabOnPress={() => {
                                    }}
                                    swipeEnabled
                                    tabBarStyle={styles.tabBarStyle}
                                    activeBackgroundColor="white"
                                    inactiveTintColor={Color.lightText}
                                    activeTintColor={Color.primary}
                                    inactiveBackgroundColor="white">

                                    <Scene key="Home" tabBarLabel="Home" 
                                        icon={(props) => <TabBarIcon name="ios-home" {...props} />} navBar={NavBar}>

                                        <Scene key="Home" component={Home} title="Home" hideNavBar onEnter={() => StatusBar.setBarStyle('dark-content')} onExit={() => StatusBar.setBarStyle('light-content')} />
                                        <Scene key="SelectLocation" component={SelectLocation} title="Select Destination" hideTabBar />
                                        <Scene key="SelectDate" component={SelectDate} title="Select Dates" hideTabBar />

                                        {/* Hotel */}

                                        <Scene key="HotelList" component={HotelList} title="Search Result" />
                                        <Scene key="HotelDetail" component={HotelDetail} title="" hideTabBar />
                                        <Scene key="HotelFilter" component={HotelFilter} title="Filter" hideTabBar />
                                        <Scene key="SelectRoom" component={SelectRoom} title="Guest Details" hideTabBar />

                                        <Scene key="RoomList" component={RoomList} title="" hideTabBar />
                                        <Scene key="RoomDetail" component={RoomDetail} title="" hideTabBar />
                                        <Scene key="ThankYou" component={ThankYou} title="Thank You" hideTabBar />
                                        <Scene key="Booking" component={Booking} title="" hideTabBar />

                                    </Scene>

                                    <Scene key="Packages" tabBarLabel="Packages"
                                        icon={(props) => <TabBarIcon name="ios-list" {...props} />} navBar={NavBar}>

                                        <Scene key="Packages" component={Packages} title="Travel Packages" />
                                    </Scene>

                                    <Scene key="HotDeal" tabBarLabel="Hot Deal"
                                        icon={(props) => <TabBarIcon name="ios-heart" {...props} />} navBar={NavBar} >

                                        <Scene key="HotDeal" component={HotDeal} title="Hot Deals" />
                                    </Scene>

                                    {setting.isLoginRequired && <Scene key="MyCart" tabBarLabel="My Cart"
                                        icon={(props) => <TabBarIcon name="ios-notifications" {...props} />} navBar={NavBar} >

                                        <Scene key="MyCart" component={MyCart} title="My Cart" />
                                    </Scene>}

                                    {setting.isLoginRequired && <Scene key="MyProfile" tabBarLabel="My Profile"
                                        icon={(props) => <TabBarIcon name="ios-contact" {...props} />} navBar={NavBar} >

                                        <Scene key="Profile" component={Profile} hideNavBar />
                                        <Scene key="Login" component={Login} initial={!this.props.isLoggedIn} hideNavBar />
                                        <Scene key="Register" component={Register} title="Sign Up" />
                                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password" />
                                        <Scene key="ChangePassword" component={ChangePassword} title="Change Password" />
                                        <Scene key="VerifyNumber" component={VerifyNumber} title="Verify Number" />
                                    </Scene>}
                                </Tabs>
                                <Scene key="Offline" component={() => <General screenType='offline' />} hideNavBar />
                                <Scene key="Maintenance" component={() => <General screenType='maintenance' />} hideNavBar />


                            </Scene>
                        </Stack>
                    </Lightbox>
                    <Scene key="ImageList" component={ImageList} hideNavBar />
                    <Scene key="Loading" component={Loading} hideNavBar />
                </Modal>
            </Overlay>
        );


        return (
            <KeyboardAvoidingView
                behavior={'padding'}
                style={{ flex: 1 }}>
                <Router hideNavBar scenes={scenes} onStateChange={(props) => { }} />
                <MyToast />
            </KeyboardAvoidingView>
        );
    }
}

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn,
    }),
    dispatch => ({
        commonActions: bindActionCreators(commonActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch),
    })
)(Root);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});