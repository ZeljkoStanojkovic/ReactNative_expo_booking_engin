import React, { PureComponent } from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    ScrollView
} from 'react-native'

import { background, white_logo } from '@common/image'
import Color from '@common/color'
import AuthTypeButton from '@components/auth/authTypeButton'
import AuthInput from '@components/auth/authInput';
import RoundButton from '@components/general/roundButton'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parsePhoneNumber } from 'libphonenumber-js'
import Global from "@utils/global";
import Device from '@common/device';

import * as authAction from '@store/auth';

class LoginC extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            authType: 'email'
        }
        this.changeAuthType.bind(this)
        this.login.bind(this)
        this.facebookLogin.bind(this)
        this.googleLogin.bind(this)

        Global.environment.socialNetworkIntegration = Global.environment.socialNetworkIntegration||[]
        Global.environment.oAuthProviderInfo = Global.environment.oAuthProviderInfo||[]

        this.socials = []
        Global.environment.socialNetworkIntegration.map(socialKey => {
            this.socials[socialKey] = Global.environment.oAuthProviderInfo.filter((o)=>o.name == socialKey)[0]
        })
    }

    changeAuthType = (authType) => {
        this.setState({ authType })
    }

    login() {
        let { authType, email, password, phone } = this.state
        
        if(authType == 'email' && !email) {
            return alert('Please enter email address')
        }
        if(authType == 'phone' && !phone) {
            return alert('Please enter phone number')
        }
        if(!password) {
            return alert('Please enter password')
        }
        //console.log('authType, email, password, phone', authType, email, password, phone)
        if (authType == 'email') {
            this.props.actions.login(email, password)
            .then(err => {
                // if(err) {
                //     if(authType == 'email')
                //         alert('Invalid E-mail address or password')
                //     else     
                //         alert('Invalid Mobile number or password')
                // }
            })
        } else {
            try {
                var pNumber = parsePhoneNumber(phone)
                if (pNumber.isValid()) {
                    var countryCode = '+' + pNumber.countryCallingCode
                    var phoneNumber = pNumber.nationalNumber
                    this.props.actions.loginWithPhone(phoneNumber, countryCode, password)
                }
            } catch (e) {
                alert('Invalid Mobile number')
            }
        }
    }

    facebookLogin = async () => {
        let {facebook} = this.socials
        try {
            const {
              type,
              token,
              expires,
              permissions,
              declinedPermissions,
            } = await Expo.Facebook.logInWithReadPermissionsAsync(facebook.appID, {
              permissions: ['public_profile', 'email', 'user_gender', 'user_location', 'user_birthday'],
            });
            if (type === 'success') {
              // Get the user's name using Facebook's Graph API
              const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture,location,birthday,gender`);
              var socialRet = await response.json()
              console.log('result', socialRet)
              //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
              this.props.actions.socialLogin({
                "profilePicture": socialRet.picture?{
                    "URL": socialRet.picture.data.url
                }:{},
                "loginName": socialRet.name,
                "firstName": socialRet.name,
                "openIDs": {    
                    "facebook": socialRet.id
                },
                "contactInformation": {
                    "name": socialRet.name,
                    "email": socialRet.email
                }
              }, "facebook").then(({error, result})=>{
                  console.log(error, result)
              })
            } else {
              // type === 'cancel'
            }
          } catch ({ message }) {
            console.log('error', message)
          }
    }

    googleLogin = async () => {
        let {google} = this.socials
        try {
            const result = await Expo.Google.logInAsync({
                clientId: '866379140525-hmp4b7ikgffmc9b3ovjksdt7h5j2k2o5.apps.googleusercontent.com',
                behavior:'web',
                scopes: ['profile', 'email']
            });
            if (result.type === 'success') {
              // Get the user's name using Facebook's Graph API
              console.log('result', result)
              this.props.actions.socialLogin({
                "profilePicture": result.user.photoUrl?{
                    "URL": result.user.photoUrl
                }:{},
                "loginName": result.user.name,
                "firstName": result.user.familyName||result.user.name,
                "lastName": result.user.givenName||result.user.name,
                "openIDs": {
                    "google": result.user.id
                },
                "contactInformation": {
                    "name": result.user.name,
                    "email": result.user.email
                }
              }, "google").then(({error, result})=>{
                  console.log(error, result)
              })
            } 
        } catch ({ message }) {
        console.log('error', message)
        }
    }

    get showLoginButtons() {
        let {facebook, google} = this.socials
        let {error, status} = this.props.auth
        const isLoading = status==authAction.LOADING
        showNormalLogin = () => (
            <RoundButton
                    isLoading={isLoading}
                    disabled={isLoading}
                    style={styles.login}
                    title={"Sign in"}
                    onPress={this.login.bind(this)} />
        )
        showFacebookLogin = () => {
            if(facebook) {
                return (<RoundButton
                    isLoading={status==authAction.LOADING_FACEBOOK}
                    disabled={status==authAction.LOADING_FACEBOOK}
                    style={styles.facebook}
                    title={"Sign in with Facebook"}
                    onPress={this.facebookLogin} />)
            } else {
                return null
            }
        }
        showGooglePlusLogin = () => {
            if(google) {
                return (<RoundButton
                    isLoading={status==authAction.LOADING_GOOGLE}
                    disabled={status==authAction.LOADING_GOOGLE}
                    style={styles.google}
                    title={"Sign in with Google+"}
                    onPress={this.googleLogin} />)
            } else {
                return null
            }
        }
        return (
            <View style={styles.buttonContainer}>
                {showNormalLogin()}
                {showFacebookLogin()}
                {showGooglePlusLogin()}
            </View>
        )
    }

    render() {
        let { authType, email, password, phone } = this.state
        let { 
            isRegistrationEnabled, 
            isForgotPasswordEnabled,
            isPhoneNumberForLoginEnabled,
            isEmailForLoginEnabled,
            isUserNameForLoginEnabled
         } = Global.environment
        let {error, status} = this.props.auth
        const emailColor = authType == 'email' ? 'white' : '#ccc'
        const phoneColor = authType == 'phone' ? 'white' : '#ccc'
        const isShowError = error && status==authAction.FAILED
        const isShowSwitch = (isPhoneNumberForLoginEnabled && isEmailForLoginEnabled)
        const loginText =  (isUserNameForLoginEnabled&&isEmailForLoginEnabled)?'Email/Username':(isUserNameForLoginEnabled?'Username':'Email')
        
        if(!isShowSwitch) {
            authType = (isEmailForLoginEnabled||isUserNameForLoginEnabled)?'email':(isPhoneNumberForLoginEnabled?'phone':'')
        }
        let errMessage = (authType == 'email')?'Invalid E-mail address or password':'Invalid Mobile number or password'

        return (
            <ImageBackground source={background} style={styles.flex} resizeMode="cover">
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style={styles.container}>
                        <Image source={white_logo} style={styles.logo} />
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
                            <AuthInput
                                refs={e => this.authInputer = e}
                                authType={authType}
                                value={authType == 'email' ? email : phone}
                                placeHolder={loginText}
                                onChangeText={(text) => {
                                    let obj = {}
                                    //console.log('obj[authType]', text)
                                    obj[authType] = text||''
                                    this.setState(obj)
                                }}
                                onSubmitEditing={() => this.passwordInput.focus()}
                            />
                            <View style={styles.spacer} />
                            <AuthInput
                                refs={e => this.passwordInput = e}
                                authType={'password'}
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                                onSubmitEditing={() => this.login()}
                            />
                        </View>
                        {isShowError&&<View style={styles.errorContainer}>
                            <Text style={styles.error}>{errMessage}</Text>
                        </View>}
                        {this.showLoginButtons}
                        <View style={styles.linkContainer}>
                            {isForgotPasswordEnabled && <Text style={styles.linkText} onPress={() => Actions.ForgotPassword()}>Forgot Password?</Text>}
                            {isRegistrationEnabled && <Text style={styles.linkText} onPress={() => Actions.Register()}>Not here? Sign Up</Text>}
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...authAction }, dispatch)
});

export default Login = connect(mapStateToProps, mapDispatchToProps)(LoginC);

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        marginTop: Device.ToolbarHeight + 10,
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
    },
    logo: {
        height: 100,
        resizeMode: 'contain'
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
        marginTop: 15
    },
    authTypeTextContainer: {
        flexDirection: 'row',
        width: 260,
        marginTop: 10,
        justifyContent: 'space-between'
    },
    authTypeText: {
        fontSize: 13,
    },
    spacer: {
        width: '100%',
        height: 1,
        backgroundColor: Color.border
    },
    inputContainer: {
        borderRadius: 4,
        width: 300,
        backgroundColor: 'white',
        marginTop: 15
    },
    buttonContainer: {
        marginTop: 15,
        width: 300
    },
    linkContainer: {
        width: 300,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:10
    },
    errorContainer:{
        width:300,
        marginTop:10,
    },
    error:{
        fontSize:12,
        color: 'white',
        textAlign:'center'
    },
    login: {
        backgroundColor: Color.orange
    },
    facebook: {
        backgroundColor: Color.facebook,
        marginTop: 30
    },
    google: {
        backgroundColor: Color.google,
        marginTop: 15,
    },
    linkText: {
        fontSize: 14,
        // fontWeight:'bold',
        color: 'white'
    }
})