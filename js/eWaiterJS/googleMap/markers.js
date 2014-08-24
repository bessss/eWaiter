function mapMarkers(owner)
{
  this.owner = owner;
  this.accuracyCircle = new Object();
  this.availableCircle = new Object();
  
  this.markersCount = 0;

  this.setUserMarker = setUserMarker;
  this.createMarkers = createMarkers;
  this.createActiveMarkers = createActiveMarkers;
  this.getMarkers = getMarkers;
}

function setUserMarker()
{
  var obj = this.owner;
  setInterval(function(){
    GMaps.geolocate({
      success: function(position) {
      obj.latitude = position.coords.latitude;
      obj.longitude = position.coords.longitude;
      obj.accuracy = position.coords.accuracy;

      try{
        obj.accuracyCircle.setMap(null);
        obj.availableCircle.setMap(null);
        obj.userMarker.setMap(null);
        obj.map.removeMarker(obj.userMarker);
      }
      catch(e){}

      obj.userMarker = obj.map.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        title: 'Вы',
        //icon: 'images/star.png',
        click: function(e) {
          //alert('Ваше местоположение');
          hideInfoPanel();
        }
      });

      obj.availableCircle = obj.map.drawCircle({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        radius: position.coords.accuracy + 100,
        fillColor: '#FFC973',
        fillOpacity: 0.2,
        strokeColor: '#FFC973',
        strokeOpacity: 0.1,
        click: function(e) {
          //alert('Доступны рестраны в пределах этого круга');
          hideInfoPanel();
        }
      });

      obj.accuracyCircle = obj.map.drawCircle({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        radius: position.coords.accuracy,
        fillColor: '#FFB540',
        fillOpacity: 0.2,
        strokeColor: '#FFB540',
        strokeOpacity: 0.1,
        click: function(e) {
          //alert('Точность позиционирования: ' + accuracy + ' метров');
          hideInfoPanel();
        }
      });
      
      // необходимо удалять маркер из хранилища, прежде чем записать новый
      if ( obj.markers.markersStore.length > obj.markers.markersCount )
      {
        obj.markers.markersStore.pop();
      }
      obj.markers.markersStore.push(obj.userMarker);

      },
      error: function(error) {
        alert('Geolocation failed: ' + error.message);
      },
      not_supported: function(){
        alert('Определение местоположения не поддерживается');
      }
    });
  }, obj.updateTimeUser);
}

function createMarkers()
{
  var obj = this;
  try{
    for (var i = 0; i < this.markersStore.length - 1; ++i)
    {
      var temp = obj.markersStore[i]['adress'];
      mainObject.map.map.addMarker({
        lat: obj.markersStore[i]['latitude'],
        lng: obj.markersStore[i]['longitude'],
        title: obj.markersStore[i]['title'],
        adress: obj.markersStore[i]['adress'],
        contact: obj.markersStore[i]['contact'],
        time_open: obj.markersStore[i]['timeOpen'],
        time_close: obj.markersStore[i]['timeClose'],
        id: 'marker_' + i,
        icon: 'images/' + obj.markersStore[i]['cssName']+'.png',
        click: function(e) {
          createInfoPanel(this);
        }
      });
    }
  }
  catch(e){alert('Ошибка создания маркеров: ' + e);}
}

function createActiveMarkers()
{
  var obj = this;
  for (var i = 0; i < obj.markersStore.length-1; ++i)
    {
      var time_open = obj.markersStore[i]['timeOpen'];
      var time_close = obj.markersStore[i]['timeClose'];
      var current_time = new Date();
      var current_hours = current_time.getHours();
      if ( current_hours > time_open && current_hours < time_close )
        {
          try{
            var tmpM = mainObject.map.map.markers[i];
          }
          catch(e){
            mainObject.map.map.addMarker({
              lat: obj.markersStore[i]['latitude'],
              lng: obj.markersStore[i]['longitude'],
              title: obj.markersStore[i]['title'],
              adress: obj.markersStore[i]['adress'],
              contact: obj.markersStore[i]['contact'],
              time_open: obj.markersStore[i]['timeOpen'],
              time_close: obj.markersStore[i]['timeClose'],
              id: 'marker_' + i,
              icon: 'images/' + obj.markersStore[i]['css_name']+'.png',
              click: function(e) 
              {
                createInfoPanel(this);
              }
            });
          }
        }
        else
        {
          var mapMarker = mainObject.map.map.markers[i];
          try{
            mainObject.map.map.removeMarker(mapMarker);
          }
          catch(e){}
        }
    }
}

function getMarkers(refresh)
{
  var obj = this;
  Ext.Ajax.request({
    url: 'http://admin.ewaiter.info/outputs/outputRestaurantCoordinates.php',
    method: 'GET',
    headers:{'Content-Type:': 'application/x-ww-urlencoded; charset=UTF-8'},
    success: function(response, options){
      if ( response.responseText != '' )
      {
        var temp = Ext.decode(response.responseText);
        obj.markersStore = temp['restaurant'];
        obj.markersCount = obj.markersStore.length;
        obj.updateTimeRest = temp['updateTimeRest'];
        obj.updateTimeUser = temp['updateTimeUser'];

        mainObject.selectRestaurant.restaurantClose.store = temp['restaurant'];
      }
      else
      {
        //Если ресторанов нет
        obj.markersStore = new Array();
        obj.markersCount = obj.markersStore.length;
        mainObject.preloader.deletePreloader(0);
      }
      obj.setUserMarker();

      if ( refresh == undefined )
      {
        mainObject.selectRestaurant.restaurantClose.searchRest();
      }
    },
    failure: function(response, options){
      //alert("Ошибка получение маркеров: " + response.statusText);
    }
  });
}