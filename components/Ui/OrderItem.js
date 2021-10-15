import React,{useState} from 'react';
import {View,StyleSheet,Text,Button} from 'react-native';

import Colors from "../../constant/Colors";
import ItemCart from "./ItemCart";
import Card from "../Card";

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return(
        <Card style={styles.order}>
            <View style={styles.summary}>
                <Text style={styles.price}>${props.order.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.order.readDate}</Text>
            </View>
            <View style={styles.button}>
                <Button
                    color={Colors.primary}
                    title={showDetails ? "Hide Details" : "Show Details"}
                    onPress={() =>{setShowDetails(showDetails => !showDetails)}} />
            </View>
            {showDetails &&
            <View style={styles.maps}>
                {props.order.totalCart.map(item =>

                    <ItemCart
                        key={item.cartId}
                        product={item}
                    />)}
            </View>
            }
        </Card>
    )
};

const styles = StyleSheet.create({
    order : {
        margin : 20,
    },
    summary : {
        flexDirection : 'row',
        padding : 15,
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    price : {
        fontFamily : 'Sans-serif',
        fontSize : 16
    },
    date : {
        fontFamily: 'open-sans',
        fontSize: 14,
        color : '#888'
    },
    button : {
        width: '100%',
        alignItems : 'center',
        marginBottom : 10
    },
    maps : {
        width : '100%'
    }
})

export default OrderItem;
