import { useAuth } from "../context/AppContext";

export const getToken = () => {
    const { user } = useAuth();
    const token = "Bearer " + user?.token;
    return token;
}