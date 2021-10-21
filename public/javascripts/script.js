    // let countVotes=0;
    // let score=document.querySelector('.score');
    //  score.innerText=countVotes;

    // const upVoteButton = document.querySelector('#upvote')

    // const downVoteButton = document.querySelector('#downvote')

    // upVoteButton.addEventListener('click', () => {
    //     document.querySelector('.score').innerText++;
    //     localStorage.setItem('score', countVotes);
    // })

    // downVoteButton.addEventListener('click', () => {
    //     document.querySelector('.score').innerText--;
    // })

    const countVotes = 0;

let  score = document.querySelector('.score')
score.innerText = countVotes;

let upVoteButton = document.querySelector('#upvote');
upVoteButton.addEventListener('click', (e) => {
    score.innerText++
})

let downVoteButton = document.querySelector('#downvote');
downVoteButton.addEventListener('click', (e) => {
    score.innerText--
})


// let addToWatchlist = document.querySelectorAll('.btn1')

// addToWatchlist.forEach((button) => {
//     button.addEventListener('click', (e) => {
//         e.preventDefault();
//         console.log(e.target);
//         // const { horrormovieid } = req.body;
//         // const { userId } = req.session.auth
//         // const watchlist = await db.Watchlist.create({
//         //     userid: userId,
//         //     horrormovieid
//         // })
//         // await fetch('http://localhost:8080/movies', {
//         //     method: "POST",
//         //     headers: { 'Content-Type': 'application/json' },
//         //     body: {}
//         // }).then((response) => response.body)
//     })
// })
// console.log(addToWatchlist)
