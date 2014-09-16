function mapGoogle()
{
  this.updateUser = 7000;
  this.latitude = 59.832991;
  this.longitude = 30.362699;
  this.accuracy = 0;
  this.markersStore = new Array();
  this.map = new Object();

  this.options = {
    center: this.latitude + "," + this.longitude,
    width: '100%',
    height: '100%',
    zoom: 10,
    markers:[],
    name: 'gMap',
    controls: true,
    autoAdjust: false
  };

  this.createMap = createMap;

  this.getPosition = getPosition;
  this.setPosition = setPosition;
  this.updateUserPosition = updateUserPosition;

  this.getMarkers = getMarkers;
  this.setMarkers = setMarkers;

  this.getPosition();
}

function createMap()
{
  var obj = this;
  this.map = $('#mapView').dxMap( obj.options );
}

function setPosition(auto)
{
  if ( auto == true )
  {
    this.options.center = this.latitude + "," + this.longitude;
    this.options.markers.push( { title: "Вы", location: [mapObject.latitude, mapObject.longitude] } );
  }
  else
  {
    $('#mapView').dxMap("instance").removeMarker( mapObject.options.markers.length - 1 );
    $('#mapView').dxMap("instance").addMarker( { title: "Вы", location: [mapObject.latitude, mapObject.longitude] } );
  }
}

function updateUserPosition()
{
  var obj = this;
  setInterval(function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      mapObject.latitude = position.coords.latitude;
      mapObject.longitude = position.coords.longitude;
      mapObject.accuracy = position.coords.accuracy;
      obj.setPosition();
  })},obj.updateUser);
}

function getPosition()
{
  LP.createLoadPanel('Определение местоположения');

  navigator.geolocation.getCurrentPosition(function(position) {
    mapObject.latitude = position.coords.latitude;
    mapObject.longitude = position.coords.longitude;
    mapObject.accuracy = position.coords.accuracy;
    //mapObject.setPosition();
    mapObject.getMarkers();
  },
  function(){
    LP.deleteLoadPanel();
  });
}

function setMarkers(markers)
{
  mapObject.markersStore = new Array();

  for ( var i = 0; i < markers.length; ++i )
  {
    mapObject.markersStore[i] = {
      location: [ parseFloat( markers[i]['latitude'] ), parseFloat( markers[i]['longitude'] ) ],
      title: markers[i]['title'],
      text: markers[i]['title'],
      adress: markers[i]['adress'],
      contact: markers[i]['contact'],
      time_open: markers[i]['timeOpen'],
      time_close: markers[i]['timeClose'],
      iconSrc: 'images/' + markers[i]['cssName'] + '.png'
    }
    mapObject.options.markers.push( mapObject.markersStore[i] );
  }
  mapObject.options.zoom = 13;
  //mapObject.createMap();
}

function getMarkers(auto)
{
  if ( auto == undefined )
  {
    LP.createLoadPanel('Получение списка ресторанов');
  }

  var obj = this;

  $.ajax({
    type: "POST",
    url: "http://admin.ewaiter.info/outputs/outputRestaurantCoordinates.php",
    data: "name=John&location=Boston",
    error: function(){
      LP.deleteLoadPanel();
    },
    success: function(msg){
      if ( msg != '' )
      {
        var temp = JSON.parse(msg);
        obj.updateUser = temp['updateTimeUser'];
        selectRest.updateTimeRest = temp['updateTimeRest'];
        obj.setMarkers( temp["restaurant"] );
        obj.setPosition(true);
        if ( auto == undefined )
        {
          //Если это не автоматическое обновление
          restClose.searchRest( temp["restaurant"] );
          //Обновление  местоположения пользователя --> TIMER
          obj.updateUserPosition();
          //Обновление списка ресторанов --> TIMER
          selectRest.updateRest();
          //Поиск ближайших ресторанов --> TIMER
          restClose.intervalSearch();
        }
      }
      else
      {
        LP.createToastMessage('Рестораны в базе отсутствуют',3000,1);
      }
    }
  });
}

var mapObject = new Object();

$( document ).ready(function(){
  mapObject = new mapGoogle();
});

MyApp.where = function (params) {
  var viewModel = {
    //navigateForward: navigateForward
  };

    return viewModel;
};