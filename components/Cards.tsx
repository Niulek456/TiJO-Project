import React from "react";
import { FlatList, ViewStyle } from "react-native";
import CardItem from "./CardItem";

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
}

interface CardsProps {
    data: Property[];
    horizontal?: boolean;
}

const Cards = ({ data, horizontal = false }: CardsProps) => {
    return (
        <FlatList
            data={data}
            horizontal={horizontal}
            keyExtractor={(item) => item.$id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: horizontal ? 16 : 0 } as ViewStyle}
            renderItem={({ item }) => (
                <CardItem item={item} horizontal={horizontal} />
            )}
        />
    );
};

export default Cards;
