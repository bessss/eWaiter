function mapMarkers(owner)
{
  this.owner = owner;
  this.accuracyCircle = null;
  this.availableCircle = null;
  this.markersStore = new Array();
  
  this.markersCount = 0;

  this.setUserMarker = setUserMarker;
  this.createMarkers = createMarkers;
  this.getMarkers = getMarkers;
  this.removeMarkersRest = removeMarkersRest;
  this.setMarkers = setMarkers;
}

function removeMarkersRest()
{
  for ( var i = 0; i < this.markersStore.length; ++i )
  {
    this.owner.map.removeMarker( this.markersStore[i] );
  }
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

      var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      if ( obj.userMarker == null )
      {
        obj.userMarker = new google.maps.Marker({
          position: latlng,
          id: 'userMarker',
          map: obj.map.map
        });
      }
      else
      {
        obj.userMarker.setPosition(latlng);
      }

      if ( obj.markers.availableCircle == null )
      {
        obj.markers.availableCircle = new google.maps.Circle({
          center: latlng,
          radius: position.coords.accuracy + 100,
          fillColor: '#FFC973',
          fillOpacity: 0.2,
          strokeColor: '#FFC973',
          strokeOpacity: 0.1,
          map: obj.map.map
        });

        obj.markers.accuracyCircle = new google.maps.Circle({
          center: latlng,
          radius: position.coords.accuracy,
          fillColor: '#FFB540',
          fillOpacity: 0.2,
          strokeColor: '#92b8db',
          strokeOpacity: 0.1,
          map: obj.map.map
        });
      }
      else
      {
        obj.markers.availableCircle.setPosition(latlng);
        obj.markers.availableCircle.setRadius(position.coords.accuracy + 100);
        obj.markers.accuracyCircle.setPosition(latlng);
        obj.markers.availableCircle.setRadius(position.coords.accuracy);
      }

    },
    error: function(error) {
      alert('Geolocation failed: ' + error.message);
    },
    not_supported: function(){
      alert('Определение местоположения не поддерживается');
    }
  });}, obj.updateTimeUser);
}

function createMarkers()
{
  console.log('бработка маркеров...');
  var obj = this;
  var current_time = new Date();
  var current_hours = current_time.getHours();

  try{
    for (var i = 0; i < this.markersStore.length; ++i)
    {
      if ( mainObject.map.mapSettingsPanel.active_rest == true )
      {
        var time_open = parseInt( this.markersStore[i]['time_open'] );
        var time_close = parseInt( this.markersStore[i]['time_close'] );

        if ( current_hours > time_open && current_hours < time_close )
        {
          this.markersStore[i].setMap(this.owner.map.map);
        }
        else
        {
          this.markersStore[i].setMap(null);
        }
      }
      else
      {
        this.markersStore[i].setMap(this.owner.map.map);
      }
    }
  }
  catch(e)
  {
    alert('Ошибка создания маркеров: ' + e);
  }
}

function setMarkers(markers)
{
  this.markersStore = new Array();

  for ( var i = 0; i < markers.length; ++i )
  {
    this.markersStore[i] = new google.maps.Marker({
      position: new google.maps.LatLng(markers[i]['latitude'],markers[i]['longitude']),
      title: markers[i]['adress'],
      adress: markers[i]['adress'],
      contact: markers[i]['contact'],
      time_open: markers[i]['timeOpen'],
      time_close: markers[i]['timeClose'],
      id: 'marker_' + i,
      icon: 'images/' + markers[i]['cssName']+'.png'
    });
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
        obj.setMarkers( temp['restaurant'] );
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

      if ( refresh != true )
      {
        mainObject.selectRestaurant.restaurantClose.searchRest();
        obj.setUserMarker();
      }
    },
    failure: function(response, options){
      //alert("Ошибка получение маркеров: " + response.statusText);
    }
  });
}