import DOM from "./DOM.js";
import Elements from "./Elements.js";
import Request from "./Request.js";

const elements = new Elements();
const request = new Request();
const dom = new DOM();

let cards = [];
let cardsData = [];

request.getUsers().then(data => {
    cardsData = data;
    cards = dom.renderCards(data)
})
elements.registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = elements.registerForm.querySelector('#name');
    const email = elements.registerForm.querySelector('#email');

    request.storeUser(name.value, email.value).then((data) => {

        cardsData.push(
            { id: data.id, name: data.name, email: data.email });

        cards = dom.renderCards(cardsData)


        name.value = '';
        email.value = '';
    })
})