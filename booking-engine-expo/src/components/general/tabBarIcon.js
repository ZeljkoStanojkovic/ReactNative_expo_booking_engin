import React from 'react';
import {Image, StatusBar} from 'react-native'
import { Ionicons } from 'react-native-vector-icons';

import Color from '@common/color';
import {
  home_grey, 
  home_primary, 
  mycart_grey, 
  mycart_primary, 
  hotdeal_primary, 
  hotdeal_grey, 
  package_grey, 
  package_primary, 
  profile_grey, 
  profile_primary
} from '@common/image'

export default class TabBarIcon extends React.Component {
  render() {
    let {name, focused} = this.props
    let image = ''
    if ( name=='ios-home' ) image=focused?home_primary:home_grey
    if ( name=='ios-list' ) image=focused?package_primary:package_grey
    if ( name=='ios-heart' ) image=focused?hotdeal_primary:hotdeal_grey
    if ( name=='ios-notifications' ) image=focused?mycart_primary:mycart_grey
    if ( name=='ios-contact' ) image=focused?profile_primary:profile_grey
    return (
      <Image source={image} style={{width:20, height:20, resizeMode:'contain'}}/>
    )
  }
}
