import React,{useState} from 'react';
import { Provider} from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk'

import ProductReducer from "./store/Reducers/ProcuctReducer";
import CartReducer from "./store/Reducers/CartReducer"
import OrdersReducer from "./store/Reducers/OrdersReducer";
import AuthReducer from "./store/Reducers/AuthReducer";
import ProductNavigation from "./navigation/ProductNavigation";

const root_reducer = combineReducers({
  ProductReducer,
  CartReducer,
  OrdersReducer,
  AuthReducer
});

const store = createStore(root_reducer, applyMiddleware(ReduxThunk))



export default function App() {
  const  [loadedFont, setLoadedFont] = useState(false);
  let [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'Sans-serif' : require('./assets/fonts/OpenSans-Bold.ttf')
  });


  if (!fontsLoaded){
    return (
        <AppLoading
            // startAsync={fetchFonts}
            // onFinish={() => setLoadedFont(true)}
            // onError={(err) => console.log(err)}
        />
    )
  }

  return (
      <Provider store={store}>
          <ProductNavigation />
      </Provider>
  );
}

