const csv = require("csvtojson");
const fs = require("fs");
const ipl = require('./ipl')
csv()
  .fromFile("../csv_files/matches.csv")
  .then(jsonObj => {
    var json = JSON.stringify(jsonObj);
    fs.writeFileSync("../json_files/matches.json", json);
  });
csv()
  .fromFile("../csv_files/deliveries.csv")
  .then(jsonObj => {
    var json = JSON.stringify(jsonObj);
    fs.writeFileSync("../json_files/deliveries.json", json);
  });

const match_json = require("../json_files/matches.json");
const deliveries_json = require("../json_files/deliveries.json");

let ifError = function(err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
 }

 fs.writeFile('../output/matchPerYear.json', JSON.stringify(ipl.matchPerYear(match_json)), 'utf8', ifError);
 fs.writeFile('../output/winPerYear.json', JSON.stringify(ipl.winPerYear(match_json)), 'utf8', ifError);
 fs.writeFile('../output/extraRunPerYear.json', JSON.stringify(ipl.extraRunPerYear(match_json,deliveries_json,'2016')), 'utf8', ifError);
 fs.writeFile('../output/bowlingEconomoy.json', JSON.stringify(ipl.bowlingEconomy(match_json, deliveries_json, '2015')), 'utf8', ifError);







