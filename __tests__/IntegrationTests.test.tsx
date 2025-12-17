import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import { AuthProvider } from '../context/AuthContext';
import { Alert } from 'react-native';
import { account, databases } from '../appwrite/appwrite';

jest.mock('@env', () => ({
    APPWRITE_ENDPOINT: 'https://test.io',
    APPWRITE_PROJECT: 'test',
    APPWRITE_DATABASE: 'test-db'
}));

jest.mock('../appwrite/appwrite', () => ({
    account: {
        createEmailPasswordSession: jest.fn(),
        deleteSessions: jest.fn().mockResolvedValue(true),
    },
    databases: {
        listDocuments: jest.fn(),
    },

    client: {},
    DATABASE_ID: 'db',
    PROPERTY_COLLECTION_ID: 'col',
}));

jest.spyOn(Alert, 'alert');

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({ navigate: mockNavigate }),
}));


describe('Integration Tests - Login Flow', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should render login form inputs correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <AuthProvider><Login /></AuthProvider>
        );
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Hasło')).toBeTruthy();
        expect(getByText('Zaloguj się')).toBeTruthy();
    });

    it('Should show alert if inputs are empty on submit', () => {
        const { getByText } = render(<AuthProvider><Login /></AuthProvider>);

        fireEvent.press(getByText('Zaloguj się'));

        expect(Alert.alert).toHaveBeenCalledWith("Błąd", "Wprowadź email i hasło");
    });

    it('Should call Appwrite session create on valid input', async () => {
        const { getByPlaceholderText, getByText } = render(<AuthProvider><Login /></AuthProvider>);

        (account.createEmailPasswordSession as jest.Mock).mockResolvedValue({});

        fireEvent.changeText(getByPlaceholderText('Email'), 'test@test.com');
        fireEvent.changeText(getByPlaceholderText('Hasło'), 'password123');

        await act(async () => {
            fireEvent.press(getByText('Zaloguj się'));
        });

        expect(account.createEmailPasswordSession).toHaveBeenCalledWith('test@test.com', 'password123');
        expect(Alert.alert).toHaveBeenCalledWith("Sukces", "Zalogowano pomyślnie");
    });

    it('Should handle Appwrite error gracefully', async () => {
        const { getByPlaceholderText, getByText } = render(<AuthProvider><Login /></AuthProvider>);

        (account.createEmailPasswordSession as jest.Mock).mockRejectedValue({ message: 'Invalid credentials' });

        fireEvent.changeText(getByPlaceholderText('Email'), 'wrong@test.com');
        fireEvent.changeText(getByPlaceholderText('Hasło'), 'wrong');

        await act(async () => {
            fireEvent.press(getByText('Zaloguj się'));
        });

        expect(Alert.alert).toHaveBeenCalledWith("Błąd", "Invalid credentials");
    });
    it('Should have correct content type on password input', () => {
        const { getByPlaceholderText } = render(<AuthProvider><Login /></AuthProvider>);
        const passwordInput = getByPlaceholderText('Hasło');
        expect(passwordInput.props.secureTextEntry).toBe(true);
    });

});

describe('Integration Tests - HomeScreen Data Flow', () => {
    const mockData = {
        documents: [
            { $id: '1', name: 'House 1', type: 'House', price: 100, image: 'img', rating: 5, address: 'Addr 1' },
            { $id: '2', name: 'Apartment 1', type: 'Apartment', price: 200, image: 'img', rating: 4, address: 'Addr 2' }
        ]
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (databases.listDocuments as jest.Mock).mockResolvedValue(mockData);
    });

    it('Should fetch and display properties from database', async () => {
        const { getByText } = render(<HomeScreen />);

        await waitFor(() => {
            expect(databases.listDocuments).toHaveBeenCalled();
            expect(getByText('House 1')).toBeTruthy();
        });
    });

    it('Should filter properties when category is selected', async () => {
        const { getByText } = render(<HomeScreen />);

        await waitFor(() => expect(getByText('House 1')).toBeTruthy());

        fireEvent.press(getByText('Apartamenty'));

        await waitFor(() => {
            expect(getByText('Apartment 1')).toBeTruthy();
        });
    });

    it('Should render Featured section title', async () => {
        const { getByText } = render(<HomeScreen />);
        await waitFor(() => {
            expect(getByText('Wyróżnione')).toBeTruthy();
        });
    });

    it('Should render Search component', async () => {
        render(<HomeScreen />);
        await waitFor(() => {
            expect(databases.listDocuments).toHaveBeenCalled();
        });
    });
});