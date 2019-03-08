import _has from 'lodash/has';


/***
 *
 * Expected object format:

{
    'matchNum': 5,
    'teamNum': 6800,
    'preMatch': {
        'pos': 'lvl1',
        'piece': 'hatch',
        'config': '2/0'
    },
    'timeline': [
        { 'time': 0, 'type': 'H_' },
        { 'time': 8653, 'type': 'H_DP' },
        { 'time': 14653, 'type': 'H_R1' },
        { 'time': 18653, 'type': 'H_' },
        { 'time': 28653, 'type': 'H_R1' },
        { 'time': 35653, 'type': 'H_' },
        { 'time': 42653, 'type': 'H_' },
        { 'time': 56653, 'type': 'H_R2' },
        { 'time': 60653, 'type': 'H_' },
        { 'time': 69653, 'type': 'H_R2' },
        { 'time': 78653, 'type': 'H_' },
        { 'time': 85653, 'type': 'H_R3' },
        { 'time': 96653, 'type': 'H_' },
        { 'time': 106653, 'type': 'H_R3' },
        { 'time': 115653, 'type': 'C_' },
        { 'time': 121653, 'type': 'C_R1' },
        { 'time': 127653, 'type': 'C_' },
        { 'time': 133653, 'type': 'C_R1' },
        { 'time': 140653, 'type': 'C_' },
        { 'time': 142653, 'type': 'CLMB_S' },
        { 'time': 147653, 'type': 'CLMB_F' }
    ],
    'postMatch': {
        'pos': 'lvl2',
        'host': 0,
        'liftability': 'good',
        'defense': 'meh',
        'broken': 'healthy',
        'roles': ['rocketeer']
    }
}
 *
 */

export function validatePayload(obj, path) {
    if (!_has(obj, path)) {
        console.warn(`Improperly formatted payload: missing '${path}'`)
        return false;
    }
    return true;
}

function validatePreMatch(rawResults) {
    return validatePayload(rawResults, 'preMatch') &&
        validatePayload(rawResults, 'preMatch.pos') &&
        validatePayload(rawResults, 'preMatch.piece') &&
        validatePayload(rawResults, 'preMatch.config');
}

function validateTimeline(rawResults) {
    return validatePayload(rawResults, 'timeline') &&
        rawResults.timeline.every((event) => validatePayload(event, 'eventType') && validatePayload(event, 'time'));
}

function validatePostMatch(rawResults) {
    return validatePayload(rawResults, 'postMatch') &&
        validatePayload(rawResults, 'postMatch.pos') &&
        validatePayload(rawResults, 'postMatch.host') &&
        validatePayload(rawResults, 'postMatch.liftability') &&
        validatePayload(rawResults, 'postMatch.defense') &&
        validatePayload(rawResults, 'postMatch.broken')
}


export function validateRawResults(rawResults) {
    let valid = validatePayload(rawResults, 'matchNum') &&
                validatePayload(rawResults, 'teamNum');

    valid = valid && validatePreMatch(rawResults);
    valid = valid && validateTimeline(rawResults);
    valid = valid && validatePostMatch(rawResults);

    return valid;
}