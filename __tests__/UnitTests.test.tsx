import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import CardItem from '../components/CardItem';
import Filters from '../components/Filters';
import { Text, Button } from 'react-native';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({ navigate: mockNavigate }),
}));

const mockProperty = {
    $id: '1',
    name: 'Luxury Villa',
    address: 'Warsaw, Center',
    price: 500000,
    rating: 4.8,
    image: 'http://image.url',
};

const TestConsumer = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    return (
        <>
            <Text testID="auth-status">{isLoggedIn.toString()}</Text>
            <Button title="Login" onPress={() => setIsLoggedIn(true)} />
        </>
    );
};


describe('1. AuthContext Unit Tests', () => {
    it('Should have isLoggedIn false by default', () => {
        const { getByTestId } = render(
            <AuthProvider>
                <TestConsumer />
            </AuthProvider>
        );
        expect(getByTestId('auth-status').props.children).toBe('false');
    });

    it('Should change isLoggedIn to true when requested', () => {
        const { getByText, getByTestId } = render(
            <AuthProvider>
                <TestConsumer />
            </AuthProvider>
        );
        fireEvent.press(getByText('Login'));
        expect(getByTestId('auth-status').props.children).toBe('true');
    });
});

describe('2. CardItem Unit Tests', () => {
    it('Should render property name correctly', () => {
        const { getByText } = render(<CardItem item={mockProperty} />);
        expect(getByText('Luxury Villa')).toBeTruthy();
    });

    it('Should render property address correctly', () => {
        const { getByText } = render(<CardItem item={mockProperty} />);
        expect(getByText('Warsaw, Center')).toBeTruthy();
    });

    it('Should format and render price with currency', () => {
        const { getByText } = render(<CardItem item={mockProperty} />);
        expect(getByText('500000 PLN')).toBeTruthy();
    });

    it('Should use navigation when card is pressed', () => {
        const { getByText } = render(<CardItem item={{...mockProperty, name: 'ClickMe'}} />);
        fireEvent.press(getByText('ClickMe'));
        expect(mockNavigate).toHaveBeenCalled();
    });
    it('Should render rating star icon', () => {
        const { getByText } = render(<CardItem item={mockProperty} />);
        expect(getByText('4.8')).toBeTruthy();
    });

});

describe('3. Filters Unit Tests', () => {
    it('Should render all filter categories', () => {
        const { getByText } = render(<Filters selected="All" onSelect={() => {}} />);
        expect(getByText('Wszystkie')).toBeTruthy();
        expect(getByText('Domy')).toBeTruthy();
    });

    it('Should call onSelect callback with correct category', () => {
        const mockOnSelect = jest.fn();
        const { getByText } = render(<Filters selected="All" onSelect={mockOnSelect} />);
        fireEvent.press(getByText('Domy'));
        expect(mockOnSelect).toHaveBeenCalledWith('House');
    });

    it('Should render "Other" category button', () => {
        const { getByText } = render(<Filters selected="All" onSelect={() => {}} />);
        expect(getByText('Inne')).toBeTruthy();
    });
});