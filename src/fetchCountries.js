export {fetchCountries};
import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(nameCountry) {
    return fetch(`${BASE_URL}${nameCountry}?fields=name,capital,population,flags,languages`)
        .then(respons => respons.json())
        .catch(() => {
        Notiflix.Notify.failure('error');
        });
} 









