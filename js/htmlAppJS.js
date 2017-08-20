var main = main || {};

main.Global = {

    Init: function () {
        var $b = $("body");
        var $w = $(window);

        setInterval(function() {
            main.Global.ChangeSlides();
        }, 5000);

        $(".menu-btn").on("click", function(e) {
            e.preventDefault();

            if ($b.hasClass("nav-open")) {
                $b.removeClass("nav-open");
            } else {
                $b.addClass("nav-open");
            }
        });

        $(window).on("scroll", function() {
            var scrollTop = $w.scrollTop(),
                $carousel = $(".carousel"),
                mainTop = $carousel.offset().top + $carousel.height() - $("header").height();

            if (scrollTop >= mainTop) {
                $b.addClass("show-back");
            } else {
                $b.removeClass("show-back");
            }
        });

        $(".showCopyright").on("click", function(e) {
            e.preventDefault();

            $(".navigation").addClass("show-copyright");
        });

        $(".showPrivacy").on("click", function(e) {
            e.preventDefault();

            $(".navigation").addClass("show-privacy");
        });

        $(".back-to-top").on("click", function(e) {
            e.preventDefault();

            $("html, body").animate({scrollTop: 0}, 500);
        });

        $(".navigation .close").on("click", function(e) {
            e.preventDefault();

            $(".navigation").removeClass("show-privacy show-copyright");
        });

        $(".main-nav a").on("click", function(e) {
            e.preventDefault();
            var link = $(this).attr("href").replace("#", "");

            if (window.location.hash === "#" + link) {
                main.Global.ScrollToHash(link);
                return;
            }
            window.location.hash = link;
        });

        $(".sub-nav scrollDown").on("click", function(e) {
            e.preventDefault();
            var link = $(this).attr("href").replace("#", "");
            window.location.hash = link;
        });

        $w.on("hashchange", function (e) {
            main.Global.ScrollToHash(window.location.hash.replace("#", ""));
        });
    },

    ScrollToHash: function (hashLocation) {
        if (hashLocation !== "" && hashLocation.length > 0) {
            $("body").removeClass("nav-open");

            var offset = $("." + hashLocation).offset().top,
    			msPerHeight = 1, //How much ms per height
    			minRange = 500, //minimal animation time
    			maxRange = 1000, //Maximal animation time
    			time = offset * msPerHeight

            time = Math.min(time, maxRange);
			time = Math.max(time, minRange);

            $("html, body").animate({ scrollTop: offset }, time);
        }
    },

    ChangeSlides: function() {
        var carousel = $(".carousel"),
            activeSlide = carousel.find(".active"),
            index = activeSlide.index(),
            totalSlides = carousel.children().length,
            nextSlide = (index === totalSlides - 1) ? carousel.children().eq(0) : activeSlide.next(),
            nextSlideIndex = nextSlide.index();

        nextSlide.addClass("ondeck");

        activeSlide.fadeOut(1500, function() {
            nextSlide.addClass("active").removeClass("ondeck");
            activeSlide.removeClass("active").show().css("left", "");
        });
    }
};

(function() {
    main.Global.Init();
})();

