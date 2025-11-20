import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Query, Models } from "appwrite";

import Search from "../components/Serach";
import Filters from "../components/Filters";
import Cards from "../components/Cards";
import {
    databases,
    DATABASE_ID,
    PROPERTY_COLLECTION_ID,
} from "../appwrite/appwrite";

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
    reviews?: string[];
    agent?: any;
    geolocation?: any;
}

const SearchScreen = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [filtered, setFiltered] = useState<Property[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const mapToProperty = (doc: Models.Document, index: number): Property => ({
        $id: doc.$id || `missing-id-${index}`,  // <-- tu też
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

    const fetchProperties = async () => {
        try {
            const res = await databases.listDocuments(
                DATABASE_ID,
                PROPERTY_COLLECTION_ID,
                [
                    Query.limit(100),
                ]
            );

            const mapped = res.documents
                .filter((doc) => doc.$id)
                .map((doc, index) => mapToProperty(doc, index));

            setProperties(mapped);
            setFiltered(mapped);
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProperties();
    }, []);

    useEffect(() => {
        if (selectedCategory === "All") {
            setFiltered(properties);
        } else {
            const filteredData = properties.filter(
                (item) => item.type === selectedCategory
            );
            setFiltered(filteredData);
        }
    }, [selectedCategory, properties]);

    const renderHeader = () => (
        <View>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require("../assets/icons/back-arrow.png")}
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Znajdź swoje wymarzone miejsce!</Text>
                <Image
                    source={require("../assets/icons/bell.png")}
                    style={styles.bellIcon}
                />
            </View>

            <Search />
            <Filters
                selected={selectedCategory}
                onSelect={setSelectedCategory}
            />

            <Text style={styles.resultText}>
                Znaleziono {filtered.length} apartamentów
            </Text>
        </View>
    );

    const renderItem = ({ item }: { item: Property }) => (
        <Cards data={[item]} />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item, index) => item.$id ?? `missing-key-${index}`}
                    renderItem={renderItem}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 80,
        marginBottom: 10,
    },
    arrowIcon: {
        width: 24,
        height: 24,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    bellIcon: {
        width: 24,
        height: 24,
    },
    resultText: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
});
