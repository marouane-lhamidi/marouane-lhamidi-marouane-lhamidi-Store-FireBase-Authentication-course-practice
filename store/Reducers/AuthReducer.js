import {STARTUP, LOGOUT} from "../Actions/AuthAction";


const initialisation = {
    token : null,
    idUser : null
}


const AuthReducer = (state = initialisation, action) => {
    switch (action.type) {
        case STARTUP :
            return {
                token: action.token,
                idUser: action.idUser
            }
        case LOGOUT :
            return initialisation;

        //
        // case SIGNUP :
        //     return {
        //         token: action.token,
        //         idUser: action.idUser
        //     }

        default :
            return state
    }

}

export default AuthReducer;