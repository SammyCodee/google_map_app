import React, { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-primary">
            <View
                style={{
                    flex: 1,
                }}
                className="p-4"
            >
                <SearchInput />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    className="flex-1 w-full pb-10 pt-4"
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.01, // Smaller value
                        longitudeDelta: 0.01, // Smaller value
                    }}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    scrollEnabled={true}
                    rotateEnabled={true}
                    pitchEnabled={true}
                ></MapView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    map: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
});
