$(document).ready(function () {

    /*function initHomeOwnershipCheck() {
        $('#ss-start-chkbox-home-ownership').on('change', function () {
            
            var promotions = $('.ss-start-get-started-action');

            promotions.each(function (i, p) {
                p = $(p);
                p.hasClass('ss-gone') ? p.removeClass('ss-gone') : p.addClass('ss-gone');
            });
            
        });
    }*/

    /******* Google Maps *******/
    function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('ss-start-address')),
            { types: ['geocode'] });

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        //autocomplete.addListener('place_changed', fillInAddress);
    }

    function geocode() {
        //parse address and get latlng by via Google Maps geocoding api
        var address = $('#ss-start-address');

        if (address.val() != '') {

            var qAddress = formatAddress(address.val());
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + qAddress + '&key=AIzaSyC7cxbf3p8EGsMqqcOj9RQwO7poQJB51CE';

            $.ajax({
                url: url,
                dataType: 'json',
                success: function (data) {
                    var location = data.results[0].geometry.location;
                    initMap(location.lat, location.lng);
                },
                error: function (jqXHR, status, error) {
                    console.error("google maps geocoding error: " + error);
                }
               });
        } else {
            //throw error that address must be provided
        }
    }

    
    function initMap(lat, lng) {

        //var houston = { lat: 29.7604, lng: -95.3698 };
        var location = { lat: lat, lng: lng };
        var mapElem = document.getElementById('ss-start-map');
        var map = new google.maps.Map(mapElem, {
            zoom: 40,
            center: location,
            mapTypeId: 'satellite',
            disableDefaultUI: true
        });
        var marker = new google.maps.Marker({
            position: location,
            draggable: true,
            map: map,
            title: 'Drag Me!'
        });

        marker.setDraggable(true);

        //set hidden input vals to current lat/lng
        console.log(lat);
        $('input[name="roofLat"]').val(location.lat);
        $('input[name="roofLng"]').val(location.lng);


        //set up drag/confirmation behavior
        var btnConfirm = $('#ss-start-btn-confirm-roof');

        btnConfirm.click(function () {
            $(this).addClass('confirmed');
        });

        google.maps.event.addListener(map, 'center_changed', function () {
            console.log('center changed');
            marker.setPosition(map.getCenter());
        });

        google.maps.event.addListener(marker, 'drag', function () {
            btnConfirm.removeClass('confirmed');
        });

        google.maps.event.addListener(marker, 'dragend', function (evt) {
            $('input[name="roofLat"]').val(evt.latLng.lat());
            $('input[name="roofLng"]').val(evt.latLng.lng());
        });


        /*var overlay = $('<span></span>');
        overlay.attr('id', 'ss-start-confirm-roof-overlay');*/
       //overlay.addClass('ss-hidden');

        setTimeout(function () {
            //$(mapElem).append(overlay); 
            $('#ss-start-confirm-roof-overlay-img').removeClass('ss-hidden');
            $('#ss-start-confirm-roof').removeClass('ss-hidden');
        }, 2000);
 

    }
    /******* End Google Maps *******/

    function initSliders(data) {

        $('.ss-start-slider').each(function (i, s) {
            $(s).slider({
                range: "min",
                min: $(this).data('min'),
                max: $(this).data('max'),
                value: $(this).data('defaultval'),
                step: $(this).data('increment'),
                animate: true,
                change: function (event, ui) {
                    console.log($(this).data('defaultval'));
                    //update graph
                    updateSliderBubble($(this), ui.value);
                    $(this).siblings('input[type="hidden"]').val(ui.value);
                    calculateValues(data);
                },
                slide: function (event, ui) {
                    //$(this).parent().find('.ss-start-slider-label').text(ui.value);
                    //show current slider value
                    updateSliderBubble($(this), ui.value);
                },
                create: function (event, ui) {
                    // console.log($(this).data('defaultval'));
                    /*console.log($(this).slider('option', 'min'));
                    console.log($(this).slider('option', 'max'));
                    console.log($(this).data('defaultval'));*/
                    updateSliderBubble($(this), $(this).data('defaultval'))
                }
            });

            function updateSliderBubble(slider, val) {
                //get the slider bubble and handle closest
                //to the slider
                //set the position of the slider to that of the handle
                //set the text of the sliderbubble to that of the input val
                var s = $(slider);
                var b = s.closest('.ss-start-container-slider').find('.ss-start-slider-bubble');
                var h = s.find('.ui-slider-handle');

                b.css('left', (h.position().left - (b.width() / 2)) + 'px' );
                b.text(val);
                b.removeClass('ss-hidden');

                console.log(b.width());
                console.log(h.position().left);
            }
        });
    }

    

    function initQuoteAccordian() {
        $('.ss-start-customer-info-section-header').click(function () {
            //toggle ss-inactive-section class for parent ss-start-customer-info-section
            $(this).toggleClass('ss-start-customer-info-section-header-inactive');
            $(this).find('.ss-start-arrow-up').toggleClass('ss-start-arrow-down');
            $(this).parent().find('.ss-start-customer-info-section-continue').toggleClass('ss-hidden');
            $(this).closest('.ss-start-customer-info-section').toggleClass('ss-start-customer-info-section-inactive');

        });
    }

    function initPackageAccordian() {
        $('.ss-start-package-info-section-header').click(function () {
            //toggle ss-inactive-section class for parent ss-start-customer-info-section
            var infoSec = $(this).closest('.ss-start-package-info-section');

            var oldHeight = infoSec.height();
            $(this).toggleClass('inactive');
            $(this).find('.ss-start-arrow-down-sm').toggleClass('ss-start-arrow-up-sm');     
            $(this).closest('.ss-start-package-info-section').toggleClass('inactive');

            var newHeight = infoSec.height();

            //resize package container
            var container = $('#ss-start-package-details');

            container.height(container.height() + newHeight - oldHeight)

        });
    }

    function initRadioCircles(data) {

        //define circle classes for roof types, roof ages, and home square footages
        var cirClasses = ['.ss-start-circle-rt', '.ss-start-circle-ra', '.ss-start-circle-hsf'];

        cirClasses.forEach(function (cirClass) {
            $(cirClass).click(function () {
                $(cirClass).removeClass('ss-start-circle-active');
                $(cirClass).addClass('ss-start-circle-inactive');
                $(this).removeClass('ss-start-circle-inactive');
                $(this).addClass('ss-start-circle-active')
                $(this).closest('.ss-start-collection').find('input[type="hidden"]').val($(this).closest('.ss-start-collection-item').data('id'));
                if (cirClass === '.ss-start-circle-rt') {
                    calculateValues(data);
                }
            });

            $(cirClass).parent().find('.ss-start-collection-item-value').click(function () {
                $(this).closest('.ss-start-collection-item').find(cirClass).click();
            });

            $(cirClass).parent().find('.ss-start-collection-item-units').click(function () {
                $(this).closest('.ss-start-collection-item').find(cirClass).click();
            });

        });
    }

    /*** calculations ***/

    function calculateValues(data) {

        //get csv data as JSON array (done)

        //calculate the current annual bill ($) and the annual solar production KW
        var avgMonthlyBill = parseInt($('#ss-start-slider-2').siblings('.ss-start-slider-bubble').text());

        var monthlyUtilityRate = parseFloat($('#ss-start-slider-1').siblings('.ss-start-slider-bubble').text());

        calcMonthlySolarProd(monthlyUtilityRate, avgMonthlyBill, data);

        var annualSolarBill = 0;

        data.forEach(function (obj) {
            annualSolarBill += obj.production;
        });

        var totalWatts = (annualSolarBill / (monthlyUtilityRate / 100)) * 1000 / 1506.72;
        
        var rackingCostPerWatt = $('.ss-start-circle-rt.ss-start-circle-active').length > 0 ? 
            parseFloat($('.ss-start-circle-rt.ss-start-circle-active').closest('.ss-start-collection-item').data('rackingcost')) :
            parseFloat($('.ss-start-circle-rt').first().closest('.ss-start-collection-item').data('rackingcost'));

        //console.log(rackingCostPerWatt);

        var moduleCostPerWatt = $('#ss-start-panel-maker .ss-start-customer-package-opt-val.active.orange').length > 0 ?
            parseFloat($('input[name="moduleCostAmerican"]').val()) : parseFloat($('input[name="moduleCostDefault"]').val());

        var inverterCostPerWatt = $('#ss-start-panel-maker .ss-start-customer-package-opt-val.active.orange').length > 0 ?
            parseFloat($('input[name="inverterCostAmerican"]').val()) : parseFloat($('input[name="inverterCostDefault"]').val());

        var laborCostPerWatt = parseFloat($('input[name="laborCost"]').val());

        var fedIncentivePercent = parseFloat($('input[name="fedIncentive"]').val());

        //console.log(fedIncentivePercent);


        var moduleTotal = moduleCostPerWatt * totalWatts;
        var inverterTotal = inverterCostPerWatt * totalWatts;
        var rackingTotal = rackingCostPerWatt * totalWatts;
        var laborTotal = laborCostPerWatt * totalWatts;
        var rawTotal = moduleTotal + inverterTotal + rackingTotal + laborTotal;
        var incentivesTotal = fedIncentivePercent * rawTotal;
        var projectTotal = rawTotal - incentivesTotal;


        

        //set package values
        $('#ss-start-amt-solar-panels').text('$' + moduleTotal.toFixed(2));
        $('#ss-start-amt-inverters').text('$' + inverterTotal.toFixed(2));
        $('#ss-start-amt-racking').text('$' + rackingTotal.toFixed(2));
        $('#ss-start-amt-labor').text('$' + laborTotal.toFixed(2));
        $('#ss-start-amt-incentives').text('$' + incentivesTotal.toFixed(2));
        $('#ss-start-amt-total').text('$' + projectTotal.toFixed(2));
        //$('#ss-start-amt-monthly-savings').text('$' + Math.round(avgMonthlyBill - (annualSolarBill / 12)));
        $('#ss-start-amt-monthly-savings').text('$' + Math.round(avgMonthlyBill * 0.40));
    }

    //expects an input integer and array of objects that contain both a date field and an average usage field
    //returns an updated data object with a cost field
    function calcMonthlyUtilityCost(avgMonthlyBill, data) {

        var avgAnnualBill = avgMonthlyBill * 12;
        var annualUsage = 0;

        //calculate annual usage
        data.forEach(function (obj) {
            annualUsage += +obj.avgUsage;
        });

        //update each data obj
        data.forEach(function (obj) {
            obj.cost = (+obj.avgUsage / annualUsage) * avgAnnualBill;
        });

    }

    //expects two input integers and an array of objects that contain both a date field and peak sun hrs field
    //utility rate is in cents/kWh, avgMonthlyBill is in dollars
    //returns an updated data object with a production field
    function calcMonthlySolarProd(utilityRate, avgMonthlyBill, data) {

        var annualSunHrs = 0;

        var avgMonthlyProduction = avgMonthlyBill / (utilityRate / 100);
        var avgAnnualProduction = avgMonthlyProduction * 12;

        //console.log(avgAnnualProduction);
        

        //calculate annual sun hours
        data.forEach(function (obj) {
            annualSunHrs += +obj.peakSunHrs;
        });

        //console.log(annualSunHrs);

        //update each data obj
        data.forEach(function (obj) {
            obj.production = ((+obj.peakSunHrs / annualSunHrs) * utilityRate / 100 ) * avgAnnualProduction;
        });

    }

    //set up Energy Savings chart using d3
    function initChart() {
       // var vis = d3.select('#ss-start-savings-chart'),
        // set the dimensions and margins of the graph
        //width = 400
        //height = 150
        var margin = { top: 20, right: 20, bottom: 30, left: 50 },
            width = 500 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        // parse the date / time
        var parseTime = d3.timeParse("%d-%b-%y");

        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // define the line
        var valueline = d3.line()
            .x(function (d) { return x(d.date); })
            .y(function (d) { return y(d.cost); });

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#ss-start-savings-chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        d3.csv("/Content/solarsavings_houston.csv", function (error, data) {
            if (error) throw error;

            //get default avg monthly bill and monthly utility rate
            var avgMonthlyBill = parseInt($('#ss-start-slider-2').data('defaultval'));
            var monthlyUtilityRate = parseInt($('#ss-start-slider-1').data('defaultval'));

            // calculate last year's estimated utility cost
            calcMonthlyUtilityCost(avgMonthlyBill, data);

            // calculate last year's solar production ("savings")
            calcMonthlySolarProd(monthlyUtilityRate, avgMonthlyBill, data);

            console.log(JSON.stringify(data));

            // format the data
           data.forEach(function (d) {
               d.date = new Date(d.date);
               d.cost = +d.cost;
           });

          

            // Scale the range of the data
           x.domain([new Date(2015, 0, 1), new Date(2015, 11, 31)]);
            y.domain([0, d3.max(data, function (d) { return d.cost; })]);


            //Define the area underneath the plot
            var area1 = d3.area()
                           .x(function (d) { return x(d.date); })
                           .y0(height)
                           .y1(function (d) { return y(d.production); });

            var area2 = d3.area()
                            .x(function (d) { return x(d.date) })
                            .y0(function (d) { return y(d.production) })
                            .y1(function (d) { return y(d.cost); });

           


            //add area1
            svg.append("path")
                .data([data])
                .attr("class", "ss-start-area-electricity-production")
                .attr("d", area1);

            //add area2
            svg.append("path")
                .data([data])
                .attr("class", "ss-start-area-electricity-cost")
                .attr("d", area2);

           

            // Draw the savings scatter plot
            svg.selectAll(".ss-start-dot-production")
                .data(data)
                .enter().append("circle")
                .attr("class", "ss-start-dot-production")
                .attr("r", 3.5)
                .attr("cx", function (d) { return x(d.date); })
                .attr("cy", function (d) { return y(d.production) });

            // Draw the cost scatter plot
            svg.selectAll(".ss-start-dot-cost")
                .data(data)
                .enter().append("circle")
                .attr("class", "ss-start-dot-cost")
                .attr("r", 3.5)
                .attr("cx", function (d) { return x(d.date); })
                .attr("cy", function (d) { return y(d.cost); });

            

            var xAxis = d3
                        .axisBottom(x)
                        .tickSizeOuter(0)
                        .ticks(d3.timeMonth)
                        .tickFormat(d3.timeFormat("%b"));

            var yAxis = d3.axisLeft(y)
                        .ticks(7)
                        .tickSizeOuter(0);

            // Add the X Axis
            svg.append("g")
                .attr("class", "ss-start-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "ss-start-axis ss-start-axis-dollars")
                .call(yAxis);

            //format the Y Axis values (prefix with dollar sign
            var yAxisVals = $(".ss-start-axis-dollars g text");
            yAxisVals.each(function () {
                $(this).text('$' + $(this).text());
            })
            

        });
    }

    function initSlideSwitches(data) {

        var duration = 300;
        var animType = 'easeInOutQuad';
        $('.ss-start-customer-package-opt-switch').each(function (i, btn) {
            btn = $(btn);
            setInput();

            var handle = btn.find('.ss-start-customer-package-opt-switch-handle');

            btn.click(function () {
                //move handle to opposite side of container & switch from green to orange

                if ($(this).hasClass('orange')) {
                    $(this).switchClass('orange', 'green', duration, animType);
                } else {
                    $(this).switchClass('green', 'orange', duration, animType);
                }
                
                if (handle.hasClass('right')) {
                    handle.switchClass('right', 'left', duration, animType);
                } else {
                    handle.switchClass('left', 'right', duration, animType);
                }

                var opts = $(this).parent().find('.ss-start-customer-package-opt-val');
                opts.each(function (i, opt) {
                    opt = $(opt);
                    opt.hasClass('active') ? opt.removeClass('active', duration, animType, setInput) : opt.addClass('active', duration, animType, setInput);
                });

                console.log(btn.attr('id'));

                if (btn.closest('.ss-start-customer-package-opt-vals').attr('id') === 'ss-start-panel-maker') {
                    calculateValues(data);
                }
                
                
            });

            handle.click(btn.click);

            function setInput() {
                btn.closest('.ss-start-customer-package-opt').find('input[type="hidden"]').val(btn.siblings('.active').data('id'));
                if (btn.closest('.ss-start-customer-package-opt-vals').attr('id') === 'ss-start-panel-maker') {
                    calculateValues(data);
                }
            }
        });
    }

    function initPackageScroll() {
        var pkg = $('#ss-start-package-details'),
            originalY = pkg.offset().top;

        //console.log(originalY);

        var topMargin = 78;

        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();

            pkg.stop().animate({
                top: scrollTop < originalY ? topMargin - 20 : scrollTop - originalY + topMargin
            }, 300);
        });


    }

    /*** facebook api calls ***/
    function fbLogin() {
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                console.log('Logged in.');
                populateFBInfo();
            }
            else {
                FB.login(function (response) {

                    if (response.status === 'connected') {
                        // Logged into your app and Facebook.
                        populateFBInfo();

                        //populate form fields with user info
                    } else if (response.status === 'not_authorized') {
                        // The person is logged into Facebook, but not your app.
                    } else {
                        // The person is not logged into Facebook, so we're not sure if
                        // they are logged into this app or not.
                    }

                }, { scope: 'email' });
            }
        });
    }

    function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', { fields: 'email, name' }, function (response) {
            console.log('Successful login for: ' + response.name);
            console.log(response.email);
            console.log(JSON.stringify(response));
        });
    }

    function populateFBInfo() {
        FB.api('/me', { fields: 'email, name' }, function (response) {
            console.log('Successful login for: ' + response.name);
            console.log(response.email);
            console.log(JSON.stringify(response));
            var names = response.name.split(' ');

            $('input[name="firstName"]').val(names[0]);
            $('input[name="lastName"]').val(names[1]);
            if (response.email) {
                $('input[name="email"]').val(response.email);
            }
        });
    }

    /******* initializations *******/

    //initHomeOwnershipCheck();

    initAutocomplete();

    $('#ss-start-btn-get-started').click(function () {
        var promotions = $('.ss-start-get-started-action');

        promotions.each(function (i, p) {
            p = $(p);
            p.hasClass('ss-gone') ? p.removeClass('ss-gone') : p.addClass('ss-gone');
        });

        $('#ss-start-neighborhood').addClass('ss-hidden');

        geocode();
    });

    initQuoteAccordian();

    d3.csv('/Content/solarsavings_houston.csv', function (error, data) {
        
        if (error) throw error;


        initRadioCircles(data);

        initSliders(data);

        initChart(data);

        initSlideSwitches(data);

        calculateValues(data);

    });
   
    initPackageAccordian();

    initPackageScroll();

    $('#ss-start-registration-fb').click(fbLogin);


    
});

/*** returns a url query string of the input string address ***/
function formatAddress(address) {
    return address.replace(/ /g, "+");
}


