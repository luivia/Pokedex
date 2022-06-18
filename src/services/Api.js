import axios from 'react-native-axios';

const BASE_FOTO = 'https://pokemon-db-json.herokuapp.com/'

let Api = axios.create({
    baseURL: 'https://pokemon-db-json.herokuapp.com/',
    timeout: 10000
})

export default Api
export {BASE_FOTO}