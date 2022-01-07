import { createContext } from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    checkDoc: false,
    checkQR: false,
    checkManager: false,
    setToogle: () => { },
    setCheckManager: () => { },
    userID: 0,
    logout: () => { },
    // onLogin: () => { },
    // onLogout: () => { },
});

export default AuthContext;