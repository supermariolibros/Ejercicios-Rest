import { 
    addCarRows, 
    retrieveCarId, 
    populateEditCarForm,
    retrieveCarForm,
    cleanTable,
} from './uiHelpers';
import { login } from './api/login.service';
import { httpClientService } from './api/http-client.service';
import { baseUrl } from "./API/carsApi";

const readCredentials = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    return {
        username,
        password
    };
};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const credentials = readCredentials();
        
        login(credentials)
            .then((data) => {
                // console.log(data);
                const { access_token } = data;
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                };
                httpClientService.setHeaders(headers);
                document.getElementById('form').style.display = "none";
                document.getElementById('car-panel').style.display = "block";
            }).catch((err) => console.log(err));
    });
    const buttonLoadCars = document.getElementById('loadcars');
    buttonLoadCars.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');

        httpClientService.get(`${baseUrl}/api/cars`).then((result) => {
            addCarRows(result, 'cars-table');
        });
    });

    const buttonLoadCar = document.getElementById('loadcar');
    buttonLoadCar.addEventListener('click', (event) => {
        event.stopPropagation();
        const id = retrieveCarId();
        httpClientService.get(`${baseUrl}/api/cars/${id}`)
            .then((r) => populateEditCarForm(r));
    });

    const buttonAddCar = document.getElementById('add');
    buttonAddCar.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const car = retrieveCarForm();

        httpClientService.post(`${baseUrl}/api/cars`,car)
            .then((_) => {
                cleanTable('cars-table');
                return  httpClientService.get(`${baseUrl}/api/cars`);
            })
            .then((result) => {
                addCarRows(result, 'cars-table');
            });
    });
});