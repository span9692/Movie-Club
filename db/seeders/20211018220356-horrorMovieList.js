'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('HorrorMovies', [
    {title: 'The Shining(1980)', director: 'Stanley Kubrick', releasedate:'1980-05-23', rating: 'R', scarelevel:'6', subGenre: 'Psychological', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Nightmare on Elm Street', director: 'Wes Kraven', releasedate:'1984-11-09', rating: 'R', scarelevel:'3', subGenre: 'Monster', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Get Out', director: 'Jordan Peele', releasedate:'2017-01-23', rating: 'R', scarelevel:'4', subGenre: 'Psychological', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Us', director: 'Jordan Peele', releasedate:'2019-03-08', rating: 'R', scarelevel:'3', subGenre: 'Slasher', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Alien Covenant', director: 'Ridley Scott', releasedate:'2017-05-19', rating: 'R', scarelevel:'4', subGenre: 'Monster', createdAt:new Date(), updatedAt: new Date()},
    {title: 'The Invisible Man', director: 'Leigh Whannell', releasedate:'2020-02-28', rating: 'R', scarelevel:'5', subGenre: 'Psychological', createdAt:new Date(), updatedAt: new Date()},
    {title: 'A Quiet Place', director: 'John Krasinski', releasedate:'2018-04-06', rating: 'PG-13', scarelevel:'6', subGenre: 'Monster', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Jaws', director: 'Steven Spielberg', releasedate:'1975-06-20', rating: 'PG', scarelevel:'2', subGenre: 'Monster', createdAt:new Date(), updatedAt: new Date()},
    {title: 'The Babadook', director: 'Jennifer Kent', releasedate:'2014-11-28', rating: 'Not Rated', scarelevel:'7', subGenre: 'Paranormal', createdAt:new Date(), updatedAt: new Date()},
    {title: 'The Lighthouse', director: 'Robert Eggers', releasedate:'2019-10-25', rating: 'R', scarelevel:'6', subGenre: 'Psychological', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Hereditary', director: 'Ari Aster', releasedate:'2018-06-08', rating: 'R', scarelevel:'8', subGenre: 'Paranormal', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Let the Right One In', director: 'Tomas Alfredson', releasedate:'2008-10-24', rating: 'R', scarelevel:'4', subGenre: 'Paranormal', createdAt:new Date(), updatedAt: new Date()},
    {title: 'It Follows', director: 'David Robert Mitchell', releasedate:'2015-03-27', rating: 'R', scarelevel:'4', subGenre: 'Monster', createdAt:new Date(), updatedAt: new Date()},
    {title: 'The Silence of the Lambs', director: 'Johnathon Demme', releasedate:'1991-02-13', rating: 'R', scarelevel:'8', subGenre: 'Slasher', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Texas Chainsaw Massacre', director: 'Tobe Hooper', releasedate:'1974-10-01', rating: 'R', scarelevel:'9', subGenre: 'Slasher', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Cabin in the Woods', director: 'Joss Whedon', releasedate:'2012-04-13', rating: 'R', scarelevel:'2', subGenre: 'Comedy', createdAt:new Date(), updatedAt: new Date()},
    {title: 'One Hour Photo', director: 'Mark Romanek', releasedate:'2002-06-21', rating: 'R', scarelevel:'9', subGenre: 'Psychological', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Paranormal Activity', director: 'Oren Peli', releasedate:'2009-09-25', rating: 'R', scarelevel:'3', subGenre: 'Paranormal', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Shaun of the Dead', director: 'Edgar Wright', releasedate:'2004-09-24', rating: 'R', scarelevel:'1', subGenre: 'Comedy', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Zombieland', director: 'Ruben Fleischer', releasedate:'2009-10-02', rating: 'R', scarelevel:'1', subGenre: 'Comedy', createdAt:new Date(), updatedAt: new Date()},
    {title: 'The Ring', director: 'Gore Verbinski', releasedate:'2002-10-18', rating: 'R', scarelevel:'6', subGenre: 'Paranormal', createdAt:new Date(), updatedAt: new Date()},
    {title: 'The Hills Have Eyes', director: 'Wes Kraven', releasedate:'1977-07-22', rating: 'R', scarelevel:'7', subGenre: 'Slasher', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Hush', director: 'Mike Flanagan', releasedate:'2016-03-12', rating: 'R', scarelevel:'6', subGenre: 'Slasher', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Gremlins', director: 'Joe Dante', releasedate:'1984-06-08', rating: 'PG', scarelevel:'1', subGenre: 'Comedy', createdAt:new Date(), updatedAt: new Date()},
    {title: 'Tucker and Dale vs Evil', director: 'Eli Craig', releasedate:'2011-09-30', rating: 'R', scarelevel:'1', subGenre: 'Comedy', createdAt:new Date(), updatedAt: new Date()}
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('HorrorMovies', null, {});
  }
};
