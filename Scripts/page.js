var a = 50;
var b = 250;

$(document).ready(function () {
    $('.selectpicker').selectpicker();
    $('.restart-wrapper a').bind('click', function (e) {
        $('html, body').stop().animate({
            scrollTop: $('#topHome').offset().top - $('.navbar').height()
        }, 1500, function () {

        });
        e.preventDefault();
    });
    $('.showMap').bind('click', function (e) {
        $('#step2').removeClass('hide-on-load');
        $('html, body').stop().animate({
            scrollTop: $('#step2').offset().top - $('.navbar').height()
        }, 1500, function () {
            drawChart();
        });
        e.preventDefault();
    });
    $('.showPrice').bind('click', function (e) {
        $('#step3').removeClass('hide-on-load');
        $('#step3').height('auto').removeAttr('style');
        $('html, body').stop().animate({
            scrollTop: $('#step3').offset().top - $('.navbar').height()
        }, 1500, function () {
            $('#step3 .restart-wrapper').animate({ opacity: 1 });
        });
        e.preventDefault();
    });
    $('.showForm').bind('click', function (e) {
        $('#step4').removeClass('hide-on-load');
        $('html, body').stop().animate({
            scrollTop: $('#step4').offset().top - $('.navbar').height()
        }, 1500, function () {
            $('#step4 .restart-wrapper').animate({ opacity: 1 });
        });
        e.preventDefault();
    });
    // bs tooltip
    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });
    // selecrt style

    // styled checkboxes and radio bts..
    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%' // optional
    });
    $(".utility-rate").slider({
        animate: true,
        value: 11,
        range: "min",
        min: 5,
        max: 20,
        step: 0.1,
        slide: function (event, ui) {
            //update(1,ui.value); //changed
            $('.utility-rate a').html(ui.value);
            $('#ctl00_Main_hdnUtilityRateValue').val(ui.value);
        }
    });
    $(".monthaly-bill").slider({
        animate: true,
        value: 250,
        range: "min",
        min: 50,
        max: 500,
        step: 10,
        slide: function (event, ui) {
            //update(2,ui.value); //changed
            $('.monthaly-bill a').html(ui.value);
            $('#ctl00_Main_hdnAvgMonthlyBillValue').val(ui.value);
            b = ui.value;
            //b=$amount3;
            drawChart();

        }

    });
    $(".bill-savings").slider({
        animate: true,
        value: 50,
        range: "min",
        min: 10,
        max: 100,
        step: 10,
        slide: function (event, ui) {
            // update(3,ui.value); //changed
            $('.bill-savings a').html(ui.value);
            $('#ctl00_Main_hdnOffSetValue').val(ui.value);
            a = ui.value;
            //b=$amount3;
            drawChart();
        }
    });
    $('.collapse')
         .on('shown.bs.collapse', function () {
             $(this)
                 .parent()
                 .find(".plus-icon")
                 .removeClass("plus-icon")
                 .addClass("minus-icon");
         })
         .on('hidden.bs.collapse', function () {
             $(this)
                 .parent()
                 .find(".minus-icon")
                 .removeClass("minus-icon")
                 .addClass("plus-icon");
         });

    $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
    $(":file").filestyle({ buttonText: "BROWSE", icon: false });

    // google chart update
    update();

    $('.modal').on('show.bs.modal', reposition);

    $('#step2,#step4').addClass('hide-on-load');
    $('#step3').height(0).css('overflow', 'hidden');

});
$(window).on('resize', function () {
    $('.modla:visible').each(reposition);
    $('.restart-wrapper a').bind('click', function (e) {
        $('html, body').stop().animate({
            scrollTop: $('#topHome').offset().top - $('.navbar').height()
        }, 1500, function () {

        });
        e.preventDefault();
    });
    $('.showMap').bind('click', function (e) {
        $('#step2').removeClass('hide-on-load');
        $('html, body').stop().animate({
            scrollTop: $('#step2').offset().top - $('.navbar').height()
        }, 1500, function () {

        });
        e.preventDefault();
    });
    $('.showPrice').bind('click', function (e) {
        $('#step3').removeClass('hide-on-load');
        $('#step3').height('auto').removeAttr('style');
        $('html, body').stop().animate({
            scrollTop: $('#step3').offset().top - $('.navbar').height()
        }, 1500, function () {
            $('#step3 .restart-wrapper').animate({ opacity: 1 });
        });
        e.preventDefault();
    });
    $('.showForm').bind('click', function (e) {
        $('#step4').removeClass('hide-on-load');
        $('html, body').stop().animate({
            scrollTop: $('#step4').offset().top - $('.navbar').height()
        }, 1500, function () {
            $('#step4 .restart-wrapper').animate({ opacity: 1 });
        });
        e.preventDefault();
    });

});
function reposition() {
    var modal = $(this),
	dialog = modal.find('.modal-dialog');
    modal.css('display', 'block');
    dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
}

