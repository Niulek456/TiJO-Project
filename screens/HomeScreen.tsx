import React, { useEffect, useState } from "react";
import {
    View, Text, Image, StyleSheet, FlatList, Alert,
    ListRenderItemInfo, TouchableOpacity
} from "react-native";
import Search from "../components/Serach";
import Filters from "../components/Filters";
import Cards from "../components/Cards";
import seed from "../appwrite/seed";
import {
    databases, DATABASE_ID, PROPERTY_COLLECTION_ID
} from "../appwrite/appwrite";
import { Query, Models } from "appwrite";

interface Property {
    $id: string;
    name: string;
    address: string;
    price: number;
    rating: number;
    image: string;
    type?: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    description?: string;
    gallery?: string[];
    reviews?: any[];
    agent?: any;
    geolocation?: any;
}

const HomeScreen = () => {
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [recommended, setRecommended] = useState<Property[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const mapToProperty = (doc: Models.Document): Property => ({
        $id: doc.$id,
        name: doc.name,
        address: doc.address,
        price: doc.price,
        rating: doc.rating,
        image: doc.image,
        type: doc.type,
        bedrooms: doc.bedrooms,
        bathrooms: doc.bathrooms,
        area: doc.area,
        description: doc.description,
        gallery: doc.gallery,
        reviews: doc.reviews,
        agent: doc.agent,
        geolocation: doc.geolocation,
    });

    const fetchAllProperties = async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                PROPERTY_COLLECTION_ID,
                [Query.limit(20)]
            );
            const mapped = response.documents
                .filter((doc) => !!doc.$id)
                .map(mapToProperty);
            setAllProperties(mapped);
            filterRecommended(mapped, selectedCategory);
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        }
    };

    const filterRecommended = (properties: Property[], category: string) => {
        const filtered = category === "All"
            ? properties.slice(0, 6)
            : properties.filter((item) => item.type === category).slice(0, 6);
        setRecommended(filtered);
    };

    useEffect(() => {
        fetchAllProperties();
    }, []);

    const handleSeed = async () => {
        try {
            await seed();
            Alert.alert("Sukces", "Baza danych została wypełniona.");
            fetchAllProperties();
        } catch (error) {
            console.error("Błąd seedowania:", error);
            Alert.alert("Błąd", "Seedowanie nie powiodło się.");
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        filterRecommended(allProperties, category);
    };

    const renderHeader = () => (
        <View>
            <View style={styles.headerRow}>
                <View style={styles.userInfo}>
                    <Image source={require("../assets/images/photo.png")} style={styles.avatar} />
                    <View>
                        <Text style={styles.welcome}>Witaj!</Text>
                        <Text style={styles.userName}>Jan Kowalski</Text>
                    </View>
                </View>
                <Image source={require("../assets/icons/bell.png")} style={styles.bellIcon} />
            </View>
            <Search />
            <Text style={styles.sectionTitle}>Wyróżnione</Text>
            <Cards data={allProperties.slice(0, 3)} horizontal />
            <Text style={styles.sectionTitle}>Nasze rekomendacje</Text>
            <Filters selected={selectedCategory} onSelect={handleCategoryChange} />
        </View>
    );

    const renderItem = ({ item }: ListRenderItemInfo<Property>) => (
        <Cards data={[item]} />
    );

    return (
        <FlatList
            data={recommended}
            keyExtractor={(item) => item.$id}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        backgroundColor: "#fff",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 60,
        marginBottom: 10,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    welcome: {
        fontSize: 12,
        color: "#888",
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    bellIcon: {
        width: 24,
        height: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
});

export default HomeScreen;
