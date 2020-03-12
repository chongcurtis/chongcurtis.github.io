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
    var dataValues = [
      1,0,0,0,
      1,0,1,2,1,1,0,2,2,2,1,0,
      1,0,2,0,0,0,0,1,2,0,0,0,
      0,0,0,0,0,0,2,0,1,0,0,0,
      0,0,0,0,0,0,0,1,1,0,1,0,
      0,0,0];
    var dataLabels = [
      "Sept", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "Jan", "Feb", "Mar"]
    const softWhite = "rgba(219,219,219,1)";
    Chart.defaults.global.defaultFontColor = softWhite;
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dataLabels,
        datasets: [{
          label: 'Group A',
          data: dataValues,
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
    });
  }
  renderChart();
});