import { apiInstance } from "../services/api";
import refs from "../services/refs";

export async function apiRequest(page = 1) {
    const API_KEY = '35763619-b9c9e6bf9f3dd81a59d81ea43';

    const option = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
    })


    const response = await apiInstance.get(`?key=${API_KEY}&q=${refs.inputFormEl.value}&${option}&page=${page}`)
    return response.data;

}