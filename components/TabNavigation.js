import React from 'react'
import {
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation'
import History from "./History";
import {
    FontAwesome,
    Ionicons
} from "@expo/vector-icons";
import AddEntry from "./AddEntry";
import {Platform} from "react-native";
import {
    purple,
    white
} from "../utils/colors";

const TabNavigator = createBottomTabNavigator({
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-bookmarks" size={30} color={tintColor}/>
        }
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: 'Add Entry',
            tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square" size={30} color={tintColor}/>
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffse: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

export default createAppContainer(TabNavigator)
