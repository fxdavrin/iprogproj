import { auth, db } from './firebase';

// User //

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
});

// Tar fram alla users
export const onceGetUsers = () =>
  db.ref('users').once('value');



// Comments //

// Ska vara kopplad till filmer men funkar ej
export const doCreateComment = (userId, text, movieId) =>
  db.ref('comments').push({
    userId,
    text,
    movieId
});

export const onCommentAdded = (callback) =>
  db.ref('comments')
    .orderByKey()
    .limitToLast(100)
    .on('child_added', callback);


// Favorites //

// Remove favorite. Saknas error om film ej finns bland favoriter. 
export const doRemoveFavorites = (movieId, userId) =>
db.ref('favorites').once('value', snapshot => {
  var key = Object.keys(snapshot.val())
  key.map((key) => {
    db.ref('favorites/' + key + '/').once('value', snapshot => {
      var fav = snapshot.val();
      if(fav.movieId === movieId) {
        db.ref('favorites/' + key + '/').once('value', snapshot => {
          var newfav = snapshot.val();
          if (newfav.userId === userId) {
            db.ref('favorites/' + key + '/').once('value', snapshot => {
              db.ref('favorites/' + key).remove();
            })
          } 
        })
      }
    })
  })
})

// Add Favorite. Saknas koll om den redan finns i favoriter.
export const doAddFavorites = (movieId, title, plot, poster, userId) =>
db.ref('favorites').push({
  movieId,
  title,
  plot,
  poster,
  userId 
});

// Sorterat på userId och tar fram favoriter med den inloggades Id
export const onFavoriteAdded = (callback) =>
  db.ref('favorites')
    .orderByChild("userId")
    .equalTo(auth.currentUser.uid)
    .limitToLast(100)
    .on('child_added', callback);