import { View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
interface SearchInputProps {
    searchLocation: string;
    setSearchLocation: (value: string) => void;
    onSearch: (location: string) => void;
    onInputChange?: (value: string) => void;
    onFocusChange?: (isFocused: boolean) => void;
}

export default function SearchInput({
    searchLocation,
    setSearchLocation,
    onSearch,
    onInputChange,
    onFocusChange,
}: SearchInputProps) {
    const handleTextChange = (text: string) => {
        setSearchLocation(text);
        if (onInputChange) {
            onInputChange(text); // Fire real-time suggestion handler
        }
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
                onFocus={() => {
                    onFocusChange?.(true);
                }}
                onBlur={() => onFocusChange?.(false)}
            />
            <TouchableOpacity onPress={handleSubmit}>
                <Feather name="arrow-right-circle" size={24} color="#aaa" />
            </TouchableOpacity>
        </View>
    );
}
