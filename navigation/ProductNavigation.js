import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {useDispatch} from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";
import {Platform, View, SafeAreaView, Button} from "react-native";

import ProductOverReview from "../screens/store/ProdectOverReview";
import ProductDetails from "../screens/store/ProductDetailes";
import CartScreen from "../screens/store/CartScreen";
import OrderScreen from "../screens/store/OrderScreen";
import UserProduct from "../screens/user/UserProducts";
import EditProduct from "../screens/user/EditProduct";
import AuthScreen from "../screens/user/AuthScreen";
import startUpScreen from "../screens/startUpScreen";
import * as AuthActions from "../store/Actions/AuthAction"
import Colors from "../constant/Colors";
import {Ionicons} from "@expo/vector-icons";

const defaultValue = {
    headerStyle : {
            backgroundColor : Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor : Platform.OS === 'ios' ? Colors.primary : 'white',
        headerTitleStyle : {
            fontFamily : 'Sans-serif',
        },
        headerBackTitleStyle : {
            fontFamily : 'open-sans',
        }

};

const ProductNavigation = createStackNavigator({
    OverReview : ProductOverReview,
    DetailsProduct : ProductDetails,
    Cart : CartScreen

},
    {
        navigationOptions : {
            drawerIcon : drawerConfig => (
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                    size={22}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions : defaultValue
    }
);
const orderNavigation = createStackNavigator({
        OrderScreen,
    },

    {
        navigationOptions : {
            drawerIcon : drawerConfig => (
                <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
                        size={22}
                        color={drawerConfig.tintColor}
                    />
            )
        },
        defaultNavigationOptions : defaultValue
    }
);
const userNavigation = createStackNavigator({
        UserProduct,
        EditProduct
    },

    {
        navigationOptions : {
            drawerIcon : drawerConfig => (
                <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
                        size={22}
                        color={drawerConfig.tintColor}
                    />
            )
        },
        defaultNavigationOptions : defaultValue
    }
);


const ShopNavigator = createDrawerNavigator(
    {
        Products : ProductNavigation,
        Orders : orderNavigation,
        User : userNavigation
    }, {
        contentOptions : {
            activeTintColor : Colors.primary,
            itemsContainerStyle : {
                marginTop: 20
        }},
        contentComponent : props =>{
            const dispatch = useDispatch();
            return (
                <View style={{flex : 1}}>
                    <SafeAreaView forceInset={{top : 'always', horizontal : 'ever', }} >
                        <DrawerNavigatorItems {...props}/>
                        <Button title='Logout' color={Colors.primary} onPress={() => {
                            dispatch(AuthActions.logOut());
                            props.navigation.navigate('Auth');
                        }} />
                    </SafeAreaView>
                </View>
            )
        }
        }
    )

const authentication =createStackNavigator({
    AuthScreen
})

const MainNavigation = createSwitchNavigator({
    startUpScreen,
    Auth : authentication,
    Shop : ShopNavigator
})
export default createAppContainer(MainNavigation);