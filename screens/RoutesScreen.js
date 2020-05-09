import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, Button, View, SectionList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
var moment = require('moment');
import { FontAwesome } from '@expo/vector-icons';

var data = [
  {
    title: 'Office',
    data: [
      {
        route: [
          { type: 'train', line: 'CC', name: 'Farrer Road' },
          { type: 'train', line: 'DT', name: 'Botanic Gardens' },
          { type: 'train', line: 'DT', name: 'Downtown' },
        ],
        duration: 30,
        crowd: 80,
        fare: { original: 1.44 },
        preferred: true
      },
      {
        route: [
          { type: 'train', line: 'CC', name: 'Farrer Road' },
          { type: 'train', line: 'EW', name: 'Buona Vista' },
          { type: 'train', line: 'EW', name: 'Raffles Place' },
          { type: 'walk' },
        ],
        duration: 32,
        crowd: 20,
        fare: { original: 1.38 }
      },
      {
        route: [
          { type: 'bus', name: '174' },
          { type: 'bus', name: '167e' },
        ],
        duration: 34,
        crowd: 10,
        fare: { original: 2.04, discount: 1.44 }
      },
    ]
  },
  {
    title: 'School',
    data: [
      {
        route: [
          { type: 'train', line: 'CC', name: 'Farrer Road' },
          { type: 'train', line: 'EW', name: 'Buona Vista' },
          { type: 'train', line: 'EW', name: 'Dover' },
        ],
        duration: 15,
        crowd: 50,
        fare: { original: 0.84 },
        preferred: true
      },
      {
        route: [
          { type: 'train', line: 'CC', name: 'Farrer Road' },
          { type: 'train', line: 'CC', name: 'Holland Village' },
          { type: 'bus', name: '106' },
        ],
        duration: 16,
        crowd: 20,
        fare: { original: 0.74 }
      }
    ]
  }
]
function RouteItem({ data }) {
  return (
    <View style={styles.card}>
      <View>
        <FontAwesome name={data.preferred ? "star" : "star-o"} color={data.preferred ? "#EF7922" : "#747474"} size={24} />
      </View>
      <View style={{ paddingLeft: 12 }}>
        <Text>{data.duration}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {data.crowd / 33 <= 1 ?
            <FontAwesome name="child" size={18} color="#00D649" />
            : data.crowd / 66 <= 1 ?
              [
                <FontAwesome name="child" size={18} color="#EF7922" />,
                <FontAwesome name="child" size={18} color="#EF7922" />,
              ] :
              [
                <FontAwesome name="child" size={18} color="#CD0000" />,
                <FontAwesome name="child" size={18} color="#CD0000" />,
                <FontAwesome name="child" size={18} color="#CD0000" />,
              ]
          }
        </View>
      </View>
      <View style={{ position: 'fixed', right: 12, textAlign:'right' }}>
        <Text>{data.duration > 60 ? Math.floor(data.duration / 60) + "hr " + data.duration % 30 + "min" : data.duration + " min"}</Text>
        <Text>{"$ " + data.fare.original}</Text>
      </View>
    </View>
  );
}
function RouteHeader({ title }) {
  return (
    <TouchableOpacity style={styles.accordionHeaderContainer}>
      <Text style={styles.accordionHeaderText}>{title}</Text>
      <FontAwesome
        name="angle-up"
        size={24}
      />
    </TouchableOpacity>
  )
}
export default function RoutesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.currentInfoContainer}>
          <View style={styles.individualInfoContainer}>
            <Text>Depart :  </Text>
            <TouchableOpacity>
              {/* todo timepicker */}
              <Text style={styles.infoTouchableOpacity}>{moment().add(10, 'minutes').format('h:mm a')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.individualInfoContainer}>
            <Text>From :  </Text>
            <TouchableOpacity>
              {/* todo: location picker */}
              <Text style={styles.infoTouchableOpacity}>Current Location</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
      <SafeAreaView style={styles.listContainer}>
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <RouteItem data={item} />}
          renderSectionHeader={({ section: { title } }) => <RouteHeader title={title} />}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 18,
  },
  currentInfoContainer: {
    backgroundColor: '#f8f8f8',
    width: '100%',
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  individualInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoTouchableOpacity: {
    color: '#EF7922',
    fontWeight: 'bold'
  },
  listContainer: {
    flex: 6,
    alignSelf: 'center',
    width: '80%'
  },
  accordionHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  accordionHeaderText: {
    fontSize: 18,
  },
  card: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#ccc',
    padding: 12,
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }
});
