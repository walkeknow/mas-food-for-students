import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import firebase from 'firebase/compat/app';
import { appAuth } from "../lib/db";

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        const unsubscribe = appAuth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsubscribe;
    }, []);

    return <AuthContext.Provider value = {user}> {children} </AuthContext.Provider>
}