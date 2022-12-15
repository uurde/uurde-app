import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { useAuth } from "../context/AppContext";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import VinylDetailScreen from "../screens/vinyl/VinylDetailScreen";
import VinylScreen from "../screens/vinyl/VinylScreen";

const Navigation: FC = () => {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={DrawerNavigator}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="VinylDetail"
                component={VinylDetailScreen}
                options={{
                    title: "Vinyl Detail"
                }}
            />
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    const { user, loggedIn } = useAuth();
    return (
        //initialRouteName="Home"
        <Drawer.Navigator initialRouteName="Home">
            {user ? (
                <>
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Vinyls" component={VinylScreen} />
                </>
            ) : (
                <>
                    <Drawer.Screen name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                </>
            )}

        </Drawer.Navigator>
    )
}

export default Navigation;