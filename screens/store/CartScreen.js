import React,{useState} from 'react';
import {View,Text,StyleSheet,Button,FlatList,ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import * as CartActions from '../../store/Actions/CartAction';
import * as OrderActions from '../../store/Actions/OrdersAction'
import Colors from "../../constant/Colors";
import ItemCart from "../../components/Ui/ItemCart";
import Card from "../../components/Card";

const CartScreen = props => {
    const totalAmount = useSelector(state=>state.CartReducer.totalAmount)
    const [isLoading, setIsLoading] = useState(false);

    const newTable = useSelector(state=>
    {
        const ourTable = [];
        for (let key in state.CartReducer.items){
            ourTable.push({
                cartId : key,
                Qty : state.CartReducer.items[key].Qty,
                title : state.CartReducer.items[key].title,
                price : state.CartReducer.items[key].price,
                sum : state.CartReducer.items[key].sum,
            })
        }
        return ourTable.sort((a, b) =>( a.cartId > b.cartId) ? 1 : -1);
    }
    );

    const dispatch = useDispatch();

    const handlerFun  = async () => {
        setIsLoading(true);
        await dispatch(OrderActions.addOrder(newTable, totalAmount))
        setIsLoading(false);
    }

    return(
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.textSummary}>
                    Total amount : <Text style={styles.priceSummary}> ${Math.round(totalAmount.toFixed(2) * 100) /100 } </Text>
                </Text>
                {(isLoading)?
                    <View style={styles.loaded}>
                        <ActivityIndicator size='large' color={Colors.primary} />
                    </View>
                :
                    <Button
                        color={Colors.accent}
                        title="Order Now" onPress={handlerFun}
                        disabled={newTable.length === 0}  />
                }

            </Card>
            <View>
                <FlatList
                    data={newTable}
                    keyExtractor={item=> item.cartId}
                    renderItem={itemData =>
                        <ItemCart
                            product={itemData.item}
                            onPress={ () =>{dispatch(CartActions.deleteFromCart(itemData.item.cartId))}  }
                            click
                        />
                    }
                />
            </View>
        </View>
    )
};

CartScreen.navigationOptions = {
    headerTitle : 'Your Cart'
};
const styles = StyleSheet.create({
    screen : {
        margin : 20,
    },
    summary : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginBottom : 10,
        padding : 10,
    },
    textSummary : {
        fontFamily : 'Sans-serif',
        fontSize : 18,
    },
    priceSummary : {
        color : Colors.primary,
    }
})

export default CartScreen;