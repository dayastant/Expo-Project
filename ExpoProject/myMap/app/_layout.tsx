
import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';


const RootLayout = () => {
    return (
       <Stack>
          <Stack.Screen name="index" options={{ title: 'MyMap',headerTitleAlign: "center" }} />
       </Stack>
    );
};
export default RootLayout;