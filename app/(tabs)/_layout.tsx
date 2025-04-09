import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

interface TabIconTypes {
    focused: boolean;
    title: string;
}

const TabIcon = ({ focused, title }: TabIconTypes) => {
    const iconName = () => {
        if (title === "Home") {
            return "home";
        }
        if (title === "Profile") {
            return "user";
        }
    };

    if (focused) {
        return (
            <View className="min-h-16 min-w-24 justify-center items-center mt-4 rounded-full">
                <AntDesign name={iconName()} size={20} color={"#E67E22"} />
                <Text className="text-accent2 text-base font-semibold">
                    {title}
                </Text>
            </View>
        );
    }
    return (
        <View className="min-h-16 min-w-24 justify-center items-center mt-4 rounded-full">
            <AntDesign name={iconName()} size={20} color={"#ffffff"} />
            <Text className="text-textPrimary text-base font-semibold">
                {title}
            </Text>
        </View>
    );
};

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#2D2D44",
                    overflow: "hidden",
                    position: "absolute",
                    borderWidth: 1,
                    borderColor: "#2D2D44",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <TabIcon title={"Home"} focused={focused} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <TabIcon title={"Profile"} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default _Layout;
