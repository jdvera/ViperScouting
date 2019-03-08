import _get from 'lodash/get';

export const findTeamNum = (state, props) => {
    return _get(state, `schedule.matches.${props.matchNumber}.${props.alliance}.${props.position}`, "");
};

export const findTeam = (state, props) => _get(state, `teams.${props.teamNum}`);

export const findTeamMatches = (state, props) => {
    const matches = _get(state, `teams.${props.teamNum}.matches`);
    return matches.map((matchId) => _get(state, `results.${matchId}`));
};

export const findCurrentTeam = (state) => {
    const currentMatch = _get(state, `scouting.currentMatch`, 0);
    const alliance = _get(state, `scouting.alliance`, "");
    const position = _get(state, `scouting.position`, 0);
    const teamNum = findTeamNum(state, { matchNumber: currentMatch, alliance, position});
    // return findTeam(state, { teamNum });
    return teamNum;
};

export const findNextTeam = (state) => {
    const currentMatch = _get(state, `scouting.currentMatch`, 0) + 1;
    const alliance = _get(state, `scouting.alliance`, "");
    const position = _get(state, `scouting.position`, 0);
    const teamNum = findTeamNum(state, { matchNumber: currentMatch, alliance, position});
    // return findTeam(state, { teamNum });
    return teamNum;
};