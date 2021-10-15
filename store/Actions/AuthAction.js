import AsyncStorage from '@react-native-async-storage/async-storage';
// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const STARTUP = 'STARTUP'
export const LOGOUT = 'LOGOUT'

export const startUp = (token, idUser) => {
    return async dispatch => {
        // any async code you want!

        dispatch({type: STARTUP, token : token, idUser : idUser});
    };

}
export const logOut = () => {
    return async dispatch => {
        // any async code you want!

        dispatch({type: LOGOUT});
    };

}

export const signup = (email, password) => {
    return async dispatch => {
        // any async code you want!

        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken : true
            })
        });
        if (!response.ok){
            let messages = 'Something wrong with you';
            const error = await response.json();
            console.log(error)
            if (error.error.message === 'EMAIL_EXISTS')
                messages = 'Email is already exist'

            throw new Error(messages);

        }

        const resData = await response.json();
        dispatch(startUp(resData.idToken, resData.localId ));
        const lastDate =new  Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        asyncStorage(resData.idToken, resData.localId, lastDate)
    };

}
export const login = (email, password) => {
    return async dispatch => {
        // any async code you want!

        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken : true
            })
        });

        if (!response.ok){
            let messages = 'Something wrong with you';
            const error = await response.json();
            if (error.error.message === 'EMAIL_NOT_FOUND')
                messages = 'Email not found'
            if (error.error.message === 'INVALID_PASSWORD')
                messages = 'Password is not correct'
            throw new Error(messages);

        }

        const resData = await response.json();

        console.log(resData)
        dispatch(startUp(resData.idToken, resData.localId ));
        const lastDate =new  Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        asyncStorage(resData.idToken, resData.localId, lastDate)
    };

}

const asyncStorage = (token, idUser, expiryDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        idUser,
        expiryDate : expiryDate.toISOString()
    }))

}
