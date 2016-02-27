import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class LeaderboardStore extends EventEmitter {
  constructor() {
    super();
    this.members  =  [];
    this.loading = false;
    this.error = null;
  }

  getAll() {
    return {
      members: this.members,
      loading: this.loading,
      error: this.error,
    };
  }

  handleActions(action) {
    switch (action.type) {
      case 'RECEIVE_LEADERBOARD': {
        this.loading = false;
        this.members = action.members;
        this.emit('change');
      }

      case 'FETCH_LEADERBOARD': {
        this.loading = true;
        this.emit('change');
      }

      case 'FETCH_LEADERBOARD_ERROR': {
        this.loading = false;
        this.error = action.error;
        this.emit('change');
      }

    }
  }
}

const leaderboardStore = new LeaderboardStore();
dispatcher.register(leaderboardStore.handleActions.bind(leaderboardStore));

export default leaderboardStore;
