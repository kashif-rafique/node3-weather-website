console.log("Javascript file loaded");
// const address = 'Lahore';
// const url = 'http://localhost:3000/weather?address=' + address;
// fetch(url).then((response) => {
//     response.json().then((data) => {
//         if (data?.error) {
//             console.log(data.error);
//         } else {
//             console.log("Location : ", data.location);
//             console.log("Forecast : ", data.forecast);
//         }
//     })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

// message1.textContent = 'From JS';
weatherForm.addEventListener('submit', (e) => {
    message1.textContent = message2.textContent = '';
    e.preventDefault();
    message1.textContent = "Loading...";
    const url = 'http://localhost:3000/weather?address=' + search.value;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data?.error) {
                // console.log(data.error);
                message1.textContent = data.error;
            } else {
                // console.log(data.location);
                // console.log(data.forecast);
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        })
    });
})