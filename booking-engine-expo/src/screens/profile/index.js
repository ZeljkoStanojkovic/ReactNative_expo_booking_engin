import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native'

import AvatarSelector from '@components/auth/avatarSelector'
import MenuItem from '@components/auth/menuItem'
import Color from '@common/color'
import { Ionicons } from '@expo/vector-icons'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authAction from '@store/auth';
import * as commonAction from '@store/common';
import {getAllCountries} from 'react-native-country-picker-modal'



class ProfileC extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            avatar: '',
            groups: [
                {
                    title: 'Profile Settings',
                    menus: [
                        { title: 'My Profile', value: '', type: 'menu' },
                        { title: 'Change Password', value: '', type: 'menu' },
                        { title: 'My Booking', value: '', type: 'menu' },
                        { title: 'Co-Travellers', value: '', type: 'menu' },
                    ]
                },
                {
                    title: 'General Settings',
                    menus: [
                        { title: 'Language', value: 'English', type: 'menu' },
                        { title: 'Notification', value: false, type: 'switch' },
                        { title: 'Currency', value: 'US Dollar', type: 'menu' }
                    ]
                },
                {
                    title: 'Support',
                    menus: [
                        { title: 'Help and Info', value: '', type: 'menu' },
                        { title: 'About Us', value: '', type: 'menu' },
                        { title: 'About App', value: '', type: 'menu' },
                    ]
                },
                {
                    title: 'Account',
                    menus: [
                        { title: 'Social Media', value: '', type: 'menu' }
                    ]
                },
            ]
        }
    }

    onChange(menu, groupIndex, menuIndex) {
        if (groupIndex==0){
            switch (menuIndex){
                case 0:
                    break;
                case 1:
                    Actions.ChangePassword()
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        }
        if (groupIndex==1){
            switch (menuIndex){
                case 0:
                    break;
                case 1:
                    menu.value=!menu.value
                    this.setState({groups:[...this.state.groups]})
                    break;
            }
        }
    }

    logout() {
        this.props.actions.logout((err, res)=>{
            if ( err == null )
                this.props.commonAction.showToast('You have been logged out')
        })
        
    }

    render() {
        let { name, location, email } = this.props
        let {currentUser} = this.props.auth
        const userCountryData = currentUser.location?getAllCountries()
        .filter(country => country.cca2 === currentUser.location.countryID)
        .pop():''
        var profileUrl = currentUser.profilePicture?currentUser.profilePicture.url:''

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.headerContainer}>
                        <AvatarSelector
                            url={profileUrl}
                            onChange={avatar => this.setState({ avatar })}
                        />
                        <View style={styles.headerContent}>
                            <Text style={styles.name}>{`${currentUser.firstName||''} ${currentUser.lastName||''}`}</Text>
                            {userCountryData&&<Text style={styles.location}>
                                <Ionicons name="ios-pin" size={14} color={Color.middlePrimary} style={styles.icon} />
                                {'  ' + userCountryData.name.common}
                            </Text>}
                            <Text style={styles.email}>
                                <Ionicons name="ios-mail" size={14} color={Color.middlePrimary} style={styles.icon} />
                                {' ' + currentUser.contactInformation.email}
                            </Text>
                        </View>
                    </View>

                    {this.state.groups.map((group, index) => (
                        <View key={index} style={styles.groupContainer}>
                            <View style={styles.groupTitleContainer}>
                                <Text style={styles.groupTitleText}>{group.title}</Text>
                            </View>
                            {group.menus.map((menu, idx) => <MenuItem
                                key={idx}
                                {...menu}
                                onChange={() => this.onChange(menu, index, idx)}
                            />)}
                        </View>
                    ))}
                    <View style={styles.logoutContainer}>
                        <Text onPress={() => this.logout()} style={styles.logoutText}>Logout</Text>
                    </View>
                </ScrollView>
                
            </View>
        )
    }
}
const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...authAction }, dispatch),
    commonAction: bindActionCreators({ ...commonAction }, dispatch)
});

export default Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileC);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    location: {
        fontSize: 15,
        color: Color.darkText,
        marginTop: 3,
        // fontWeight: 'bold'
    },
    email: {
        fontSize: 15,
        color: Color.darkText,
        marginTop: 3,
        // fontWeight: 'bold'
    },
    headerContent: {
        marginLeft: 30
    },
    name: {
        fontSize: 24,
        color: Color.darkText,
        fontWeight: 'bold'
    },
    headerContainer: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        marginTop: 40
    },
    icon: {
        width: 40,
    },
    groupContainer: {
    },
    groupTitleContainer: {
        backgroundColor: Color.lightBack,
        borderTopColor: Color.border,
        borderTopWidth: 0.5,
        justifyContent: 'center',
        paddingHorizontal: 15,
        height: 40
    },
    groupTitleText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Color.lightText
    },
    logoutContainer: {
        height: 50,
        justifyContent: 'center'
    },
    logoutText: {
        color: Color.orange,
        fontSize: 16,
        marginLeft: 20,
    }
})