import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    filterButton: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginRight: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
    },
    selectedFilterButton: {
        backgroundColor: "#093E94",
    },
    unselectedFilterButton: {
        backgroundColor: "#f3f4f6",
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    filterText: {
        fontSize: 14,
    },
    selectedFilterText: {
        color: "#fff",
        fontWeight: "bold",
        marginTop: 2,
    },
    unselectedFilterText: {
        color: "#6b7280",
    },
});

export default styles;
