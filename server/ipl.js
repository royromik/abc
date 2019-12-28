// Number of matches played per year for all the years in IPL.

function matchPerYear(matchArr) {
  return matchArr.reduce((matchObj, match) => {
    matchObj[match["season"]] = (matchObj[match["season"]] || 0) + 1;
    return matchObj;
  }, {});
}

//  Number of matches won of per team per year in IPL.
function seasonArr(matchArr){
  return matchArr.reduce((yearsObj,match)=>{
    yearsObj[match['season']] = (yearsObj[match['season']]||0);
    return yearsObj;
  },{})
}
function winPerYear(matchArr) {
  let years_obj = seasonArr(matchArr);
  
  
  return matchArr.reduce((seasonsObj, match) => {
    
    if (seasonsObj[match["winner"]] === undefined) {
      seasonsObj[match["winner"]] = {...years_obj};
    }
    let teamName = seasonsObj[match['winner']];
    teamName[match['season']]= ++teamName[match['season']];
    return seasonsObj;
  }, {});
}

///getmatchid function

function getMatchId(matchArr, year) {
  return matchArr
    .filter(match => match["season"] === year)
    .map(match => parseInt(match["id"]));
}

// Extra runs conceded per team in 2016

function extraRunPerYear(matchArr, deliveriesArr, year) {
  var matchIdArr = getMatchId(matchArr, year);

  var lastId = matchIdArr.length - 1;

  return deliveriesArr.reduce((extraRunObj, matchObj) => {
    if (
      parseInt(matchObj["match_id"]) >= matchIdArr[0] &&
      parseInt(matchObj["match_id"]) <= matchIdArr[lastId]
    ) {
      extraRunObj[matchObj["bowling_team"]] =
        (extraRunObj[matchObj["bowling_team"]] || 0) +
        Number(matchObj["extra_runs"]);
    }
    return extraRunObj;
  }, {});
}

//   Top 10 economical bowlers in 2015



function bowlingEconomy(matchArr, deliveriesArr, year) {
  var matchIdArr = getMatchId(matchArr, year);

  var lastId = matchIdArr.length - 1;

  let bowlerStats = deliveriesArr.reduce((bowlersObj, delivery) => {
    if (
      parseInt(delivery["match_id"]) >= matchIdArr[0] &&
      parseInt(delivery["match_id"]) <= matchIdArr[lastId]
    ) {
      var totalRun =
        delivery["total_runs"] -
        (delivery["bye_runs"] + delivery["legbye_runs"]);

      bowlersObj[delivery["bowler"]] = bowlersObj[delivery["bowler"]] || {};
      let bowlerName = bowlersObj[delivery["bowler"]];
      bowlerName["total_runs"] = (bowlerName["total_runs"] || 0) + totalRun;

      if (delivery["wide_runs"] == 0 && delivery["noball_runs"] == 0) {
        bowlerName["balls"] = (bowlerName["balls"] || 0) + 1;
      }
    }
    return bowlersObj;
  }, {});

 
  var statsObj = Object.keys(bowlerStats).reduce(
    (economyObj, bowlerName) => {
      economyObj[bowlerName] =
        bowlerStats[bowlerName]["total_runs"] /
        (bowlerStats[bowlerName]["balls"] / 6);

      return economyObj;
    },
    {}
  );

  var economyObj = Object.entries(statsObj).sort((a, b) => a[1] - b[1]).slice(0,10);
  return economyObj.reduce((topEconomyObj, economy) => {
    
      topEconomyObj[economy[0]] = topEconomyObj[economy[0]] || economy[1];

    return topEconomyObj;
  }, {});
}

module.exports.matchPerYear = matchPerYear;
module.exports.winPerYear = winPerYear;
module.exports.extraRunPerYear = extraRunPerYear;
module.exports.bowlingEconomy = bowlingEconomy;