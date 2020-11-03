import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
    Dimensions
} from 'react-native'

import Color from '@common/color'
import {closeButtonImage} from '@common/image'
import FloatLabelTextInput from '@components/general/floatingLabelInput';
import RoundButton from '@components/general/roundButton'
import CheckButton from '@components/general/checkButton'
import AvatarSelector from '@components/auth/avatarSelector'
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal'
import UtilService from "@utils/utils";
const {width:screenWidth} = Dimensions.get('window')

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Global from "@utils/global";
import * as authAction from '@store/auth';
import * as commonAction from '@store/common';
import { Ionicons } from '@expo/vector-icons'
import { getCountryCallingCode } from 'libphonenumber-js'
import {
    Select,
    Option,
    OptionList,
    updatePosition
} from '@react-native-dropdown'

const PHONE_NUM_INDEX = 6
const OTP_NUM_INDEX = 8

const countryPicker={
    closeButtonImage:{
        width:34, 
        flex:1, 
        paddingHorizontal:5,
    },
    letter:{
        width:30,
        height:35
    }
}

class RegisterC extends PureComponent {
    constructor(props) {
        super(props)
        this.needOTP = Global.environment.isSmsOtpForPhoneNumberRegistrationEnabled
        this.needPhoneNumber = Global.environment.isPhoneNumberForRegistrationMandatory

        let formData = [
            { title: 'Gender', value: 'Male' },
            { title: 'First Name *', value: '' },
            { title: 'Last Name *', value: '' },
            { title: 'Email *', value: '' },
            { title: 'Password(minimum 6 characters) *', value: '' },
            { title: 'Confirm Password *', value: '' },
            { title: 'Mobile Number', value: '' },
            { title: 'Country', value: Global.environment.portalCountry.code },
            { title: 'OTP Number *', value: '' },
        ]

        this.state = {
            formData,
            isAgreed: false,
            avatar: '',
            cca2: Global.environment.portalCountry.code,
            countryName: Global.environment.portalCountry.name,
            phoneCode: getCountryCallingCode(Global.environment.portalCountry.code)
        }
        this.inputs = []

        this.validCountries = getAllCountries()
            .filter(country => country.callingCode)
            .map(country => country.cca2)
    }

    validate() {
        let { formData } = this.state
        formData[1].isError = !formData[1].value
        formData[2].isError = !formData[2].value
        formData[3].isError = !formData[3].value
        formData[4].isError = !formData[4].value || (formData[4].value.length < 6)
        formData[5].isError = !formData[5].value
        formData[6].isError = !formData[6].value
        formData[8].isError = !formData[8].value

        this.setState((
            formData
        ))
    }

    async signUp() {
        let { formData, isAgreed, avatar, cca2 } = this.state

        if (!isAgreed) return

        this.validate()

        let gender = formData[0].value == 'Male' ? 'M' : 'F'
        let firstName = formData[1].value
        let lastName = formData[2].value
        let email = formData[3].value
        let password = formData[4].value
        let confirm = formData[5].value
        let phoneNumber = formData[6].value
        let country = formData[7].value
        let otpNumber = formData[8].value

        //check validation
        if (!firstName || !lastName || !email || !password || !cca2) {
            return
        }

        if (this.needPhoneNumber && !phoneNumber) return

        if (password != confirm) {
            alert('Password does not match the confirm password')
            return
        }

        if (password.length < 6) {
            alert('Password must be minimum 6 characters')
            return
        }

        //send data
        var requestData = {
            "request": {
                "lastName": lastName,
                "firstName": firstName,
                "loginName": `${firstName} ${lastName}`,
                "location": {
                    "countryId": cca2,
                },
                "contactInformation": {
                    "phoneNumber": this.needPhoneNumber ? phoneNumber : '',
                    //"PhoneNumberCountryCode": "86",
                    "email": email
                },
                "password": password,
                "gender": gender
            },
            "flags": {}
        }

        if (avatar) {
            requestData.request.profilePicture = {
                url: avatar.substr(avatar.lastIndexOf('/') + 1),
                rawData: await UtilService.getImageRawData(avatar),
                UpdatedDate: new Date()
            }
        }

        if (this.needOTP) {
            //set otp number
            requestData.smsOtp = otpNumber
        }


        this.props.actions.register(requestData).then(({ error, result }) => {
            if (error) {
                alert(error.message)
                return
            }
            this.props.commonAction.showToast('You have been registered successfully.')
        })
    }

    changeCountry(value) {
        console.log('value', value)
        this.setState({
            cca2: value.cca2,
            callingCode: value.callingCode,
            countryName: value.name
        })
    }

    renderCountryCode() {
        return (
            <CountryPicker
                filterable
                closeable
                autoFocusFilter
                showCallingCode={true}
                onChange={(value) => { this.setState({ phoneCode: value.callingCode }) }}
                cca2={this.state.cca2}
                closeButtonImage={closeButtonImage}
                translation="eng"
                styles={countryPicker}
                countryList={this.validCountries}
            >
                <View style={styles.phoneCodeContainer}>
                    <Text style={styles.phoneCodeText}>+{this.state.phoneCode}</Text>
                    <Ionicons name="ios-arrow-down" size={14} color={Color.text} />
                </View>
            </CountryPicker>
        )
    }

    termAndConditions() {
        this.props.commonAction.showToast('Not implemented yet!')
    }

