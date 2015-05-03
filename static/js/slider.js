function readCookie(nameCookie)
{
    if (document.cookie.length > 0)
    {
        var inizio = document.cookie.indexOf(nameCookie + "=");
        if (inizio != -1)
        {
            inizio = inizio + nameCookie.length + 1;
            var fine = document.cookie.indexOf(";",inizio);
            if (fine == -1) fine = document.cookie.length;
            return unescape(document.cookie.substring(inizio,fine));
        }else{
            return "";
        }
    }
    return "";
}

var che = readCookie("che");
var checke = function(){
    if(($("#form" + (mySwiper.activeIndex) + " :radio:checked").length === 3) && che==0){
        che = 1;
        swal({   title: "SWIPE!<br><p style='color:white;'>Puoi scorrere col dito per cambiare domanda.</p>",   text: "<img src='/img/swipe.png'>",   html: true }, function(isConfirm){
            if (isConfirm) 
                mySwiper.slideNext();
        });
    }
}

var innerB = function(sen, radios){
    var text = "<input type='hidden' name='email' value='" + readCookie("email") + "' >";
    for (var i = 0; i < 3; i++){
        text += "<div class='control-group'>" +
            "<label class='control-label' for='radios'>"+ sen[i] + "</label><br>" +
            "<div class='btn-group' data-toggle='buttons'>";
        for (var j = 1; j < 6; j++){
            text += "<label class='btn btn-default'>" +
                "<input type='radio' class='btmon' name='" + radios[i] + "' value='" + j + "' onchange='checke()' />" + j +
                "</label>";
        }
        text += "</div></div>";
    }
    return text;
}
sen = ["Romanticismo", "Cultura", "Vita Notturna"];
radios = ["radiosR", "radiosC", "radiosN"];
$('.tag-id').html(innerB(sen, radios));   


var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    //loop: true,

    // If we need pagination
    //pagination: '.swiper-pagination',
    paginationHide: true,
    // Navigation arrows
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',

    // And if we need scrollbar
    scrollbar: '.swiper-scrollbar',
    //parallax: true,

    preloadImages: true,
    updateOnImagesReady: true,

    keyboardControl: true,

    pagination: '.swiper-pagination',
    paginationClickable: false,
    paginationBulletRender: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
    }

});

mySwiper.slideTo(readCookie("slideN"), 0);


var endd = function(){
    swal({   
        title: "Grazie per la compilazione!",
        text: "Verrai indirizzato al sito di Babaiola.",
        imageUrl: "/img/celebration.png",
        html: true,
        closeOnConfirm: false,
    }, function(isConfirm){
        if (isConfirm) 
            $(location).attr('href','http://babaiola.com');
    });
};

var sender = function () {
    if(mySwiper.activeIndex > 0) {
        $.ajax({
            url: '/sendi',
            type: 'POST',
            timeout: 3000,
            data: $('#form' + (mySwiper.activeIndex-1)).serialize()
        });
    }
    document.cookie = "slideN = " + (mySwiper.activeIndex);
    document.cookie = "che = " + che;
}

mySwiper.on('slideChangeStart', sender);


var uncheck = function(formName){
    $(formName + ' .btmon').prop('checked', false);
    $(formName + ' .btn-success').removeClass('btn-success active');
}

$(document).ready(function() {
    $(".btn-group label:not(.active)").click(function() {
        var label = $(this);
        var input = $('#' + label.attr('for'));
        if (!input.prop('checked')) {
            label.closest('.btn-group').find("label").removeClass('active btn-success');
            label.addClass('active btn-success');
            input.prop('checked', true);
        }
    });
});
