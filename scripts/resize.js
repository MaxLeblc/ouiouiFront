window.addEventListener('resize', () => {

    let windowSize = window.innerWidth < 820 ? true : false

    if (windowSize) {
        document.querySelector('#body').innerHTML = `

            <div class="smallSize">
                <h1>Votre fenêtre est trop petite.</h1>
                <br />
                <p>Le format d'ecran n'est pas adapté. <br /> Veuillez naviguer depuis une tablette ou un ordinateur*.</p>
                <br />
                <p>*Si la page ne s'affiche pas depuis votre ordinateur, <br /> veuillez appuyer sur :
                    <p>Ctrl et - pour Windows et Linux</p>
                    <p>Ctrl et - pour Chrome OS</p>
                    <p>⌘ et - pour Mac</p>
                </p>
            </div>
        `
    } else {
        document.location.reload()
    }
})

