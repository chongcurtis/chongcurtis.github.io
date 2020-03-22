$(document).ready(function(){
  var vW = window.innerWidth;
  var vH = window.innerHeight;
  let handlePageUpdates = function(){
    $(".fadeIn").each(function () {
      if ($(this).is($("#title"))) { // Since the network is really tall I want to display it later
        $(this).fadeTo(500, 1);
      }else if($(this).is($("#intro"))){
        $(this).fadeTo(1000, 1);
        $(this).animate({
          top: 0,
        },{
          duration: 1000,
          queue: false,
        });
      }else if($(this).is($("#hackathonCon"))){
        $(this).fadeTo(1200, 1);
        $(this).animate({
          top: 0,
        },{
          duration: 1200,
          queue: false,
        });
      }else if($(this).is($("#secondP"))){
        $(this).fadeTo(600, 1);
        $(this).animate({
          top: 0,
        },{
          duration: 600,
          queue: false,
        });
      }else if($(this).is("#lastElement")){
        let ctx = $(this);
        var hrwidthtimer = window.setInterval(function () {
          var hrwidth = ctx.width();
          if (hrwidth < 450) {
            ctx.css("width", hrwidth + 5);
          } else {
            window.clearTimeout(hrwidthtimer);
          }
        }, 16);
      }else if ($(this).hasClass("splitHr")) {
        let ctx = $(this);
        var hrwidthtimer = window.setInterval(function () {
          var hrwidth = ctx.width();
          if (hrwidth < 600) {
            ctx.css("width", hrwidth + 5);
          } else {
            window.clearTimeout(hrwidthtimer);
          }
        }, 16);
      }else{
        $(this).fadeTo(1000, 1);
      }
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
      "Sept 2015", "",
      "Jan 2016", "", "May 2016", "", "Sep 2016", "",
      "Jan 2017", "", "May 2017", "", "Sep 2017", "",
      "Jan 2018", "", "May 2018", "", "Sep 2018", "",
      "Jan 2019", "", "May 2019", "", "Sep 2019", "",
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
            display: true,
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
        },
        responsive: false,
      }
    });
  }
  renderChart();
});