$(document).ready(function () {

    var isDragging = false;

    $('#ctl00_Main_btnNext').addClass("ss-hidden");

    $(".ss-slider").mousedown(function (e) {
        isDragging = false;
        console.log(e.pageX);
    })
    .mousemove(function (e) {
        isDragging = true;
        console.log(e.pageX);
        $(this).css("left", e.pageX - 347);
        
        var sliderValCont = $(this).closest(".ss-slider-container").find(".ss-slider-val-container");

        sliderValCont.css("left", e.pageX - 368);
        var amt = mapRange(e.pageX);
        sliderValCont.find(".ss-slider-val").text('$' + amt);

        var creditcardBtn = $('#btnCreditCard');
        var achBtn = $('#btnACH');
        var loanBtn = $('#ctl00_Main_btnNext');

        if (parseInt(amt) < 20000) {
            creditcardBtn.addClass('ss-hidden');
            achBtn.addClass('ss-hidden');
            loanBtn.removeClass('ss-hidden');
        } else {
            creditcardBtn.removeClass('ss-hidden');
            achBtn.removeClass('ss-hidden');
            loanBtn.addClass('ss-hidden');
        }
        
    })

    function mapRange(currVal) {
        min = 500;
        max = 20000;
        //map e.pageX - 368 to 20000 => if x == (e.pageX, return 20,000)
        return Math.round((currVal - 343) / (830 - 343) * (20000 - 500) + 500);

        //343 == 500 Y = (X-A)/(B-A) * (D-C) + C

    }

   /* $('.ss-slider').slider({
        change: function () {
            var value = $(this).slider("option", "value");
            console.log(value);
        },

        slide: function () {
            var value = $(this).slider("option", "value");
            console.log(value);
        }

    });*/

});