import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-a0a66-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;