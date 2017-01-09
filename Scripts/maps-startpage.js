var map;
var coordinates = [];
//var LatMap1;
//var LngMap1;
// Create a meausure object to store our markers, MVCArrays, lines and polygons
var measure = {
    mvcLine: new google.maps.MVCArray(),
    mvcPolygon: new google.maps.MVCArray(),
    mvcMarkers: new google.maps.MVCArray(),
    line: null,
    polygon: null
};

function codeAddress() {
    //---Reset Variable---
    jQuery("#draw-area").text("");
    measure = {
        mvcLine: new google.maps.MVCArray(),
        mvcPolygon: new google.maps.MVCArray(),
        mvcMarkers: new google.maps.MVCArray(),
        line: null,
        polygon: null
    };
    //------------------
    var address = $("#autocomplete").val();

    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // var marker = new google.maps.Marker({
            //     map: map,
            //     center: new google.maps.LatLng(39.57592, -105.01476),
            //     position: results[0].geometry.location
            // });
            //$('#<%=hdnAddresslat.ClientID%>').val(lat);
            //$('#<%=hdnAddresslng.ClientID%>').val(lng);
            //var myLatLng = new google.maps.LatLng(lat, lng);
            //=====InfoWindows========
            lat = results[0].geometry.location.lat(); //getting the lat
            lng = results[0].geometry.location.lng(); //getting the lng
            var myLatLng = new google.maps.LatLng(lat, lng);
            var beachMarker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                draggable: false,
                //icon: image,
                title: "Your Location"
            });
            var strAddress = '<div id="divAddress" style="text-align:center;">' + address + '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: strAddress,
                maxWidth: 150,
                Height: 80
            });
            infowindow.open(map, beachMarker);
            beachMarker.open = true;
            google.maps.event.addListener(beachMarker, 'click', function () {
                //infowindow.open(map, beachMarker);
                if (!beachMarker.open) {
                    infowindow.open(map, beachMarker);
                    beachMarker.open = true;
                }
                else {
                    infowindow.close();
                    beachMarker.open = false;
                }
            });
            //====================
            map.setCenter(results[0].geometry.location);
        } else {
            alert('Please define proper location');
        }
    });
    map.setTilt(0);
}

function measureAdd(latLng) {
    // if (measure.mvcPolygon.getLength() < 4) { ---------------------------- use this if you want to limit the polygon to four corners
    // Add a draggable marker to the map where the user clicked
    var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        draggable: true,
        raiseOnDrag: false,
        title: "Drag me to change shape",
        icon: new google.maps.MarkerImage("../Images/vertex.png", new google.maps.Size(12, 12), new google.maps.Point(0, 0), new google.maps.Point(5, 5))
    });
    // }

    // Add this LatLng to our line and polygon MVCArrays
    // Objects added to these MVCArrays automatically update the line and polygon shapes on the map
    measure.mvcLine.push(latLng);
    // if (measure.mvcPolygon.getLength() < 4) { ---------------------------- use this if you want to limit the polygon to four corners
    measure.mvcPolygon.push(latLng);
    // }

    // Push this marker to an MVCArray
    // This way later we can loop through the array and remove them when measuring is done
    measure.mvcMarkers.push(marker);

    // Get the index position of the LatLng we just pushed into the MVCArray
    // We'll need this later to update the MVCArray if the user moves the measure vertexes
    var latLngIndex = measure.mvcLine.getLength() - 1;

    // When the user mouses over the measure vertex markers, change shape and color to make it obvious they can be moved
    google.maps.event.addListener(marker, "mouseover", function () {
        marker.setIcon(new google.maps.MarkerImage("../Images/vertex_hover.png", new google.maps.Size(12, 12), new google.maps.Point(0, 0), new google.maps.Point(5, 5)));
    });

    // Change back to the default marker when the user mouses out
    google.maps.event.addListener(marker, "mouseout", function () {
        marker.setIcon(new google.maps.MarkerImage("../Images/vertex.png", new google.maps.Size(12, 12), new google.maps.Point(0, 0), new google.maps.Point(5, 5)));
    });

    // When the measure vertex markers are dragged, update the geometry of the line and polygon by resetting the
    //     LatLng at this position
    google.maps.event.addListener(marker, "drag", function (evt) {
        measure.mvcLine.setAt(latLngIndex, evt.latLng);
        //alert(latLngIndex + " = " + evt.latLng);
        measure.mvcPolygon.setAt(latLngIndex, evt.latLng);
    });

    // When dragging has ended and there is more than one vertex, measure length, area.
    google.maps.event.addListener(marker, "dragend", function () {
        if (measure.mvcLine.getLength() > 1) {
            measureCalc();
        }
    });

    // // If there is more than one vertex on the line
    // if (measure.mvcLine.getLength() > 1) {

    //     // If the line hasn't been created yet
    //     if (!measure.line) {

    //         // Create the line (google.maps.Polyline)
    //         measure.line = new google.maps.Polyline({
    //             map: map,
    //             clickable: false,
    //             strokeColor: "#FF0000",
    //             strokeOpacity: 1,
    //             strokeWeight: 2,
    //             path:measure. mvcLine
    //         });

    //     }

    // If there is more than two vertexes for a polygon
    if (measure.mvcPolygon.getLength() > 2) {

        // If the polygon hasn't been created yet
        if (!measure.polygon) {

            // Create the polygon (google.maps.Polygon)
            measure.polygon = new google.maps.Polygon({
                clickable: false,
                map: map,
                fillOpacity: 0.2,
                strokeColor: "#FF0000",
                strokeOpacity: 0.6,
                strokeWeight: 2,
                paths: measure.mvcPolygon
            });

        }

    }

    // }

    // If there's more than one vertex, measure length, area.
    if (measure.mvcPolygon.getLength() > 1) {
        measureCalc();
    }

}

