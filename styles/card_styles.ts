import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
        borderColor: "#E0E0E0",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderColor: "#E0E0E0",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        overflow: "hidden",
    },
    cardImage: {
        width: "100%",
        height: 160,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    cardHorizontal: {
        width: 250,
        marginRight: 16,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    ratingBox: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.9)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    starIcon: {
        width: 14,
        height: 14,
        marginRight: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#333",
    },
    cardContent: {
        padding: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        color: "#666",
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardPrice: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#093E94",
    },
    heartIcon: {
        width: 20,
        height: 20,
        tintColor: "#222",
    },
});

export default styles;
