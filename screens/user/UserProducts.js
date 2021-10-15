import React from 'react';
import {Button,FlatList,Platform,Alert,View,Text,StyleSheet} from 'react-native';
import {useSelector, useDispatch} from "react-redux";

import ProductItem from "../../components/Ui/ProductItem";
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import HeaderNewButton from "../../components/HeaderButton";
import Colors from "../../constant/Colors";
import * as ProductAction from "../../store/Actions/ProductAction";

const UserProduct = props => {
    const listProducts = useSelector(state=> state.ProductReducer.userProducts);
    const dispatch = useDispatch();

    const handlerChange = id =>{
        props.navigation.navigate('EditProduct', {id});
    }

    const deleteFun = id =>{
        Alert.alert(
            "Deleting Alert",
            "You are sur that you want to delete this item",
            [
                {
                    text: "NO",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "default"
                },
                { text:
                        "YES",
                    onPress: () => {dispatch(ProductAction.deleteProduct(id))},
                    style : "destructive"
                }
            ]
        );
    }
    if (listProducts.length === 0){
        return (
            <View style={styles.loaded}>
                <Text>there is no data to reload, please add somme</Text>
            </View>
        )
    }
    return(
        <FlatList
            data={listProducts}
            keyExtractor={item=>item.id}
            renderItem={itemData =>
                <ProductItem
                    imageUrl = {itemData.item.imageUrl}
                    title = {itemData.item.title}
                    price = {itemData.item.price}
                    onSelect = {()=>{handlerChange(itemData.item.id)}}

                >
                    <Button color={Colors.primary} title={"Edit"} onPress={()=>{handlerChange(itemData.item.id)}} />
                    <Button color={Colors.primary} title={"Delete"} onPress={ deleteFun.bind(this, itemData.item.id) } />

                </ProductItem>
            }
        />
    )
};

UserProduct.navigationOptions = navData =>{
    return {
        headerTitle : 'Your Products',
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
                    title="Edit"
                    iconName={Platform.OS === 'ios' ? 'ios-create' : 'md-create' }
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }}
                />
            </HeaderButtons> ,
    }
}

const styles = StyleSheet.create({
    loaded : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default UserProduct;