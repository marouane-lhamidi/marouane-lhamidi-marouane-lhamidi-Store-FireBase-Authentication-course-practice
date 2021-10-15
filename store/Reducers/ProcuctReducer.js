import PRODUCTS from "../../data/dummy-data";
import {ADD_PRODUCT,DELETE_PRODUCT,EDIT_PRODUCT,IMPORT_DATA} from "../Actions/ProductAction";
import Product from "../../models/Product";

const initialisation = {
    products : PRODUCTS,
    userProducts : PRODUCTS.filter(product => product.ownerID === 'u1')
}

const ProductReducer = (state = initialisation, action) => {
    switch (action.type){
        case IMPORT_DATA :
            return {
                products : action.products,
                userProducts : action.userProduct,
            }
        case ADD_PRODUCT :
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerID,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price,
            );
            return {
                ...state,
                products: state.products.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case EDIT_PRODUCT :
            const ProductIndex = state.userProducts.findIndex(item => item.id === action.id );
            const ProductIndexOriginal = state.products.findIndex(item => item.id === action.id );
            const ourProduct = new Product(
                action.id,
                'u1',
                action.updatedProduct.title,
                action.updatedProduct.imageUrl,
                action.updatedProduct.description,
                state.userProducts[ProductIndex].price,
            );
            const ourProducts = [...state.products];
            const ourUserProducts = [...state.userProducts];
            ourProducts[ProductIndexOriginal] = ourProduct;
            ourUserProducts[ProductIndex] = ourProduct;
            return {
                ...state,
                products: ourProducts,
                userProducts: ourUserProducts
            }
            return {
                ...state,

            }
        case DELETE_PRODUCT :
            return {
                ...state,
                products: state.products.filter(item => item.id !== action.id ),
                userProducts: state.userProducts.filter(item => item.id !== action.id )
            }
    }
    return state;
}

export default ProductReducer;