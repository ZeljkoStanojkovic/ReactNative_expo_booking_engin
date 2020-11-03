import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Alert
} from 'react-native'

import Color from '@common/color'
import FloatLabelTextInput from '@components/general/floatingLabelInput';
import RoundButton from '@components/general/roundButton'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '@store/user';

class ChangePasswordC extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
        }
    }

    done(){
        let {oldPassword, newPassword, confirmPassword} = this.state

        if(!newPassword || !confirmPassword) {
            return
        }

        if(newPassword != confirmPassword) {
            return alert('Password does not match the confirm password')
        }
        this.props.actions.setPassword(oldPassword, newPassword). then((err)=>{
            if(err) {
                if(err == 'NOT_FOUND') {
                    Alert.alert('Old password is wrong')
                }
            } else {
                Alert.alert('', 'Password changed successfully', [
                    {text:'OK', onPress:()=>Actions.pop()}
                ],
                {cancelable: false})
            }
        })
    }

    render() {
        let {newPassword, confirmPassword, oldPassword} = this.state
        let {status} = this.props.user
        const isLoading = status==userAction.LOADING
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <FloatLabelTextInput
                        placeholder={"Old Password"}
                        placeholderTextColor={Color.lightText}
                        style={styles.input}
                        value={oldPassword}
                        secureTextEntry={true}
                        onChangeText={(text)=>this.setState({oldPassword:text})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FloatLabelTextInput
                        placeholder={"New Passowrd(minimum 6 characters)"}
                        placeholderTextColor={Color.lightText}
                        style={styles.input}
                        value={newPassword}
                        secureTextEntry={true}
                        onChangeText={(text)=>this.setState({newPassword:text})}
                        onSubmitEditing={()=>this.confirm.focus()}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FloatLabelTextInput
                        ref={e=>this.confirm=e}
                        placeholder={"Confirm New Password"}
                        placeholderTextColor={Color.lightText}
                        style={styles.input}
                        value={confirmPassword}
                        secureTextEntry={true}
                        onChangeText={(text)=>this.setState({confirmPassword:text})}
                        onSubmitEditing={()=>this.done()}
                    />
                </View>
                <RoundButton
                    disabled={isLoading || newPassword != confirmPassword || newPassword.length < 6 || !oldPassword}
                    disabledUI={newPassword != confirmPassword || newPassword.length < 6}
                    title="Change Password"
                    isLoading={isLoading}
                    onPress={()=>this.done()}
                    style={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...userAction }, dispatch)
});

export default ChangePassword = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordC);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        padding:20,
    },
    inputContainer:{
        height:50,
        width:'100%',
    },
    button:{
        marginTop:20
    },
    buttonText:{
        fontWeight:'bold'
    },
    input:{
        color:Color.primary
    }
})