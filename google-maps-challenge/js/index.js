
window.onload= () => {
    displayStores();
    setOnClickListener();
}

var map;
var markers = [];
var infoWindow;

function initMap() 
{
    var la = {lat: 34.063380, lng: -118.358080};
    map = new google.maps.Map(document.getElementById('map'), 
    {
        center: la,
        zoom: 11,
        mapTypeId: 'roadmap',
        styles:[
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#523735"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#c9b2a6"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#dcd2be"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ae9e90"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#93817c"
                }
              ]
            },
            {
              "featureType": "poi.business",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a5b076"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#447530"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#fdfcf8"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f8c967"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#e9bc62"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e98d58"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#db8555"
                }
              ]
            },
            {
              "featureType": "road.local",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#806b63"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8f7d77"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#b9d3c2"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#92998d"
                }
              ]
            }
          ]
    });
    infoWindow = new google.maps.InfoWindow();  
    searchStores();
 }//init

function searchStores()
{
  var foundStores = [];
  var zipCode = document.getElementById('zip-code-input').value;
  if(zipCode){
        for(var store of stores){
          var postal = store['address']['postalCode'].substring(0,5);
          if(postal==zipCode)
            {
                foundStores.push(store);
            }//if
        }//for
      }//if
     else{
         foundStores = stores;
      }//else
  clearLocations();
  displayStores(foundStores);
  showMarkers(foundStores);
  setOnClickListener();
}//searchstores

function clearLocations() 
{
  infoWindow.close();
         for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(null);
         }
         markers.length = 0;
}//clearLocations

 function setOnClickListener ()
 {
  var storeElement = document.querySelectorAll('.store-container');
  storeElement.forEach(function(elem, index)
  {
    elem.addEventListener('click',  function()
  {
    new google.maps.event.trigger(markers[index], 'click');
  }  )
})//forEach
 }//setOnClickListener

 function displayStores(stores)
 {
     var storesHtml = '';
    for(var [index, store]  of stores.entries()){
        var address = store['addressLines'];
        var phone = store['phoneNumber'];
        storesHtml+=`                <div class= "store-container">
                                        <div class= "storeContainerBackground">
                                          <div class ="store-info-container">
                                                  <div class= "store-address">
                                                          <span>${address[0]} </span>
                                                          <span>${address[1]} </span>
                                                  </div>
                                                  <div class= "store-phone-number"> 
                                                      ${phone}
                                                  </div>
                                           </div>
                                              <div class= "store-number-container">
                                                  <div class="store-number">
                                                      ${index+1}
                                                  </div>
                                              </div>
                                        </div>
                                    </div>`;
        document.querySelector('.stores-list').innerHTML = storesHtml;
    }

 }//displayStores


 function showMarkers(stores)
 {
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store]  of stores.entries()){
        var name = store["name"];
        var address = store["addressLines"][0];
        var latlng = new google.maps.LatLng(
            store['coordinates']['latitude'],
            store ['coordinates']["longitude"]);
        var openTime= store["openStatusText"];
        var phoneNumber = store["phoneNumber"];
         bounds.extend(latlng);
        createMarker(latlng, name, address, openTime, phoneNumber, index+1)
    }//for
    map.fitBounds(bounds);
 }//showMarkers

 var icon = { 
    url: 'https://cdn2.iconfinder.com/data/icons/flavour/coffee_to_go.png',
};

 function createMarker(latlng, name, address, openTime, phoneNumber, index)
 {
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      //label: index.toString(),
      icon: icon,
    });

     var   html = `                       <div class ="nameAndTimeContainer">
                                                <div class= "storeName">
                                                        <span> ${name} </span>
                                                </div>
                                                <div class= "openTime"> 
                                                ${openTime}
                                                </div>
                                        </div>
                                        <div class="addressContainer">
                                            <div class= "locationArrow">
                                                <i class="fas fa-location-arrow"></i>
                                            </div>
                                            <div class="addressInfoWindow">
                                                <a href="https://www.google.com/maps/dir/?api=1&destination=${address}"> 
                                                    ${address}
                                                </a>
                                            </div>
                                        </div>
                                        <div class="phoneNumberContainer">
                                            <div class= "phoneImage">
                                                <i class="fas fa-phone"></i>
                                            </div>
                                            <div class="phoneNumberInfoWindow">
                                            ${phoneNumber}
                                          </div>
                                    </div>`
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
 }//createMarker