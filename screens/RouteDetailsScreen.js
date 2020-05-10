import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
var moment = require('moment');

import { MonoText } from '../components/StyledText';

export default function RouteDetailsScreen({ route, navigation }) {
  const data = route.params;
  console.log(data)
  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#f8f8f8' }}>{data.route.map((r, i) => {
        return i > 0 ? [<FontAwesome style={{ paddingHorizontal: 10 }} name='refresh' />, <FontAwesome name='bus' />, <Text style={{ paddingLeft: 8 }}>{r.name}</Text>] : [<FontAwesome name='bus' />, <Text style={{ paddingLeft: 8 }}>{r.name}</Text>]
      })}</View>

      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 16 }}>
        {data.crowd > 30 ? <Text>Depart at {moment().add(30, 'minutes').format('hh:mm a')} instead?</Text> : <Text>Depart at {moment().add(5, 'minutes').format('hh:mm a')}</Text>}
        <Text>Estimated Time Taken: {data.crowd > 30 ? data.duration - 5 : data.duration} mins</Text>
        <Text style={{ color: data.crowd > 30 ? '#00D649' : "#000" }}>Fare: $ {data.crowd > 30 ? data.fare.original - 0.6 : data.fare.original}</Text>
      </View>

      <View style={{ position: 'absolute', bottom: 16, left: 36, marginHorizontal: 16, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Routes') }} style={{ width: '40%', borderColor: '#EF7922', borderWidth: 1, borderRadius: 5, padding: 16 }}><Text style={{ color: '#EF7922', textAlign: 'center' }}>Cancel</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Card') }} style={{ width: '40%', backgroundColor: '#EF7922', borderRadius: 5, padding: 16 }}><Text style={{ color: '#fff', textAlign: 'center' }}>Proceed</Text></TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
