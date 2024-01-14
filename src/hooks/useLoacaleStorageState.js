import { useState, useEffect } from "react";

export default function useLocalStorageState(initialState, key){
    const [value, setValue] = useState(function(){
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : initialState;
    });
 
    useEffect(function(){
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}