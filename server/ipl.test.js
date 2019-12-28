let ipl = require('./ipl');

describe('matches played per year test case', () => {
    test('should output false if function is not defined', () => {
        expect(ipl.matchPerYear).toBeDefined()
    })


    test("Should output 1 match played for 2017", () => {
        let testInput1 = [{ 'season': 2017, 'id': 1 }];

        let expOutput1 = { 2017: 1 };

        expect(ipl.matchPerYear(testInput1)).toEqual(expOutput1);
    })

    test("Should output empty object", () => {
        expect(ipl.matchPerYear([])).toEqual({});
    })

    test("expected output should match original output", () => {
        let testInput3 = [{ 'season': 2017, 'id': 1 },
        { 'season': 2016, 'id': 625 },
        { 'season': 2016, 'id': 627 },
        { 'season': 2017, 'id': 3 },
        { 'season': 2010, 'id': 194 },];

        let expOutput3 = {
            2017: 2,
            2016: 2,
            2010: 1
        };
        expect(ipl.matchPerYear(testInput3)).toEqual(expOutput3)
    })
})

describe('win per team per year test case', () => {

    test('should output false if function is not defined', () => {
        expect(ipl.winPerYear).toBeDefined()
    })



    test("should match output with original output", () => {
        let testInput1 = [{
            'season': '2017',
            'winner': "Sunrisers Hyderabad",
            "id": "1"
        },
        {
            'season': '2017',
            'winner': "Rising Pune Supergiant",
            "id": "2"
        },
        {
            "season": '2009',
            "winner": "Royal Challengers Bangalore",
            "id": "119"
        }
        ]


        let expOutput1 = {
            'Sunrisers Hyderabad': { '2009': 0, '2017': 1 },
            'Rising Pune Supergiant': { '2009': 0, '2017': 1 },
            'Royal Challengers Bangalore': { '2009': 1, '2017': 0 }
        };

        expect(ipl.winPerYear(testInput1)).toEqual(expOutput1)
    })

    test("Should output empty object", () => {
        expect(ipl.winPerYear([])).toEqual({})
    })

    test("output Should match with original output", () => {
        let testInput3 = [{
            'season': '2011',
            'winner': "Chennai Super Kings"
        },
        {
            'season': '2011',
            'winner': "Mumbai Indians"
        },
        {
            'season': '2009',
            'winner': "Deccan Chargers"
        },
        {
            'season': '2015',
            'winner': "Kolkata Knight Riders"
        },
        {
            'season': '2015',
            'winner': "Kolkata Knight Riders"
        },
        {
            'season': '2011',
            'winner': "Pune Warriors"
        },
        ]


        let expOutput3 = {
            'Chennai Super Kings': { '2009': 0, '2011': 1, '2015': 0 },
            'Mumbai Indians': { '2009': 0, '2011': 1, '2015': 0 },
            'Deccan Chargers': { '2009': 1, '2011': 0, '2015': 0 },
            'Kolkata Knight Riders': { '2009': 0, '2011': 0, '2015': 2 },
            'Pune Warriors': { '2009': 0, '2011': 1, '2015': 0 }
        }


        expect(ipl.winPerYear(testInput3)).toEqual(expOutput3)
    })


})

describe('extra run per year test case', () => {

    test('should output false if function is not defined', () => {
        expect(ipl.extraRunPerYear).toBeDefined()
    })


    test("Should output empty object", () => {
        expect(ipl.extraRunPerYear([], [])).toEqual({});
    })

    test("expected output should match original output", () => {

       let match = [{
            'season': '2014',
            'id': '464'
        },
        {
            'season': '2014',
            'id': '465'
        },
        {
            'season': '2014',
            'id': '466'
        }
        ]

        let deliveries = [{
            'match_id': '464', 'bowling_team': "Kings XI Punjab", 'extra_runs': '1'
        },
        {
            'match_id': '464', 'bowling_team': "Kings XI Punjab", 'extra_runs': '3'
        },
        {
            'match_id': '464', 'bowling_team': "Kings XI Punjab", 'extra_runs': '0'
        },
        {
            'match_id': '464', 'bowling_team': "Kings XI Punjab", 'extra_runs': '2'
        },
        {
            'match_id': '464', 'bowling_team': "Kings XI Punjab", 'extra_runs': '1'
        },
        {
            'match_id': '465', 'bowling_team': "Delhi Daredevils", 'extra_runs': '3'
        },
        {
            'match_id': '465', 'bowling_team': "Delhi Daredevils", 'extra_runs': '0'
        },
        {
            'match_id': '465', 'bowling_team': "Delhi Daredevils", 'extra_runs': '1'
        },
        {
            'match_id': '465', 'bowling_team': "Delhi Daredevils", 'extra_runs': '4'
        },
        {
            'match_id': '466', 'bowling_team': "Sunrisers Hyderabad", 'extra_runs': '0'
        },
        {
            'match_id': '466', 'bowling_team': "Sunrisers Hyderabad", 'extra_runs': '3'
        },
        {
            'match_id': '466', 'bowling_team': "Sunrisers Hyderabad", 'extra_runs': '2'
        },
        {
            'match_id': '466', 'bowling_team': "Sunrisers Hyderabad", 'extra_runs': '1'
        }]



        let expOutput3 = {
            'Kings XI Punjab': 7,
            'Delhi Daredevils': 8,
            'Sunrisers Hyderabad': 6
        }



        expect(ipl.extraRunPerYear(match, deliveries, '2014')).toEqual(expOutput3);
    })
})

