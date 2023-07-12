export default function Request() {
    this.getUsers = async function () {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const json = await response.json();
        return json;
    }


    this.getQuoteList = async function () {
        const resopnse = await fetch("./../data/quotes.json");
        return await resopnse.json();
    }


    this.storeUser = async function (name, email) {

        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            body: JSON.stringify({
                name,
                email
            }),
            method: "POST", headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        return await response.json()
    }
}