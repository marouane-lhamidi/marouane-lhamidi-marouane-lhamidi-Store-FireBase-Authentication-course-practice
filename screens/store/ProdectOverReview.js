import React,{useCallback,useEffect,useState} from 'react';
import {StyleSheet,FlatList,Platform,Button,View,ActivityIndicator,Text} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import ProductItem from "../../components/Ui/ProductItem";
import * as CartActions from "../../store/Actions/CartAction";
import * as ProductAction from "../../store/Actions/ProductAction";
import HeaderNewButton from "../../components/HeaderButton";
import Colors from "../../constant/Colors";


const ProductOverReview = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [err, setErr] = useState();
    const listProducts = useSelector(state=> state.ProductReducer.products);
    const dispatch = useDispatch();

    const loading = useCallback(async ()=>{
        setErr(null);
        setIsRefresh(true);
        try {
            await dispatch(ProductAction.importData());
        }catch (err){
            setErr(err.message);
        }
        setIsRefresh(false)
    }, [setErr, setIsLoading, dispatch]);

    useEffect(()=>{
        const willFocusFun = props.navigation.addListener('willFocus', loading)
        return () => {
            willFocusFun.remove();
        }

    }, [loading, dispatch]);

    useEffect(()=>{
        setIsLoading(true);
        loading().then(() => {setIsLoading(false)});
    }, [dispatch, loading]);

    const onSelectFunction =(product) =>{
        props.navigation.navigate('DetailsProduct', {
            product : product
        });

    }
    if (err){
        return (
            <View style={styles.loaded}>
                <Text>there is an error : {err}</Text>
                <Button title='try again' color={Colors.primary} onPress={loading} />
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
    if (!isLoading && listProducts.length === 0){
        return (
            <View style={styles.loaded}>
                <Text>there is no data to reload, please add somme</Text>
            </View>
        )
    }
    return(
        <FlatList
            onRefresh={loading}
            refreshing={isRefresh}
            data={listProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    imageUrl = {itemData.item.imageUrl}
                    title = {itemData.item.title}
                    price = {itemData.item.price}
                    onSelect = {()=>{
                        onSelectFunction(itemData.item)
                    }}
                    onAddCart = {()=>{
                        dispatch(CartActions.addToCart(itemData.item))
                    }}
                >
                    <Button color={Colors.primary} title={"View Details"} onPress={()=>{onSelectFunction(itemData.item)}} />
                    <Button color={Colors.primary} title={"To Cart"} onPress={() => {dispatch(CartActions.addToCart(itemData.item))} } />

                </ProductItem>
            }
        />
    )

};

ProductOverReview.navigationOptions = navData =>{
    return {
    headerTitle : 'All Product',
    headerLeft : () =>
        <HeaderButtons HeaderButtonComponent={HeaderNewButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu' }
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons> ,
    headerRight : () =>
    <HeaderButtons HeaderButtonComponent={HeaderNewButton}>
        <Item
            title="Cart"
            iconName={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart' }
            onPress={() => {
                navData.navigation.navigate('Cart');
            }}
        />
    </HeaderButtons>
    }
}


const styles = StyleSheet.create({
    loaded : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default ProductOverReview;
