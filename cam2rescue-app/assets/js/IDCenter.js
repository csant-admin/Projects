import {ref} from 'vue';

export const generateUniqueIdb = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${timestamp}${randomNum}`;
}
