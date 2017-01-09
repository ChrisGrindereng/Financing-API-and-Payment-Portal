//All Google maps related functions

(function () {

    function initMap() {
        var houston = { lat: 29.7604, long: 95.3698 };
        var map = new google.maps.Map(document.getElementById('ss-map'), {
            zoom: 4,
            center: houston
        });

        var marker = new google.maps.Marker({
            position: houston,
            map: map
        });
    }
    



}).call(this);