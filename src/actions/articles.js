import { database } from '../firebase/firebase';

export const setArticles = () => {
  return database.ref('articles')
    .once('value')
    .then((snapshot) => {
      const articles = [];
      snapshot.forEach((childSnapshot) => {
        articles.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      return articles
    })
    .then((articles) => {
      return {
        type: 'SET_ARTICLES',
        articles
      }
    })
    .catch((e) => {
      console.log('Errors abound! ', e.message)
    })

}