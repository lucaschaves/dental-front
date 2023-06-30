import { E_DENTAL_TOKEN, E_DENTAL_USER } from "@/constants";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

interface User {
    user: string;
    password: string;
}

interface AuthContextType {
    token: string;
    signed: boolean;
    user: User;
    login: (user: User) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User>({} as User);
    const [token, setToken] = useState<string>("");

    async function login(u: User) {
        setUser(u);
        setToken("token");
        localStorage.setItem(E_DENTAL_USER, JSON.stringify(u));
        localStorage.setItem(E_DENTAL_TOKEN, "token");
    }

    async function logout() {
        setUser({} as User);
        localStorage.removeItem(E_DENTAL_USER);
        localStorage.removeItem(E_DENTAL_TOKEN);
    }

    useEffect(() => {
        const storagedUser = localStorage.getItem(E_DENTAL_USER);
        const storagedToken = localStorage.getItem(E_DENTAL_TOKEN);
        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            setToken(storagedToken);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signed: !!token,
                token,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
