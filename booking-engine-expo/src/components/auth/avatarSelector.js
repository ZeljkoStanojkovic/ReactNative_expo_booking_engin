import React, { PureComponent } from 'react'
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    View
} from 'react-native'
import Color from '@common/color'
import { Ionicons } from '@expo/vector-icons'
import {ImagePicker, Permissions, ImageManipulator} from 'expo'
import {emptyAvatar} from '@common/image'

export default class AvatarSelector extends PureComponent {

    async takePicture() {
        let res = await Permissions.askAsync(Permissions.CAMERA)
        if (res.status === 'granted') {
            let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status === 'granted') {

                let image = await ImagePicker.launchCameraAsync({
                    quality: 0.3,
                    allowsEditing: true,
                    aspect:[1,1]
                })
                if (!image.cancelled) {
                    const manipResult = await ImageManipulator.manipulateAsync(
                        image.uri,
                        [{ resize: { width: 512 } }],
                        { format: 'jpeg', compress: 0.6 }
                    );
                    if ( this.props.onChange )
                        this.props.onChange(manipResult.uri)
                }

            }
        }
    }
    render() {
        let { url, onChange } = this.props
        return (
            <TouchableOpacity onPress={() => this.takePicture()} style={styles.container}>
                <Image source={url?{ uri: url }:emptyAvatar} style={styles.image} />
                <View style={styles.iconContainer}>
                    <Ionicons name="ios-camera" size={18} color={Color.primary} />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius:50,
    },
    iconContainer: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        width: 24,
        height: 24,
        borderRadius:12, 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'center'
    }
})