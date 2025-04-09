import { View, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SearchInput() {
    return (
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-md min-h-14">
            <AntDesign name="search1" size={20} color="#aaa" />
            <TextInput
                placeholder="Search here"
                placeholderTextColor="#aaa"
                className="ml-3 flex-1 text-base text-black"
            />
        </View>
    );
}
