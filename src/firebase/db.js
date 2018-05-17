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

// Funkar inte!
export function doRemoveFavorites(movieId, userId) {
  const fav = db.ref('favorites').equalTo(movieId, userId)
  fav.remove();
}

  
// Behöver kolla om den redan finns i favoriter innan den lägger till
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



