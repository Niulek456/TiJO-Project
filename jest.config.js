module.exports = {
    preset: 'react-native',
    setupFiles: ['./jest.setup.js'],
    moduleNameMapper: {
        '@env': '<rootDir>/jest-mock.js'
    },
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|appwrite)'
    ],
};