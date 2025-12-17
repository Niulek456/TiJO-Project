require('react-native-reanimated/mock');

jest.mock('./appwrite/appwrite', () => ({
    account: {
        createEmailPasswordSession: jest.fn(),
        deleteSessions: jest.fn(),
    },
    databases: {
        listDocuments: jest.fn(),
    },
    client: {},
    DATABASE_ID: 'test-db',
    PROPERTY_COLLECTION_ID: 'test-col',
}));

// Mockowanie obrazków w testach
jest.mock('./assets/images/onboarding_kn.png', () => 1);
jest.mock('./assets/images/photo.png', () => 1);
jest.mock('./assets/icons/bell.png', () => 1);
jest.mock('./assets/icons/star.png', () => 1);
jest.mock('./assets/icons/heart_kn.png', () => 1);