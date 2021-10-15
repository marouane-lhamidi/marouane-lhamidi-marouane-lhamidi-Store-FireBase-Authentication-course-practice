import React from 'react';
import {View,Text,StyleSheet,Image,Button,ScrollView} from 'react-native';
import Colors from "../../constant/Colors";
import * as CartActions from "../../store/Actions/CartAction";
import {useDispatch} from "react-redux";

const ProductDetails = props => {
    const product = props.navigation.getParam('product');
    const dispatch = useDispatch();
    return(
        <ScrollView>
            <Image style={styles.image} source={{ uri : product.imageUrl }} />
            <View style={styles.button}>
                <Button color={Colors.primary} title='ADD TO CART' onPress={() =>dispatch(CartActions.addToCart(product))} />
            </View>
            <Text style={styles.price} >$ {product.price}</Text>
            <Text style={styles.description} >{product.description}</Text>
        </ScrollView>
    )
};
ProductDetails.navigationOptions = navData => {
    const product = navData.navigation.getParam('product');
    return {
        headerTitle : product.title
    }
}

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : 300
    },
    button : {
        marginVertical : 10,
        alignItems : 'center',
    },
    price : {
        fontSize : 20,
        textAlign : 'center',
        color : '#888',
        marginVertical: 10,
        fontFamily : 'open-sans'
    },
    description : {
        fontSize : 14,
        textAlign : 'center',
        marginHorizontal : 15,
        fontFamily : 'Sans-serif'
    }
})

export default ProductDetails;