console.log("Script is here");

// /** 
// * @param {array} rows
// * @param {integer} index

// */

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };


function respond_to_button() {
    d3.event.preventDefault();
    console.log("Your button is reacting");
    var userSelectedCrypto1 = d3.select("#firstCurrency").node().value;
    var userSelectedCrypto2 = d3.select("#secondCurrency").node().value;
    var userSelectedDateTime1 = d3.select("#firstDateTime").node().value;
    var userSelectedDateTime2 = d3.select("#secondDateTime").node().value;
    console.log(userSelectedCrypto1);
    console.log(userSelectedDateTime1);

    buildPlot(userSelectedCrypto1, userSelectedCrypto2, userSelectedDateTime1, userSelectedDateTime2);
};

function buildPlot(userSelectedCrypto1, userSelectedCrypto2, userSelectedDateTime1, userSelectedDateTime2) {

    var corr_data_fetch_url = `/livedata/${userSelectedCrypto1}/${userSelectedCrypto2}/${userSelectedDateTime1}/${userSelectedDateTime2}`;

    d3.json(corr_data_fetch_url).then(function(data) {

        // Grab values from the response json object to build the plots
        var symbol = unpack(data.dataset.data, 0);
        var price = unpack(data.dataset.data, 1);
        var timestamp = unpack(data.dataset.data, 2);

        console.log(symbol);
        console.log(price);
        console.log(timestamp);



        var halfWayThrough = Math.floor(timestamp.length / 2)

        var symbolBrah = symbol.slice(0, halfWayThrough);
        var symbolBrah2 = symbol.slice(halfWayThrough, symbol.length);
        var priceBrah = price.slice(0, halfWayThrough);
        var priceBrah2 = price.slice(halfWayThrough, price.length);
        var datetimeBrah = timestamp.slice(0, halfWayThrough);


        minutesInt = Array.from(Array(datetimeBrah.length).keys())
        console.log(minutesInt)

        var trace1 = {
            x: minutesInt,
            y: priceBrah,
            name: `${userSelectedCrypto1}`,
            type: 'scatter'
          };
          var trace2 = {
            x: minutesInt,
            y: priceBrah2,
            name: `${userSelectedCrypto2}`,
            type: 'scatter'
          };
          
          var data1 = [trace1, trace2];
          
          trace3 = {
            x: priceBrah,
            y: priceBrah2,
            name: `${userSelectedCrypto1} & ${userSelectedCrypto2}`,
            type: 'scatter',
            mode: 'markers'
          }
          
          var data2 = [trace3];
          
        var trace4 = {
            y: priceBrah,
            type: "box"
        };
        var trace5 = {
            y: priceBrah2,
            type: "box"
        };

        var data3 = [trace4]
        var data4 = [trace5]
          
          
          var layout = {
            title: {
              text:'Plot Title',
              font: {
                family: 'Courier New, monospace',
                size: 24
              },
              xref: 'paper',
              x: 0.05,
            },
            xaxis: {
              title: {
                text: 'x Axis',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              },
            },
            yaxis: {
              title: {
                text: 'y Axis',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              }
            }
          };
          

          var layout2 = {
            title: {
              text:'Plot Title',
              font: {
                family: 'Courier New, monospace',
                size: 24
              },
              xref: 'paper',
              x: 0.05,
            },
            xaxis: {
              title: {
                text: 'x Axis',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              },
            },
            yaxis: {
              title: {
                text: 'y Axis',
                font: {
                  family: 'Courier New, monospace',
                  size: 18,
                  color: '#7f7f7f'
                }
              }
            }
          };




          Plotly.newPlot('lineplot', data1, layout);
          Plotly.newPlot('scatterplot', data2, layout2)
          Plotly.newPlot("boxplot1", data3);
          Plotly.newPlot("boxplot2", data4)

      // Plotly.newPlot("lineplot", trace1, layout);
    });

};

d3.selectAll("#submit").on("click", respond_to_button);

