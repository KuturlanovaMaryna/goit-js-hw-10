import axios from "axios";

const API_KEY = "live_kS5nKKxP6IIluSyHQZr8QCHQJRPlbT75BVEA6QKgsUMHmvnD4OrzE9OADuA0dtRW";

const BASE_URL = "https://api.thecatapi.com/v1"
    
axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
    
    return axios.get(`${BASE_URL}/breeds`)
        .then(response => response.data)
        .catch(error => {

            throw new Error("The request failed:", error.message);
        });
};

export function fetchCatByBreed(breedId) {

    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
        .catch(error => {

            throw new Error("The request failed:", error.message);
        });
};