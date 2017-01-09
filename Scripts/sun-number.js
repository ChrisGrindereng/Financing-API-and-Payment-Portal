
var lat = '';
var lng = ''
function findCoordinates() {

    geocoder = new google.maps.Geocoder();

    var coordinates = [];
    var strAddress = $('#ctl00_Main_hdnSearchAddressFull').val();

    var loca = "20455 Linden Rd, Deephaven, MN 55331";

    geocoder.geocode({ 'address': strAddress }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat(); //getting the lat
            lng = results[0].geometry.location.lng(); //getting the lng


        }
    })

}
function disp_confirm() {

    findCoordinates();

    $.getJSON("http://api.sunnumber.com/v2/buildingplanesshade/" + lat + "/" + lng + "/1?api_key=12787f016b9d2bdfdeea8b902dc5f3e7&suppress_response_codes=true&callback=?", function (data) {

        if (data.data.error) {

            var newUrl = window.location.protocol + "//" + window.location.host + "//" + "Thankyou.aspx";
            var redirectUrl = newUrl + '?mode=error';
            $.post(redirectUrl,
{
    //'SunNumber': sunnumber,
    //'area': area,
    //'aspect': aspect,
    //'perimeter': perimeter,
    //'slope': slope
});
        }
            //if (data.data.error.message == "Not Found: Location outside of Sun Number processed area.") {

            //}
        else {

            var details = "Sun Number :" + data.data.sunnumber + "/n" + "Region :" + data.data.region + "/n" + "regionSunNumber : " + data.data.regionSunNumber + "/n" + "zip : " + data.data.zip + "/n" + "zipSunNumber :" + data.data.zipSunNumber;
            var userName = "SunNumber" + data.data.sunnumber;

            '';

            var sunnumber = data.data.sunnumber;
            var area = data.data.details[0].planeDetails[0].area;
            var aspect = data.data.details[0].planeDetails[0].aspect;
            var perimeter = data.data.details[0].planeDetails[0].perimeter;
            var slope = data.data.details[0].planeDetails[0].slope;
            var percentunshaded1 = JSON.stringify(data.data.details[0].planeDetails[0]);
            var json = JSON.parse(percentunshaded1);
            var rr = json["25_to_50_percent_unshaded"];
            var percentunshaded0_to_25 = json["0_to_25_percent_unshaded"];
            var percentunshaded25_to_50 = json["25_to_50_percent_unshaded"];
            var percentunshaded50_to_70 = json["50_to_70_percent_unshaded"];
            var percentunshaded70_to_80 = json["70_to_80_percent_unshaded"];
            var percentunshaded80_to_90 = json["80_to_90_percent_unshaded"];
            var percentunshaded90_to_95 = json["90_to_95_percent_unshaded"];
            var percentunshaded95_to_100 = json["95_to_100_percent_unshaded"];
            var newUrl = window.location.protocol + "//" + window.location.host + "//" + "Thankyou.aspx";
            //alert(newUrl);
            //JSON.stringify(data.data.details[0])
            //var redirectUrl = newUrl + '?mode=ajax&SunNumber=' + sunnumber + '&area=' + area + '&aspect=' + aspect + '&perimeter=' + perimeter + '&slope=' + slope + '&percentunshaded0_to_25=' + percentunshaded0_to_25 + '&percentunshaded25_to_50=' + percentunshaded25_to_50 + '&percentunshaded50_to_70=' + percentunshaded50_to_70 + '&percentunshaded70_to_80=' + percentunshaded70_to_80 + '&percentunshaded80_to_90=' + percentunshaded80_to_90 + '&percentunshaded90_to_95=' + percentunshaded90_to_95 + '&percentunshaded95_to_100=' + percentunshaded95_to_100 + '';
            var redirectUrl = newUrl + '?mode=ajax&SunNumber=' + JSON.stringify(data.data.details[0]) + '';
            // alert(redirectUrl);
            $.post(redirectUrl,
{
    //'SunNumber': sunnumber,
    //'area': area,
    //'aspect': aspect,
    //'perimeter': perimeter,
    //'slope': slope
});
        }
        window.location = newUrl;

    });
    return false;
}

