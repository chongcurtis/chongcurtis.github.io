;
(function () {

    'use strict';



    // iPad and iPod detection	
    var isiPad = function () {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function () {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };

    // Parallax
    var parallax = function () {
        $(window).stellar();
    };


    // Offcanvas and cloning of the main menu
    var offcanvas = function () {

        var $clone = $('#fh5co-menu-wrap').clone();
        $clone.attr({
            'id': 'offcanvas-menu'
        });
        $clone.find('> ul').attr({
            'class': '',
            'id': ''
        });

        $('#fh5co-page').prepend($clone);

        // click the burger
        $('.js-fh5co-nav-toggle').on('click', function () {

            if ($('body').hasClass('fh5co-offcanvas')) {
                $('body').removeClass('fh5co-offcanvas');
            } else {
                $('body').addClass('fh5co-offcanvas');
            }
            // $('body').toggleClass('fh5co-offcanvas');

        });

        $('#offcanvas-menu').css('height', $(window).height());

        $(window).resize(function () {
            var w = $(window);


            $('#offcanvas-menu').css('height', w.height());

            if (w.width() > 769) {
                if ($('body').hasClass('fh5co-offcanvas')) {
                    $('body').removeClass('fh5co-offcanvas');
                }
            }

        });

    }



    // Click outside of the Mobile Menu
    var mobileMenuOutsideClick = function () {
        $(document).click(function (e) {
            var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('fh5co-offcanvas')) {
                    $('body').removeClass('fh5co-offcanvas');
                }
            }
        });
    };


    // Animations

    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function () {

                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            el.addClass('fadeInUp animated');
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });

                }, 100);

            }

        }, {
            offset: '85%'
        });
    };


    var scheduleTab = function () {
        $('.schedule-container').css('height', $('.schedule-content.active').outerHeight());

        $(window).resize(function () {
            $('.schedule-container').css('height', $('.schedule-content.active').outerHeight());
        });

        $('.schedule a').on('click', function (event) {

            event.preventDefault();

            var $this = $(this),
                sched = $this.data('sched');

            $('.schedule a').removeClass('active');
            $this.addClass('active');
            $('.schedule-content').removeClass('active');

            $('.schedule-content[data-day="' + sched + '"]').addClass('active');

        });
    };

    // Document on load.
    $(function () {
        parallax();
        offcanvas();
        mobileMenuOutsideClick();
        contentWayPoint();
        scheduleTab();


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
    });

    $(".prjimg").on("click", function (e) {
        var title = $(e.target).siblings(".infoTitle").html();
        var url = $(e.target).siblings(".infoImage").html();
        var text = $(e.target).siblings(".infoText").html();
        var tech = $(e.target).siblings(".infoTech").html();
        var repo = $(e.target).siblings(".infoRepo").html();

        $(".descCon").fadeOut(300, function () {
            $("#descTitle").html(title);
            $("#descImage").attr("src", url);
            $("#descText").html(text);
            $("#descTech").html(tech);
            $("#descRepo").attr("href", repo);
            $("#descRepo").html("Repo");
            $(".descCon").fadeIn(300);
            console.log("hi");
        });
    });

    var word;
    $("#contactEmail").on("click", function () {
        word = "<a href='mailto:curtischong5@gmail.com' style='color: #00FF00;' target='_blank'>curtischong5@gmail.com</a>";
        $("#mailElement").typed({
            strings: [word],
            typeSpeed: 4
        });
        setTimeout(function () {
            $(".typed-cursor").remove();
        }, 6000);
    });

    $("#contactLinkedin").on("click", function () {
        word = "<a href='https://www.linkedin.com/in/chongcurtis'  style='color: #00FF00;' target='_blank'>linkedin.com/in/chongcurtis</a>";
        $("#linkedinElement").typed({
            strings: [word],
            typeSpeed: 4
        });
        setTimeout(function () {
            $(".typed-cursor").remove();
        }, 6000);
    });

    $("#contactGithub").on("click", function () {
        word = "<a href='https://github.com/curtischong'  style='color: #00FF00;' target='_blank'>github.com/curtischong</a>";
        $("#githubElement").typed({
            strings: [word],
            typeSpeed: 4
        });
        setTimeout(function () {
            $(".typed-cursor").remove();
        }, 6000);
    });

    $("#contactSt").on("click", function () {
        word = "<a href='http://stackoverflow.com/users/4647924/curtis-chong'  style='color: #00FF00;' target='_blank'>stackoverflow.com/users/4647924/curtis-chong</a>";
        $("#stElement").typed({
            strings: [word],
            typeSpeed: 4
        });
        setTimeout(function () {
            $(".typed-cursor").remove();
        }, 6000);
    });

    $(".coverPhoto").css("height", window.innerHeight);
    
    $("#tohcImg").css("height", $("#twords").height());
    $("#fllImg").css("height", $("#fwords").height());
    //$("#htnCon").css("top",-230);
    //$("#htnCon").css("left",document.body.clientWidth/2-$("#htnCon").width()/2);

    if ($(document).width() > 500) {
        $("#htnLogo").css("width",150);
        $("#htnLogo").css("height",150);
        $("#htnCon").css("top",-300);
        $("#tohcImg").css("background-size", document.body.clientWidth - $("#twords").width());
        $("#fllImg").css("background-size", document.body.clientWidth - $("#fwords").width());
    }else{
        $(".parallax").css("background-size",document.body.clientWidth);
        $("#fllImg").css("height",200);
        $("#tohcImg").css("height",100);
    }
}());
