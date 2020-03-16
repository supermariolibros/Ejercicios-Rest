import { baseUrl } from "./carsApi";

export const getAllCars = async () => {
    const url = `${baseUrl}/api/cars`;
    const response = await fetch(url);
    if(!response.ok){
        const err = await response.text();
        throw Error(err);
    } 
    return await response.json();
}

export const getCarById =  async (id) => {
    const url = `${baseUrl}/api/cars/${id}`;
    const response = await fetch(url);
    if(!response.ok){
        const err = await response.text();
        throw Error(err);
    } 
    return await response.json();
}

export const addCar = async (car) => {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(car)
    };
    const url = `${baseUrl}/api/cars/`;
    const response = await fetch(url, settings);
    if(!response.ok){
        const err = await response.text();
        throw Error(err);
    } 
    return await response.json();
}