function GetSunNumberAspectlimit() {
    var geocoder = new google.maps.Geocoder();
    console.log("GetSunNumberAspectLimit");

    var coordinates = [];
    var strAddress = $('#ctl00_Main_hdnSearchAddressFull').val();

    geocoder.geocode({ 'address': strAddress }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            var lat = results[0].geometry.location.lat(); //getting the lat
            var lng = results[0].geometry.location.lng(); //getting the lng
            $.getJSON("http://api.sunnumber.com/v2/buildingplanesshade/" + lat + "/" + lng + "/1?api_key=12787f016b9d2bdfdeea8b902dc5f3e7&suppress_response_codes=true&callback=?", function (data) {
                if (data.data.error) {
                    $('#ctl00_Main_hdnSunnumberPotential').val("");
                }
                else {
                    var details = "Sun Number :" + data.data.sunnumber + "/n" + "Region :" + data.data.region + "/n" + "regionSunNumber : " + data.data.regionSunNumber + "/n" + "zip : " + data.data.zip + "/n" + "zipSunNumber :" + data.data.zipSunNumber;
                    var userName = "SunNumber" + data.data.sunnumber;
                    $('#ctl00_Main_hdnSunnumberPotential').val(JSON.stringify(data.data.details[0]));
                }
            });
        }
    })

    return false;
}

$(document).ready(function () {
    //alert("map..");    
    //$("#sunnumber-widget-container-slider").attr('data-address', '5539 Jebel Ct,Denver, CO 80249');

    //$("#sunnumber-widget-container-slider").attr('data-address', '28 Bayou Shadows St, Houston, TX 77024');
    //$("#sunnumber-widget-container-slider").attr('data-address', '1754 Welch Ave, San Jose, CA 95112');
    //$("#sunnumber-widget-container-slider").attr('data-address', '747 Howard Street, San Francisco, CA 94103');

    initialize();



    $('.fancyboxview_icon').fancybox({
        type: 'iframe', 'centerOnScroll': true, enableEscapeButton: true, autoSize: false, autoDimensions: false, title: false,
        width: 700, height: 490, fitToView: false, padding: 0, href: $(this).attr('href'),
        afterClose: function () {
            document.getElementById("ctl00_Main_chkTermsCondition").checked = true;
        }
    });
    $('#divLoginBox').css('margin-top', '0px;');
});

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initialize() {
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        fillInAddress();
    });
}

