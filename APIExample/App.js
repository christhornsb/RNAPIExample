/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { search } from './assets/icons' // Import for search icon, typically best practice

const apiHost = "https://bakesaleforgood.com" // the api that is being filtered/utilized, swap out for any value you need.

const App = () => {
  
  const [deals, setDeals] = React.useState([]) // Hook that feeds JSONdata into variable for manipulation.

  const fetchInitialDeals = async() => { // Pulls data from JSON Api linked in apiHost variable
    try{
        const response = await fetch(apiHost + '/api/deals')
        const responseJson = await response.json()
        setDeals(responseJson);
    } catch(e) {
        console.error(error)
    } 
  }
  const fetchSearch = async(term) => { // Used to locate specific search terms via user input.
    try{
        const response = await fetch(apiHost + '/api/deals?searchTerm=' + term)
        const responseJson = await response.json()
        setDeals(responseJson);
    } catch(e) {
        console.error(error)
    } 
  }


  React.useEffect(() => { // Hook that loads JSON data once fetched via fetchInitialDeals(), and refreshes data as it adjusts.
    fetchInitialDeals();
  }, []);

  const renderItem = ({item}) => { // This returns the display for every "card" corresponding to each portion of JSON data within the deals variable (edit this to change what is displayed via JSON data)
    return (
      <View>
        <View style={{flexDirection: 'column', marginBottom: 10, backgroundColor: "white", borderRadius: 5, ...styles.shadow, width: '97%', alignSelf: 'center', top: 5}}>
          <Image source={{ uri: item.media[0] }} resizeMode="cover" style={{ width: '96%', height: 200, borderRadius: 12, alignSelf: 'center', marginTop: 10}} />

          <Text style={{fontSize: 16, fontWeight: 'bold', left: 7, marginTop: 5, flexWrap: 'wrap'}}>{item.title}</Text>

          <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', marginTop: 5}}>
            <Text style={{left: 8, fontSize: 15, color: "gray"}}>{item.cause.name}</Text>

            <Text style={{right: 8, fontSize: 16, color: 'green'}}>${item.price}</Text>
          </View>

        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#ffff"}}>
      <View style={styles.searchBarView}>
        <Image source={search} resizeMode='contain' style={{width: 20, height: 20, alignSelf: 'center', left: 8}} />
        <TextInput placeholder="Search here..." onChangeText={(item) => fetchSearch(item)}  style={{ left: 15, fontSize: 17}}/>
      </View>
      <FlatList // This is what loads the "cards", or the JSON data, into the list format that is initiated above via renderItem
        data={deals} // pulls JSON data from the deals variable
        renderItem={renderItem} // formats the list via the renderItem return
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarView: {
    flexDirection: 'row', 
    backgroundColor: '#ffff', 
    shadowColor: "#000", // for iphone drop shadow (specifies the android equivalent, elevation: 1)
    shadowOffset: {
        width: 0,
        height: .5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1, 
    marginBottom: 12, 
    marginTop: 5, 
    width: '95%', 
    alignSelf: 'center', 
    borderRadius: 50, 
    fontSize: 17, 
    height: 32, 
    justifyContent: 'flex-start'
  },
  shadow: {
    shadowColor: "#000", // for iphone drop shadow (specifies the android equivalent, elevation: 1)
    shadowOffset: {
        width: 0,
        height: .5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1
 },

});

export default App;
