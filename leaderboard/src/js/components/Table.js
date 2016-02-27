import React from 'react';

import Row from './table/Row';
import * as LeaderboardActions from '../actions/LeaderboardActions';
import LeaderboardStore from '../stores/LeaderboardStore';

export default class Table extends React.Component {
  constructor() {
    super();
    this.getLeaderboard = this.getLeaderboard.bind(this);
    this.state = {
      members: [],
      loading: false,
      error: null,
      recent: true,
    };
  }

  componentWillMount() {
    LeaderboardStore.on('change', this.getLeaderboard);
  }

  componentDidMount() {
    LeaderboardActions.getRecent();
  }

  componentWillUnmount() {
    LeaderboardStore.removeListener('change', this.getLeaderboard);
  }

  getLeaderboard() {
    const { members, loading, error } = LeaderboardStore.getAll();
    this.setState({
      members,
      loading,
      error,
    });
  }

  toggleSort() {
    const recent = !this.state.recent;
    this.setState({ recent });
  }

  getRecent() {
    if (!this.state.recent) {
      this.toggleSort();
      LeaderboardActions.getRecent();
    }
  }

  getAllTime() {
    if (this.state.recent) {
      this.toggleSort();
      LeaderboardActions.getAllTime();
    }
  }

  render() {
    const { members } = this.state;

    const loadingClass = this.state.loading ? '' : 'hidden';
    const recentClass = this.state.recent ? '' : 'hidden';
    const alltimeClass = this.state.recent ? 'hidden' : '';

    const RowComponents = members.map((member, idx) => {
      return <Row key={member.username} index={idx + 1} {...member} />;
    });

    return (
      <div>
        <div class={'row text-center ' + loadingClass}>
          <h2>LOADING</h2>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th class="text-center" onClick={this.getRecent.bind(this)}>Points in past 30 days
                <i class={'fa fa-fw fa-sort ' + recentClass}></i>
              </th>
              <th class="text-center" onClick={this.getAllTime.bind(this)}>All time points
                <i class={'fa fa-fw fa-sort ' + alltimeClass}></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {RowComponents}
          </tbody>
        </table>
      </div>
    );
  }
}
