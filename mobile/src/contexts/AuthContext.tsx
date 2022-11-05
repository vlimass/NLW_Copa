import { propsFlattener } from "native-base/lib/typescript/hooks/useThemeProps/propsFlattener";
import { createContext, ReactNode } from "react";

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children } : AuthProviderProps) {
    async function signIn() {
        console.log('Teste!');
    }

    return(
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: 'Vinicius lima',
                avatarUrl: 'https://github.com/vlimass.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
} 