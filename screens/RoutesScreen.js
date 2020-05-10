import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, Button, View, SectionList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
var moment = require('moment');
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';

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
        <View style={{ display: 'flex', flexDirection: 'row', alignItems:'center' }}>{data.route.map((r, i) => {
          return i > 0 ? [<FontAwesome style={{paddingHorizontal:10}} name='refresh' />, <FontAwesome name='bus' />, <Text style={{paddingLeft:8}}>{r.name}</Text>] : [<FontAwesome name='bus' />, <Text style={{paddingLeft:8}}>{r.name}</Text>]
        })}</View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {data.crowd / 33 <= 1 ?
            <FontAwesome name="child" size={18} color="#00D649" />
            : data.crowd / 66 <= 1 ?
              [
                <FontAwesome name="child" size={18} color="#EF7922" key="123a" />,
                <FontAwesome name="child" size={18} color="#EF7922" key="456a" />,
              ] :
              [
                <FontAwesome name="child" size={18} color="#CD0000" key="123b" />,
                <FontAwesome name="child" size={18} color="#CD0000" key="456b" />,
                <FontAwesome name="child" size={18} color="#CD0000" key="789b" />,
              ]
          }
        </View>
      </View>
      <View style={{ position: 'absolute', right: 12, textAlign: 'right' }}>
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
  const [location, setLocation] = useState(null);
  const [Data, setData] = useState(null);
  const [got, setGot] = useState(null);
  const officeLocation = "1.2780324,103.8528832"
  const schoolLocation = "1.3098588,103.7782589"
  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (got !== 'yes') {
        console.log(got)
        let startLoc = location.coords.latitude + "," + location.coords.longitude
        let Data = await getRoute(startLoc, officeLocation)
        setData(Data)
        let got = 'yes'
        setGot(got)
      }
    })();
  });
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
        {Data !== undefined ?
          <SectionList
            sections={Data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <RouteItem data={item} />}
            renderSectionHeader={({ section: { title } }) => <RouteHeader title={title} />}
          />
          :
          <Text>Loading</Text>
        }
      </SafeAreaView>
    </View>
  );
}

async function getRoute(startLatLong, endLatLong) {
  try {
    let response = await fetch('https://GrippingScalyWebpage--clairverbot.repl.co/getRoute?startLatLong=' + startLatLong
      + "&endLatLong=" + endLatLong + "&date=" + moment().format('yyyy-MM-DD') + "&time=" + moment().format('HH:mm:ss'));
    let responseJson = await response.json();
    // console.log(responseJson.plan.itineraries)

    let d = []
    responseJson.plan.itineraries.map((i, index) => {
      let route = []
      i.legs.forEach(l => {
        if (l.mode === "BUS") {
          route.push({ type: 'bus', name: l.route })
        }
      })
      let item = {
        route: route,
        duration: Math.round(i.duration / 60),
        crowd: 60 / (index + 1),
        fare: { original: i.fare },
        preferred: false
      }
      d.push(item)
    })
    console.log(d)
    return [{ title: "Office", data: d }];
  } catch (error) {
    console.error(error);
  }
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
    flex: 8,
    alignSelf: 'center',
    width: '80%'
  },
  accordionHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 12
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
