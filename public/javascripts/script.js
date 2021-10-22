const countVotes = 0;

let score = document.querySelector('.score')
score.innerText = countVotes;

let upVoteButton = document.querySelector('#upvote');
upVoteButton.addEventListener('click', (e) => {
    score.innerText++
})

let downVoteButton = document.querySelector('#downvote');
downVoteButton.addEventListener('click', (e) => {
    score.innerText--
})

