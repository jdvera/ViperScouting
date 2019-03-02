import _get from 'lodash/get';

export const findTeam = (state, props) => _get(state, `teams.${props.teamNum}`);

export const findTeamMatches = (state, props) => {
    const matches = _get(state, `teams.${props.teamNum}.matches`);
    return matches.map((matchId) => _get(state, `results.${matchId}`));
};