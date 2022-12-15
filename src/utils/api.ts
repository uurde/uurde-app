import { useAuth } from "../context/AppContext";

export const getToken = () => {
    const { user } = useAuth();
    const token = "Bearer " + user?.token;
    return token;
}

export const getUrl = () => {
    const localUri = "http://localhost:47949/api";
    const piLocal = "192.168.1.30:81/api";
    const azureUri = "https://uurde-api.azurewebsites.net/api";
    return azureUri;
}