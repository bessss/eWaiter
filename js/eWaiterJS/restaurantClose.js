function restaurantClose()
{
  this.store = new Object();
  this.updateTimeRest = 15000;

  this.calcDist = calcDist;
  this.searchRest = searchRest;
  this.intervalSearchRest = intervalSearchRest;
  this.updateRestStore = updateRestStore;

  this.updateRestStore();
}

function calcDist(lat1, long1, lat2, long2) {
  //радиус Земли
  var R = 6372795;

  //перевод коордитат в радианы
  lat1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  long1 *= Math.PI / 180;
  long2 *= Math.PI / 180;

  //вычисление косинусов и синусов широт и разницы долгот
  var cl1 = Math.cos(lat1);
  var cl2 = Math.cos(lat2);
  var sl1 = Math.sin(lat1);
  var sl2 = Math.sin(lat2);
  var delta = long2 - long1;
  var cdelta = Math.cos(delta);
  var sdelta = Math.sin(delta);

  //вычисления длины большого круга
  var y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
  var x = sl1 * sl2 + cl1 * cl2 * cdelta;
  var ad = Math.atan2(y, x);
  var dist = ad * R; //расстояние между двумя координатами в метрах
 
  return dist;
}

function updateRestStore()
{
  setInterval(function(){
    mainObject.map.markers.getMarkers(true);
    //mainObject.map.map.removeMarkers();
    mainObject.map.markers.removeMarkersRest();
    mainObject.map.markers.createMarkers();
  },20000);//1800000
}

function intervalSearchRest()
{console.log('interval');
  var obj = this;
  var tempArray = new Array();

  mainObject.map.accuracy = 40;

  for ( var i = 0; i < obj.store.length; ++i )
  {
    var tempDist = obj.calcDist( mainObject.map.latitude, mainObject.map.longitude, obj.store[i]['latitude'], obj.store[i]['longitude'] );
    if ( ( parseFloat(obj.store[i]['accuracy']) + mainObject.map.accuracy ) >= tempDist )
    {
      tempArray.push( obj.store[i] );
    }
  }

  mainObject.selectRestaurant.restaurantStore = tempArray;

  if ( tempArray.length > 0 )
  {
    mainObject.selectRestaurant.checkRestaurant();

    if ( tempArray.length > 1 )
    {
      Ext.getCmp('changeResT').setHidden(false);
    }
    else
    {
      Ext.getCmp('changeResT').setHidden(true);
    }

    if ( mainObject.selectRestaurant.checkRest == true )
    {
      //Если находимся в текущем ресторане
      if ( $('#selectRestPanel').length > 0 )
      {
        //Если активна панель выбора
        if ( mainObject.selectRestaurant.restCount != tempArray.length )
        {
          mainObject.selectRestaurant.selectRestPanel.deleteSRP();
          mainObject.selectRestaurant.selectCountRest();
        }
      }
    }
    else
    {
      //Если не находимся в текущем ресторане
      mainObject.selectRestaurant.selectRestPanel.deleteSRP();
      mainObject.menu.deletTabPanel();
      mainObject.selectRestaurant.restCount = 0;
      mainObject.selectRestaurant.selectCountRest();
      mainObject.selectRestaurant.restCount = tempArray.length;
    }
  }
  else
  {
    Ext.getCmp('changeResT').setHidden(true);
  }
}

function searchRest(userInput)
{
  mainObject.selectRestaurant.userInput = userInput;
  var tempArray = new Array();//alert( this.store.length );

  mainObject.map.accuracy = 40;

  for ( var i = 0; i < this.store.length; ++i )
  {
    var tempDist = this.calcDist( mainObject.map.latitude, mainObject.map.longitude, this.store[i]['latitude'], this.store[i]['longitude'] );
    //alert('tempDist: ' + tempDist + ' сумма:' + (this.store[i]['accuracy'] + mainObject.map.accuracy) );
    if ( ( parseFloat(this.store[i]['accuracy']) + mainObject.map.accuracy ) >= tempDist )
    {
      //alert('Ресторан: ' + obj.store[i]['shotName'] + ' tempDist:' + tempDist + ' сумма: ' + ( parseFloat(obj.store[i]['accuracy']) + mainObject.map.accuracy ) );
      tempArray.push( this.store[i] );
    }
  }

  if ( tempArray.length > 0 )
  {
    mainObject.selectRestaurant.restaurantStore = tempArray;
    mainObject.selectRestaurant.affordabilityAnalysis();
    mainObject.leftPanel.ifOneRest();
  }
  else
  {
    mainObject.preloader.deletePreloader(0);
  }
}