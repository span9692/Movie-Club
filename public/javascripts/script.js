let score = document.querySelector('.score')

let upVoteButton = document.querySelector('.upvotebutton');

upVoteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const horrormovieid = e.target.id.split('-')[1]
    const upvotebody = {
        opinion: true
    }

    if(e.target.innerText === 'Like') {
        e.target.innerText = 'Unlike'
    } else {
        e.target.innerText = 'Like'
    }

    await fetch(`/movies/${horrormovieid}/vote`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(upvotebody)
    })
    .then(response => response.json())
    .then(data => score.innerText = `Likes: ${data.votes}`)
})