//changed. now with parameter
function update(slider1, val) {
    /* commented*/
    console.log(val);
    $amount = $(".utility-rate").slider("value");
    $amount2 = $(".monthaly-bill").slider("value");
    $amount3 = $(".bill-savings").slider("value");
    //$total = "$" + ($amount * $duration);
    $('.monthaly-bill a').html('<label>' + $amount2 + '</label>');
    $('.utility-rate a').html('<label>' + $amount + '</label>');
    $('.bill-savings a').html('<label>' + $amount3 + '</label>');

}
function AddChartTitle() {
    var ChartTitle = '<span class="chart-text-center">MONTHLY<br>ENERGY<br>COST</span>';
    $('#donutchart').append(ChartTitle);
}
google.load("visualization", "1", { packages: ["corechart"] });
google.setOnLoadCallback(drawChart);
function drawChart() {

    /*Calculation*/
    var amt = parseFloat(b * (1 - parseFloat(a / 100)));
    $('#ctl00_Main_hdnAvgMonthlyBillWithSolar').val(Math.round(amt).toFixed(0));

    var per1 = parseInt(a);
    var per2 = 100 - parseInt(per1);

    var AvgMonthlyBill = parseInt($('#ctl00_Main_hdnAvgMonthlyBillValue').val());
    var AvgWithSolar = parseInt($('#ctl00_Main_hdnAvgMonthlyBillWithSolar').val());
    var SavingFromSolar$ = (parseInt(AvgMonthlyBill) * per1) / 100;
    $('#lblSavingFromSolar').text(SavingFromSolar$);
    $('#lblMonthlyEnergyBIll').text(AvgWithSolar);

    /*************/
    var data = google.visualization.arrayToDataTable([
      ['Task', 'MONTHLY ENERGY COST'],
      ['$' + SavingFromSolar$.toString(), per1],
      ['$' + AvgWithSolar.toString(), per2]
    ]);

    var options = {
        title: 'MONTHLY ENERGY COST',
        pieHole: 0.5,
        alignment: 'end',
        legend: 'none',
        pieSliceText: "label",
        width: 220,
        height: 220,
        enableInteractivity: false,
        titlePosition: 'none',
        animation: {
            duration: 1000,
            easing: 'out',
        },
        pieSliceTextStyle: {
            fontSize: 14
        },
        chartArea: { left: 0, top: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
        colors: ['#66cc66', '#3399cc'],
        tooltip: { trigger: 'none' },
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
    AddChartTitle();
} var a = 50;
var b = 250;

$(document).ready(function () {
    $('.selectpicker').selectpicker();
    $('.restart-wrapper a').bind('click', function (e) {
        $('html, body').stop().animate({
            scrollTop: $('#topHome').offset().top - $('.navbar').height()
        }, 1500, function () {

        });
        e.preventDefault();
    });
    $('.showMap').bind('click', function (e) {
        $('#step2').removeClass('hide-on-load');
        $('html, body').stop().animate({
            scrollTop: $('#step2').offset().top - $('.navbar').height()
        }, 1500, function () {
            drawChart();
        });
        e.preventDefault();
    });
    $('.showPrice').bind('click', function (e) {
        $('#step3').removeClass('hide-on-load');
        $('#step3').height('auto').removeAttr('style');
        $('html, body').stop().animate({
            scrollTop: $('#step3').offset().top - $('.navbar').height()
        }, 1500, function () {
            $('#step3 .restart-wrapper').animate({ opacity: 1 });
        });
        e.preventDefault();
    });
    $('.showForm').bind('click', function (e) {
        $('#step4').removeClass('hide-on-load');
        $('html, body').stop().animate({
            scrollTop: $('#step4').offset().top - $('.navbar').height()
        }, 1500, function () {
            $('#step4 .restart-wrapper').animate({ opacity: 1 });
        });
        e.preventDefault();
    });
    // bs tooltip
    $('[data-toggle="tooltip"]').tooltip({
        html: true
    });
    // selecrt style

    // styled checkboxes and radio bts..
    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%' // optional
    });
    $(".utility-rate").slider({
        animate: true,
        value: 11,
        range: "min",
        min: 5,
        max: 20,
        step: 0.1,
        slide: function (event, ui) {
            //update(1,ui.value); //changed
            $('.utility-rate a').html(ui.value);
            $('#ctl00_Main_hdnUtilityRateValue').val(ui.value);
        }
    });
    $(".monthaly-bill").slider({
        animate: true,
        value: 250,
        range: "min",
        min: 50,
        max: 500,
        step: 10,
        slide: function (event, ui) {
            //update(2,ui.value); //changed
            $('.monthaly-bill a').html(ui.value);
            $('#ctl00_Main_hdnAvgMonthlyBillValue').val(ui.value);
            b = ui.value;
            //b=$amount3;
            drawChart();

        }

    });
    $(".bill-savings").slider({
        animate: true,
        value: 50,
        range: "min",
        min: 10,
        max: 100,
        step: 10,
        slide: function (event, ui) {
            // update(3,ui.value); //changed
            $('.bill-savings a').html(ui.value);
            $('#ctl00_Main_hdnOffSetValue').val(ui.value);
            a = ui.value;
            //b=$amount3;
            drawChart();
        }
    });
    $('.collapse')
         .on('shown.bs.collapse', function () {
             $(this)
                 .parent()
                 .find(".plus-icon")
                 .removeClass("plus-icon")
                 .addClass("minus-icon");
         })
         .on('hidden.bs.collapse', function () {
             $(this)
                 .parent()
                 .find(".minus-icon")
                 .removeClass("minus-icon")
                 .addClass("plus-icon");
         });

    $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
    $(":file").filestyle({ buttonText: "BROWSE", icon: false });

    // google chart update
    update();

    $('.modal').on('show.bs.modal', reposition);

    $('#step2,#step4').addClass('hide-on-load');
    $('#step3').height(0).css('overflow', 'hidden');

});
$(window).on('resize', function () {
    $('.modla:visible').each(reposition);
    $('.restart-wrapper a').bind('click', function (e) {
        $('html, body').stop().animate({
            scrollTop: $('#topHome').offset().top - $('.navbar').height()
        }, 1500, function () {

        });
        e.preventDefault();
    });
    $('.showMap').bind('click', function (e) {
        $('#step2').removeClass('hide-on-load');
        $('html, body').stop().animate({
            scrollTop: $('#step2').offset().top - $('.navbar').height()
        }, 1500, function () {

        });
        e.preventDefault();
    });
    $('.showPrice').bind('click', function (e) {
        $('#step3').removeClass('hide-on-load');
        $('#step3').height('auto').removeAttr('style');
        $('html, body').stop().animate({
            scrollTop: $('#step3').offset().top - $('.navbar').height()
        }, 1500, function () {
            $('#step3 .restart-wrapper').animate({ opacity: 1 });
        });
        e.preventDefault();
    });
    $('.showForm').bind('click', function (e) {
        $('#step4').removeClass('hide-on-load');
        $('html, body').stop().animate({
            scrollTop: $('#step4').offset().top - $('.navbar').height()
        }, 1500, function () {
            $('#step4 .restart-wrapper').animate({ opacity: 1 });
        });
        e.preventDefault();
    });

});
function reposition() {
    var modal = $(this),
	dialog = modal.find('.modal-dialog');
    modal.css('display', 'block');
    dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
}