function fillInAddress() {
    $('#ctl00_Main_hdnSearchAddress1').val('');
    $('#ctl00_Main_hdnSearchAddress2').val('');
    $('#ctl00_Main_hdnSearchState').val('');
    $('#ctl00_Main_hdnSearchZipCode').val('');
    $('#ctl00_Main_hdnSearchcountry').val('');
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    var Address1 = '';
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;

            if (addressType == "street_number" || addressType == "route") {
                Address1 += val + ", ";
            }
            //debugger;
            if (addressType == "locality") {
                $('#ctl00_Main_hdnSearchAddress2').val(val);
            }
            if (addressType == "administrative_area_level_1") {
                $('#ctl00_Main_hdnSearchState').val(val);
            }
            if (addressType == "country") {
                $('#ctl00_Main_hdnSearchcountry').val(val);
            }
            if (addressType == "postal_code") {
                $('#ctl00_Main_hdnSearchZipCode').val(val);
            }
        }
    }
    if (Address1 != null || Address1 == '') {
        Address1 = Address1.trim().substring(0, Address1.trim().length - 1)
        $('#ctl00_Main_hdnSearchAddress1').val(Address1);
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = new google.maps.LatLng(
                position.coords.latitude, position.coords.longitude);
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
function CheckAddressSelect() {
    $('#step2').removeClass('hide-on-load');
    if ($('#autocomplete').val() == '' || $('#autocomplete').val() == null) {
        $('#step2').hide();
        $('#divBuild').hide();
        alert('Enter your home address');
        return false;
    }
    else {
        $('#ctl00_Main_hdnSearchAddressFull').val($('#autocomplete').val());
        GetSunNumberAspectlimit();
        AddressDisplayonMap();
        //run sun number functions
        SetSunNumber();
        return true;
    }
}

function AddressDisplayonMap() {
    $('#step2').removeClass('hide-on-load');
    if ($('#autocomplete').val() == '' || $('#autocomplete').val() == null) {
        $('#step2').hide();
        $('#divBuild').hide();
        alert('Enter your home address');
        return;
    }
            
    else {
        //alert("lastmap");
        //$("#sunnumber-widget-container-slider").attr('data-address', '5539 Jebel Ct,Denver, CO 80249');
        $('#mapdemoimage').hide();
        LoadMap();
        //drawChart(); not defined
        $('#step2').show();
        $('#divBuild').show();
        $('html, body').animate({ scrollTop: 400 }, 'slow', 'linear');
        return;
    }
}

//function AddressDisplayonMap() {
//    $('#step2').removeClass('hide-on-load');
//    if ($('#autocomplete').val() == '' || $('#autocomplete').val() == null) {
//        $('#step2').hide();
//        $('#divBuild').hide();
//        alert('Enter your home address');
//        return;
//    }
//    else {
//        $('#mapdemoimage').hide();
//        LoadMap();
//        drawChart();
//        $('#step2').show();
//        $('#divBuild').show();
//        $('html, body').animate({ scrollTop: 400 }, 'slow', 'linear');
//        return;
//    }
//}

function SetAddressHomePage() {
    $(document).ready(function () {
        $('#autocomplete').val($('#ctl00_Main_hdnSearchAddressFull').val());

        SetAddressPlaceChange();
        AddressDisplayonMap();

        var strAddress = $('#ctl00_Main_hdnSearchAddressFull').val();
        //alert("20455 Linden Rd, Deephaven, MN 55331");




    });
    // $("#sunnumber-widget-container-slider").attr('data-address', '5539 Jebel Ct,Denver, CO 80249');
}
function callfunction() {
    (function () {

        // Localize jQuery variable
        var jQuery;
        var tooltipText = 'Sun Number rates the suitability of buildings for solar using a scale of 1-100. ' +
                          ' The higher the value, the better the house is for solar.  Go to sunnumber.com for more details.';
        var baseURL = 'https://s3.amazonaws.com/sunnumber-widgets/';


        /******** Load jQuery if not present *********/
        if (window.jQuery === undefined || window.jQuery.fn.jquery !== '2.1.3') {
            var script_tag = document.createElement('script');
            script_tag.setAttribute("type", "text/javascript");
            script_tag.setAttribute("src",
                "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js");
            if (script_tag.readyState) {
                script_tag.onreadystatechange = function () { // For old versions of IE
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        scriptLoadHandler();
                    }
                };
            } else { // Other browsers
                script_tag.onload = scriptLoadHandler;
            }
            // Try to find the head, otherwise default to the documentElement
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
        } else {
            // The jQuery version on the window is the one we want to use
            jQuery = window.jQuery;
            main();
        }

        /******** Called once jQuery has loaded ******/
        function scriptLoadHandler() {
            console.log("Script Load Handler");
            // Restore $ and window.jQuery to their previous values and store the
            // new jQuery in our local jQuery variable
            jQuery = window.jQuery.noConflict(true);
            // Call our main function
            main(); //this needs to be called
        }

        /******** Our main function Sunnumber api ********/
        function main() {


            //jQuery(document).ready(function($) {
            // We can use jQuery 1.4.2 here
            // add cleanslate css which resets the css

            var css_link = jQuery("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: baseURL + "css/cleanslate.css"
            });
            css_link.appendTo('head');
            // add sunnumber widget css
            var css_link = jQuery("<link>", {
                rel: "stylesheet",
                type: "text/css",
                //href: baseURL+"css/sn_style.css"
                href: "css/sn_style.css"
            });
            css_link.appendTo('head');

            var apiRequests = [];
            if (jQuery("#sunnumber-widget-container-basic").length) {
                var $snDiv = jQuery('#sunnumber-widget-container-basic');
                $snDiv.addClass('cleanslate2');
                var address = $snDiv.attr('data-address');
                var key = $snDiv.attr('data-key');
                apiRequests.push({ name: "basic", api_key: key, address: address, cb: renderBasicWidget });
            }
            if (jQuery("#sunnumber-widget-container-slider").length) {
                var $snDiv = jQuery('#sunnumber-widget-container-slider');
                var address = $snDiv.attr('data-address');
                var key = $snDiv.attr('data-key');
                apiRequests.push({ name: "slider", api_key: key, address: address, cb: renderSliderWidget });
            }
            if (jQuery("#sunnumber-widget-container-markers").length) {
                var $snDiv = jQuery('#sunnumber-widget-container-markers');
                var address = $snDiv.attr('data-address');
                var key = $snDiv.attr('data-key');
                apiRequests.push({ name: "markers", api_key: key, address: address, cb: renderMarkerWidget });
            }
            if (jQuery("#sunnumber-widget-container-markers-small").length) {
                var $snDiv = jQuery('#sunnumber-widget-container-markers-small');
                var address = $snDiv.attr('data-address');
                var key = $snDiv.attr('data-key');
                apiRequests.push({ name: "markers", api_key: key, address: address, cb: renderMarkerWidgetSmall });
            }
            populateWidgets(apiRequests);
            // });
        }

        function populateWidgets(apiRequests) {
            jQuery.each(apiRequests, function (i, j) {
                var url = 'http://api.sunnumber.com/v2/buildingsonly/' + j.address + '?api_key=' + j.api_key;
                jQuery.ajax({
                    type: 'GET',
                    url: url,
                    //jsonpCallback: 'test', //j.cb,
                    dataType: 'jsonp',
                    success: function (data) {

                        $("#lblerror").html("");
                        j.cb(data);
                    },
                    error: function () {
                        $("#lblerror").html("We are unable to determine the location of the building you have entered. Please try again including the city, state, and zip code if possible." + "<br/>" + "Please consult the Sun Number scores map to determine metro areas where scores are available.");
                        $("#lblerror").css("color", "red");
                        $("#lblerror").css("font-size", "25px")
                        window.console && console.log("Sun Number Error:  Property not found");
                    }
                });
            });
        }

        function renderMarkerWidgetSmall(jsonData) {
            var sns = jsonData.data.sunnumber;
            var zsn = jsonData.data.zipSunNumber;
            var msn = jsonData.data.regionSunNumber;

            var snText = getSNText(sns);
            var $snDiv = jQuery('#sunnumber-widget-container-markers-small');
            var address = $snDiv.attr('data-address');
            $snDiv.append('<div class="sunnumber-header"><div class="sunnumber-label"></div><div class="sunnumber-text">' + snText + '<img class="icon-info-circled" src="' + baseURL + 'img/info.jpg"></div></div>')
            $snDiv.append('<div class="sunnumber-markers-block">' +
                    '<div>' +
                        '<div class="sunnumber-house-score">' + sns + '</div>' +
                        '<div class="sunnumber-zip-score">' + zsn + '</div>' +
                        '<div class="sunnumber-metro-score">' + msn + '</div>' +
                    '</div>' +
                    '<div>' +
                        '<div class="sunnumber-house-score-label">This House</div>' +
                        '<div class="sunnumber-zip-score-label">Zipcode Avg</div>' +
                        '<div class="sunnumber-metro-score-label">City Avg</div>' +
                    '</div>' +
                '</div>');
            $snDiv.append('<div class="sunnumber-link"><a href="http://www.sunnumber.com/whats_my_sunnumber.php?address=' + address + '" target="_blank">Get Solar Details For This Property<img src="' + baseURL + 'img/ext_link.png" ></a></div>')
            jQuery('#sunnumber-widget-container-markers-small .icon-info-circled').hover(function (e) {
                var titleText = jQuery(this).attr('title');
                jQuery('<p class="sunnumber-widget-tooltip">' + tooltipText + ' </p>')
                    .appendTo('body')
                    .css('top', (e.pageY + 10) + 'px')
                    .css('width', '200px')
                    .css('left', (e.pageX - 100) + 'px')
                    .css('z-index', '1000')
                    .fadeIn('slow');
            }, function () {
                jQuery(this).attr('title', jQuery(this).data('tiptext'));
                jQuery('.sunnumber-widget-tooltip').remove();
            }
            );
        }

        function renderMarkerWidget(jsonData) {
            var sns = jsonData.data.sunnumber;
            var zsn = jsonData.data.zipSunNumber;
            var msn = jsonData.data.regionSunNumber;

            var snText = getSNText(sns);
            var $snDiv = jQuery('#sunnumber-widget-container-markers');
            var address = $snDiv.attr('data-address');
            $snDiv.append('<div class="sunnumber-header"><div class="sunnumber-label"></div><div class="sunnumber-text">' + snText + '<img class="icon-info-circled" src="' + baseURL + 'img/info.jpg"></div></div>')
            $snDiv.append('<div class="sunnumber-markers-block">' +
                    '<div>' +
                        '<div class="sunnumber-house-score">' + sns + '</div>' +
                        '<div class="sunnumber-zip-score">' + zsn + '</div>' +
                        '<div class="sunnumber-metro-score">' + msn + '</div>' +
                    '</div>' +
                    '<div>' +
                        '<div class="sunnumber-house-score-label">This House</div>' +
                        '<div class="sunnumber-zip-score-label">Zipcode Avg</div>' +
                        '<div class="sunnumber-metro-score-label">City Avg</div>' +
                    '</div>' +
                '</div>');
            $snDiv.append('<div class="sunnumber-link"><a href="http://www.sunnumber.com/whats_my_sunnumber.php?address=' + address + '" target="_blank">Get Solar Details For This Property<img src="' + baseURL + 'img/ext_link.png" ></a></div>')
            jQuery('#sunnumber-widget-container-markers .icon-info-circled').hover(function (e) {
                var titleText = jQuery(this).attr('title');
                jQuery('<p class="sunnumber-widget-tooltip">' + tooltipText + ' </p>')
                    .appendTo('body')
                    .css('top', (e.pageY + 10) + 'px')
                    .css('width', '200px')
                    .css('left', (e.pageX - 100) + 'px')
                    .css('z-index', '1000')
                    .fadeIn('slow');
            }, function () {
                jQuery(this).attr('title', jQuery(this).data('tiptext'));
                jQuery('.sunnumber-widget-tooltip').remove();
            }
            );
        }

        function renderSliderWidget(jsonData) {
            var sns = jsonData.data.sunnumber;
            var zsn = jsonData.data.zipSunNumber;
            var msn = jsonData.data.regionSunNumber;

            var snText = getSNText(sns);
            var $snDiv = jQuery('#sunnumber-widget-container-slider');
            var address = $snDiv.attr('data-address');
            $snDiv.append('<div class="sunnumber-header"><div class="sunnumber-label"></div><div class="sunnumber-text"> ' + snText + '<img class="icon-info-circled" src="' + baseURL + 'img/info.jpg"></div></div>')
            $snDiv.append('<div class="sunnumber-gradient-block">' +
                    '<div class="markers">' +
                        '<div class="sunnumber-you-container"><div class="sn-label">' + sns + '</div></div>' +
                        '<div class="sunnumber-left-container"><div class="sn-label"></div></div>' +
                        '<div class="sunnumber-right-container"><div class="sn-label"></div></div>' +
                    '</div>' +
                '</div>');
            $snDiv.append('<div class="sunnumber-link"><a href="http://www.sunnumber.com/whats_my_sunnumber.php?address=' + address + '" target="_blank">Get Solar Details For This Property<img  src="' + baseURL + 'img/ext_link.png" ></a></div>')
            // update the marker positions
            var topLeftMarkerOffset = 78;       // spacing to get to the left end of the gradient
            var topRightMarkerOffset = 570;      // spacing to get the the right end of the gradient
            var leftRtContOffset = 110;         // spacing to get the the left end of the gradient
            var rightRtContOffset = 602;        // spacing to get the the right end of the gradient
            var leftLtContOffset = 66;          // spacing to get the the left end of the gradient
            var rightLtContOffset = 555;        // spacing to get the the right end of the gradient
            var pixelsPerUnit = (topRightMarkerOffset - topLeftMarkerOffset) / 100;
            var leftPixelsPerUnit = (rightLtContOffset - leftLtContOffset) / 100;
            var rightPixelsPerUnit = (rightRtContOffset - leftRtContOffset) / 100;
            if (zsn > msn) {
                // zip will be on the left, metro on the right
                var leftMarkerOffset = (msn * leftPixelsPerUnit) + leftLtContOffset;
                var rightMarkerOffset = (zsn * rightPixelsPerUnit) + leftRtContOffset;
                jQuery('#sunnumber-widget-container-slider .sunnumber-left-container .sn-label').html('metro');
                jQuery('#sunnumber-widget-container-slider .sunnumber-right-container .sn-label').html('zipcode');
            } else {
                // zip will be on the right, metro on the left
                var leftMarkerOffset = (zsn * leftPixelsPerUnit) + leftLtContOffset;
                var rightMarkerOffset = (msn * rightPixelsPerUnit) + leftRtContOffset;
                jQuery('#sunnumber-widget-container-slider .sunnumber-left-container .sn-label').html('zipcode');
                jQuery('#sunnumber-widget-container-slider .sunnumber-right-container .sn-label').html('metro');
            }
            var topMarkerOffset = (sns * pixelsPerUnit) + topLeftMarkerOffset;
            jQuery('.sunnumber-you-container').css('left', topMarkerOffset + 'px');
            jQuery('.sunnumber-left-container').css('left', leftMarkerOffset + 'px');
            jQuery('.sunnumber-right-container').css('left', rightMarkerOffset + 'px');
            jQuery('#sunnumber-widget-container-slider .icon-info-circled').hover(function (e) {
                var titleText = jQuery(this).attr('title');
                jQuery('<p class="sunnumber-widget-tooltip">' + tooltipText + ' </p>')
                    .appendTo('body')
                    .css('top', (e.pageY + 10) + 'px')
                    .css('width', '200px')
                    .css('left', (e.pageX - 100) + 'px')
                    .fadeIn('slow');
            }, function () {
                jQuery(this).attr('title', jQuery(this).data('tiptext'));
                jQuery('.sunnumber-widget-tooltip').remove();
            }
            );
        }

        function renderBasicWidget(jsonData) {
            var sns = jsonData.data.sunnumber;
            var snText = getSNText(sns);
            var $snDiv = jQuery('#sunnumber-widget-container-basic');
            var address = $snDiv.attr('data-address');
            $snDiv.append('<div class="sunnumber-label">Sun Number Score: </div><div class="sunnumber-score">' + sns + '</div>')
            $snDiv.append('<div class="sunnumber-text">' + snText + '<img class="icon-info-circled" src="' + baseURL + 'img/info.jpg"></div>')
            $snDiv.append('<div class="sunnumber-link"><a href="http://www.sunnumber.com/whats_my_sunnumber.php?address=' + address + '" target="_blank">Get Solar Details For This Property<img src="' + baseURL + 'img/ext_link.png" ></a></div>')
            jQuery('#sunnumber-widget-container-basic .icon-info-circled').hover(function (e) {
                var titleText = jQuery(this).attr('title');
                jQuery('<p class="sunnumber-widget-tooltip">' + tooltipText + ' </p>')
                    .appendTo('body')
                    .css('top', (e.pageY + 10) + 'px')
                    .css('width', '200px')
                    .css('left', (e.pageX - 100) + 'px')
                    .fadeIn('slow');
            }, function () {
                jQuery(this).attr('title', jQuery(this).data('tiptext'));
                jQuery('.sunnumber-widget-tooltip').remove();
            });
        }

        function getSNText(sns) {
            if (sns > 70) {
                return "Great Solar Potential";
            } else if (sns > 50) {
                return "Good Solar Potential";
            } else {
                return "Not Well Suited For Solar";
            }
        }

    })();
}
function SetSunNumber() {
    $("#sunnumber-widget-container-slider").empty();
    var strAddress = $('#ctl00_Main_hdnSearchAddressFull').val();
    $("#sunnumber-widget-container-slider").attr('data-address', strAddress);
    callfunction();
    return true;

}

