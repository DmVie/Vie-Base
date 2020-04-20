import { database } from '../firebase/firebase';

export const setProjects = () => {

  return database.ref('projects')
    .once('value')
    .then((snapshot) => {
      const projects = [];
      snapshot.forEach((childSnapshot) => {
        projects.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      return projects
    })
    .then((projects) => {
      return {
        type: 'SET_PROJECTS',
        projects
      }
    })
    .catch((e) => {
      console.log('Errors abound! ', e.message)
    })

}