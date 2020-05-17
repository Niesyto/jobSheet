import { v4 as uuidv4 } from 'uuid';


export default function uniqueUUID(key) {
    try {
        //Get items under a key from localstorage
        const item = JSON.parse(window.localStorage.getItem(key));

        if (item === null || item === undefined)
        //If localstorage is empty, return new uuid
            return uuidv4();
        else {
            //If not, genereta new UUID until it's unique in entire array of items from localstorage
            let newId;
            let repeat=true;
            while (repeat) {
                newId=uuidv4();
                repeat=!item.every(x=> x.id!==newId);
            }
            return newId;
        }
    } catch (error) {
        //If there's an error, return null
        console.log(error);
        return null;
    }
}