function SetAddressPlaceChange() {
    var strAddress = $('#ctl00_Main_hdnSearchAddressFull').val();

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ "address": strAddress }, function (place, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var Address1 = '';
            for (var i = 0; i < place[0].address_components.length; i++) {
                var addressType = place[0].address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = place[0].address_components[i][componentForm[addressType]];
                    document.getElementById(addressType).value = val;
                    if (addressType == "street_number" || addressType == "route") {
                        Address1 += val + ", ";
                    }
                    if (addressType == "locality") {
                        //debugger;
                        $('#ctl00_Main_hdnSearchAddress2').val(val);
                    }
                    if (addressType == "administrative_area_level_1") {
                        $('#ctl00_Main_hdnSearchState').val(val);
                    }
                    if (addressType == "country") {
                        $('#ctl00_Main_hdnSearchcountry').val(val);
                    }
                    if (addressType == "postal_code") {
                        $('#ctl00_Main_hdnSearchZipCode').val(val);
                    }
                }
            }
            if (Address1 != null || Address1 == '') {
                Address1 = Address1.trim().substring(0, Address1.trim().length - 1)
                $('#ctl00_Main_hdnSearchAddress1').val(Address1);
            }
        }
    });
}
function LoadMap() {
    try {
        var mapElement = document.getElementById("map");

        map = new google.maps.Map(mapElement, {
            zoom: 21,
            tilt: 0,
            scaleControl: false,
            scrollwheel: false,
            streetViewControl: false,
            mapTypeControl: true,
            //center: new google.maps.LatLng(39.57592, -105.01476),
            //center: new google.maps.LatLng(myLat, myLon),
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            draggableCursor: "crosshair" // Make the map cursor a crosshair so the user thinks they should click something
        });
        google.maps.event.trigger(map, 'resize');
        codeAddress();

        google.maps.event.addListener(map, "click", function (evt) {
            // When the map is clicked, pass the LatLng obect to the measureAdd function
            measureAdd(evt.latLng);
        });

    } catch (err) {
        console.warn("Problem initializing google map - " + err);
    }
}
function btnCalculate_Click() {
    $('#divBuild').show();
    $('.restart-wrapper').css('opacity', '1');
    $('.restartbuild').hide();
}

