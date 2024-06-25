import axios from "axios";
import { fcmHost } from "../constants";


export const fcmapiv1 = async (method: string, url: string, data_: any, token: string) => {
    return await axios({
        method: method,
        baseURL: fcmHost,
        url: url,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        data: JSON.stringify(data_),
    });
};