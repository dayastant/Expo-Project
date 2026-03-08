import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system/legacy';

import {shareAsync} from 'expo-sharing';

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Page = () => {
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [locationGranted, setLocationGranted] = useState(false);
  const mapRef = useRef<MapView>(null);

  // Update region when map moves
  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  // Focus map to New York
  const focusMap = () => {
    const newYorkRegion = {
      latitude: 40.7128,
      longitude: -74.0060,
      latitudeDelta: 2,
      longitudeDelta: 2,
    };

    mapRef.current?.animateToRegion(newYorkRegion, 1000);
  };

  const takeSnapshotAndShare = async () => {
    const snapshot = await mapRef.current?.takeSnapshot({
      width: 300,
      height: 300,
      result: 'base64',
    });

    const uri = FileSystem.documentDirectory + 'map-snapshot.png';
    await FileSystem.writeAsStringAsync(uri, snapshot!, {
       encoding: FileSystem.EncodingType.Base64 
      });
    await shareAsync(uri);

  };

  // Zoom into current location
  const zoom = () => {
    const zoomRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current?.animateToRegion(zoomRegion, 1000);
  };

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
    <>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          mapType="standard"
          style={StyleSheet.absoluteFill}
          showsUserLocation={locationGranted}
          showsMyLocationButton={locationGranted}
          rotateEnabled={false}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={focusMap}>
          <Ionicons name="business" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={zoom}>
          <Ionicons name="earth" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={takeSnapshotAndShare}>
          <Ionicons name="camera" size={24} />
        </TouchableOpacity>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    top: 15,
    left: 20,
    gap: 10,
  },

  btn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Page;