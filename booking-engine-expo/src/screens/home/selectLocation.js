import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import { Location, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';
import Ionicons from '@expo/vector-icons/Ionicons';
import Color from '@common/color'
import { location } from '@common/image'
import GroupTitle from '@components/home/groupTitle'
import LocationItem from '@components/home/locationItem'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hotelAction from '@store/hotel';

class SelectLocationC extends PureComponent {
    constructor(props) {
        super(props)
        StatusBar.setBarStyle('light-content')
        this.state = {
            searchString: '',
        }
    }
    componentWillMount() {
        // this.props.navigation.setParams({
        //     onRight: this.done,
        //     rightTitle: 'DONE',
        // });
    }
    componentDidMount() {
        this.input.focus()
    }
    // done() {
    //     Actions.pop()
    // }
    clickItem(item) {
        this.props.actions.selectLocation(item)
        Actions.pop()
    }
    searchLocationByQuery(e) {
        let {searchString} = this.state
        if(searchString)
            this.props.actions.searchLocations(searchString, null)
    }

    async searchByLocation() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Permission to access location was denied')
            return
        }

        let location = await Location.getCurrentPositionAsync({});
        //console.log('location', location)
        let {searchString} = this.state
        this.props.actions.searchLocations(searchString, location.coords)
    }

    render() {
        let {locationResults} = this.props.hotel
        locationResults = locationResults||[]

        const getName = (sourceName) => {
            return sourceName.substr(0, sourceName.lastIndexOf('-') - 1)
        }
        console.log('status', this.props.hotel.status)
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Ionicons name="ios-search" size={20} color={'black'} />
                    <TextInput
                        ref={e => this.input = e}
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        value={this.state.searchString}
                        style={styles.input}
                        onSubmitEditing={this.searchLocationByQuery.bind(this)}
                        returnKeyType='search'
                        onChangeText={(text) => this.setState({ searchString: text })}
                    />
                </View>
                <TouchableOpacity style={styles.currentContainer} onPress={this.searchByLocation.bind(this)}>
                    <Image source={location} style={styles.locationIcon} />
                    <Text style={styles.currentText}>Use current location</Text>
                </TouchableOpacity>
                <ScrollView>
                    {this.props.hotel.status=='LOADING'&&<ActivityIndicator size="large" color={Color.primary} />}
                    {
                        locationResults.map((locationResult, index)=>(
                            <View key={index}>
                                <GroupTitle title={locationResult.type} />
                                <View style={styles.groupContainer}>
                                    {locationResult.item.map((item, index) => <LocationItem key={index} location={getName(item.name)} onPress={()=>this.clickItem(item)} />)}
                                </View>
                            </View>
                        ))
                    }
                    {/* <GroupTitle title="Latest Search" />
                    <View style={styles.groupContainer}>
                        {this.state.latests.map((item, index) => <LocationItem key={index} {...item} onPress={this.clickItem} />)}
                    </View>
                    <GroupTitle title="Popular Cities" />
                    <View style={styles.groupContainer}>
                        {this.state.populars.map((item, index) => <LocationItem key={index} {...item} onPress={this.clickItem} />)}
                    </View> */}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({ hotel }) => ({ hotel });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...hotelAction }, dispatch)
});

export default SelectLocation = connect(mapStateToProps, mapDispatchToProps)(SelectLocationC);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: Color.border,
        alignItems: 'center',
        height: 40,
        marginHorizontal: 20,
        marginTop: 10
    },
    input: {
        marginLeft: 10,
        flex: 1,
        color: Color.text,
        fontSize: 14
    },
    currentText: {
        marginLeft: 10,
        color: Color.orange,
        fontSize: 14,
    },
    locationIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    currentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        marginHorizontal: 20,
    },
    groupContainer: {
        paddingHorizontal: 10
    }
})