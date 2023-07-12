import Request from "./Request.js";
import Elements from "./Elements.js";

export default function DOM() {
    const request = new Request();
    const elements = new Elements();

    this.renderCards = function (cards) {

        elements.list.innerHTML = '';
        const newCards = [];
        for (const { name } of cards) {
            const card = document.createElement('div');
            card.className = "flex flex-col text-center  flex-wrap bg-neutral-950 rounded shadow shadow-neutral-950 text-white rounded-b-xl overflow-hidden";

            card.innerHTML = `<div>
                <div class="flex flex-col text-center justify-center items-center space-y-4  p-20">
                    <img class="w-20 h-20 shadow-2xl shadow-pink-500 rounded-full"
                        src="https://ui-avatars.com/api/?name=${name}" alt="" srcset="">
    
                    <span>${name}</span>
                    <p>Loading...</p>
                </div>
        
                <div class="flex justify-center border-t border-t-purple-600 p-3 font-bold">
                    <button
                        class=" transition-all ease-in-out flex-1 p-3 hover:bg-blue-500 rounded-xl hover:shadow-2xl hover:shadow-blue-500 hover:text-blue-100">Edit</button>
                    <button
                        class=" transition-all ease-in-out flex-1 p-3 hover:bg-rose-500 rounded-xl hover:shadow-2xl hover:shadow-rose-500 hover:text-rose-100">Delete</button>
                </div>
    
            </div>`;

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