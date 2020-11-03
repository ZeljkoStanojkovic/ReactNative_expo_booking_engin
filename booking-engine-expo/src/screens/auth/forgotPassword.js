import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Alert
} from 'react-native'

import Color from '@common/color'
import {closeButtonImage} from '@common/image'
import FloatLabelTextInput from '@components/general/floatingLabelInput';
import RoundButton from '@components/general/roundButton'
import AuthTypeButton from '@components/auth/authTypeButton'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authAction from '@store/auth';
import UtilService from "@utils/utils";
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal'
import {Ionicons} from '@expo/vector-icons'
import Global from "@utils/global";
import { getCountryCallingCode } from 'libphonenumber-js'

const countryPicker={
    closeButtonImage:{
        width:34, 
        flex:1,
    },
    letter:{
        width:30,
        height:35
    }
}

class ForgotPasswordC extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            authType: 'email',
            cca2: Global.environment.portalCountry.code,
            phoneCode: getCountryCallingCode(Global.environment.portalCountry.code)
        }

        this.validCountries = getAllCountries()
            .filter(country => country.callingCode)
            .map(country => country.cca2)
    }

    done(authType) {
        let { email, phoneCode } = this.state
        if (email) {
            if(authType == 'email') {
                this.props.actions.forgetPassword({email}).then(({ error }) => {
                    if (error) {
                        alert('Please enter valid email address')
                    } else {
                        Alert.alert('', 'Sent email. Please check your email', [
                            {text:'OK', onPress:()=>Actions.pop()}
                        ],
                        {cancelable: false})
                    }
                })
             } else {
                this.props.actions.forgetPassword({
                    phoneNumber:email,
                    phoneNumberCountryCode:`+${phoneCode}`
                }, authType).then(({ error }) => {
                    if (error) {
                        //console.log(error)
                        alert('Please enter valid mobile number')
                    } else {
                        Alert.alert('', 'Sent SMS. Please check your SMS', [
                            {text:'OK', onPress:()=>Actions.pop()}
                        ],
                        {cancelable: false})

                    }
                })
             }
        }
    }

    changeAuthType = (authType) => {
        this.setState({ authType })
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

    render() {
        let { 
            isPhoneNumberForLoginEnabled,
            isEmailForLoginEnabled,
         } = Global.environment

        let { email, authType } = this.state
        let { status } = this.props.auth
        const isLoading = status == authAction.LOADING
        const isShowSwitch = (isPhoneNumberForLoginEnabled && isEmailForLoginEnabled)
        const emailColor = authType == 'email' ? 'black' : 'grey'
        const phoneColor = authType == 'phone' ? 'black' : 'grey'

        if(!isShowSwitch) {
            authType = (isEmailForLoginEnabled)?'email':(isPhoneNumberForLoginEnabled?'phone':'')
        }

        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Enter registered e-mail and we will send you a link to reset your password
                </Text>
                {isShowSwitch && <View style={styles.typeSwitchContainer}>
                    <AuthTypeButton
                        icon="email"
                        selected={authType == 'email'}
                        onPress={this.changeAuthType} />
                    <AuthTypeButton
                        icon="phone"
                        selected={authType == 'phone'}
                        onPress={this.changeAuthType} />
                </View>}
                {isShowSwitch && <View style={styles.authTypeTextContainer}>
                    <Text style={[styles.authTypeText, { color: emailColor }]}>E-mail Address</Text>
                    <Text style={[styles.authTypeText, { color: phoneColor }]}>Mobile Number</Text>
                </View>}
                <View style={styles.inputContainer}>
                    {authType == 'phone' && this.renderCountryCode()}
                    <FloatLabelTextInput
                        placeholder={authType=='phone'?'Mobile Number':"E-mail"}
                        placeholderTextColor={Color.lightText}
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => this.setState({ email: text })}
                        onSubmitEditing={() => this.done()}
                    />
                </View>
                <RoundButton
                    title="Send Link"
                    isLoading={isLoading}
                    disabledUI={!email || (authType=='email' && !UtilService.validateEmail(email))}
                    disabled={isLoading || !email || (authType=='email' && !UtilService.validateEmail(email))}
                    onPress={() => this.done(authType)}
                    style={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...authAction }, dispatch)
});

export default ForgetPassword = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordC);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        alignItems:'center'
    },
    inputContainer: {
        height: 50,
        width: '100%',
        marginTop: 40,
        flexDirection:'row'
    },
    description: {
        fontSize: 18,
        color: Color.lightText,
        textAlign: 'center'
    },
    button: {
        marginTop: 20
    },
    buttonText: {
        fontWeight: 'bold'
    },
    input: {
        color: Color.primary
    },
    typeSwitchContainer: {
        height: 44,
        width: 200,
        borderRadius: 22,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        marginTop: 15,
        borderWidth:0.5,
        borderColor:'grey'
    },
    authTypeTextContainer: {
        flexDirection: 'row',
        width: 260,
        marginTop: 10,
        justifyContent: 'space-between'
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
    phoneCodeText: {
        fontSize: 18,
        color: Color.primary,
        flex: 1,
    },
})