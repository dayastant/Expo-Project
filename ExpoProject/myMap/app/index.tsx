import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Page = () => {
  const [region, setRegion] = useState(INITIAL_REGION);
  const [locationGranted, setLocationGranted] = useState(false);
  const mapRef = useRef<MapView>(null);

  // Request location permission
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to show your location'
        );
        return;
      }
      setLocationGranted(true);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        style={StyleSheet.absoluteFill}
        showsUserLocation={locationGranted}
        showsMyLocationButton={locationGranted} // Android only
        zoomControlEnabled
        rotateEnabled={false}
        region={region}
        onRegionChangeComplete={(r) => setRegion(r)}
      />
    </View>
  );
};

export default Page;