    privacyPolicy() {
        this.props.commonAction.showToast('Not implemented yet!')
    }

    onChangeGener(gender) {
        this.state.formData[0] = gender
    }
    _getOptionList() {
        return this.refs['OPTIONLIST'];
    }
    componentDidMount() {
        updatePosition(this.refs['SELECT1']);
        updatePosition(this.refs['OPTIONLIST']);
    }

    render() {
        let { formData, isAgreed } = this.state
        let { status } = this.props.auth
        return (
            <ScrollView style={styles.scroll} keyboardShouldPersistTaps="always">
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <AvatarSelector
                            url={this.state.avatar}
                            onChange={url => this.setState({ avatar: url })}
                        />
                    </View>
                    <Text style={{fontSize:10, color:'#999', marginTop:10}}>Gender *</Text>
                    <Select
                        style={styles.genderContainer}
                        styleText={{color:Color.primary, fontSize:16}}
                        styleOption={{padding:0, height:28}}
                        width={screenWidth-40}
                        ref="SELECT1"
                        optionListRef={this._getOptionList.bind(this)}
                        defaultValue="Male"
                        onSelect={this.onChangeGener.bind(this)}>
                        <Option>Male</Option>
                        <Option>Female</Option>
                    </Select>
                    <OptionList ref="OPTIONLIST" />
                    <View style={{height:5}}/>
                    <View style={styles.lowLevel}>
                        {formData.map((item, index) => {
                            if (!this.needPhoneNumber && index == PHONE_NUM_INDEX)
                                return
                            if (!this.needOTP && index == OTP_NUM_INDEX)
                                return
                            if (index == 7 || index == 0) return null
                            return (
                                <View key={index} style={styles.inputContainer}>
                                    {item.title == 'Mobile Number' && this.renderCountryCode()}
                                    <FloatLabelTextInput
                                        ref={e => this.inputs[index] = e}
                                        placeholder={item.title}
                                        placeholderTextColor={Color.lightText}
                                        style={styles.input}
                                        value={item.value}
                                        secureTextEntry={index == 4 || index == 5}
                                        onChangeText={(text) => {
                                            item.value = text
                                            this.setState({ formData: [...formData] })
                                            this.validate()
                                        }}
                                        isError={item.isError}
                                        onSubmitEditing={() => index < 6 ? this.inputs[index + 1].focus() : {}}
                                    />
                                </View>
                            )
                        })}
                        <CountryPicker
                            filterable
                            closeable
                            autoFocusFilter
                            styles={countryPicker}
                            onChange={(value) => this.changeCountry(value)}
                            cca2={this.state.cca2}
                            countryList={this.validCountries}
                            translation="eng"
                        >
                            <View style={styles.countryPicker}>
                                {this.state.countryName == '' && <Text style={styles.countryPickerText1}>Select a country</Text>}
                                {this.state.countryName != '' && <Text style={styles.label}>Select a country</Text>}
                                {this.state.countryName != '' && <Text style={styles.countryPickerText2}>{this.state.countryName}</Text>}
                            </View>
                        </CountryPicker>

                        <View style={styles.termsContainer}>
                            <CheckButton
                                value={isAgreed}
                                onPress={() => this.setState({ isAgreed: !this.state.isAgreed })}
                            />
                            <Text style={styles.termsText}>
                                I have READ and AGREED to all the
                        <Text onPress={() => this.termAndConditions()} style={styles.linkText}> Terms and Conditions </Text>
                                and
                        <Text onPress={() => this.privacyPolicy()} style={styles.linkText}> Privacy Policy</Text>
                            </Text>
                        </View>
                    </View>
                    <RoundButton
                        title="Sign Up"
                        disabled={!isAgreed}
                        disabledUI={!isAgreed}
                        isLoading={status == authAction.LOADING}
                        onPress={() => this.signUp()}
                        style={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...authAction }, dispatch),
    commonAction: bindActionCreators({ ...commonAction }, dispatch),
});

export default Register = connect(mapStateToProps, mapDispatchToProps)(RegisterC);

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    inputContainer: {
        height: 50,
        width: '100%',
        flexDirection: 'row'
    },
    input: {
        color: Color.primary
    },
    button: {
        marginTop: 30
    },
    buttonText: {
        fontWeight: 'bold'
    },
    termsContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    termsText: {
        color: Color.text,
        fontSize: 14,
        marginLeft: 10
    },
    linkText: {
        color: Color.orange,
        fontWeight: 'bold'
    },
    avatarContainer: {
        height: 120,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    countryPicker: {
        width: '100%',
        height: 50,
        borderBottomWidth: 0.5,
        borderColor: Color.border,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    phoneCodeContainer: {
        width: 76,
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: Color.border,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 5,
        marginRight: 5,
    },
    countryPickerText1: {
        color: Color.lightText,
        fontSize: 18
    },
    countryPickerText2: {
        color: Color.primary,
        fontSize: 18
    },
    label: {
        fontSize: 10,
        color: Color.lightText,
    },
    phoneCodeText: {
        fontSize: 18,
        color: Color.primary,
        flex: 1,
    },
    lowLevel: {
        zIndex: -1
    },
    genderContainer:{ 
        justifyContent:'center', 
        borderWidth:0,
        borderBottomWidth:0.5,
    }
})