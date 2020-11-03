import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'

import Header from '@components/home/dateHeader'
import { Actions } from 'react-native-router-flux'
import Calendar from 'react-native-calendario';
import Color from '@common/color'
import moment, { isMoment } from 'moment'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hotelAction from '@store/hotel';

let dateView = null
class SelectDateC extends PureComponent {
    constructor(props) {
        super(props)
        this.state={
            startDate: this.props.hotel.fromDate,
            endDate: this.props.hotel.toDate,
        }
        dateView = this
    }
    componentWillMount() {
        this.props.navigation.setParams({
            onRight: this.done,
            rightTitle: 'DONE',
        });
    }
    done() {
        let {startDate, endDate} = dateView.state
        if(startDate && endDate) {
            if(moment(startDate).format('YYYYMMDD') == moment(endDate).format('YYYYMMDD')) {
                return alert('Please select valid Check-in/Check-out dates.')
            }
            dateView.props.actions.selectDate(startDate, endDate)
            Actions.pop()
        }
    }
    renderDay(item){
        let {date,
            isVisible,
            isActive,
            isStartDate,
            isEndDate,
            isMonthDate,
            isOutOfRange} = item
        let containerStyle=isStartDate||isEndDate?styles.startDateContainer:{}
        let textStyle=isStartDate||isEndDate?{color:'white'}:{color:Color.primary}
        let sundayStyle=date.getDay()==0?{color:Color.orange}:{}
        let A = moment(new Date()).format('DD/MM/YYYY')
        let B = moment(date).format('DD/MM/YYYY')
        let isToday = (A === B)
        return (
            <View style={styles.virtualContainer}>
                {isStartDate&&!isEndDate&&<View style={styles.start}/>}
                {!isStartDate&&isEndDate&&<View style={styles.end}/>}
                <View style={containerStyle}>
                    <Text style={[styles.dayText, textStyle, sundayStyle]}>{date.getDate()}</Text>
                    {isToday&&<Text style={styles.todayText}>TODAY</Text>}
                </View>
            </View>
        )
    }

    setRange(range){
        this.setState({startDate:range.startDate, endDate: range.endDate})
    }

    render() {
        let {startDate, endDate} = this.state
        return (
            <View style={styles.container}>
                <Header
                    fromDate={startDate?startDate:new Date()}
                    toDate={endDate?endDate:(startDate?startDate: new Date())}
                />
                <Calendar
                    onChange={range => this.setRange(range)}
                    minDate={moment().format('YYYY-MM-DD')}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    monthNames={['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']}
                    dayNames={['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']}
                    renderDayContent={(props)=>this.renderDay(props)}
                    monthHeight={310}
                    numberOfMonths={36}
                    theme={{
                        weekColumnTextStyle: {
                            color: 'black',
                            fontSize:10
                        },
                        weekColumnStyle: {
                            marginVertical: 5,
                            paddingVertical: 8,
                            backgroundColor:Color.lightBack
                        },
                        weekColumnsContainerStyle: {
                            backgroundColor: 'white',
                        },
                        monthTitleTextStyle: {
                            color: Color.lightPrimary,
                            fontSize: 16,
                        },
                        nonTouchableDayContainerStyle: {
                            backgroundColor: 'white',
                        },
                        nonTouchableDayTextStyle: {
                            color: 'grey',
                        },
                        dayTextStyle: {
                            color: Color.calendarDate,
                            fontSize: 18
                        },
                        dayContainerStyle:{
                            height:30,
                            paddingVertical:0,
                            justifyContent:'center'
                        },
                        activeDayContainerStyle: {
                            backgroundColor: 'rgb(161, 215, 226)',
                            paddingVertical:0,
                            height:30,
                            justifyContent:'center',
                        },
                        activeDayTextStyle: {
                            color: Color.lightPrimary,
                        },
                        endDateContainerStyle:{
                            backgroundColor:'white',
                        },
                        startDateContainerStyle:{
                            backgroundColor:'white',
                        },
                    }}
                />
            </View>
        )
    }
}
const mapStateToProps = ({ hotel }) => ({ hotel });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...hotelAction }, dispatch)
});
export default SelectDate = connect(mapStateToProps, mapDispatchToProps)(SelectDateC);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    startDateContainer:{
        backgroundColor:Color.lightPrimary, 
        width:30, 
        height:30, 
        borderRadius:15, 
        alignItems:'center', 
        justifyContent:'center'
    },
    dayText:{
        fontSize:18
    },
    todayText:{
        fontSize:8,
        color: Color.orange
    },
    virtualContainer:{
        backgroundColor:'transparent',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    start:{
        position:'absolute',
        width:'50%',
        height:'100%',
        right:-StyleSheet.hairlineWidth,
        top:0,
        backgroundColor:'rgb(161, 215, 226)'
    },
    end:{
        position:'absolute',
        width:'50%',
        height:'100%',
        left:-StyleSheet.hairlineWidth,
        top:0,
        backgroundColor:'rgb(161, 215, 226)'
    }
})