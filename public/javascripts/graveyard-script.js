let exhumeTheBody = document.querySelectorAll('.exhume')
console.log(exhumeTheBody)

exhumeTheBody.forEach((button) => {
    button.addEventListener('click', async(e) => {
        console.log(e.target.id)
        e.preventDefault()

        let resData = await fetch(`http://localhost:8080/user/watchlist/${e.target.id}/delete`, {
            headers: {'Content-Type': 'application/json'},
        })
        // .then(response => response.json())
        // .then(data => console.log(data))

        console.log(resData)
        console.log('~~~~~~')
        console.log(JSON.stringify(resData))
        
        // let graveyardListing = document.createElement('div')
        //resData is a json object
        //check the status (resdata.ok)
        //const data=resData.json();
        //should console.log to see all of your movies after the new query
        //should key into the resulting Object
        //stringify and set the innerhtml to the container of the movie object
    })
})