//changed. now with parameter
function update(slider1, val) {
    /* commented*/
    console.log(val);
    $amount = $(".utility-rate").slider("value");
    $amount2 = $(".monthaly-bill").slider("value");
    $amount3 = $(".bill-savings").slider("value");
    //$total = "$" + ($amount * $duration);
    $('.monthaly-bill a').html('<label>' + $amount2 + '</label>');
    $('.utility-rate a').html('<label>' + $amount + '</label>');
    $('.bill-savings a').html('<label>' + $amount3 + '</label>');

}
function AddChartTitle() {
    var ChartTitle = '<span class="chart-text-center">MONTHLY<br>ENERGY<br>COST</span>';
    $('#donutchart').append(ChartTitle);
}
google.load("visualization", "1", { packages: ["corechart"] });
google.setOnLoadCallback(drawChart);
function drawChart() {

    /*Calculation*/
    var amt = parseFloat(b * (1 - parseFloat(a / 100)));
    $('#ctl00_Main_hdnAvgMonthlyBillWithSolar').val(Math.round(amt).toFixed(0));

    var per1 = parseInt(a);
    var per2 = 100 - parseInt(per1);

    var AvgMonthlyBill = parseInt($('#ctl00_Main_hdnAvgMonthlyBillValue').val());
    var AvgWithSolar = parseInt($('#ctl00_Main_hdnAvgMonthlyBillWithSolar').val());
    var SavingFromSolar$ = (parseInt(AvgMonthlyBill) * per1) / 100;
    $('#lblSavingFromSolar').text(SavingFromSolar$);
    $('#lblMonthlyEnergyBIll').text(AvgWithSolar);

    /*************/
    var data = google.visualization.arrayToDataTable([
      ['Task', 'MONTHLY ENERGY COST'],
      ['$' + SavingFromSolar$.toString(), per1],
      ['$' + AvgWithSolar.toString(), per2]
    ]);

    var options = {
        title: 'MONTHLY ENERGY COST',
        pieHole: 0.5,
        alignment: 'end',
        legend: 'none',
        pieSliceText: "label",
        width: 220,
        height: 220,
        enableInteractivity: false,
        titlePosition: 'none',
        animation: {
            duration: 1000,
            easing: 'out',
        },
        pieSliceTextStyle: {
            fontSize: 14
        },
        chartArea: { left: 0, top: 0, right: 0, bottom: 0, width: "100%", height: "100%" },
        colors: ['#66cc66', '#3399cc'],
        tooltip: { trigger: 'none' },
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
    AddChartTitle();
}