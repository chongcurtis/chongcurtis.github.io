$(document).ready(function(){
  let handlePageUpdates = function(){
    $(".fadeIn").each(function () {

      $(this).fadeTo("slow", 1);
      $(this).removeClass("fadeIn");

    });
  };

  handlePageUpdates();
  let renderChart = function(){
    var ctx = document.getElementById('hackathonHisto').getContext('2d');


    var quarterlyHackathons= [
      1,0,
      2,4,4,3,
      3,0,3,0,
      0,0,3,0,
      0,0,2,1,
      0];

    var bimonthly= [
      1,0,
      1,3,2,2,4,1,
      1,2,0,1,2,0,
      0,0,0,2,1,0,
      0,0,0,1,1,1,
      0,0];

    var monthly= [
      1,0,0,0,
      1,0,1,2,1,1,0,2,2,2,1,0,
      1,0,2,0,0,0,0,1,2,0,0,0,
      0,0,0,0,0,0,2,0,1,0,0,0,
      0,0,0,0,0,0,0,1,1,0,1,0,
      0,0,0];
    var monthly= [
      "Sept", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar"]

    /*var biMonthlyLabels= [
      "Sept", "Nov",
      "Jan", "Mar", "May", "Jul", "Sep", "Nov",
      "Jan", "Mar", "May", "Jul", "Sep", "Nov",
      "Jan", "Mar", "May", "Jul", "Sep", "Nov",
      "Jan", "Mar", "May", "Jul", "Sep", "Nov",
      "Jan", "Mar"]*/

    var biMonthlyLabels= [
      "Sept 2016", "",
      "Jan 2017", "", "May 2017", "", "Sep 2017", "",
      "Jan 2018", "", "May 2018", "", "Sep 2018", "",
      "Jan 2019", "", "May 2019", "", "Sep 2019", "",
      "Jan 2020", "", "May 2020", "", "Sep 2020", "",
      "Jan 2020", ""]

    const softWhite = "rgba(219,219,219,1)";
    const softGrey = "rgba(89,89,89,1)";
    const softBlue= "rgba(25, 123, 145)";
    const lightBlue= "rgba(69,203,237,1)";
    Chart.defaults.global.defaultFontColor = softWhite;

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: biMonthlyLabels,
        datasets: [{
          label: '# Hackathons',
          data: bimonthly,
          backgroundColor: softBlue,
          borderColor: lightBlue,
          radius: 1,
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            display: false,
            barPercentage: 1.3,
            ticks: {
                max: 3,
            },
        }, {
            display: true,
            ticks: {
                autoSkip: true,
                max: 4,
            },
            gridLines:{
              display: false,
              color: softGrey,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero:true,
              precision:0
            },
            gridLines:{
              display: true,
              color: softGrey,
            }
          }]
        }
      }
    });


    /*var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dataLabels,
        datasets: [{
          label: 'Group A',
          data: bimonthly,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        }]
      },
      options: {
        scales: {
          xAxes: [{
            display: false,
            barPercentage: 1.3,
            ticks: {
                max: 3,
            },
        }, {
            display: true,
            ticks: {
                autoSkip: true,
                max: 4,
            },
            gridLines:{
              color: softWhite,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero:true
            },
            gridLines:{
              color: softWhite,
            }
          }]
        }
      }
    });*/
  }
  renderChart();
});