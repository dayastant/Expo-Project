import { View,  StyleSheet } from 'react-native';
import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const Page = () => {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                mapType='standard'
                style={StyleSheet.absoluteFill}
                showsUserLocation
                showsMyLocationButton
                rotateEnabled={false}
                 />
                
        </View>
    );
};

export default Page;