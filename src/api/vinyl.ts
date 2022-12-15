import { VinylModel } from "../models/vinyl";
import { getUrl } from "../utils/api";

export const listVinyls = async (token: string): Promise<VinylModel[]> => {
    var uri = getUrl() + '/vinyls/list';
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
    var uri = getUrl() + "/vinyls?vinylId=" + id;
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