import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';

export default class MyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Calendar
          onDayPress={(day)=>this.onDayPress(day)}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {
              selected: true, 
              disableTouchEvent: true}}}
        />
        <CalendarList
        current={'2019-05-16'}
        pastScrollRange={24}
        futureScrollRange={24}
        horizontal
        pagingEnabled
        onDayPress={(day)=>this.onDayPress(day)}
        style={styles.calendar}
        markedDates={{[this.state.selected]: {
            selected: true, 
            disableTouchEvent: true}}}
      />
      </View>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});