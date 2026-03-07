import {View , Text ,StyleSheet} from 'react-native';
import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const Page = () => {
    return (
        <View style={{ flex: 1 }}>
            <MapView 
            provider={PROVIDER_GOOGLE}
              style={StyleSheet.absoluteFill } />
        </View>
    );
};

export default Page;