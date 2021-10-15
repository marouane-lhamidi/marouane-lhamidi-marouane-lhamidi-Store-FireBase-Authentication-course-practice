import React,{useCallback,useEffect,useReducer,useState} from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,Alert,ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/Input';
import Card from '../../components/Card';
import Colors from '../../constant/Colors';
import {useDispatch} from "react-redux";
import * as AuthAction from "../../store/Actions/AuthAction";
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


const AuthScreen = props => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState();
  const dispatch = useDispatch();


  const [formReducerState, dispatchFormReducer] = useReducer(
      formReducer,
      {
        inputValues : {
          email:  '',
          password:  ''

        },
        inputValidation : {
          email:  false,
          password:  false

        },
        formsIsValid :  false

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
    let action;
    if (!isLogin){
      action = AuthAction.signup( formReducerState.inputValues.email, formReducerState.inputValues.password);
    }else {
      action = AuthAction.login( formReducerState.inputValues.email, formReducerState.inputValues.password)
    }

    setErr(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop')
    }
    catch (err){
      setErr(err.message)
      setIsLoading(false);
    }


  }, [ dispatch, formReducerState.inputValues.email, formReducerState.inputValues.password, isLogin]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              HandlerChange={HandlerChange}
              value=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              HandlerChange={HandlerChange}
              value=""
            />
            <View style={styles.buttonContainer}>
              {isLoading?
                  <ActivityIndicator size='small' color={Colors.primary} />
                  :
                  <Button title={( isLogin ) ? 'Login' : 'SignUp'} color={Colors.primary} onPress={handlerSubmitting}/>}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch To ${(isLogin)?'SignUp':'Login'}`}
                color={Colors.accent}
                onPress={() =>{setIsLogin(prevState=>!prevState)}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
