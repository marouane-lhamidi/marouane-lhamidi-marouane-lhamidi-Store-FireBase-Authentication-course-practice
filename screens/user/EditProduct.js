import React,{useCallback,useEffect,useReducer,useState} from 'react';
import {View,StyleSheet,ScrollView,Platform,Alert,KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import {useDispatch,useSelector} from "react-redux";

import HeaderNewButton from "../../components/HeaderButton";
import * as ProductAction from "../../store/Actions/ProductAction"
import Input from "../../components/Input";
import Colors from "../../constant/Colors";
const UPDATED_INPUT_VALUE = 'UPDATED_INPUT_VALUE'

const formReducer = (state, action) =>{
    if (action.type === UPDATED_INPUT_VALUE){
        const updatedInputValues = {
            ...state.inputValues,
            [action.input] : action.value
        }
        const updatedInputValidation = {
            ...state.inputValidation,
            [action.input] : action.isTrue
        }
        let validation = true;
        for (const key in updatedInputValidation){
            validation = validation &&  updatedInputValidation[key]
        }
        return {
            formsIsValid : validation,
            inputValidation : updatedInputValidation,
            inputValues : updatedInputValues,
        }
    }
}

const EditProduct = props => {
    const productId = props.navigation.getParam('id');
    const product = useSelector(state=> state.ProductReducer.userProducts.find(item => item.id === productId));
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState();
    const dispatch = useDispatch();

    const [formReducerState, dispatchFormReducer] = useReducer(
        formReducer,
        {
            inputValues : {
                    title: ( product ) ? product.title : '',
                    price: ( product ) ? product.price.toString() : '',
                    description: ( product ) ? product.description : '',
                    imageUrl: ( product ) ? product.imageUrl : '',
                },
            inputValidation : {
                title: ( product ) ? true : false,
                price: ( product ) ? true : false,
                description:( product ) ? true : false,
                imageUrl: ( product ) ? true : false,
            },
            formsIsValid : ( product ) ? true : false

        },

    )

    const HandlerChange = useCallback((inputName ,text, isValid) => {
        dispatchFormReducer({
            type : UPDATED_INPUT_VALUE,
            value : text,
            isTrue : isValid,
            input : inputName
        })
    },[dispatchFormReducer])
    useEffect(() => {
        if (err)
            Alert.alert('connection',err,[{text : 'OKey'}])
    }, [err])

    const handlerSubmitting =useCallback( async () => {
        if (!formReducerState.formsIsValid){
            Alert.alert('wrong input','you should enter the right title',[{text : 'OKey'}])
            return;
        }
        setErr(null);
        setIsLoading(true);
        try {
            if (product) {
                await dispatch(ProductAction.editProduct(productId,formReducerState.inputValues.title,formReducerState.inputValues.description,formReducerState.inputValues.imageUrl));

            } else {
                await dispatch(ProductAction.addProduct(formReducerState.inputValues.title,formReducerState.inputValues.description,+formReducerState.inputValues.price,formReducerState.inputValues.imageUrl));
            }
            props.navigation.goBack();
        } catch (err) {
            setErr(err.message);
        }
        setIsLoading(false);
    }, [productId, dispatch, formReducerState.inputValues.title, formReducerState.inputValues.description, formReducerState.inputValues.price, formReducerState.inputValues.imageUrl]);


    useEffect(() => {
        props.navigation.setParams({handlerSubmitting})
    }, [handlerSubmitting])

    if (isLoading){
        return (
            <View style={styles.loaded}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }
    return(
        <KeyboardAvoidingView  behavior="padding" keyboardVerticalOffset={20} enabled>
            <ScrollView>
                <View style={styles.editingContainer}>
                    <Input
                        id='title'
                        label='Title'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        HandlerChange={HandlerChange}
                        initialValue={( product ) ? product.title : ''}
                        initiallyValid={!!product}
                        required
                        errorText="you should enter the title"
                    />
                    <Input
                        id='imageUrl'
                        label='ImageUrl'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        HandlerChange={HandlerChange}
                        initialValue={( product ) ? product.imageUrl : ''}
                        initiallyValid={!!product}
                        required
                        errorText="you should enter the imageUrl"
                    />

                    {!productId &&
                        <Input
                            id='price'
                            label='Price'
                            HandlerChange={HandlerChange}
                            keyboardType='number-pad'
                            autoCorrect
                            initialValue={( product ) ? product.price : ''}
                            initiallyValid={!!product}
                            required
                            min={0.1}
                            errorText="you should enter the price"
                        />
                    }
                    <Input
                        id='description'
                        label='Description'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        HandlerChange={HandlerChange}
                        initialValue={( product ) ? product.description : ''}
                        initiallyValid={!!product}
                        required
                        errorText="you should enter the description"
                    />
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    )
};

EditProduct.navigationOptions = navData =>{
    const handler = navData.navigation.getParam('handlerSubmitting')
    return {
        headerTitle : navData.navigation.getParam('id') ? 'Edit Product' : 'Add Product',
        headerRight : () =>
            <HeaderButtons HeaderButtonComponent={HeaderNewButton}>
                <Item
                    title="Save"
                    iconName={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark' }
                    onPress={handler}
                />
            </HeaderButtons>
    }
}



const styles = StyleSheet.create({
    editingContainer : {
        margin : 10,
        paddingVertical : 10,
    },
    loaded : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default EditProduct;