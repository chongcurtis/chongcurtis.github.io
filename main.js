$(document).ready(function(){
  var vH = window.innerHeight;
  var vW = window.innerWidth;
  $(window).scroll(function () {
    $(".fadeIn").each(function () {

      var pos = $(this).offset().top,
      winTop = $(window).scrollTop();
      if (pos +200< winTop + vH) {
        if($(this).is($("#splitHr1"))){
          var hrwidthtimer = window.setInterval(function () {
            var hrwidth = $("#splitHr1").width();
            if (hrwidth < vW - vH/4) {
              $('#splitHr1').css("width", hrwidth + 5);
            }else {
              window.clearTimeout(hrwidthtimer);
            }
          },16);
        }else if($(this).is($("#splitHr2"))){
          var hrwidthtimer = window.setInterval(function () {
            var hrwidth = $("#splitHr2").width();
            if (hrwidth < vW - vH/4) {
              $('#splitHr2').css("width", hrwidth + 5);
            }else {
              window.clearTimeout(hrwidthtimer);
            }
          },16);
        }else if($(this).is($("#splitHr3"))){
          var hrwidthtimer = window.setInterval(function () {
            var hrwidth = $("#splitHr3").width();
            if (hrwidth < vW - vH/4) {
              $('#splitHr3').css("width", hrwidth + 5);
            }else {
              window.clearTimeout(hrwidthtimer);
            }
          },16);
        }else if($(this).is($("#hackathonNum"))){
          if($(this).html() == 0){
            (function myLoop (i) {
              if(i < 10){
                setTimeout(function () {
                  i++;
                  $("#hackathonNum").html(i);
                  if(i < 15) myLoop(i);
                }, 100)
              }else if(i <13){
                setTimeout(function () {
                  i++;
                  $("#hackathonNum").html(i);
                  if(i < 15) myLoop(i);
                }, 200)
              }else if(i == 13){
                setTimeout(function () {
                  i++;
                  $("#hackathonNum").html(i);
                  if(i < 15) myLoop(i);
                }, 600)
              }else{
                setTimeout(function () {
                  i++;
                  $("#hackathonNum").html(i);
                  if(i < 15) myLoop(i);
                }, 1000)
              }
            })(0);
          }
        }else if($(this).is($("#winNum"))){
          if($(this).html() == 0){
            (function myLoop (i) {
              if(i < 3){
                setTimeout(function () {
                  i++;
                  $("#winNum").html(i);
                  if(i < 5) myLoop(i);
                }, 300)
              }else{
                setTimeout(function () {
                  i++;
                  $("#winNum").html(i);
                  if(i < 5) myLoop(i);
                }, 700)
              }
            })(0);
          }
        }else if($(this).is($("#htnLogo"))){
          if($(this).css("left") == (vW/2- 75) + "px"){
            setTimeout(function () {
              $("#htnLogo").stop().animate({
                left: vW/2- 170
              }, {
                queue: false
              });
              $("#htnWords").fadeTo(1000,1);
            },1500);
          }
        }
        $(this).fadeTo(1500, 1);
        $(this).removeClass("fadeIn");
      }
    });
  });
$("#network").css("width",vW*0.9);
  $("#binarySnowflakeCanvas").width(vW);
    if(vW > 1400){
        $("#network").css("left",vW*0.12);
    }else if(vW > 1300){
    $("#network").css("left",vW*0.07);
    }else{
        $("#network").css("left",10);
    }
    if(vW > 1300){
        $("#hackathonNum").css("left",vW/2 - 200);
        $("#winNum").css("left", vW/2 - 110);
        $("#myProjects").css("height",1500);
        $("#resumeBlock").css("height",350);
        $("#experience").css("height",$("#experience").height()+200);
    }else{
        $("#hackathonNum").css("left",vW/2 - 175);
  $("#winNum").css("left", vW/2 - 80);
    }
  $("#htnLogo").css("top",$("#htn").height()/2 - 75);
  $("#htnLogo").css("left",vW/2- 75);
  $("#htnWords").css("top",$("#htn").height()/2-35);
  $("#htnWords").css("left",vW/2);

    
  if(vW < 530){
    $("#fllTitle").css("margin-top","100px");
    $("#network").css("top", $("#experienceIntro").offset().top-705);
    $("#title").css("top",60);
    $("#title").css("left",15);
    $("#subHeaders").css("top",130);
    $("#subHeaders").css("left",20);
    $("#title").animate({top: 80}, 1000);
    setTimeout(function () {
      $("#subHeaders").animate({top: 150},{
        queue: false,
        duration: 1000
      });
      $("#subHeaders").fadeTo(800, 1);
    },300);

    $("#introTitle").css("top",50);
    $("#introduction").css("top",70);
    $("#intro").css("height",450);
    $("#hackathonsWord").css("width",10);
    $("#splitHr1").css("top",500);

  }else{
    $("#network").css("top", $("#experienceIntro").offset().top-855);
    $("#title").css("top",vH - 260);
    $("#subHeaders").css("top",vH - 190);
    $("#title").animate({top: vH - 300}, 1000);
    setTimeout(function () {
      $("#subHeaders").animate({top: vH - 230},{
        queue: false,
        duration: 1000
      });
      $("#subHeaders").fadeTo(800, 1);
    },300);
  }
  $("#bannerPhoto").css("height",vH);
  $("#binarySnowflakeCanvas").css("top",5);
  $("#tohcDesc").css("height",$("#tohcImg").height());

  $("#t1").fadeTo(200, 1);
  setTimeout(function () {
    $("#t2").fadeTo(200, 1);
    setTimeout(function () {
      $("#t3").fadeTo(200, 1);
      setTimeout(function () {
        $("#t4").fadeTo(200, 1);
        setTimeout(function () {
          $("#t5").fadeTo(200, 1);
          setTimeout(function () {
            $("#t6").fadeTo(200, 1);
            setTimeout(function () {
              $("#t7").fadeTo(200, 1);
              setTimeout(function () {
                $("#t8").fadeTo(200, 1);
                setTimeout(function () {
                  $("#t9").fadeTo(200, 1);
                  setTimeout(function () {
                    $("#t10").fadeTo(200, 1);
                    setTimeout(function () {
                      $("#t11").fadeTo(200, 1);
                    }, 60);
                  }, 50);
                }, 30);
              }, 30);
            }, 30);
          }, 30);
        }, 30);
      }, 30);
    }, 30);
  }, 30);

  $("#viewProject").on("click",function(){
    $("#viewProject").hide();
    $("#backToEvent").show();
    $("#prjTitle").attr("popupImg",$("#prjImg").attr("src"));
    $("#prjImg").attr("src",$("#prjTitle").attr("thePrjImg"));
    $("#prjP").html($("#prjTitle").attr("desc"));
  });

  $("#backToEvent").on("click",function(){
    $("#viewProject").show();
    $("#backToEvent").hide();
    $("#prjImg").attr("src",$("#prjTitle").attr("popupImg"));
    $("#prjP").html($("#prjTitle").attr("eventDesc"));
  });

  $(".hackathonHighlightsImg").on("click",function(){
    $("#viewProject").show();
    $("#backToEvent").hide();
    $("#myModal").modal("show");
    $("#prjP").html($(this).attr("eventDesc"));
    var hackathon = $(this).attr("hackathon");
    var place = $(this).attr("place");
    var title = $(this).attr("hackname");
    var image = $(this).attr("popupImg");
    var thePrjImg = $(this).attr("thePrjImg");
    $("#prjTitle").html(title);
    $("#prjTitle").attr("thePrjImg",thePrjImg);
    $("#prjTitle").attr("eventDesc",$(this).attr("eventDesc"));
    $("#prjTitle").attr("desc",$(this).attr("desc"));
    $("#prjTitleEvent").html(hackathon);
    $("#prjTitlePlace").html(place);
    $("#prjImg").attr("src",image);
    //$(".modal-content").css("background-image","url(http://res.cloudinary.com/dj2eq8czc/image/upload/v1486482255/flybits_pukqgx.jpg)")
  });

  $(".prjimg").on("click",function(){
    $("#viewProject").hide();
    $("#backToEvent").hide();
    $("#myModal").modal("show");
    $("#prjP").html($(this).attr("desc"));
    $("#prjImg").attr("src",$(this).attr("thePrjImg"));
    $("#prjTitle").html($(this).attr("hackName"));
    $("#prjTitleEvent").html($(this).attr("hackathon"));
    $("#prjTitlePlace").html("");
  });

  var word;
  $("#contactEmail").on("click", function () {
    word = "<a href='mailto:curtischong5@gmail.com' style='color: #00FF00;' target='_blank'>curtischong5@gmail.com</a>";
    $("#mailElement").typed({
      strings: [word],
      typeSpeed: 6
    });
    setTimeout(function () {
      $(".typed-cursor").remove();
    }, 6000);
  });
  $("#contactLinkedin").on("click", function () {
    word = "<a href='https://www.linkedin.com/in/chongcurtis'  style='color: #00FF00;' target='_blank'>linkedin.com/in/chongcurtis</a>";
    $("#linkedinElement").typed({
      strings: [word],
      typeSpeed: 6
    });
    setTimeout(function () {
      $(".typed-cursor").remove();
    }, 6000);
  });
  $("#contactGithub").on("click", function () {
    word = "<a href='https://github.com/curtischong'  style='color: #00FF00;' target='_blank'>github.com/curtischong</a>";
    $("#githubElement").typed({
      strings: [word],
      typeSpeed: 6
    });
    setTimeout(function () {
      $(".typed-cursor").remove();
    }, 6000);
  });
  $("#contactSt").on("click", function () {
    word = "<a href='http://stackoverflow.com/users/4647924/curtis-chong'  style='color: #00FF00;' target='_blank'>stackoverflow.com/users/4647924/curtis-chong</a>";
    $("#stElement").typed({
      strings: [word],
      typeSpeed: 6
    });
    setTimeout(function () {
      $(".typed-cursor").remove();
    }, 6000);
  });
});
