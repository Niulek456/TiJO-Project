import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SerachScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 60,
                },
                tabBarIcon: ({ focused }) => {
                    let icon;

                    if (route.name === 'Home') {
                        icon = require('../assets/icons/home.png');
                    } else if (route.name === 'Search') {
                        icon = require('../assets/icons/search.png');
                    } else if (route.name === 'Profile') {
                        icon = require('../assets/icons/person.png');
                    }

                    return (
                        <Image
                            source={icon}
                            resizeMode="contain"
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: focused ? '#093E94' : '#999',
                            }}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
