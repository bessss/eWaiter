function mapMarkers(owner)
{
  this.owner = owner;
  this.accuracyCircle = new Object();
  this.availableCircle = new Object();

  this.setUserMarker = setUserMarker;
  this.createMarkers = createMarkers;
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
      }
      catch(e){}

      obj.userMarker = obj.map.addMarker({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        title: 'Вы',
        icon: 'images/star.png',
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
          //alert('Точность позицтонирования: ' + accuracy + ' метров');
          hideInfoPanel();
        }
      });

      obj.markers.push(obj.userMarker);
      //obj.map.setCenter(position.coords.latitude, position.coords.longitude);

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
    for (var i = 0; i < this.markersStore.length; ++i)
    {var temp = obj.markersStore[i]['adress'];
      this.map.addMarker({
        lat: obj.markersStore[i]['latitude'],
        lng: obj.markersStore[i]['longitude'],
        title: obj.markersStore[i]['title'],
        adress: obj.markersStore[i]['adress'],
        contact: obj.markersStore[i]['contact'],
        id: 'marker_' + i,
        icon: 'images/' + obj.markersStore[i]['css_name']+'.png',
        click: function(e) {
          createInfoPanel(this);
        }/*,
        infoWindow:{
            content: '<div style="width: ' + obj.markersStore[i]['title'].length*10 + 'px;text-decoration: underline;font-weight: bold;color:#000000;">\
            ' + obj.markersStore[i]['title'] + '</div>\
            <div style="color:#000000;font-size: 10px;">' + obj.markersStore[i]['adress'] + '</div>\
            <div style="color:#000000;font-size: 10px;">' + obj.markersStore[i]['contact'] + '</div>\
            <a style="color:#000000;" onClick="setRoute('+obj.markersStore[i]['latitude']+','+obj.markersStore[i]['longitude']+')">Сюда</a>'
          }*/
      });
    }
  }
  catch(e){alert('Ошибка создания маркеров: ' + e);}
}

function getMarkers()
{
  var obj = this;
  Ext.Ajax.request({
    url: 'http://admin.ewaiter.info/outputs/outputRestaurantCoordinates.php',
    method: 'GET',
    headers:{'Content-Type:': 'application/x-ww-urlencoded; charset=UTF-8'},
    success: function(response, options){
      var temp = Ext.decode(response.responseText);
      obj.markersStore = temp['restaurant'];
      obj.updateTimeRest = temp['updateTimeRest'];
      obj.updateTimeUser = temp['updateTimeUser'];
    },
    failure: function(response, options){
      //alert("Ошибка получение маркеров: " + response.statusText);
    }
  });
}