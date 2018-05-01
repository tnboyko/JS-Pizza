function initialize() {

    varmapProp = {
        center: new google.maps.LatLng(50.464379,30.519131),
        zoom: 11
    };
    var html_element = document.getElementById("googleMap");
    varmap = new google.maps.Map(html_element, mapProp);

    var point = new google.maps.LatLng(50.464379,30.519131);
    var marker = new google.maps.Marker({
        position: point,
        map: map,
        icon: "assets/images/map-icon.png"
});
//Карта створена і показана
}
//Коли сторінка завантажилась
google.maps.event.addDomListener(window, 'load', initialize);

