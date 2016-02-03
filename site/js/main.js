function slideLeft() {

    $("#pageHeading").velocity({
        scale: 1.75,
        translateX: "250px"
    }, {
        duration: 3000,
        easing: "linear"
    });
}

$(document).ready(function () {

    $("#firstArticleImage").velocity("transition.bounceIn");
    $("#secondArticleImage").velocity("transition.bounceIn");
    $("#thirdArticleImage").velocity("transition.bounceIn");

    $("#pageHeading").on('click', function () {
        slideLeft();
        $("#pageHeading").velocity("reverse", {
            duration: 2000
        });
    });

});
