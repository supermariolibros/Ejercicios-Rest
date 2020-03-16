import axios from 'axios';
import { baseUrl } from "./carsApi";

export const getAllCars = () => ( axios.get(`${baseUrl}/api/cars`)
.then(result => result.data.map((i) => i))
.catch(err => console.log("Ha habido un error",err)));


export const getCarById = (id) => ( axios.get(`${baseUrl}/api/cars/${id}`)
.then(result => result.data)
.catch(err => console.log("Ha habido un error",err)));


export const addCar = (car) => ( axios.post(`${baseUrl}/api/cars`, car)
.then(() => getAllCars())
.catch(err => console.log("Ha habido un error",err)));