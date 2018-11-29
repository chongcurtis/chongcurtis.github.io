$(document).ready(function () {
  var vH = window.innerHeight;
  var vW = window.innerWidth;
  $(window).scroll(function () {
    $(".fadeIn").each(function () {
      var pos = $(this).offset().top,
        winTop = $(window).scrollTop();
      if (pos + 200 < winTop + vH) {
        if ($(this).context.classList.contains("splitHr")) {
          let ctx = $(this);
          var hrwidthtimer = window.setInterval(function () {
            var hrwidth = ctx.width();
            if (hrwidth < vW - vH / 4) {
              ctx.css("width", hrwidth + 5);
            } else {
              window.clearTimeout(hrwidthtimer);
            }
          }, 16);
        } else if ($(this).is($("#hackathonNum"))) {
          if ($(this).html() == 0) {
            (function myLoop(cur_step) {
              let time_delay = 1 / cur_step;
              setTimeout(function () {
                $("#hackathonNum").html(cur_step + "  ");
                if (cur_step < 24) {
                  myLoop(cur_step + 1);
                }
              }, 1000 * time_delay);
            })(0);
          }
        } else if ($(this).is($("#winNum"))) {
          // I can't get a good enough function for this :(
          /*if ($(this).html() == 0) {
            (function myLoop(cur_step){
              let time_delay = 40*Math.sqrt(20*Math.pow(cur_step,3) + 1);
              setTimeout(function(){
                $("#winNum").html(cur_step + "  ");
                if (cur_step < 6) {
                  myLoop(cur_step+1);
                }
              }, time_delay);
            })(0);
          }*/

          if ($(this).html() == 0) {
            (function myLoop(i) {
              if (i < 3) {
                setTimeout(function () {
                  i++;
                  $("#winNum").html(i);
                  if (i < 6) myLoop(i);
                }, 300);
              } else {
                setTimeout(function () {
                  i++;
                  $("#winNum").html(i);
                  if (i < 6) myLoop(i);
                }, 700);
              }
            })(0);
          }
        } else if ($(this).is($("#htnLogo"))) {
          if ($(this).css("left") == (vW / 2 - 75) + "px") {
            setTimeout(function () {
              $("#htnLogo").stop().animate({
                left: vW / 2 - 170
              }, {
                queue: false
              });
              $("#htnWords").fadeTo(1000, 1);
            }, 1500);
          }
        } else if ($(this).is($("#typingCon"))) {
          const numElements = 5;
          let listOfElements = ["mailElement", "linkedinElement", "githubElement", "devpostElement", "stElement"];
          let listOfElementLinks = ["<a href='mailto:curtischong5@gmail.com' style='color: #00FF00;'>curtischong5@gmail.com</a>", 
          "<a href='https://www.linkedin.com/in/chongcurtis'  style='color: #00FF00;' target='_blank'>linkedin.com/in/chongcurtis</a>",
           "<a href='https://github.com/curtischong'  style='color: #00FF00;' target='_blank'>github.com/curtischong</a>", 
           "<a href='https://devpost.com/curtischong'  style='color: #00FF00;' target='_blank'>devpost.com/curtischong</a>", 
           "<a href='http://stackoverflow.com/users/4647924/curtis-chong' style='color: #00FF00;' target='_blank'>stackoverflow.com/users/4647924/curtis-chong</a>"];
           for(let r = 0; r < numElements; r++){
              $("#" + listOfElements[r]).typed({
                strings: [listOfElementLinks[r]],
                typeSpeed: 6
              })
           }
          setTimeout(function () {
            $(".typed-cursor").remove();
          }, 6000);
        }
        $(this).fadeTo(1000, 1);
        $(this).removeClass("fadeIn");
      }
    });
  });

  // TODO: Deal with this later. changing the parallax library might affect this
  // TODO: make this work for mobile
  $("#binarySnowflakeCanvas").width(vW);

  $("#htnLogo").css("top", $("#htn").height() / 2 - 75);
  $("#htnLogo").css("left", vW / 2 - 75);
  $("#htnWords").css("top", $("#htn").height() / 2 - 35);
  $("#htnWords").css("left", vW / 2);

  if (vW < 500) {
    $("#winningHacksPadding").css("padding-top", 60);
    $("#visualizationsPadding").css("padding-top", 30);
    $("#visualizationsPadding").css("padding-bottom", 60);
    $("#archivesPadding").css("padding-top", 30);
    $("#archivesPadding").css("padding-bottom", 60);
    $("#personalFavouritesPadding").css("padding-top", 30);
    $("#personalFavouritesPadding").css("padding-bottom", 60);
  }


  if (vW < 530) { // mobile
    $("#title").css("top", 60);
    $("#title").css("left", 0);
    $("#title").css("width", vW);
    $("#title").css("text-align", "center");
    $("#subHeaders").css("top", 130);
    $("#subHeaders").css("left", 0);
    $("#subHeaders").css("width", vW);
    $("#subHeaders").css("text-align", "center");
    $("#educationHeader").css("top", 225);
    $("#educationHeader").css("left", 0);
    $("#educationHeader").css("width", vW);
    $("#educationHeader").css("text-align", "center");
    setTimeout(function () {
      $("#educationHeader").fadeTo(800, 1);
    },400);
    $("#title").animate({
      top: 80
    }, 1000);
    setTimeout(function () {
      $("#subHeaders").animate({
        top: 150
      }, {
        queue: false,
        duration: 1000
      });
      $("#subHeaders").fadeTo(800, 1);
      $("#quickLinks").fadeTo(800,1);
    }, 300);
  } else { // Desktop
    $("#title").css("top", vH - 260);
    $("#subHeaders").css("top", vH - 190);
    $("#educationHeader").css("top", vH - 190);
    setTimeout(function () {
      $("#educationHeader").fadeTo(1000, 1);
    },800);
    $("#title").animate({
      top: vH - 300
    }, 1000);
    setTimeout(function () {
      $("#subHeaders").animate({
        top: vH - 230
      }, {
        queue: false,
        duration: 1000
      });
      $("#subHeaders").fadeTo(800, 1);
      $("#quickLinks").fadeTo(800,1);
    }, 300);
  }

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

  var showProject = function () {
    $("#viewProject").hide();
    $("#backToEvent").show();
    $("#prjTitle").attr("popupImg", $("#prjImg").attr("src"));
    $("#prjImg").attr("src", $("#prjTitle").attr("thePrjImg"));
    $("#prjP").html($("#prjTitle").attr("desc"));
    $("#prjRepo").show();
  };
  var showEvent = function (ctx) {
    $("#viewProject").show();
    $("#backToEvent").hide();
    $("#myModal").modal("show");
    $("#prjP").html($(ctx).attr("eventDesc"));
    var hackathon = $(ctx).attr("hackathon");
    var place = $(ctx).attr("place");
    var title = $(ctx).attr("hackname");
    var image = $(ctx).attr("popupImg");
    var thePrjImg = $(ctx).attr("thePrjImg");
    $("#prjTitle").html(title);
    $("#prjTitle").attr("thePrjImg", thePrjImg);
    $("#prjTitle").attr("eventDesc", $(ctx).attr("eventDesc"));
    $("#prjTitle").attr("desc", $(ctx).attr("desc"));
    $("#prjRepo").attr("href", $(ctx).attr("repoLink"));
    $("#prjTitleEvent").html(hackathon);
    $("#prjTitlePlace").html(place);
    $("#prjImg").attr("src", image);
    $("#prjRepo").hide();
  };


  $("#viewProject").on("click", function () {
    showProject();
  });
  $("#viewFire").on("click", function () {
    $(this).attr("repoLink", $("#SFfirstLink").attr("repoLink"));
    $(this).attr("hackName", $("#SFfirstLink").attr("hackName"));
    $(this).attr("hackathon", $("#SFfirstLink").attr("hackathon"));
    $(this).attr("place", $("#SFfirstLink").attr("place"));
    $(this).attr("thePrjImg", $("#SFfirstLink").attr("thePrjImg"));
    $(this).attr("popupImg", $("#SFfirstLink").attr("popupImg"));
    $(this).attr("eventDesc", $("#SFfirstLink").attr("eventDesc"));
    $(this).attr("desc", $("#SFfirstLink").attr("desc"));
    showEvent(this);
    showProject();
  });

  $("#backToEvent").on("click", function () {
    $("#viewProject").show();
    $("#backToEvent").hide();
    $("#prjImg").attr("src", $("#prjTitle").attr("popupImg"));
    $("#prjP").html($("#prjTitle").attr("eventDesc"));
    $("#prjRepo").hide();
  });

  $(".competitionWin").on("click", function () {
    showEvent(this);
    //$(".modal-content").css("background-image","url(http://res.cloudinary.com/dj2eq8czc/image/upload/v1486482255/flybits_pukqgx.jpg)")
  });

  $(".prjimg").on("click", function () {
    $("#viewProject").hide();
    $("#backToEvent").hide();
    $("#myModal").modal("show");
    $("#prjP").html($(this).attr("desc"));
    $("#prjImg").attr("src", $(this).attr("thePrjImg"));
    $("#prjTitle").html($(this).attr("hackName"));
    $("#prjTitleEvent").html($(this).attr("hackathon"));
    $("#prjTitlePlace").html("");
    $("#prjRepo").show();
    $("#prjRepo").attr("href", $(this).attr("repoLink"));
  });
});