function measureCalc() {
    // Use the Google Maps geometry library to measure the length of the line
    // var length = google.maps.geometry.spherical.computeLength(measure.line.getPath());
    // jQuery("#span-length").text(length.toFixed(1))

    // If we have a polygon (>2 vertexes in the mvcPolygon MVCArray)
    if (measure.mvcPolygon.getLength() > 2) {
        // Use the Google Maps geometry library to measure the area of the polygon
        var moduleTypeFactor = .15;

        var moduleType = $("#module_type").val();
        if ((moduleType === undefined) || (moduleType == "Standard")) {
            moduleTypeFactor = .15;
        } else if (moduleType == "Premium") {
            moduleTypeFactor = .19;
        } else if (moduleType == "Thin-Film") {
            moduleTypeFactor = .10;
        }
        ///===Save Polygon Coadinates=========
        coordinates = [];

        var Maplatlangarray = '';
        var len = measure.polygon.getPath().getLength();
        for (var i = 0; i < len; i++) {
            var point = measure.polygon.getPath().getAt(i);
            Maplatlangarray += point + "~";
            coordinates.push(point);
        }

        $("#ctl00_Main_hdnMapDrawinglatlng").val(Maplatlangarray);
        //DrawMap();
        ///===================================
        var area = google.maps.geometry.spherical.computeArea(measure.polygon.getPath());
        var areaval = area.toFixed(1) * 1000 * moduleTypeFactor * 0.001;
        if (areaval > 500000) {
            $("#draw-area").text("ERROR: Area too large, set to max: 500,000 kWdc.");
            $("#areaval").val(500000);
            $("#ctl00_Main_hdnSystemSize").val(0);
            $("#ctl00_Main_hdnsqm").val(0);
        } else if (areaval < 0.05) {
            $("#draw-area").text("ERROR: Area too small, set to min: 0.05 kWdc.");
            $("#areaval").val(0.05);
            $("#ctl00_Main_hdnSystemSize").val(0);
            $("#ctl00_Main_hdnsqm").val(0);
        } else {
            $("#ctl00_Main_hdnSystemSize").val(areaval.toFixed(1));
            $("#ctl00_Main_hdnsqm").val(area.toFixed(0));
            $("#draw-area").text(areaval.toFixed(1) + " kWdc  (" + area.toFixed(0) + " m^2)");
            $("#areaval").val(areaval.toFixed(1));
        }
    }

}

function measureReset() {

    // If we have a polygon or a line, remove them from the map and set null
    if (measure.polygon) {
        measure.polygon.setMap(null);
        measure.polygon = null;
    }
    if (measure.line) {
        measure.line.setMap(null);
        measure.line = null
    }

    // Empty the mvcLine and mvcPolygon MVCArrays
    measure.mvcLine.clear();
    measure.mvcPolygon.clear();

    // Loop through the markers MVCArray and remove each from the map, then empty it
    measure.mvcMarkers.forEach(function (elem, index) {
        elem.setMap(null);
    });
    measure.mvcMarkers.clear();

    map.setZoom(19);

    jQuery("#draw-area").text("");
    jQuery("#span-length,#span-area").text(0);

}
