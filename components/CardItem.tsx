import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Property {
    $id: string;
    name: string;
    address: string;
    price: number;
    rating: number;
    image: string;
}

interface Props {
    item: Property;
    horizontal?: boolean;
}

const CardItem = ({ item, horizontal = false }: Props) => {
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity
            style={horizontal ? styles.cardHorizontal : styles.card}
            onPress={() => navigation.navigate("Details", { property: item })}
        >
            <View style={styles.ratingBox}>
                <Image source={require("../assets/icons/star.png")} style={{ width: 14, height: 14 }} />
                <Text style={styles.ratingText}>{item.rating}</Text>
            </View>

            <Image source={{ uri: item.image }} style={styles.cardImage} />

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.address}</Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.cardPrice}>{item.price} PLN</Text>
                    <Image source={require("../assets/icons/heart_kn.png")} style={styles.heartIcon} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
    },
    cardHorizontal: {
        width: 240,
        marginRight: 12,
    },
    cardImage: {
        width: "100%",
        height: 160,
        borderRadius: 12,
    },
    ratingBox: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        zIndex: 2,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    ratingText: { fontWeight: "bold", fontSize: 12 },
    cardContent: { marginTop: 8 },
    cardTitle: { fontSize: 16, fontWeight: "bold" },
    cardSubtitle: { color: "#666", fontSize: 14, marginVertical: 4 },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardPrice: { fontWeight: "bold", color: "#093E94", fontSize: 16 },
    heartIcon: { width: 20, height: 20 },
});

export default CardItem;
