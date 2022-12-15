import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getVinyl, listVinyls } from "../api/vinyl";
import { VinylModel } from "../models/vinyl";
import { getToken } from "../utils/token";

export const getVinyls = () => {
    const [vinyls, setVinyls] = useState<VinylModel[]>([]);
    const isFocused = useIsFocused();
    const token = getToken();

    useEffect(() => {
        async function fetchData() {
            const response = await listVinyls(token);
            setVinyls(response);
        }
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    return vinyls;
}

export const getVinylById = (id: string) => {
    const [vinyl, setVinyl] = useState<VinylModel>();
    const isFocused = useIsFocused();
    const token = getToken();

    useEffect(() => {
        async function fetchData() {
            const response = await getVinyl(id, token);
            setVinyl(response);
        }
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    return vinyl;
}