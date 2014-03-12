(function (global) {
    var map,
        geocoder,
        lastMarker,
        directionsDisplay,
        isLoading = false,
        $address;

            var directionsService = new google.maps.DirectionsService();

    function init() {
        $address = $("#map-address");

        if (window.location.hash === "#page-location") {
            initLocation();
        } else {
            $("#page-location").on("pageinit", initLocation);
        }

        //show loading mask in case the location not found yet 
        //and user returns to the page
        $("#page-location").on("pageshow", showPage);

        //hide loading mask when user leaves the page and it is only relevant to location
        $("#page-location").on("pagehide", hidePage);

        $("#map-navigate-home").on("click", navigateHome);
        $("#map-search").on("click", searchAddress);
    }

    
   
    
    
    $(document).on("deviceready", init);

    function initLocation() {
        var mapOptions = {
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            styles:[
    {
        "stylers": [
            {
                "hue": "#ff1a00"
            },
            {
                "invert_lightness": true
            },
            {
                "saturation": -100
            },
            {
                "lightness": 33
            },
            {
                "gamma": 0.5
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2D333C"
            }
        ]
    }
],
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },

            mapTypeControl: false,
            streetViewControl: false
        };
        directionsDisplay = new google.maps.DirectionsRenderer();
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        directionsDisplay.setMap(map);
        
        geocoder = new google.maps.Geocoder();
        navigateHome();
    }

    
    
    function findme(position){
        
        var start = position.coords.latitude+","+ position.coords.longitude;
                  var end = "Hospital San José, Boulevard José María Morelos y Pavón, Bachoco, Hermosillo, Sonora, México";
                 
                      
                        var request = {
                      origin:start,
                      destination:end,
                      travelMode: google.maps.TravelMode.DRIVING
                  };
                  directionsService.route(request, function(response, status) {
                      
                    if (status === google.maps.DirectionsStatus.OK) {
                      directionsDisplay.setDirections(response);
                       
                    }
                  });
                            
    }
    
    function navigateHome() {
        var position;

        isLoading = true;
        showPage();

        navigator.geolocation.getCurrentPosition(
            function (position) {
                positionx = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                
                
                map.panTo(positionx);
               // putMarker(positionx);
                findme(position)
                 
               
                    
                                

                isLoading = false;
                hidePage();
                
            }, function (error) {
                //default map coordinates
                position = new google.maps.LatLng(43.459336, -80.462494);
                map.panTo(positionx);
               
                
                               
                
                
                
                
                isLoading = false;
                hidePage();
                
                navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                    function () { }, "Location failed", 'OK');
            }, {
                timeout: 30000,
                enableHighAccuracy: true
            });
    }

    function searchAddress() {
        var address = $address.val();

        geocoder.geocode(
            {
                'address': address
            }, function (results, status) {
                if (status !== google.maps.GeocoderStatus.OK) {
                    navigator.notification.alert("Unable to find address.",
                        function () { }, "Search failed", 'OK');

                    return;
                }

                map.panTo(results[0].geometry.location);
                putMarker(results[0].geometry.location);
            });
    }

    function showPage() {
        if (isLoading) {
            $.mobile.loading("show");
        }

        google.maps.event.trigger(map, "resize");
    }

    function hidePage() {
        $.mobile.loading("hide");
    }

    function putMarker(position) {
        if (lastMarker !== null && lastMarker !== undefined) {
            lastMarker.setMap(null);
        }

        lastMarker = new google.maps.Marker({
            map: map,
            position: position
        });
    }
})(window);