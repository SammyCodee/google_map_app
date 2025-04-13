import React, { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
    savedSearchHistory,
    getSearchHistory,
} from "@/utils/SavedSearchedInput";

export default function Index() {
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    console.log("🚀 ~ Index ~ searchHistory:", searchHistory);

    // Load the search history when the component mounts
    useEffect(() => {
        const loadHistory = async () => {
            const saved = await getSearchHistory();
            setSearchHistory(saved);
        };

        loadHistory();
    }, []);

    // Update the search history when a new location is searched
    const handleSearchLocation = async (newLocation: string) => {
        const updatedHistory = [newLocation, ...searchHistory];
        setSearchHistory(updatedHistory);
        await savedSearchHistory(updatedHistory);
    };

    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-primary">
            <View
                style={{
                    flex: 1,
                }}
                className="p-4"
            >
                <SearchInput
                    searchLocation={searchLocation}
                    setSearchLocation={setSearchLocation}
                    onSearch={handleSearchLocation}
                />
                <View className="mt-2">
                    {/* Search History List (show 5)*/}
                    {searchHistory.slice(0, 5).map((item, index) => {
                        return (
                            <Text
                                key={index}
                                className="py-2 px-4 bg-white rounded-md mb-2 text-black"
                                onPress={() => {
                                    setSearchLocation(item);
                                    handleSearchLocation(item);
                                }}
                            >
                                {item}
                            </Text>
                        );
                    })}
                    {/* Clear History Button */}
                    {searchHistory.length > 0 && (
                        <View className="mt-2">
                            <Text
                                onPress={() => {
                                    setSearchHistory([]);
                                    savedSearchHistory([]);
                                }}
                                className="text-red-500 text-center"
                            >
                                Clear History
                            </Text>
                        </View>
                    )}
                </View>
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
                />
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
