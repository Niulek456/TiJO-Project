import React, { useState } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    TouchableOpacity,
} from "react-native";

const staticImages = [
    require("../assets/images/house1.png"),
    require("../assets/images/house2.png"),
    require("../assets/images/house3.png"),
];

const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const openImage = (index: number) => {
        setSelectedImage(index);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <View style={styles.container}>
            {staticImages.slice(0, 2).map((img, index) => (
                <TouchableOpacity key={index} onPress={() => openImage(index)}>
                    <Image source={img} style={styles.image} />
                </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => openImage(2)}>
                <View style={styles.overlayBox}>
                    <Image source={staticImages[2]} style={styles.image} />
                    <View style={styles.darkOverlay} />
                    <View style={styles.overlay}>
                        <Text style={styles.overlayText}>20+</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <Modal visible={selectedImage !== null} transparent>
                <Pressable style={styles.modalBackground} onPress={closeModal}>
                    <Image source={staticImages[selectedImage ?? 0]} style={styles.fullImage} resizeMode="contain" />
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8,
        paddingHorizontal: 10,
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 10,
    },
    overlayBox: {
        position: "relative",
    },
    darkOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 110,
        height: 110,
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 110,
        height: 110,
        justifyContent: "center",
        alignItems: "center",
    },
    overlayText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    fullImage: {
        width: "90%",
        height: "80%",
        borderRadius: 10,
    },
});

export default GallerySection;
