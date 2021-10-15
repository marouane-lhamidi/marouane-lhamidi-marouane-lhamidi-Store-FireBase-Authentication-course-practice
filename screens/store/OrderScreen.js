import React,{useCallback,useEffect,useState} from 'react';
import {FlatList,Text,StyleSheet,Platform,View,ActivityIndicator} from 'react-native';
import {useDispatch,useSelector} from "react-redux";
import {HeaderButtons,Item} from "react-navigation-header-buttons";

import HeaderNewButton from "../../components/HeaderButton";
import OrderItem from "../../components/Ui/OrderItem";
import * as OrderActions from "../../store/Actions/OrdersAction";
import Colors from "../../constant/Colors";

const OrderScreen = props => {
    const orders = useSelector(state=> state.OrdersReducer.Orders)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();



    const loading = useCallback(async ()=>{

        setIsLoading(true);
        await dispatch(OrderActions.importOrders());
        setIsLoading(false)
    }, [ setIsLoading, dispatch]);


    useEffect(()=>{

        loading();

    }, [dispatch, loading]);

    if (!isLoading && orders.length === 0){
        return (
            <View style={styles.loaded}>
                <Text>there is no data to reload, please add somme</Text>
            </View>
        )
    }

    if (isLoading){
        return (
            <View style={styles.loaded}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return(
        <FlatList
            data={orders}
            renderItem={dataItem => <OrderItem order={dataItem.item} /> }
            keyExtractor={item=>item.id}
        />
    )
};

OrderScreen.navigationOptions = navData => {
    return {
        headerTitle : 'Tour Orders',
        headerLeft : () =>
            <HeaderButtons HeaderButtonComponent={HeaderNewButton}>
                <Item
                    title="Cart"
                    iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu' }
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({})

export default OrderScreen;
