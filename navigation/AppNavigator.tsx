import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import BottomTabNavigator from "./BottomTabNavigator";
import DetailsScreen from "../screens/DetailsScreen";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { account } from "../appwrite/appwrite";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const user = await account.get();
                if (user.email) setIsLoggedIn(true);
                else setIsLoggedIn(false);
            } catch {
                try {
                    await account.createAnonymousSession();
                    setIsLoggedIn(false);
                } catch {
                    setIsLoggedIn(false);
                }
            } finally {
                setChecking(false);
            }
        };

        checkSession();
    }, []);

    if (checking) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <>
                    <Stack.Screen name="Tabs" component={BottomTabNavigator} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
}
