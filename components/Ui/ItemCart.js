import React from 'react';
import {View,Text,StyleSheet,Platform,TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const ItemCart = props => {

    return(
        <View style={styles.cartProduct}>
            <View style={styles.ProductIdent} >
                <Text style={styles.productText}>{props.product.Qty} </Text>
                <Text style={styles.productText}> {props.product.title}</Text>
            </View>
            <View style={styles.ProductIdent}>
                <Text style={styles.productText} >${props.product.price}</Text>
                {props.click &&
                <TouchableOpacity style={styles.deletButton} onPress={props.onPress}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                        size={18}
                        color="red"
                    />
                </TouchableOpacity>}

            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cartProduct : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginVertical : 15,
        paddingHorizontal : 30
    },
    ProductIdent : {
        flexDirection : 'row',

    },
    productText : {
        fontSize : 14,
        fontFamily : 'Sans-serif',
    },
    deletButton : {
        paddingLeft: 5
    },
})

export default ItemCart;