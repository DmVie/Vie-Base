import { database } from '../firebase/firebase';

export const setLearnings = () => {
  return database.ref('learnings')
    .once('value')
    .then((snapshot) => {
      const learnings = [];
      snapshot.forEach((childSnapshot) => {
        learnings.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      return learnings
    })
    .then((learnings) => {
      return {
        type: 'SET_LEARNINGS',
        learnings
      }
    })
    .catch((e) => {
      console.log('Errors abound! ', e.message)
    })

}