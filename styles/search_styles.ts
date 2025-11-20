import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginTop: 20,
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: "#333",
        marginLeft: 8,
    },
    filterIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },
});

export default styles;
