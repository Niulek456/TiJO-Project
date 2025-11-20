import React, { useState } from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import styles from "../styles/search_styles";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebouncedCallback((text: string) => {
        // TODO: Apply search logic here
        console.log("Searching for:", text);
    }, 500);

    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Image source={require("../assets/icons/search.png")} style={styles.icon} />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Wyszukaj"
                    style={styles.input}
                />
            </View>
            <TouchableOpacity>
                <Image source={require("../assets/icons/filter.png")} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

export default Search;
