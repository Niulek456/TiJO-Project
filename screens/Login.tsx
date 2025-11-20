import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { account } from "../appwrite/appwrite";
import { useAuth } from "../context/AuthContext";

const backgroundImage = require("../assets/images/onboarding_kn.png"); // ← dodaj obrazek do folderu

const Login = () => {
    const { setIsLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                Alert.alert("Błąd", "Wprowadź email i hasło");
                return;
            }

            await account.deleteSessions();
            await account.createEmailPasswordSession(email, password);
            setIsLoggedIn(true);

            Alert.alert("Sukces", "Zalogowano pomyślnie");
        } catch (error: any) {
            console.error("Błąd logowania:", error);
            Alert.alert("Błąd", error?.message || "Nie udało się zalogować");
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.overlay} />

            <View style={styles.topText}>
                <Text style={styles.welcome}>WITAJ W KEYNEST</Text>
                <Text style={styles.mainText}>Znajdź Z Nami Swoje <Text style={styles.highlight}>Wymarzone Miejsce</Text></Text>
                <Text style={styles.subText}>Zaloguj się do KeyNest</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    placeholder="Hasło"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Zaloguj się</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "space-between",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255,255,255,0.11)",
    },
    topText: {
        marginTop: 200,
        alignItems: "center",
        paddingHorizontal: 24,
    },
    welcome: {
        fontSize: 18,
        color: "#444",
        letterSpacing: 1,
        marginBottom: 8,
    },
    mainText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    highlight: {
        color: "#093E94",
    },
    subText: {
        fontSize: 18,
        marginTop: 10,
        color: "#666",
    },
    form: {
        paddingHorizontal: 24,
        marginBottom: 250,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 14,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        backgroundColor: "#093E94",
        paddingVertical: 14,
        borderRadius: 22,
        alignItems: "center",
        marginTop: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default Login;
