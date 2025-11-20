import { ID } from "appwrite";
import {
    databases,
    DATABASE_ID,
    AGENTS_COLLECTION_ID,
    GALLERIES_COLLECTION_ID,
    REVIEW_COLLECTION_ID,
    PROPERTY_COLLECTION_ID,
} from "./appwrite";

import {
    agentImages,
    galleryImages,
    propertiesImages,
    reviewImages,
} from "./data";

const COLLECTIONS = {
    AGENT: AGENTS_COLLECTION_ID,
    REVIEWS: REVIEW_COLLECTION_ID,
    GALLERY: GALLERIES_COLLECTION_ID,
    PROPERTY: PROPERTY_COLLECTION_ID,
};

const propertyTypes = ["House", "Townhouse", "Villa", "Apartment", "Other"];

function getRandomSubset<T>(array: T[], minItems: number, maxItems: number): T[] {
    const subsetSize = Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, subsetSize);
}

async function seed() {
    try {
        // Wyczyść wszystkie kolekcje
        for (const key in COLLECTIONS) {
            const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
            const documents = await databases.listDocuments(DATABASE_ID, collectionId);
            for (const doc of documents.documents) {
                await databases.deleteDocument(DATABASE_ID, collectionId, doc.$id);
            }
        }
        console.log("Wyczyszczono istniejące dane.");

        // Agenci
        const agents = [];
        for (let i = 1; i <= 5; i++) {
            const agent = await databases.createDocument(DATABASE_ID, COLLECTIONS.AGENT, ID.unique(), {
                name: `Agent ${i}`,
                email: `agent${i}@example.com`,
                avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
            });
            agents.push(agent);
        }

        // Galerie
        const galleries = [];
        for (const image of galleryImages) {
            const gallery = await databases.createDocument(DATABASE_ID, COLLECTIONS.GALLERY, ID.unique(), {
                image,
            });
            galleries.push(gallery);
        }

        // Nieruchomości + opinie
        for (let i = 1; i <= 20; i++) {
            const image = propertiesImages[i] ?? propertiesImages[Math.floor(Math.random() * propertiesImages.length)];
            const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
            const assignedGalleries = getRandomSubset(galleries, 3, 8);

            const propertyId = ID.unique();

            // Tworzenie nieruchomości
            const property = await databases.createDocument(DATABASE_ID, COLLECTIONS.PROPERTY, propertyId, {
                name: `Nieruchomość ${i}`,
                type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
                description: `Opis dla nieruchomości ${i}.`,
                address: `Ulica ${i}, Miasto`,
                geolocation: `52.${i}, 21.${i}`,
                price: Math.floor(Math.random() * 9000) + 1000,
                area: Math.floor(Math.random() * 3000) + 500,
                bedrooms: Math.floor(Math.random() * 5) + 1,
                bathrooms: Math.floor(Math.random() * 5) + 1,
                rating: Math.floor(Math.random() * 5) + 1,
                image,
                agent: assignedAgent.$id,
                gallery: assignedGalleries,

            });

            // Opinie powiązane z tą nieruchomością
            const reviewCount = Math.floor(Math.random() * 3) + 1;
            const reviewPromises = [];

            for (let j = 1; j <= reviewCount; j++) {
                reviewPromises.push(
                    databases.createDocument(DATABASE_ID, COLLECTIONS.REVIEWS, ID.unique(), {
                        name: `Reviewer ${i}-${j}`,
                        avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
                        review: `To jest opinia użytkownika ${i}-${j}.`,
                        rating: Math.floor(Math.random() * 5) + 1,
                        property: property.$id,
                    })
                );
            }

            const propertyReviews = await Promise.all(reviewPromises);

            // Aktualizacja nieruchomości
            await databases.updateDocument(DATABASE_ID, COLLECTIONS.PROPERTY, property.$id, {
                reviews: propertyReviews.map((r) => r.$id),
            });
        }

        console.log("Dane zostały pomyślnie zasiane.");
    } catch (error) {
        console.error("Błąd podczas zasiewania danych:", (error as any)?.message || error);
    }
}

export default seed;
