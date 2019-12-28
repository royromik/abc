const { Client } = require('pg');
const client = new Client({
    user: 'mountblue',
    host: 'ipl-1.c3xodypxb4ts.ap-south-1.rds.amazonaws.com',
    database: 'ipl',
    password: 'mountblue!011q2w',
    port: 5432
})

function extraRunPerYear(year){
    // eslint-disable-next-line no-unused-vars
    const values = [year];
    const text = 'SELECT bowling_team , sum(extra_runs) FROM deliveries, matches WHERE matches.id=deliveries.match_id AND season= $1 GROUP BY bowling_team';
    client.connect().then(() => {
        return client.query(text,values)
    })
    .then((result) => {
        console.table(result.rows)
    })
    .finally(()=>{
        client.end;
    })
}
// extraRunPerYear(2016);

function bowlingEconomy(year, no){
    // eslint-disable-next-line no-unused-vars
    const values = [year,no];
    const text = 'SELECT bowler, (total_run/over_count) AS bowling_economy from((SELECT bowler AS b , cast(sum(total_runs-bye_runs-legbye_runs) as float) AS total_run FROM deliveries, matches WHERE matches.id=deliveries.match_id AND season=$1 GROUP BY bowler ORDER BY total_run ) AS table1 JOIN (SELECT bowler , (cast(count(ball) as float) /6 ) AS over_count FROM deliveries, matches WHERE matches.id=deliveries.match_id AND season=$1 AND noball_runs=0 AND wide_runs=0 GROUP BY bowler ORDER BY over_count) AS table2 ON table1.b=table2.bowler) ORDER BY bowling_economy limit $2';
    client.connect().then(() => {
        return client.query(text,values)
    })
    .then((result) => {
        console.table(result.rows)
    })
    .finally(()=>{
        client.end;
    })
}
bowlingEconomy(2015, 10);

// client.connect()
//     .then(() => {
//         console.log('connection established');
//     })
//     .then(() => {
//         return client.query('SELECT DISTINCT season, count(season) AS matches FROM matches GROUP BY season')
//     }).then((result) => {
//         console.table(result.rows);
//     })
//     .then(() => {
//         return client.query('SELECT winner, season, count(winner) AS win  FROM matches WHERE winner is not NULL GROUP BY winner, season ORDER BY winner, season')
//     }).then((result) => {
//         console.table(result.rows)
//     })
 

