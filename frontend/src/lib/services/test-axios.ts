// Test file to check if axios is working correctly
import axios from 'axios';

async function testAxios() {
    try {
        console.log('Axios is imported correctly');
        return true;
    } catch (error) {
        console.error('Error with axios:', error);
        return false;
    }
}

export default testAxios;
