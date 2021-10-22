const countVotes = 0;

let score = document.querySelector('.score')
score.innerText = countVotes;

let upVoteButton = document.querySelector('#upvote');

upVoteButton.addEventListener('click', async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/movies/${movieid}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: {
            horrormovieid,
            userid,
            opinion: true
        }
    })
    .then(response => response.json())
    score.innerText++
})

let downVoteButton = document.querySelector('#downvote');
downVoteButton.addEventListener('click', (e) => {
    score.innerText--
})

