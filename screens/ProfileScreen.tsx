import React from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "../styles/profile_styles";
import { useAuth } from "../context/AuthContext";
import { account } from "../appwrite/appwrite";

interface SettingsItemProps {
    icon: any;
    title: string;
    onPress?: () => void;
    textStyle?: any;
    showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.settingsItemRow}>
            <View style={styles.settingsItemLeft}>
                <Image source={icon} style={styles.settingsItemIcon} />
                <Text style={[styles.settingsItemText, textStyle]}>{title}</Text>
            </View>
            {showArrow && <Image source={require("../assets/icons/right-arrow.png")} style={styles.arrowIcon} />}
        </TouchableOpacity>
    );
};

const ProfileScreen = () => {
    const { setIsLoggedIn } = useAuth();

    const handleLogout = async () => {
        try {
            await account.deleteSessions();
            setIsLoggedIn(false);
        } catch (err: any) {
            Alert.alert("Błąd", err?.message || "Nie udało się wylogować");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>Profil użytkownika</Text>
                    <Image source={require("../assets/icons/bell.png")} style={styles.bellIcon} />
                </View>

                <View style={styles.profileContainer}>
                    <View style={styles.profileInner}>
                        <Image source={require("../assets/images/photo.png")} style={styles.avatar} />
                        <TouchableOpacity style={styles.editIconWrapper}>
                            <Image source={require("../assets/icons/edit.png")} style={styles.editIcon} />
                        </TouchableOpacity>
                        <Text style={styles.userName}>Jan Kowalski</Text>
                    </View>
                </View>

                <View style={[styles.sectionSmallMargin, styles.separatorTop]}>
                    <SettingsItem icon={require("../assets/icons/calendar.png")} title="Moje rezerwacje" />
                </View>
                <SettingsItem icon={require("../assets/icons/wallet.png")} title="Płatności" />
                <View style={[styles.sectionSmallMargin, styles.separatorTop]}>
                    <SettingsItem icon={require("../assets/icons/person.png")} title="Profil" />
                </View>
                <SettingsItem icon={require("../assets/icons/bell.png")} title="Powiadomienia" />
                <SettingsItem icon={require("../assets/icons/shield.png")} title="Bezpieczeństwo" />
                <SettingsItem icon={require("../assets/icons/language.png")} title="Język" />
                <SettingsItem icon={require("../assets/icons/info.png")} title="Pomoc" />

                <View style={[styles.sectionSmallMargin, styles.separatorTop]}>
                    <SettingsItem
                        icon={require("../assets/icons/logout.png")}
                        title="Wyloguj"
                        onPress={handleLogout}
                        textStyle={styles.dangerText}
                        showArrow={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