describe('economic bowler', () => {

    test('should output false if function is not defined', () => {
        expect(ipl.bowlingEconomy).toBeDefined()
    })

    test('should output empty object', () => {
        expect(ipl.bowlingEconomy([], [])).toEqual({});
    });

    test('should match with expected output', () => {
      let  match = [{
            'season': '2014',
            'id': '464'
        },
        {
            'season': '2014',
            'id': '465'
        },
        {
            'season': '2014',
            'id': '466'
        }
        ]

       let deliveries = [{
            'match_id': '464', 'bowler': 'j.yadav', 'bowling_team': "Kings XI Punjab", 'total_runs': '6', 'wide_runs': '0', 'noball_runs': '0', 'bye_runs': '0', 'legbye_runs': '0'
        },
        {
            'match_id': '464', 'bowler': 'j.yadav', 'bowling_team': "Kings XI Punjab", 'total_runs': '6', 'wide_runs': '1', 'noball_runs': '0', 'bye_runs': '1', 'legbye_runs': '0'
        },
        {
            'match_id': '464', 'bowler': 'j.yadav', 'bowling_team': "Kings XI Punjab", 'total_runs': '6', 'wide_runs': '0', 'noball_runs': '0', 'bye_runs': '1', 'legbye_runs': '1'
        },
        {
            'match_id': '464', 'bowler': 'j.yadav', 'bowling_team': "Kings XI Punjab", 'total_runs': '6', 'wide_runs': '0', 'noball_runs': '0', 'bye_runs': '0', 'legbye_runs': '1'
        },


        {
            'match_id': '465', 'bowler': 's.nadeem', 'bowling_team': "Delhi Daredevils", 'total_runs': '1', 'wide_runs': '0', 'noball_runs': '1', 'bye_runs': '0', 'legbye_runs': '0'
        },
        {
            'match_id': '465', 'bowler': 's.nadeem', 'bowling_team': "Delhi Daredevils", 'total_runs': '1', 'wide_runs': '0', 'noball_runs': '0', 'bye_runs': '0', 'legbye_runs': '0'
        },
        {
            'match_id': '465', 'bowler': 's.nadeem', 'bowling_team': "Delhi Daredevils", 'total_runs': '1', 'wide_runs': '0', 'noball_runs': '0', 'bye_runs': '0', 'legbye_runs': '0'
        },
        {
            'match_id': '465', 'bowler': 's.nadeem', 'bowling_team': "Delhi Daredevils", 'total_runs': '1', 'wide_runs': '0', 'noball_runs': '0', 'bye_runs': '0', 'legbye_runs': '0'
        },
        {
            'match_id': '466', 'bowler': "MC Henriques", 'bowling_team': "Sunrisers Hyderabad", 'total_runs': '1', 'wide_runs': '0', 'noball_runs': '0', 'bye_runs': '0', 'legbye_runs': '0'
        },
        {
            'match_id': '466', 'bowler': "MC Henriques", 'bowling_team': "Sunrisers Hyderabad", 'total_runs': '6', 'wide_runs': '0', 'noball_runs': '0', 'bye_runs': '0', 'legbye_runs': '0'
        },
        {
            'match_id': '466', 'bowler': "MC Henriques", 'bowling_team': "Sunrisers Hyderabad", 'total_runs': '2', 'wide_runs': '1', 'noball_runs': '0', 'bye_runs': '1', 'legbye_runs': '0'
        },
        {
            'match_id': '466', 'bowler': "MC Henriques", 'bowling_team': "Sunrisers Hyderabad", 'total_runs': '3', 'wide_runs': '0', 'noball_runs': '1', 'bye_runs': '0', 'legbye_runs': '0'
        }]

       let expOutput3 = { 'j.yadav': 4, 'MC Henriques': 6, 's.nadeem': 8 }


        expect(ipl.bowlingEconomy(match, deliveries, '2014')).toEqual(expOutput3);
    })
})
