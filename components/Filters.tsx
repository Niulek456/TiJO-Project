import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "../styles/filters_styles";

const categories = [
    { category: "All", title: "Wszystkie" },
    { category: "House", title: "Domy" },
    { category: "Townhouse", title: "Mieszkania" },
    { category: "Apartment", title: "Apartamenty" },
    { category: "Villa", title: "Wille" },
    { category: "Other", title: "Inne" },
];

interface FiltersProps {
    selected: string;
    onSelect: (category: string) => void;
}

const Filters = ({ selected, onSelect }: FiltersProps) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        >
            {categories.map((item) => (
                <TouchableOpacity
                    key={item.category}
                    style={[
                        styles.filterButton,
                        selected === item.category && styles.selectedFilterButton,
                    ]}
                    onPress={() => onSelect(item.category)}
                >
                    <Text
                        style={
                            selected === item.category
                                ? styles.selectedFilterText
                                : styles.filterText
                        }
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Filters;
