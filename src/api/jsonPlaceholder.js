import axios from 'axios';

const proxyURL = "https://cors-anywhere.herokuapp.com/";

export default axios.create({
    baseURL: proxyURL + "https://www.reddit.com",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
})