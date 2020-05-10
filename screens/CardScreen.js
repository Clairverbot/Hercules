import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
var moment = require('moment');
const cardImg=require('../assets/images/cardbg.png')

var data = [
  // { title: 'Rewards', date: moment().format('D MMM yyyy h:mm a'), amount: 0.2, reward: true },
  { title: 'Bus 186', date: moment().format('D MMM yyyy'), amount: 1.44 },
]
export default function CardScreen() {
  return (
    <View style={styles.container}>
      {/* todo : card */}
      <View style={styles.cardContainer}>
        <Image source={cardImg} ></Image>
        <Text style={styles.cardText}>$5.13</Text>
      </View>
      <View style={styles.transactionTitleBar}><Text>Transactions</Text></View>
      <SafeAreaView style={{ flex: 12 }}>
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <View style={styles.listItem}>
              <Ionicons
                style={{ flex: 1 }}
                name={item.reward ? "md-gift" : "md-train"}
                size={18}
                color={item.reward ? "#EF7922" : "#0D7B9C"}
              />
              <View style={{ flex: 5 }}>
                <Text style={styles.listDate}>{item.date}</Text>
                <Text style={styles.listTitle}>{item.title}</Text>
              </View>
              <Text style={{ flex: 1, textAlign: 'right', color: item.reward ? "#00D649" : "#000", fontWeight: 'bold' }}>{item.reward ? "+ $" + item.amount : "- $" + item.amount}</Text>
            </View>
          }
          keyExtractor={(item, index) => item + index}
        />
      </SafeAreaView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cardContainer: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  cardText: {
    position:'absolute',
    left:67,
    top:60,
    color:'#fff',
    fontWeight:'bold',
    fontSize:24
  },
  transactionTitleBar: {
    backgroundColor: '#f8f8f8',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 32,
    flex: 1
  },
  listItem: {
    marginHorizontal: 32,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listTitle: {
    fontSize: 16,
    paddingTop: 4,
  },
  listDate: {
    color: '#747474',
    fontSize: 12
  }
});
