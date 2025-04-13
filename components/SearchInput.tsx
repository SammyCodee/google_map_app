import { View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
interface SearchInputProps {
    searchLocation: string;
    setSearchLocation: (value: string) => void;
    onSearch: (location: string) => void;
}

export default function SearchInput({
    searchLocation,
    setSearchLocation,
    onSearch,
}: SearchInputProps) {
    const handleTextChange = (text: string) => {
        setSearchLocation(text);
    };

    const handleSubmit = () => {
        if (searchLocation.trim() !== "") {
            onSearch(searchLocation);
            setSearchLocation(""); // Clear the input field after search
        }
    };

    return (
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-md min-h-14">
            <AntDesign name="search1" size={20} color="#aaa" />
            <TextInput
                placeholder="Search here"
                placeholderTextColor="#aaa"
                className="ml-3 flex-1 text-base text-black"
                value={searchLocation}
                onChangeText={handleTextChange}
                onSubmitEditing={handleSubmit} // Handle submit event (Enter key or search button)
                returnKeyType="search"
            />
            <TouchableOpacity onPress={handleSubmit}>
                <Feather name="arrow-right-circle" size={24} color="#aaa" />
            </TouchableOpacity>
        </View>
    );
}
