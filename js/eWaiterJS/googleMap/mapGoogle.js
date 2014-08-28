//$('head').append('<script type="text/javascript" src="js/eWaiterJS/googleMap/markers.js"></script>');
$('head').append('<script type="text/javascript" src="js/eWaiterJS/googleMap/mapInfoPanel.js"></script>');
$('head').append('<script type="text/javascript" src="js/eWaiterJS/googleMap/mapSettingsPanel.js"></script>');

function mapGoogle()
{
  this.map = new Object();
  this.markers = new mapMarkers(this);
  this.mapInfoPanel = new mapInfoPanel(this);
  this.mapSettingsPanel = new mapSettingsPanel(this);
  this.updateTimeRest = 10000;
  this.updateTimeUser = 6000;
  this.userMarker = null;
  this.latitude = 59.832991;
  this.longitude = 30.362699;
  this.accuracy = 0;
  
  this.auto_center = null;
  this.active_rest = null;

  this.createMapPanel = createMapPanel;
  this.overridePosition = overridePosition;
  this.reMap = reMap;
  this.createMap = createMap;

  this.createMapPanel();
  this.createMap();
}

function createMapPanel()
{
  this.panel = Ext.create('Ext.Panel',{
    width: $(document).width() + 'px',
    height: $(document).height() - Ext.get('title').getHeight() + 'px',
    id: 'mapPanel',
    style: 'position: absolute; top: 0px;left: 0px;z-index: 5001;'
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
      
      mainObject.selectRestaurant.restaurantClose.intervalSearchRest();

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
  if (obj.auto_center == true)
  {
    obj.map.setCenter(obj.latitude,obj.longitude,5);
  }
  }, obj.updateTimeRest);
}

function reMap()
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

  this.map.addControl({
    position: 'right_bottom',
    id: 'home_but',
    content: '',
    style: {
      width: '40px',
      height: '40px',
      margin: '5px'
    },
    events: {
      click: function(){
        mainObject.map.map.setCenter(obj.latitude,obj.longitude,5);
      }
  }});

  this.map.addControl({
    position: 'right_top',
    id: 'gear_but',
    content: '',
    style: {
      width: '40px',
      height: '40px',
      margin: '5px'
    },
    events: {
      click: function(){
        createSettingsPanel(this);
      }
  }});
}

function createMap()
{
 //mainObject.preloader.setPreText('Определение местоположения');
  var obj = this;

  GMaps.geolocate({
      success: function(position) {
        obj.latitude = position.coords.latitude;
        obj.longitude = position.coords.longitude;
        obj.accuracy = position.coords.accuracy;
        obj.reMap();
        //Запуск выбора
        mainObject.preloader.setPreText('Поиск ресторанов');
        mainObject.map.markers.userMarker();
        obj.markers.getMarkers();
        obj.overridePosition();
      },
      error: function(error) {
        alert('Geolocation failed: ' + error.message);
      },
      not_supported: function(){
        alert('GPS positioning is not available');
      }
  });
}