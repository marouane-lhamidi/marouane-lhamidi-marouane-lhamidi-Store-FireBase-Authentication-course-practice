import React from 'react';
import {View,Text,StyleSheet,Image,Button,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native';
import Card from "../Card";

const ProductItem = props => {
    let Touch = TouchableOpacity;
    // if (Platform.OS === 'ios')
    //     Touch = TouchableNativeFeedback;

    return(
        <Card style={styles.product}>
            <Touch style={styles.touch} onPress={props.onSelect}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri : props.imageUrl}} />
                </View>
                <View style={styles.text}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    {props.children}
                </View>
            </Touch>

        </Card>
    )
};

const styles = StyleSheet.create({
    product : {
        height: 300,
        margin :20
    },
    imageContainer : {
        height : '60%',
        width: '100%',

    },
    image : {
        height : '100%',
        width: '100%',
        borderRadius : 10,

    },
    text : {
        height : '17%',
        width: '100%',
        alignItems: 'center',
        paddingVertical : 5
    },
    title : {
        fontSize : 18,
        marginVertical : 4,
        fontFamily : 'Sans-serif'
    },
    price : {
        fontSize: 14,
        color : '#888',
        fontFamily: 'open-sans'
    },
    actions : {
        flexDirection : 'row',
        justifyContent : "space-between",
        alignItems: 'center',
        height : '23%',
        paddingHorizontal : 15
    }

})

export default ProductItem;