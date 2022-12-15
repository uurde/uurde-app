import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContextModel } from "../models/appContext";
import { UserModel } from "../models/user";
import { isTokenExpired } from "../utils/jwt";

const AppContext = createContext({} as AppContextModel);

const AppProvider: FC<{ children: any }> = ({ children }) => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [loggedIn, setLoggedIn] = useState(!!user);
    const [isLoaded, setIsLoaded] = useState(false);

    const login = useCallback((user: UserModel) => {
        setLoggedIn(true);
        setUser(user)
        AsyncStorage.setItem("user", JSON.stringify(user));
    }, []);

    const logout = useCallback(() => {
        setLoggedIn(false);
        AsyncStorage.removeItem("user");
    }, []);

    useEffect(() => {
        getUserFromLocal()
            .then((data: any) => {
                if (!data) {
                    setLoggedIn(false);
                    setUser(null);
                }
                setLoggedIn(true);
                setUser(data);
            })
            .finally(() => {
                setIsLoaded(true);
            })
    }, []);

    const values: AppContextModel = useMemo(() => ({
        user,
        loggedIn,
        login,
        logout,
    }), [
        user,
        loggedIn,
        login,
        logout
    ]);

    if (!isLoaded) {
        return null;
    }

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
};

const getUserFromLocal = async () => {
    try {
        const userString: any = await AsyncStorage.getItem("user");
        if (!userString) return null;
        const user: UserModel = JSON.parse(userString);
        if (!user.token) return null;
        if (isTokenExpired(user.token)) return null;
        return user;
    } catch (error) {
        return null;
    }
}

const useAuth = () => useContext(AppContext);
export { AppProvider, useAuth };