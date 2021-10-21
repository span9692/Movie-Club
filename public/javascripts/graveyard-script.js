let exhumeTheBody = document.querySelectorAll('.exhume')
console.log(exhumeTheBody)

exhumeTheBody.forEach((button) => {
    button.addEventListener('click', async(e) => {
        console.log(e.target.id)
        e.preventDefault()

        let resData = await fetch(`http://localhost:8080/user/watchlist/${e.target.id}/delete`, {
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())

        console.log(resData) // resData contains an array of the remaining movies in the watchlist

        console.log('~~~~~~')
        // let tr = this.closest("tr");
        // console.log(tr)
        // tr.remove();
        let body = document.querySelector('tr');
        // let bodyRows = body.children
        // let update = body.slice.call(elements, 1);
        console.log(body)
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
