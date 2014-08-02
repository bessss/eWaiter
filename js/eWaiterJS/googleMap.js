function googleMap()
{
  this.map = new Object();
  this.markers = new Array();
  this.store = new Array();
  this.updateTimeRest = 10000;
  this.updateTimeUser = 5000;
  this.accuracyCircle = new Object();
  this.availableCircle = new Object();
  this.userMarker - new Object();

  this.createMap = createMap;
  this.createMarker = createMarker;
  this.createMapPanel = createMapPanel;
  this.overridePosition = overridePosition;
  this.setUserMarker = setUserMarker;
  this.reCreateMap = reCreateMap;

  this.getMarker = getMarker;
  this.setRoute = setRoute;
  this.panel = new Object();

  this.latitude = 59.832991;
  this.longitude = 30.362699;
  this.accuracy = 0;
  
  this.createMapPanel();
  this.createMap();
  this.setUserMarker();
  this.getMarker();
}

function createMapPanel()
{
  this.panel = Ext.create('Ext.Panel',{
    width: $(document).width() + 'px',
    height: $(document).height() - Ext.get('title').getHeight() + 'px',
    id: 'mapPanel',
    html: '',
    style: 'visibility: hidden;'
  });
  Ext.getCmp('mainContainer').add( Ext.getCmp('mapPanel') );
}

function setUserMarker()
{
  var obj = this;
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

function hideInfoPanel()
{
  if ( $('#mapInfoPanel').css('display') != 'none' )
  {
    //Ext.getCmp('mapInfoPanel').setHidden(true);
    $('#mapInfoPanel').slideUp('slow');
  }
}

function reCreateMap()
{
  var obj = this;
  this.map = new GMaps({
    div: '#mapPanel',
    lat: obj.latitude,
    lng: obj.longitude,
    click: function(e) {
      hideInfoPanel();
    }
  });

  this.createMarker();
}

function overridePosition()
{
  var obj = this;
  setInterval(function(){
    GMaps.geolocate({
      success: function(position) {
      obj.latitude = position.coords.latitude;
      obj.longitude = position.coords.longitude;
      obj.accuracy = position.coords.accuracy;

      if ( Ext.get('selectRestPanel') == null )
      {
        //Запуск выбора
        mainObject.selectRestaurant.getRestaurants();
      }

      for ( var i = 0; i < obj.markers.length; ++i )
      {
        if (obj.markers[i]['title'] == 'Вы')
        {
          obj.markers[i].setMap(null);
          obj.markers.splice(i, 1);
          obj.latitude = position.coords.latitude;
          obj.longitude = position.coords.longitude;
        }
      }
      },
      error: function(error) {
        alert('Geolocation failed: ' + error.message);
      },
      not_supported: function(){
        alert('Определение местоположения не поддерживается');
      }
  });
  }, obj.updateTimeRest);
}

function createMap()
{
 //mainObject.preloader.setPreText('Определение местоположения');
  var obj = this;

  this.map = new GMaps({
    div: '#mapPanel',
    lat: 59.8833,
    lng: 30.2167,
    click: function(e) {
      hideInfoPanel();
    }
  });

  Ext.getCmp('mapPanel').setStyle({'display':'none','visibility':'visible'});

  GMaps.geolocate({
      success: function(position) {
      obj.latitude = position.coords.latitude;
      obj.longitude = position.coords.longitude;
      obj.accuracy = position.coords.accuracy;
      //Запуск выбора
      mainObject.preloader.setPreText('Поиск ресторанов');
      mainObject.selectRestaurant.getRestaurants();
      obj.overridePosition(position);
      },
      error: function(error) {
        alert('Geolocation failed: ' + error.message);
      },
      not_supported: function(){
        alert('GPS positioning is not available');
      }
  });
}

function createInfoPanel(marker)
{
  var tempWidth = $('#mapPanel').width() - 10;
  if ( Ext.getCmp('mapInfoPanel') == undefined )
  {
    Ext.create('Ext.Panel', {
      html: 'Floating Panel',
      id: 'mapInfoPanel',
      minWidth: '300px',
      width: tempWidth/4 + 60,
      height: '80px',
      hidden: true,
      style: 'background-color: white;position: absolute;bottom: 0px;',
      renderTo: Ext.get('mapPanel'),
      html: '<div style="float: left;height: 200px;width: ' + tempWidth/4 + 'px;color: black;background-color: #d6d6d6;padding-left: 12px;min-width:240px;">\
               <div style="font-size: 14px;text-decoration: underline;font-weight: bold;">' + marker.title + '</div>\
               <div style="font-size: 12px;">' + marker.adress + '</div>\
               <div style="font-size: 10px;">' + marker.contact + '</div>\
             </div>\
        <div style="float: left;height: 200px;width: 60px;color: black;">\
          <div style="width: 22px;height: 22px;background-image: url(\'images/googleImg.png\');margin: 0 auto;"></div>\
          <div style="color: black;font-weight: 12px;margin: 0 auto;text-align: center;" onclick="setRoute(' + marker.position.k + ',' + marker.position.B + ')">Как добраться</div>\
        </div>'
    });
    $('#mapInfoPanel').slideToggle('slow');
  }
  else
  {
    if ( $('#mapInfoPanel').css('display') == 'none' )
    {
      $('#mapInfoPanel').css('display','block');
    }
    Ext.getCmp('mapInfoPanel').setHtml('<div style="float: left;height: 200px;width: ' + tempWidth/4 + 'px;color: black;background-color: #d6d6d6;padding-left: 12px;min-width:240px;">\
            <div style="font-size: 14px;text-decoration: underline;font-weight: bold;">' + marker.title + '</div>\
            <div style="font-size: 12px;">' + marker.adress + '</div>\
            <div style="font-size: 10px;">' + marker.contact + '</div>\
          </div>\
     <div style="float: left;height: 200px;width: 60px;color: black;">\
       <div style="width: 22px;height: 22px;background-image: url(\'images/googleImg.png\');margin: 0 auto;"></div>\
       <div style="color: black;font-weight: 12px;margin: 0 auto;text-align: center;" onclick="setRoute(' + marker.position.k + ',' + marker.position.B + ')">Как добраться</div>\
     </div>');
  }
}

function createMarker()
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

function getMarker()
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

function setRoute(lat, long)
{
  var obj = this;
  if ( this.mainObject.map.map.routes.length != 0 )
  {
    this.mainObject.map.map.cleanRoute();
  }
  this.mainObject.map.map.drawRoute({
    origin: [this.mainObject.map.latitude, this.mainObject.map.longitude],
    destination: [lat, long],
    travelMode: 'driving',
    strokeColor: '#FF0000',
    strokeOpacity: 0.6,
    strokeWeight: 4
  });
  this.mainObject.map.map.hideInfoWindows();
}