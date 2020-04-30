import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, PermissionsAndroid, Dimensions, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager'
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';




const LOCATION_TASK_NAME = 'background-location-task';


export default function App() { 


  async function getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
    });
  }

  useEffect(() => {
    getLocationAsync();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="red" /> 
      <View style={styles.container}>
        <MapView 
          followsUserLocation={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={styles.mapStyle} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
  if (error) {
    console.log(error.message)
    return;
  }
  console.log('Received new locations', locations); 
  Axios.get('https://jsonplaceholder.typicode.com/posts').then(value => console.log(value))
});