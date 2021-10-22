

let score = document.querySelector('.score')

let upVoteButton = document.querySelector('.upvotebutton');

upVoteButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const horrormovieid = e.target.id.split('-')[1]
    const upvotebody = {
        opinion: true
    }
    
    await fetch(`/movies/${horrormovieid}/vote`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(upvotebody)
    })
    .then(response => response.json())
    score.innerText = countVotes;
})



