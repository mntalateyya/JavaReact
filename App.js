/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, NativeModules, Button } from 'react-native';
import BackgroundTask from 'react-native-background-task';
import { AsyncStorage } from "react-native";
import moment from 'moment';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const arHMonths = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر",
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];
const enHMonths = [
  "Muharram", "Safar", "Rabee I", "Rabee II",
  "Jumaada I", "Jumaada II", "Rajab", "Shaaban",
  "Ramadan", "Shawwal", "Thul Qaada", "Thul Hijja"
];

const arGMonths = [
  "يناير", "فبراير", "مارس", "أبريل",
  "مايو", "يونيو", "يوليو", "أغسطس",
  "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];
const enGMonths = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

BackgroundTask.define(() => {
  try {
    let date = moment().date();
    getDateData(moment().format('DD-MM-YYYY'));
    getDateData(moment().date(date+1).format('DD-MM-YYYY'));
    getDateData(moment().date(date+2).format('DD-MM-YYYY'));
  } catch (error) {
     // Error retrieving data
  }
});

async function getDateData(dateString) {
  const value = await AsyncStorage.getItem(dateString);
  if (value !== null) {
    return value;
  } else {
    fetch("http://api.aladhan.com/v1/timings/"+dateString+"?latitude=25.28&longitude=51.52&method=10")
    .then(response => response.json())
    .then(result => {
      AsyncStorage.setItem(dateString, result)
    });
  }
}

function parseJson(obj) {
  return {
    weekday: obj.,
    hDay: 12,
    gDay: 7,
    hMonth: 4,
    gMonth: 2,
    Fajr: [0, 0],
    Ishraq: [0, 0],
    Duhr: [0, 0],
    Asr: [0,0],
    Maghrib: [0, 0],
    Isha:[0, 0]
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arWeekday: '',
      enWeekday: '',
      hDay: 12,
      gDay: 7,
      hMonth: 4,
      gMonth: 2,
      Fajr: [0, 0],
      Ishraq: [0, 0],
      Duhr: [0, 0],
      Asr: [0,0],
      Maghrib: [0, 0],
      Isha:[0, 0]
    };


  }
  render() {
    return (
      <View style={styles.container}>
        <DateComponent 
          arWeekday={this.state.arWeekday}
          enWeekday={this.state.enWeekday}
          hDay={this.state.hDay}
          gDay={this.state.gDay}
          hMonth={this.state.hMonth}
          gMonth={this.state.gMonth}/>
        <View style={styles.Row}>
          <Text style={styles.time}>A</Text>
          <Text style={styles.time}>B</Text>
          <Text style={styles.time}>C</Text>
        </View>
        <View style={styles.Row}>
          <Text style={styles.time}>D</Text>
          <Text style={styles.time}>D</Text>
          <Text style={styles.time}>E</Text>
        </View>
      </View>
    );
  }
}


class DateComponent extends Component {
  render() {
    return (
      <View style={styles.dateBanner}>
        <View style={styles.dateCell}>
          <Text>{this.props.gDay}</Text>
          <Text>{arGMonths[this.props.gMonth - 1]}</Text>
          <Text>{enGMonths[this.props.gMonth - 1]}</Text>
        </View>
        <View style={styles.daysCell}>
          <Text style={styles.dayName}>{this.props.arWeekday}</Text>
          <Text style={styles.dayName}>{this.props.enWeekday}</Text>
        </View>
        <View style={styles.dateCell}>
          <Text>{this.props.hDay}</Text>
          <Text>{arHMonths[this.props.hMonth - 1]}</Text>
          <Text>{enHMonths[this.props.hMonth - 1]}</Text>
        </View>
      </View>
    );
  }
}

class PrayertimeView extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.arName}</Text>
        <Text>{this.props.enName}</Text>
        <Text>{this.props.time[0]}</Text>
        <Text>{this.props.time[1]}</Text> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  time: {
    flex: 1,
    margin: 8,
    padding: 8,
    backgroundColor: 'skyblue'
  },
  dateBanner: {
    flexDirection: 'column'
  },
  dateCell: {
    flexDirection: 'column'
  },
  daysCell: {
    flexDirection: 'column'
  },
  dayName: {
    fontSize: 24,
    color: 'blue'
  }
});
