function matchesPerYear(){
  visualizeData('../output/matchPerYear.json', 'container', 'matches played per year', 'year', 'matches played', 'matches')
}

function winPerYear(){
  winPerYearVisualizeData('../output/winPerYear.json', 'container', 'Win per Year', 'team', 'wins');
}

function extraRunPerYear(){
  visualizeData('../output/extraRunPerYear.json', 'container', 'extra run per year', 'team', 'extra run', 'extra runs');
}

function bowlingEconomy(){
  visualizeData('../output/bowlingEconomoy.json', 'container', 'bowling economy', 'bowler', 'economy', 'bowling economy');
}

function visualizeData(path, container, headingText, xAxisText, yAxisText, descText) {
  fetch(path).then(response => response.json())
    .then(data => {
      visualize(data, container, headingText, xAxisText, yAxisText, descText);
    });
}

function visualize(data, container, headingText, xAxisText, yAxisText, descText) {
  console.log(Object.keys(data))
  Highcharts.chart(container, {
    chart: {
      type: 'column'
    },
    title: {
      text: headingText
    },

    xAxis: {
      categories: Object.keys(data),
      crosshair: true,
      title: {
        text: xAxisText
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxisText
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: descText,
      data: Object.values(data)

    }]
  })
}



function winPerYearVisualizeData(path, container, headingText, xAxisText, yAxisText) {
  fetch(path).then(response => response.json())
    .then(data => {
      winPerYearVisualize(data, container, headingText, xAxisText, yAxisText);
    });
}

function winPerYearVisualize(data, container, headingText, xAxisText, yAxisText) {
  function yearData(data, year) {
    return Object.keys(data).reduce((yearArr, team) => {
      yearArr.push(data[team][year]);
      return yearArr;
    }, [])
  }
  
  function series(data){
    
   return Object.keys(data[Object.keys(data)[0]]).reduce((seriesJson, year)=>{
       let seriesObj ={};
       seriesObj['name'] = year;
       seriesObj['data'] = yearData(data, year);
       seriesJson.push(seriesObj);
       return seriesJson;
    },[])
    
  }
  Highcharts.chart(container, {
    chart: {
      type: 'column'
    },
    title: {
      text: headingText
    },

    xAxis: {
      categories: Object.keys(data),
      crosshair: true,
      title: {
        text: xAxisText
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxisText
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: series(data)
  })
}

