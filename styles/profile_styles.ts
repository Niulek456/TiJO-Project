import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
        minHeight: height * 0.95
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 1,
        marginTop: 5
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    bellIcon: {
        width: 24,
        height: 24
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 30,
        marginTop: 22
    },
    profileInner: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    editIconWrapper: {
        position: "absolute",
        right: -5,
        bottom: 30,
        borderRadius: 12,
        padding: 6
    },
    editIcon: {
        width: 25,
        height: 25
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10
    },
    settingsSection: {
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingTop: 10
    },
    settingsItemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#eee"
    },
    settingsItemLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    settingsItemIcon: {
        width: 24,
        height: 24,
        marginRight: 12
    },
    settingsItemText: {
        fontSize: 16
    },
    dangerText: {
        color: "red"
    },
    arrowIcon: {
        width: 16,
        height: 16,
        tintColor: "#999"
    },
    separatorTop: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        marginTop: 12
    },
    sectionSmallMargin: {
        marginVertical: 10,
    },

});

export default styles;
