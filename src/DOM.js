import Request from "./Request.js";
import Elements from "./Elements.js";

export default function DOM() {
    const request = new Request();
    const elements = new Elements();

    this.renderCards = function (cards) {

        elements.list.innerHTML = '';
        const newCards = [];
        for (const { name, id, email } of cards) {

            const card = document.createElement('div');

            card.setAttribute("data-id", id);
            card.setAttribute("data-name", name);
            card.setAttribute("data-email", email);

            card.className = "flex flex-col text-center  flex-wrap  bg-neutral-950 rounded shadow shadow-neutral-950 text-white rounded-b-xl overflow-hidden";

            card.innerHTML = `<div class="flex flex-col">
                <div class="flex flex-col text-center justify-center items-center space-y-4 p-10">
                    <img class="w-16 h-16 shadow-2xl shadow-pink-500 rounded-full p-3 mt-10"
                        src="https://ui-avatars.com/api/?name=${name}" alt="" srcset="">
    
                    <span class="name">${name}</span>
                    <p class="text-xs h-[70px]">Loading...</p>
                    <span class="email text-xs text-blue-500">${email}</p>
                </div>
        
                <div class="flex justify-center border-t border-t-purple-600 p-3 font-bold">
                    <button
                        id="edit"
                        class=" transition-all ease-in-out flex-1 p-2 hover:bg-blue-500 rounded-xl hover:shadow-2xl hover:shadow-blue-500 hover:text-blue-100">Edit</button>
                    <button
                        id="delete"
                        class=" transition-all ease-in-out flex-1 p-2 hover:bg-rose-500 rounded-xl hover:shadow-2xl hover:shadow-rose-500 hover:text-rose-100">Delete</button>
                </div>
    
            </div>`;

            card.querySelector("#edit").addEventListener('click', (e) => {
                const modal = document.querySelector("#modal");
                modal.classList.toggle("hidden");
                modal.querySelector('h1').textContent;

                const nameInput = modal.querySelector("#name");
                const emailInput = modal.querySelector("#email");

                request.getUser(id).then(({ name, email }) => {
                    if (name && email) {
                        nameInput.value = name;
                        emailInput.value = email;
                    } else {
                        nameInput.value = card.getAttribute('data-name');
                        emailInput.value = card.getAttribute('data-email');
                    }

                })

                modal.querySelectorAll(".close").forEach(el => el.addEventListener('click', () => {
                    modal.classList.add("hidden");
                }));

                modal.querySelector(".submit").addEventListener('click', () => {

                    request.updateUser(id, nameInput.value, emailInput.value).then(data => {

                        console.log(data);
                        card.querySelector("span.name").textContent = data.name;
                        card.querySelector("span.email").textContent = data.email;
                        modal.classList.add("hidden");
                    }).catch(err => {
                        card.querySelector("span.name").textContent = nameInput.value;
                        card.querySelector("span.email").textContent = emailInput.value;
                        modal.classList.add("hidden");

                    }).finally(() => {
                        card.setAttribute("data-name", nameInput.value);
                        card.setAttribute("data-email", emailInput.value);
                    })


                });

            })


            card.querySelector('#delete').addEventListener('click', () => {
                request.deleteUser(id).then(data => {
                    card.remove();
                })
            })


            elements.list.appendChild(card)

            newCards.push(card);


            request.getQuoteList().then(data => {
                for (const [index, c] of newCards.entries()) {
                    c.querySelector("p").textContent = data[index].quote;
                }
            })

        }

        return newCards;
    }
}