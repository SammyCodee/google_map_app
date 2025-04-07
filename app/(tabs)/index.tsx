import { Text, View, SafeAreaView } from "react-native";

export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Edit app/index.tsx to edit this screen.</Text>
                <View className="bg-red-500 flex-1">
                    <Text className="text-white">Test</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
