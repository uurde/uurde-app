import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const HomeScreen: FC = () => {

    return (
        <SafeAreaProvider>
            <Text style={{ textAlign: "center" }}>Home Screen</Text>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1
    }
});

export default HomeScreen;