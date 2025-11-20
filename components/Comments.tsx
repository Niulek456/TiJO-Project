import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { databases, DATABASE_ID, REVIEW_COLLECTION_ID } from '../appwrite/appwrite';
import { Query, Models } from 'appwrite';

interface Props {
    propertyId: string;
}

const Comments = ({ propertyId }: Props) => {
    const [reviews, setReviews] = useState<Models.Document[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadReviews = async () => {
            if (!propertyId) {
                console.warn("Brak propertyId – nie ładuję opinii");
                setReviews([]);
                return;
            }

            setLoading(true);
            try {
                const res = await databases.listDocuments(
                    DATABASE_ID,
                    REVIEW_COLLECTION_ID,
                    [
                        Query.equal('property', propertyId),
                        Query.limit(10),
                    ]
                );
                setReviews(res.documents);
            } catch (e) {
                console.error('Failed loading reviews', e);
                setReviews([]);
            } finally {
                setLoading(false);
            }
        };

        loadReviews();
    }, [propertyId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Ładowanie opinii...</Text>
            </View>
        );
    }

    if (reviews.length === 0) {
        return (
            <View style={styles.list}>
                <Text style={styles.noReviewsText}>Brak opinii do wyświetlenia.</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: Models.Document }) => (
        <View key={item.$id} style={styles.reviewRow}>
            <Image source={{ uri: item.avatar || '' }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name || 'Anonim'}</Text>
                <Text style={styles.text}>{item.review || ''}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={reviews}
            keyExtractor={(item) => item.$id}
            renderItem={renderItem}
            style={styles.list}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({
    list: { margin: 16 },
    reviewRow: { flexDirection: 'row', marginBottom: 12 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12, backgroundColor: '#ccc' },
    name: { fontWeight: 'bold' },
    text: { color: '#444' },
    noReviewsText: { fontStyle: 'italic', color: '#888' },
    loadingContainer: { margin: 16 },
});

export default Comments;
