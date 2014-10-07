function mapGoogle()
{
  this.updateUser = 7000;
  this.latitude = 60.0012;
  this.longitude = 30.202;
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
    try{
      $('#mapView').dxMap("instance").removeMarker( mapObject.options.markers.length - 1 );
      $('#mapView').dxMap("instance").addMarker( { title: "Вы", location: [mapObject.latitude, mapObject.longitude] } );
    }
    catch(e){}
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
  },{ maximumAge: 400, timeout: 10000, enableHighAccuracy: true })},obj.updateUser);
}

function alertDismissed()
{
 //
}

function checkConnection(gps)
{
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';
  mainObject.networkType = states[networkState];

  if ( gps != undefined )
  {
    getPosition();
  }
}

function getPosition()
{
  checkConnection();
  switch ( mainObject.networkType )
  {
    case 'Unknown connection':
    {
      navigator.notification.alert(
        'Отсутствует подключение к интернету, подключитесь к сети WIFI или 3/4G и перезапустите приложение',
        alertDismissed,
        'Ошибка подключения',
        'Ок'
      );
      
      break;
    }
    case 'No network connection':
    {
      navigator.notification.alert(
        'Отсутствует подключение к интернету, подключитесь к сети WIFI или 3/4G и перезапустите приложение',
        alertDismissed,
        'Ошибка подключения',
        'Ок'
      );
      break;
    }
    case 'Cell 2G connection':
    {
      navigator.notification.alert(
        'Подключитесь к сети WIFI или 3/4G и перезапустите приложение',
        alertDismissed,
        'Медленное интернет соединение',
        'Ок'
      );
      break;
    }
    case 'Cell generic connection':
    {
      navigator.notification.alert(
        'Отсутствует подключение к интернету, подключитесь к сети WIFI или 3/4G и перезапустите приложение',
        alertDismissed,
        'Ошибка подключения',
        'Ок'
      );
      break;
    }
    default:
    {
      LP.createLoadPanel('Определение местоположения');

      navigator.geolocation.getCurrentPosition(function(position) {
        mapObject.latitude = position.coords.latitude;
        mapObject.longitude = position.coords.longitude;
        mapObject.accuracy = position.coords.accuracy;
        mapObject.setPosition();
        mapObject.getMarkers();
      },
      function(){
        LP.deleteLoadPanel();
        navigator.notification.alert(
          'Ошибка определения местоположения',
          alertDismissed,
          'Ошибка',
          'Ок'
        );
      },{ maximumAge: 400, timeout: 10000, enableHighAccuracy: true });
    }
  }

 //TODO для тестирования this.getMarkers();
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
  //TODO для тестирования mapObject.createMap();
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
          //TODO для тестирования CC.setChangeCoordTimer();
          //Обновление списка ресторанов --> TIMER
          //selectRest.updateRest();
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
  //mapObject = new mapGoogle();
});

MyApp.where = function (params) {
  var viewModel = {
    //navigateForward: navigateForward
  };

    return viewModel;
};