function removeBook() {
    document.querySelectorAll('.delete').forEach(book => {
        book.addEventListener('click', () => {
            fetch(`http://localhost:3000/cart/${book.id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        book.parentNode.remove()

                        // Return empty cart if all trips have been deleted
                        if (document.querySelectorAll('.delete').length === 0) {
                            document.querySelector('#cart').innerHTML = `
                        <p>No tickets in your carts.</p>
                        <p>Why not plan <a href="index.html" style="color: #E3006A;">a trip?</a></p>
                        `
                            document.querySelector('#cart2').style.display = 'none'
                        } else {
                            document.querySelector('#total').textContent = data.bookings.reduce((acc, { trip }) => acc + trip.price, 0)
                        }
                    }
                })
        })
    })
}

//Get cart
fetch(`http://localhost:3000/cart`)
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            document.querySelector('#cart2').style.display = 'flex'
            document.querySelector('#cart').innerHTML = '<h3>My cart<h3>'

            for (const { trip } of data.bookings) {
                document.querySelector('#cart').innerHTML += `
                <div class="tripSelected">
                    <span>${trip.departure} <br> to <br> ${trip.arrival}</span>
                    <span>${moment(trip.date).format('HH:mm')}</span>
                    <span>${trip.price}</span>
                    <button class="delete" id="${trip._id}">X<button>
                </div>
            `
            }

            // Total update
            document.querySelector('#total').textContent = data.bookings.reduce((acc, { trip }) => acc + trip.price, 0)
            removeBook()
        }
    })

// Purchase
document.querySelector('#purchase').addEventListener('click', () => {
    fetch(`http://localhost:3000/bookings`, { method: 'put'})
    .then(response => response.json())
    .then(data => {
        data.result && window.location.assign('bookings.html')
    })
})