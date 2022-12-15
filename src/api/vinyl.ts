import { useAuth } from "../context/AppContext"
import { VinylModel } from "../models/vinyl";

const localUri = "http://localhost:47949/vinyls/list/api";
const piLocal = "192.168.1.30:81/vinyls/list/api";
const azureUri = "https://uurde-api.azurewebsites.net/api";

export const listVinyls = async (token: string): Promise<VinylModel[]> => {
    var uri = azureUri + '/vinyls/list';
    const response = await fetch(
        uri, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });
    const vinyls = await response.json();
    if (vinyls["status"] === 401) {
        console.log("unauthorized");
    }
    return vinyls["data"];
}

export const getVinyl = async (id: string, token: string): Promise<VinylModel> => {
    var uri = azureUri + "/vinyls/get?id=" + id;
    const response = await fetch(
        uri, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    });
    const vinyl = await response.json();
    return vinyl["data"];
}