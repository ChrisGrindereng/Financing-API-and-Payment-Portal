(function () {

    var placeSearch, autocomplete;
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

    $(document).ready(function () {

        initialize();

    });


    function initialize() {
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), { types: ['geocode'] });
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            fillInAddress();
        });

        autocomplete1 = new google.maps.places.Autocomplete((document.getElementById('autocomplete1')), { types: ['geocode'] });
        google.maps.event.addListener(autocomplete1, 'place_changed', function () {
            fillInAddress1();
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

    function fillInAddress1() {
        debugger;
        $('#ctl00_Main_hdnSearch1Address1').val('');
        $('#ctl00_Main_hdnSearch1Address2').val('');
        $('#ctl00_Main_hdnSearch1State').val('');
        $('#ctl00_Main_hdnSearch1ZipCode').val('');
        $('#ctl00_Main_hdnSearch1country').val('');

        var place = autocomplete1.getPlace();
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
                if (addressType == "locality") {
                    $('#ctl00_Main_hdnSearch1Address2').val(val);
                }
                if (addressType == "administrative_area_level_1") {
                    $('#ctl00_Main_hdnSearch1State').val(val);
                }
                if (addressType == "country") {
                    $('#ctl00_Main_hdnSearch1country').val(val);
                }
                if (addressType == "postal_code") {
                    $('#ctl00_Main_hdnSearch1ZipCode').val(val);
                }
            }
        }
        if (Address1 != null || Address1 == '') {
            Address1 = Address1.trim().substring(0, Address1.trim().length - 1)
            $('#ctl00_Main_hdnSearch1Address1').val(Address1);
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

    function geolocate1() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = new google.maps.LatLng(
                    position.coords.latitude, position.coords.longitude);
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete1.setBounds(circle.getBounds());
            });
        }
    }

    function FindAddress() {
        if ($('#autocomplete').val() == '' || $('#autocomplete').val() == null) {
            alert('Enter your home address');
            return false;
        }
        else {
            $('#ctl00_Main_hdnSearchAddressFull').val($('#autocomplete').val());

        }
    }
    function FindAddress1() {
        if ($('#autocomplete1').val() == '' || $('#autocomplete1').val() == null) {
            alert('Enter your home address');
            return false;
        }
        else {
            $('#ctl00_Main_hdnSearch1AddressFull').val($('#autocomplete1').val());
        }
    }

}).call(this);