// Reset bookings for demo
function removeBooking() {
    document.querySelector('.delete').addEventListener('click', () => {
        fetch(`https://ouioui-back.vercel.app/bookings`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    document.querySelector('#trips').innerHTML = `
                    <p>No bookings yet.</p>
                    <p>Why not plan <a href="index.html" style="color: #E3006A;">a trip?</a></p>
                `
                }
                document.querySelector('#trips2').style.display = 'none'
            })
    })
}

// Get bookings
fetch('https://ouioui-back.vercel.app/bookings')
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            document.querySelector('#trips').innerHTML = '<h3>My bookings</h3>'
            for (const { trip } of data.bookings) {
                document.querySelector('#trips').innerHTML += `
                <div class="tripBooked">
                    <span>${trip.departure} <br> to <br> ${trip.arrival}</span>
                    <span>${moment(trip.date).format('HH:mm')}</span>
                    <span>${trip.price}€</span>
                    <span class="departure">Departure ${moment(trip.date).fromNow()}</span>
                </div>
            `
            }

            document.querySelector('#trips2').style.display = 'flex'
            document.querySelector('#trips2').innerHTML += `
            <h5>Enjoy your travels with OuiOui!</h5>
            <button class="delete">reset bookings</button>
        `
        }
        removeBooking()
    })

