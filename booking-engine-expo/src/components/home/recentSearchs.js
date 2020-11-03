import React, { PureComponent } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    View,
    Image,
} from 'react-native'
import Color from '@common/color'
import { background } from '@common/image'
import Ionicons from '@expo/vector-icons/Ionicons';
import { screenWidth } from '@common/const'

const ITEM_WIDTH = (screenWidth - 45)/2

export default class RecentSearchs extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            page:0,
            indicators:[]
        }
        if ( this.props.items && this.props.items.constructor === Array ){
            for (let i = 0; i < this.props.items.length/2; i ++){
                this.state.indicators.push(i)
            }
        }
        
    }
    handlePageChange = (e) => {
        var offset = e.nativeEvent.contentOffset;
        if (offset) {
            var page = Math.round(offset.x / screenWidth);
            if (this.state.page != page) {
                this.setState({ page: page });
            }
        }
    }
    render() {
        let { items } = this.props
        if(items.length == 0) return null;

        let {page, indicators} = this.state
        const getName = (sourceName) => {
            return sourceName.substr(0, sourceName.lastIndexOf('-') - 1)
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>RECENT SEARCHES</Text>
                <ScrollView
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={this.handlePageChange}
                >
                    {items.map((item, index)=>(
                        <View key={index} style={[styles.itemContainer, {marginRight:(index&1==1)?15:0}]}>
                            <Image source={item.image||background} style={styles.image}/>
                            <View style={styles.content}>
                                <Text style={styles.location} numberOfLines={3}>{getName(item.request.criteriaInfo[0].locationInfo.fromLocation.name)}</Text>
                                {/* <Text style={styles.property}>{item.count||'632'} properties</Text> */}
                                <View style={styles.spacer}/>
                                {/* <Text style={styles.average}>Average Price</Text>
                                <Text style={styles.price}>USD {item.price||200}</Text> */}
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {indicators.map((item, index) => (
                        <View key={index} style={[styles.indicator, index==page?{borderWidth:2, backgroundColor:'black'}:{}]}>
                        </View>
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop:10,
    },
    itemContainer: {
        width: ITEM_WIDTH,
        borderRadius: 5,
        height: 120,
        overflow: 'hidden',
        marginLeft:15,
    },
    image: {
        flex:1,
        resizeMode:'cover'
    },
    content:{
        position:'absolute',
        left:0,
        top:0,
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0, 0, 0, 0.4)',
        paddingVertical:10,
    },
    indicatorContainer: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent:'center'
    },
    indicator:{
        width:8,
        height:8,
        backgroundColor:'rgb(212, 232, 237)',
        borderRadius:4,
        margin:5,
        borderWidth:0,
        borderColor:'white'
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        marginVertical: 10
    },
    location:{
        fontSize:16,
        fontWeight:'bold',
        color:'white',
        marginLeft:10,
    },
    property:{
        fontSize:12,
        // fontWeight:'bold',
        color:'white',
        marginLeft:10,
    },
    average:{
        fontSize:12,
        color:'white',
        textAlign:'right',
        marginRight:10,
    },
    price:{
        fontSize:18,
        fontWeight:'bold',
        color:'white',
        textAlign:'right',
        marginRight:10,
    },
    spacer:{
        flex:1
    }
})