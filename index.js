// Set current date to input date
document.querySelector('#date').valueAsDate = new Date()

// Add book trip
// function addBooking() {
//     for (let i = 0; i < document.querySelectorAll('.book').length; i++) {
//         document.querySelectorAll('.book')[i].addEventListener('click', () => {
//             console.log('click add')
//             fetch(`https://ouioui-back.vercel.app/cart`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ tripId: this.id }),
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log("🚀 ~ file: index.js ~ line 16 ~ document.querySelectorAll ~ data", data) // => missing tripID
//                     data.result && window.location.assign('cart.html')
//                 })
//         })
//     }
// }

//Add book trip
function addBooking() {
    document.querySelectorAll('.book').forEach(book => {
        book.addEventListener('click', () => {
            fetch(`https://ouioui-back.vercel.app/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tripId: book.id })
            }).then(response => response.json())
                .then(data => {
                    data.result && window.location.assign('cart.html')
                })
        })
    })
}

// Search trip
document.querySelector('#search').addEventListener('click', () => {
    const departure = document.querySelector('#departure').value
    const arrival = document.querySelector('#arrival').value
    const date = document.querySelector('#date').value

    if (!departure || !arrival || !date) {
        return
    }

    fetch(`https://ouioui-back.vercel.app/search/${departure}/${arrival}/${date}`)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                document.querySelector('#results').innerHTML = ''

                // Display results 
                data.trips.map((data, i) => {
                    document.querySelector('#results').innerHTML += `
                        <div class="trip">
                            <span>${moment(data.date).format('DD <br> MMM')}</span>
                            <span>${data.departure}<br> to <br>${data.arrival}</span>
                            <span>${moment(data.date).format('HH:mm')}</span>
                            <span>${data.price}€</span>
                            <button class="book" id="${data._id}"> Add </button>
                        </div>
                    `
                    document.querySelector('#results').style.justifyContent = "flex-start"
                })
                addBooking()
            } else {
                document.querySelector('#results').innerHTML = `
                <img class="resultsLogo" src="./images/train.png" alt="resultsLogo"/>
                <h4>No trip found.</h4>
                `
            }
        })
})