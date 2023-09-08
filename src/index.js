import { fetchBreeds } from "./js/cat-api"
import { fetchCatByBreed } from "./js/cat-api"
import { Notify } from "notiflix";
import SlimSelect from "slim-select";
import 'slim-select/dist/slimselect.css'



const dropCatInput = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error')

dropCatInput.addEventListener('change', dropInputChange);

function createCatList() {

    loader.classList.remove('is-hidden');
    dropCatInput.classList.add('is-hidden');
    error.classList.add('is-hidden')

    fetchBreeds()
        .then(data => {

            const optionList = data.map(({ id, name }) => ` <option value="${id}">${name}</option>`
            ).join(' ');

            dropCatInput.innerHTML = optionList;

            new SlimSelect({
                select: dropCatInput
            })

            loader.classList.add('is-hidden');
            dropCatInput.classList.remove('is-hidden')
        })
        .catch((error) => {
            Notify.failure('Oops! Something went wrong! Try reloading the page!')
        });
}

createCatList();


function dropInputChange(e) {
    loader.classList.remove('is-hidden');
    catInfoContainer.classList.add('is-hidden');

    const selectedBreedId = e.currentTarget.value;

    fetchCatByBreed(selectedBreedId)
        .then(data => {
            renderMarkupInfo(data);
            loader.classList.add('is-hidden');
            catInfoContainer.classList.remove('is-hidden');
        })
        .catch((error)=> {
            loader.classList.add('is-hidden');
            Notify.failure('Oops! Something went wrong! Try reloading the page!')
        });
}

function renderMarkupInfo(data) {
    const { breeds, url } = data[0];
    const { name, temperament, description } = breeds[0];
    const beerdCard = `<img class="photo-cat" width = "350px" src="${url}" alt="${name}">
    <div class="text-part" >
  <h2 class="name-cat" style="margin-top: 0">${name}</h2>
  <p class="deskripion-cat">${description}</p>
  <p class="temperament-cat"><span class="temperament-label">Temperament:</span> ${temperament}</p>  </div>`;

    catInfoContainer.innerHTML = beerdCard;

}
