import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./context/AuthContext";
import * as SystemUI from "expo-system-ui";

export default function App() {
    useEffect(() => {
        SystemUI.setBackgroundColorAsync("transparent");
    }, []);

    return (
        <NavigationContainer>
            <AuthProvider>
                <AppNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
}
