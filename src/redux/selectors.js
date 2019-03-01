import _get from 'lodash/get';

// const teamsSelector = (state) => _get(state, 'teams');
const resultSelector = (state) => state.results;

const findTeam = (state, props) => _get(state, `teams.${props.teamNum}`);
export const findTeamMatches = (state, props) => {
    const matches = _get(state, `teams._${props.teamNum}.matches`);
    return matches.map((matchId) => _get(state, `results.${matchId}`));
}

// const findTasksForTeam = (state, props) => {
//     const tasks = [];
//     findTeamMatches(state, props).forEach(
//         (match) => tasks.concat(_get(match, `taskMap.${props.eventType}`))
//     );
//     return tasks;
// };