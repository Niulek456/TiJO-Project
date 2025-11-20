import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import Comments from "../components/Comments";
import GallerySection from "../components/GallerySection";
import MapView, { Marker } from "react-native-maps";

type Agent = {
    $id: string;
    name: string;
    avatar: string;
};

type Property = {
    $id: string;
    name: string;
    address: string;
    price: number;
    rating: number;
    image: string;
    geolocation: string;
    type?: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    description?: string;
    gallery?: string[];
    agent?: string | Agent;
};

type RootStackParamList = {
    Details: {
        property: Property;
    };
};

const DetailsScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, "Details">>();
    const navigation = useNavigation();
    const { property } = route.params;

    const isAgentObject = (agent: any): agent is Agent =>
        agent && typeof agent === "object" && "name" in agent && "avatar" in agent;

    console.log("Geolocation string:", property.geolocation);
    const [lat, lng] = property.geolocation?.split(",").map((x) => parseFloat(x.trim())) ?? [0, 0];



    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: property.image }} style={styles.mainImage} />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={require("../assets/icons/back-arrow.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <View style={styles.topRightIcons}>
                    <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() => alert("Dodano do ulubionych")}
                    >
                        <Image
                            source={require("../assets/icons/heart.png")}
                            style={styles.iconSmall}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() => alert("Udostępnij")}
                    >
                        <Image
                            source={require("../assets/icons/send.png")}
                            style={styles.iconSmall}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.headerSection}>
                <Text style={styles.title}>{property.name}</Text>
                <View style={styles.row}>
                    <Text style={styles.tag}>{property.type}</Text>
                    <Image
                        source={require("../assets/icons/star.png")}
                        style={styles.iconTiny}
                    />
                    <Text style={styles.ratingText}>
                        {property.rating} (56 opinii)
                    </Text>
                </View>
                <View style={styles.featureRow}>
                    <View style={styles.featureBox}>
                        <Image
                            source={require("../assets/icons/bed.png")}
                            style={styles.featureIcon}
                        />
                        <Text style={styles.featureText}>
                            {property.bedrooms} sypialnie
                        </Text>
                    </View>
                    <View style={styles.featureBox}>
                        <Image
                            source={require("../assets/icons/bath.png")}
                            style={styles.featureIcon}
                        />
                        <Text style={styles.featureText}>
                            {property.bathrooms} łazienki
                        </Text>
                    </View>
                    <View style={styles.featureBox}>
                        <Image
                            source={require("../assets/icons/area.png")}
                            style={styles.featureIcon}
                        />
                        <Text style={styles.featureText}>
                            {property.area} m²
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.agentSection}>
                {isAgentObject(property.agent) ? (
                    <>
                        <Image
                            source={{ uri: property.agent.avatar }}
                            style={styles.agentAvatar}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.agentName}>{property.agent.name}</Text>
                            <Text style={styles.agentRole}>Pośrednik</Text>
                        </View>
                    </>
                ) : (
                    <Text style={{ fontStyle: "italic" }}>Brak danych pośrednika</Text>
                )}
                <Image
                    source={require("../assets/icons/chat.png")}
                    style={styles.iconSmall}
                />
                <Image
                    source={require("../assets/icons/phone.png")}
                    style={styles.iconSmall}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Opis</Text>
                <Text style={styles.description}>{property.description}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Galeria zdjęć</Text>
                <GallerySection />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Lokalizacja</Text>
                <Text style={styles.locationText}>{property.address}</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: lat, longitude: lng }}
                        title={property.name}
                        description={property.address}
                    />
                </MapView>
            </View>

            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.sectionTitle}>Opinie</Text>
                    <Image
                        source={require("../assets/icons/star.png")}
                        style={styles.iconTiny_2}
                    />
                    <Text style={styles.ratingText_2}>
                        {property.rating} (56 opinii)
                    </Text>
                </View>
                <Comments propertyId={property.$id ?? ""} />
            </View>

            <View style={styles.footer}>
                <Text style={styles.price}>{property.price} PLN</Text>
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Rezerwuj</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    imageContainer: { position: "relative" },
    mainImage: { width: "100%", height: 320 },
    backButton: {
        position: "absolute",
        top: 45,
        left: 16,
        backgroundColor: "#fff",
        padding: 6,
        borderRadius: 20,
    },
    topRightIcons: {
        position: "absolute",
        top: 50,
        right: 16,
        flexDirection: "row",
        gap: 12,
    },
    icon: { width: 20, height: 20 },
    iconSmall: { width: 22, height: 22, marginHorizontal: 4, tintColor: "#093E94" },
    iconTiny: { width: 18, height: 18, marginLeft: 4 },
    headerSection: { padding: 16 },
    title: { fontSize: 22, fontWeight: "bold" },
    row: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 12 },
    tag: {
        backgroundColor: "#E0ECFF",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        fontSize: 12,
    },
    ratingText: { fontSize: 14, fontWeight: "bold" },
    featureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    featureBox: {
        backgroundColor: "#F5F8FF",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    featureIcon: { width: 16, height: 16, marginRight: 8 },
    featureText: { fontSize: 14, fontWeight: "500", color: "#001D4A" },
    agentSection: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 10,
    },
    iconWrapper: {
        backgroundColor: "#fff",
        padding: 4,
        borderRadius: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    agentAvatar: { width: 50, height: 50, borderRadius: 25 },
    agentName: { fontWeight: "bold" },
    agentRole: { fontSize: 12, color: "#666" },
    section: { padding: 16 },
    sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
    description: { fontSize: 14, color: "#444" },
    galleryImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    locationText: { marginBottom: 10, color: "#444" },
    map: {
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    price: { fontSize: 20, fontWeight: "bold", color: "#093E94" },
    bookButton: {
        backgroundColor: "#093E94",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    bookButtonText: { color: "#fff", fontWeight: "bold" },
    iconTiny_2: { width: 18, height: 18, marginLeft: 4, marginBottom: 10 },
    ratingText_2: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
});
