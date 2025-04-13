import React, { useEffect, useRef, useState } from "react";
import SearchInput from "@/components/SearchInput";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Keyboard,
    Alert,
    TouchableOpacity,
    Animated,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Region, Marker } from "react-native-maps";
import {
    savedSearchHistory,
    getSearchHistory,
} from "@/utils/SavedSearchedInput";
import Constants from "expo-constants";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { debounce } from "lodash";
import { useNavigation } from "expo-router";

export default function Index() {
    const navigation = useNavigation();

    const mapRef = useRef<MapView>(null);

    const slideAnim = useRef(new Animated.Value(300)).current; // starts offscreen

    const [searchLocation, setSearchLocation] = useState<string>("");
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<{
        name: string;
        address: string;
    } | null>(null);

    /**
     * Initial region for the map is San Francisco
     */
    const [region, setRegion] = useState<Region>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Load the search history when the component mounts
    useEffect(() => {
        const loadHistory = async () => {
            const saved = await getSearchHistory();
            setSearchHistory(saved);
        };

        loadHistory();
    }, []);

    useEffect(() => {
        if (isInputFocused) {
            setSelectedPlace(null);
        }
    }, [isInputFocused]);

    /**
     * Hide the tab bar when a place is selected
     */
    useEffect(() => {
        navigation.setOptions({
            tabBarStyle: selectedPlace
                ? { display: "none" }
                : {
                      backgroundColor: "#2D2D44",
                      overflow: "hidden",
                      position: "absolute",
                      borderWidth: 1,
                      borderColor: "#2D2D44",
                      borderRadius: 50,
                      marginHorizontal: 20,
                      marginBottom: 36,
                      height: 52,
                      zIndex: 1,
                  }, // values here MUST be the same as _layout.tsx from (tabs) folder
        });
    }, [selectedPlace]);

    /**
     * Trigger Slide in/out
     */
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: selectedPlace ? 0 : 300,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [selectedPlace]);

    // Update the search history when a new location is searched
    const handleSearchLocation = async (newLocation: string) => {
        if (!newLocation) return;

        // 👇 Hide the keyboard
        Keyboard.dismiss();

        await searchPlaceAndMoveToLocation(newLocation);
        const updatedHistory = [newLocation, ...searchHistory];
        setSearchHistory(updatedHistory);
        await savedSearchHistory(updatedHistory);
        setSuggestions([]);
    };

    /**
     * Searches for a place and moves the map to the location.
     */
    const searchPlaceAndMoveToLocation = async (placeName: string) => {
        try {
            const apiKey = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json`;

            const response = await axios.get(apiUrl, {
                params: {
                    address: placeName,
                    key: apiKey,
                },
            });

            const data = response.data;

            if (data.status === "OK" && data.results?.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                const address = data.results[0].formatted_address;
                const name =
                    data.results[0].address_components?.[0]?.long_name ??
                    placeName;

                const newRegion = {
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                };

                setRegion(newRegion);
                setSelectedPlace({ name, address });

                mapRef.current?.animateToRegion(newRegion, 1000);
            } else {
                console.warn("❌ No results found:", data.status);
                Alert.alert(
                    "Location Not Found",
                    data.error_message || data.status
                );
            }
        } catch (error: any) {
            console.error("❌ Search error:", error);
            Alert.alert("Error", error.message || "Failed to search location.");
        }
    };

    const handleZoom = (zoomIn: boolean) => {
        const factor = zoomIn ? 0.5 : 2;
        const newRegion = {
            ...region,
            latitudeDelta: region.latitudeDelta * factor,
            longitudeDelta: region.longitudeDelta * factor,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 300);
    };

    // Debounced input handler for real-time suggestions
    const handleInputChange = debounce(async (query: string) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        const apiKey = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            query
        )}&key=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            const data = response.data;

            if (data.status === "OK" && data.predictions) {
                setSuggestions(
                    data.predictions.map(
                        (prediction: any) => prediction.description
                    )
                );
            }
        } catch (error) {
            console.error("Suggestions error:", error);
        }
    }, 500); // 500ms debounce

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
                    onInputChange={(text) => {
                        setSearchLocation(text); // update value immediately
                        handleInputChange(text);
                    }}
                    onFocusChange={setIsInputFocused}
                />

                {!isInputFocused && <View className="mt-2 mb-2" />}

                {/* Display real-time search suggestions */}
                {suggestions.length > 0 && (
                    <View className="mt-2">
                        <View className="mb-2">
                            <Text className="text-white">Suggestions</Text>
                        </View>
                        {suggestions.map((suggestion, index) => (
                            <Text
                                key={index}
                                className="py-2 px-4 bg-white rounded-md mb-2 text-black"
                                onPress={() => handleSearchLocation(suggestion)}
                            >
                                {suggestion}
                            </Text>
                        ))}
                    </View>
                )}

                {isInputFocused && (
                    <View className="mt-2">
                        {searchHistory.length > 0 && (
                            <View className="mb-2">
                                <Text className="text-white">Recent</Text>
                            </View>
                        )}

                        {/* Search History List (show 5)*/}
                        {searchHistory.slice(0, 5).map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    className="flex-row items-center justify-between bg-white rounded-md mb-2 px-4 py-2"
                                >
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

                                    <Feather
                                        name="x"
                                        size={20}
                                        color="black"
                                        onPress={() => {
                                            const updated =
                                                searchHistory.filter(
                                                    (h, i) => i !== index
                                                );
                                            setSearchHistory(updated);
                                            savedSearchHistory(updated);
                                        }}
                                    />
                                </View>
                            );
                        })}
                        {/* Clear History Button */}
                        {searchHistory.length > 0 && (
                            <View className="mt-2 mb-4">
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
                )}

                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    className="flex-1 w-full"
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.01, // Smaller value
                        longitudeDelta: 0.01, // Smaller value
                    }}
                    zoomEnabled={true}
                    zoomControlEnabled={false} // <--- hide native controls
                    scrollEnabled={true}
                    rotateEnabled={true}
                    pitchEnabled={true}
                >
                    <Marker
                        coordinate={{
                            latitude: region?.latitude,
                            longitude: region?.longitude,
                        }}
                        pinColor="red" // ← This makes the marker red
                    />
                </MapView>

                {selectedPlace && (
                    <Animated.View
                        style={{
                            transform: [{ translateY: slideAnim }],
                        }}
                        className="absolute bottom-0 left-0 right-0 bg-secondary p-6 rounded-t-3xl shadow-lg z-10 h-1/5"
                    >
                        <Text className="text-lg font-bold text-white">
                            📍 {selectedPlace?.name}
                        </Text>
                        <Text className="text-white mt-1">
                            {selectedPlace?.address}
                        </Text>
                        <TouchableOpacity
                            className="absolute top-2 right-4"
                            onPress={() => setSelectedPlace(null)}
                        >
                            <Text className="text-white text-xl">✕</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {!selectedPlace && (
                    <View className="absolute right-6 bottom-28 z-10 space-y-3 gap-2">
                        <Feather
                            name="plus"
                            size={24}
                            color="white"
                            className="bg-black/70 p-2 rounded-full"
                            onPress={() => handleZoom(true)}
                        />
                        <Feather
                            name="minus"
                            size={24}
                            color="white"
                            className="bg-black/70 p-2 rounded-full"
                            onPress={() => handleZoom(false)}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
});
