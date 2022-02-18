import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

let nameCountry = "";

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

searchBox.addEventListener('input', debounce((event) => {
  countryList.innerHTML = "";
  countryInfo.innerHTML = "";
  nameCountry = event.target.value.trim();
  fetchCountries(nameCountry).then((nameCountry) => {
    const arrayCountries = nameCountry;
    processingArrayCountries(arrayCountries);
  });
}, DEBOUNCE_DELAY));

function processingArrayCountries(arrayCountries) {
  if (arrayCountries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else
          if (arrayCountries.length <= 10 && arrayCountries.length >= 2) {
            countryList.insertAdjacentHTML("beforeend", createMarkupListCountries(arrayCountries));
          } else
              if (arrayCountries.length === 1) {
              countryInfo.insertAdjacentHTML("beforeend", createMarkupOneCountry(arrayCountries));
              } else
                  if (arrayCountries.status === 404) {
                    Notiflix.Notify.failure('Oops, there is no country with that name');
                 }
}

function createMarkupOneCountry(arrayCountries) {
  console.log(arrayCountries);
  const [{ capital, flags, name, languages, population }] = arrayCountries;
  const languagesList = Object.values(languages).join(", ");
  
  const makeupOneCountry = `
  <img src='${flags.svg}' alt='flag' style='height: 30px'/>
  <span style='font-size: 40px; font-weight: 700;'>${name.official}</span>
  <p ><span style='font-weight: 700;'>Capital: </span>${capital}</p>
  <p><span style='font-weight: 700;'>Population: </span>${population}</p>
  <p><span style='font-weight: 700;'>Languages: </span>${languagesList}</p>
   `;
  return makeupOneCountry;
}

function createMarkupListCountries(arrayCountries) { 
    countryList.style.padding = '0';  
    const makeupListCountries = arrayCountries.map(country => {
    const {flags, name} = country;
    
    return `<p style='display: flex; align-items: center;'>
            <img src='${flags.svg}' alt='flag' style='width: 30px; margin-right: 10px'/>
            <span>${name.official}</span>
            </p>`;
  }).join("");
  return makeupListCountries;
}



    