import axios from "axios";

export const apiInstance = axios.create({
    baseURL: "https://pixabay.com/api/",
})