function blockSpace(e) {
    var key;
    var isCtrl = false;
    var keychar;
    if (window.event) {
        key = e.keyCode;
        isCtrl = window.event.ctrlKey
    }
    else if (e.which) {
        key = e.which;
        isCtrl = e.ctrlKey;
    }
    keychar = String.fromCharCode(key);
    if (keychar == " ") {
        return false;
    }
}

function GetSunNumber(x, y) {
    alert("Ji");
    $.getJSON("http://api.sunnumber.com/v2/buildingplanesshade/" + x + "/" + y + "/1?api_key=12787f016b9d2bdfdeea8b902dc5f3e7&suppress_response_codes=true&callback=?", function (data) {
        //alert(data.data.region);
        if (data.error == "Not Found: Location outside of Sun Number processed area.")
        { }
        else {

            var details = "Sun Number :" + data.data.sunnumber + "/n" + "Region :" + data.data.region + "/n" + "regionSunNumber : " + data.data.regionSunNumber + "/n" + "zip : " + data.data.zip + "/n" + "zipSunNumber :" + data.data.zipSunNumber;
            var userName = "SunNumber" + data.data.sunnumber;

            '';
            alert('' + userName + '');
            var sunnumber = data.data.sunnumber;
            var area = data.data.details[0].planeDetails[0].area;
            var aspect = data.data.details[0].planeDetails[0].aspect;
            var perimeter = data.data.details[0].planeDetails[0].perimeter;
            var slope = data.data.details[0].planeDetails[0].slope;

            $("#txtdetails").val(data);

            var newUrl = window.location.protocol + "//" + window.location.host + "//" + "Thankyou.aspx";

            $.post(newUrl + '?mode=ajax',
{
    'SunNumber': sunnumber,
    'area': area,
    'aspect': aspect,
    'perimeter': perimeter,
    'slope': slope
});
        }


    });

}