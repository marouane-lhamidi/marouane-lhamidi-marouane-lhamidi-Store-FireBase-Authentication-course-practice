import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";


import * as AuthAction from "../store/Actions/AuthAction";
import Colors from "../constant/Colors";

const startUpScreen = props => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const isLoading = async () =>{
            const ourData = await AsyncStorage.getItem('userData');
            if (!ourData){
                props.navigation.navigate('Auth');
                return;
            }
            const transformData = JSON.parse(ourData);
            const {expiryDate, token, idUser} = transformData;
            if (new Date() > new Date(expiryDate) || !token || !idUser){
                props.navigation.navigate('Auth');
                return;
            }

            props.navigation.navigate('Shop');
            dispatch(AuthAction.startUp(token, idUser));
        }
        isLoading();
    })
    return(
        <View style={styles.loaded}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
};

const styles = StyleSheet.create({
    loaded : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})
export default startUpScreen;