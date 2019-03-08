// import "isomorphic-fetch"

const apiKey = '5dubQ2MVQeWhxayufnlDgBOGYlJGTBX0hZXQTXaUXLja2SQQBtVLnQ2ah6a5yIlR';
const baseURL = 'https://www.thebluealliance.com/api/v3';


function httpGet(url, callback) {
    const options = {
        method: 'GET',
        headers: {
            'X-TBA-Auth-Key': apiKey
        }
    };
    return fetch(baseURL + url, options)
        .then((response) => {
            return response.json()
        }).catch((error) => {
            console.log(`\nerror for: ${baseURL}${url}`);
            console.log(error)
        });
}

// function readFile(file, callback) {
//     fs.readFile(file, 'utf8', function (err, data) {
//         if (err) throw err;
//         var obj = JSON.parse(data);
//         callback(obj);
//     });
// }

// // Event information
// export function getTeams(code) {
// 	return httpGet('/event/' + code + '/teams/keys');
// }
//
// export function getMatch(match_code) {
// 	return httpGet('/match/' + match_code)
//         .then((match) => {
//             const { alliances, match_number } = match;
//             return { alliances, match_number };
//         });
// }

export function getMatches(code) {
	return httpGet('/event/' + code + '/matches')
        .then((matches) => {
            const matchArray = [];
            matches.forEach((match) => {
                const { alliances, match_number } = match;
                const blue = alliances.blue.team_keys.map((teamKey) => teamKey.slice(3));
                const red = alliances.red.team_keys.map((teamKey) => teamKey.slice(3));

                matchArray[match_number] = {matchNumber: match_number, blue, red}
            });
            return matchArray;
        });
}

// export function getOPRs(code) {
// 	return httpGet('/event/' + code + '/oprs', function(stats) {
//         callback(stats.oprs);
//     });
// }
//
// export function getLastMatch(code, callback) {
//     getMatches(code, function(matches) {
//         // Remove matches that haven't happened yet
//         for (var match in matches) {
//             if (matches[match].comp_level == null) {
//                 delete matches[match];
//             }
//         }
//         // Cleanse array of null objects
//         var cleaned = matches.filter(function (el) {
//             return el != null;
//         });
//         // Sort by timestamp
//         cleaned.sort(function(first, second) {
//             return second.post_result_time - first.post_result_time;
//         });
//         // Get latest match
//         callback(cleaned[0]);
//     });
// }
//
// export function getNextMatch(code, callback) {
//     getMatches(code, function(matches) {
//         for (var match in matches) {
//             if (matches[match].actual_time != null) {
//                 delete matches[match];
//             }
//         }
//         var cleaned = matches.filter(function (el) {
//             return el != null;
//         });
//         // Sort by timestamp
//         cleaned.sort(function(first, second) {
//             return first.post_result_time - second.post_result_time;
//         });
//         // Get next match
//         callback(cleaned[0]);
//     });
// }
//
// // Team information
//
// export function getTeamStatus(code, team_code) {
// 	return httpGet('/team/' + team_code + '/event/' + code + '/status');
// }
//
// export function getTeamLastMatch(code, team_code, callback) {
//     var that = this;
//     that.getTeamStatus(code, team_code, function(status) {
//         that.getMatch(status.last_match_key);
//     });
// }
//
// export function getTeamNextMatch(code, team_code, callback) {
//     var that = this;
//     that.getTeamStatus(code, team_code, function(status) {
//         that.getMatch(status.next_match_key);
//     });
// }
//
// export function getTeamAlliance(code, team_code, callback) {
//     getTeamStatus(code, team_code, function(status) {
//         callback(status.alliance);
//     });
// }
//
// export function getTeamRank(code, team_code, callback) {
//     getTeamStatus(code, team_code, function(status) {
//         callback(status.qual.ranking.rank);
//     });
// }