function restaurantClose()
{
  this.store = new Object();
  this.updateTimeRest = 15000;

  this.calcDist = calcDist;
  this.searchRest = searchRest;
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
  setInterval(function(){console.log('123');
    mainObject.map.markers.getMarkers();
    mainObject.map.map.removeMarkers();
    mainObject.map.markers.createMarkers();
  },40000);//1800000
}

function searchRest(userInput)
{
  mainObject.selectRestaurant.userInput = userInput;
  var tempArray = new Array();
  for ( var i = 0; i < this.store.length; ++i )
  {
    var tempDist = this.calcDist( mainObject.map.latitude, mainObject.map.longitude, this.store[i]['latitude'], this.store[i]['longitude'] );
    if ( ( this.store[i]['accuracy'] + mainObject.map.accuracy ) > tempDist )
    {
      //console.log( this.store[i]['title'] );
      tempArray.push( this.store[i] );
    }
  }

  if ( tempArray.length > 0 )
  {
    mainObject.selectRestaurant.restaurantStore = tempArray;
    mainObject.selectRestaurant.affordabilityAnalysis();
    mainObject.leftPanel.ifOneRest();
  }
}