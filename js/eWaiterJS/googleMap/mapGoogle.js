$('head').append('<script type="text/javascript" src="js/eWaiterJS/googleMap/markers.js"></script>');
$('head').append('<script type="text/javascript" src="js/eWaiterJS/googleMap/mapInfoPanel.js"></script>');

function mapGoogle()
{
  this.map = new Object();
  this.markers = new mapMarkers(this);
  this.mapInfoPanel = new mapInfoPanel(this);
  this.updateTimeRest = 10000;
  this.updateTimeUser = 5000;
  this.userMarker - new Object();
  this.latitude = 59.832991;
  this.longitude = 30.362699;
  this.accuracy = 0;

  this.createMapPanel = createMapPanel;
  this.overridePosition = overridePosition;
  this.reCreateMap = reCreateMap;
  this.createMap = createMap;

  this.createMapPanel();
  this.createMap();
  this.markers.setUserMarker();
  this.markers.getMarker();
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