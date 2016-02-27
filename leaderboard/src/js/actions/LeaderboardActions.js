import axios from 'axios';

import dispatcher from '../dispatcher';

const baseUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/';

export function getRecent() {
  const url = baseUrl + 'recent';

  dispatcher.dispatch({ type:'FETCH_LEADERBOARD' });

  axios.get(url).then((data) => {
    dispatcher.dispatch({ type:'RECEIVE_LEADERBOARD', members: data.data });
  }).catch((error) => {
    dispatcher.dispatch({ type:'FETCH_LEADERBOARD_ERROR', error });
  });
}

export function getAllTime() {
  const url = baseUrl + 'alltime';

  dispatcher.dispatch({ type:'FETCH_LEADERBOARD' });

  axios.get(url).then((data) => {
    dispatcher.dispatch({ type:'RECEIVE_LEADERBOARD', members: data.data });
  }).catch((error) => {
    dispatcher.dispatch({ type:'FETCH_LEADERBOARD_ERROR', error });
  });
}
