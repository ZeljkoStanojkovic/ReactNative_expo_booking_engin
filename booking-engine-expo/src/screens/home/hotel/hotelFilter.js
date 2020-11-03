import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native'

import { Actions } from 'react-native-router-flux'

import RangeSelectBar from '@hotel_filter/RangeSelectBar'
import RatingFilterBar from '@hotel_filter/RatingFilter'
import SwitchEditor from '@hotel_filter/SwitchEditor'
import InputFilter from '@hotel_filter/InputFilter'
import RadioSelector from '@hotel_filter/RadioSelector'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hotelAction from '@store/hotel';
import moment from 'moment'
import UtilService from '../../../utils/utils';
import Global from "@utils/global";
var hotelFilterView = null
class HotelFilterC extends PureComponent {
    constructor(props) {
        super(props)    
        let {result, status, searchData} = this.props.hotel;
        result = result||{}
        let availableFiltersIndex = result.availableFiltersIndex?result.availableFiltersIndex[0].item:[]
        let appliedFiltersIndex = result.appliedFiltersIndex?result.appliedFiltersIndex[0].item:{}
        availableFiltersIndex = JSON.parse(JSON.stringify(availableFiltersIndex))
        appliedFiltersIndex = JSON.parse(JSON.stringify(appliedFiltersIndex))
        // this.filters = [
        //     {name:"Star Rate", key:"starrating"},
        //     {name:"Price Range", key:"pricerange"},
        //     {name:"Guest Rate", key:""},
        //     {name:"Hotel Name", key:"name"},
        //     {name:"Hotel Type", key:"type"},
        //     {name:"Currency", key:"currency"},
        //     {name:"Reviews", key:""},
        //     {name:"Amenities", key:""}
        // ]

        // console.log('availableFiltersIndex', availableFiltersIndex)
        // console.log('appliedFiltersIndex', appliedFiltersIndex)
        this.state = {
            availableFiltersIndex,
            appliedFiltersIndex,
            ratingFilter: [false, false, false, true, true],
            minPrice: 50,
            maxPrice: 1000,
            minRating: 2.5,
            maxRating: 9.3,
            hotelName: '',
            hotelTypes: [
                { title: 'Hotel', value: true },
                { title: 'Apartment', value: true }
            ],
            currencyIndex: 0,
            currencies:[
                'USD',
                'EUR',
                'SAR',
                'CNY',
                'USD1',
                'EUR1',
                'SAR1',
                'CNY1',
                'USD2',
                'EUR2',
                'SAR2',
                'CNY2',
                'USD3',
                'EUR3',
                'SAR3',
                'CNY3',
            ],
            reviews: [
                { title: 'Excellent', value: true },
                { title: 'Good', value: true },
                { title: 'Average', value: true },
                { title: 'Bad', value: true },
            ],
            animaties: [
                { title: 'Free Internet', value: true },
                { title: 'Free Parking', value: true }
            ],
        }

        hotelFilterView = this
    }
    componentWillMount() {
        this.props.navigation.setParams({
            onRight: this.done,
            rightTitle: 'Apply',
        });
    }
    done() {
        let {result, searchPageData} = hotelFilterView.props.hotel
        let {appliedFiltersIndex} = hotelFilterView.state;
        let pageInfoIndex = searchPageData.request.pageInfoIndex || []
        if(pageInfoIndex[0]) {
            pageInfoIndex[0].item.currentPage = 0
        }

        searchPageData.request.filtersIndex[0] = {
            "code": "default",
            "sequence": 0,
            "properties": {},
            "item": appliedFiltersIndex,
            "config": [],
            "flags": {}
        }

        hotelFilterView.props.actions.searchHotelPage(searchPageData)

        Actions.pop()
    }
    renderStarRating(filter){
        let {appliedFiltersIndex} = this.state;
        let ratingFilterIndex = appliedFiltersIndex.find((o)=>o.name==filter.name)
        let ratingIndex = ["1","2","3","4","5"]
        var ratingFilter = ratingIndex.map((idx)=>ratingFilterIndex.values.indexOf(idx)!=-1)
        var that = this
        return (
            <RatingFilterBar
                title={'Star Rate'}
                data={ratingFilter}
                onChanged={(index) => {
                    ratingFilter[index] = !ratingFilter[index]
                    ratingFilterIndex.values = []
                    ratingFilter.map((val, idx)=>{
                        if(val) {
                            ratingFilterIndex.values.push(String(idx+1))
                        }
                    })

                    this.setState({appliedFiltersIndex})
                    this.forceUpdate()
                }}
            />
        )
    }
    renderCheckBox(filter) {
        if(!filter.values || !filter.values[0]) return null

        let {appliedFiltersIndex} = this.state;
        let filterIndex = appliedFiltersIndex.find((o)=>o.name==filter.name)
        let indexes = filter.values
        var selectedFilters = indexes.map((idx)=>{
            return {
                title:idx,
                value:filterIndex.values.indexOf(idx)!=-1
            }
        })

        //console.log('selectedFilters', selectedFilters)
        return (
        <SwitchEditor
            title={filter.name}
            value={selectedFilters}
            onChanged={index => {
                selectedFilters[index].value = !selectedFilters[index].value
                filterIndex.values = []
                selectedFilters.map((val, idx)=>{
                    if(val.value) {
                        filterIndex.values.push(val.title)
                    }
                })

                this.setState({appliedFiltersIndex})
                this.forceUpdate()
            }}
        />)
    }
    renderRadio(filter) {
        if(!filter.values || !filter.values[0]) return null
        let {appliedFiltersIndex} = this.state;
        let filterIndex = appliedFiltersIndex.find((o)=>o.name==filter.name)
        let index = filter.values.indexOf(filterIndex.defaultValue)

        return (
            <RadioSelector
                title={filter.name}
                options={filter.values}
                index={index}
                onChanged={(index) => {
                    filterIndex.defaultValue = filter.values[index]
                    this.setState({appliedFiltersIndex})
                    this.forceUpdate()
                }}
            />
        )
    }
    renderInput(filter) {
        let {appliedFiltersIndex} = this.state;
        let filterIndex = appliedFiltersIndex.find((o)=>o.name==filter.name)

        return (
            <InputFilter
                title={filter.name}
                value={filterIndex.defaultValue||''}
                onChanged={(value) => {
                    filterIndex.defaultValue = value
                    this.setState({appliedFiltersIndex})
                    this.forceUpdate()
                }}
            />
        )
    }
    renderRange(filter) {
        let {appliedFiltersIndex} = this.state;
        let filterIndex = appliedFiltersIndex.find((o)=>o.name==filter.name)
        let minValue = Number(filter.minValue)
        let maxValue = Number(filter.maxValue)

        console.log('---filter', filter, filterIndex)
        return (
            <RangeSelectBar
                step={(maxValue - minValue) > 1000?10:1}
                range={[minValue, maxValue]}
                minText={Number(filterIndex.minValue).toFixed(0)}
                maxText={Number(filterIndex.maxValue).toFixed(0)}
                value={[Number(filterIndex.minValue), Number(filterIndex.maxValue)]}
                onChanged={(minValue, maxValue) => {
                    filterIndex.minValue = minValue
                    filterIndex.maxValue = maxValue
                    this.setState({appliedFiltersIndex})
                    this.forceUpdate()
                }}
                title={filter.name}
            />
        )
    }
    renderFilter(filter) {
        switch(filter.type) {
            case 'checkBox': 
                if(filter.name == 'starrating') {
                    return this.renderStarRating(filter)
                } else {
                    return this.renderCheckBox(filter)
                }
            case 'radio':
                return this.renderRadio(filter)
            case 'input':
                return this.renderInput(filter)
            case 'range':
                return this.renderRange(filter)
        }

        return null;
    }
    render() {
        let { ratingFilter, minPrice, maxPrice, minRating, maxRating, hotelName, hotelTypes,
            currencyIndex, reviews, animaties, currencies } = this.state;
        
        let {availableFiltersIndex, appliedFiltersIndex} = this.state;

        return (
            <View style={styles.container}>
                <ScrollView>
                    {
                        availableFiltersIndex.map((filter)=>{
                            return this.renderFilter(filter)
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({ hotel }) => ({ hotel });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...hotelAction }, dispatch)
});

export default HotelFilter = connect(mapStateToProps, mapDispatchToProps)(HotelFilterC);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})