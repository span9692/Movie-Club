let exhumeTheBody = document.querySelectorAll('.exhume')

exhumeTheBody.forEach((button) => {
    button.addEventListener('click', async(e) => {
        e.preventDefault()

        await fetch(`/user/watchlist/${e.target.id}/delete`, {
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())

        let body = document.querySelectorAll('tr');

        body.forEach((element => {
            let td = element.querySelectorAll('td');

            if(td.length > 0) { // ignores the header row
                let info = td[5] // column of the button
                let div = info.querySelector('div')
                let form = div.querySelector('form')
                let button = form.querySelector('button')
                if (button.id === e.target.id) {
                    element.remove()
                }
            }
        }))
        // console.log(update)
        // body[1].remove()


        // let graveyardListing = document.createElement('div')

        // let tableBody = document.querySelector('tbody')
        // tableBody.appendChild(graveyardListing)

        //resData is a json object
        //check the status (resdata.ok)
        //const data=resData.json();
        //should console.log to see all of your movies after the new query
        //should key into the resulting Object
        //stringify and set the innerhtml to the container of the movie object
    })
})
