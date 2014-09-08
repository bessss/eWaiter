function restaurantClose()
{
  this.store = new Object();
  this.updateTimeRest = 15000;

  this.calcDist = calcDist;
  this.searchRest = searchRest;
  this.intervalSearchRest = intervalSearchRest;
  this.intervalSearch = intervalSearch;
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

function intervalSearch()
{
  setInterval(function(){
    restClose.intervalSearchRest();
  },selectRest.updateTimeRest);
}

function intervalSearchRest()
{
  var obj = this;
  var tempArray = new Array();

  for ( var i = 0; i < obj.store.length; ++i )
  {
    var tempDist = obj.calcDist( mapObject.latitude, mapObject.longitude, obj.store[i]['latitude'], obj.store[i]['longitude'] );
    if ( ( parseFloat(obj.store[i]['accuracy']) + mapObject.accuracy ) >= tempDist )
    {
      tempArray.push( obj.store[i] );
    }
  }

  if ( tempArray.length > 0 )
  {
    selectRest.checkRestaurant();

    //Скрываем/Показываем пунк меню "Выбрать другой ресторан"
    if ( tempArray.length > 1 )
    {
      MyApp.app.navigation[2].option("visible", true);
    }
    else
    {
      MyApp.app.navigation[2].option("visible", false);
    }

    if ( selectRest.checkRest == true )
    {
      //Если находимся в текущем ресторане
      if ( SRP.options.visible == true )
      {
        //Если активна панель выбора
        if ( selectRest.restCount != tempArray.length )
        {
          SRP.createPanel( tempArray );
          //selectRest.selectCountRest();
        }
      }
    }
    else
    {
      //Если не находимся в текущем ресторане
      selectRest.selectCountRest();
    }
  }
  else
  {
    MyApp.app.navigation[2].option("visible", false);
  }

  selectRest.restCount = tempArray.length;
}

function searchRest(markersStore)
{
  var tempArray = new Array();
  this.store = markersStore;
  var tempCount = markersStore.length;

  for ( var i = 0; i < tempCount; ++i )
  {
    var tempDist = this.calcDist( mapObject.latitude, mapObject.longitude, this.store[i]['latitude'], this.store[i]['longitude'] );
    if ( ( parseFloat(this.store[i]['accuracy']) + mapObject.accuracy ) >= tempDist )
    {
      tempArray.push( this.store[i] );
    }
  }

  selectRest.restCount = tempArray.length;

  if ( tempArray.length > 0 )
  {
    SRP.createPanel( tempArray );
    MyApp.app.navigation[2].option("visible", true);
  }
  else
  {
    MyApp.app.navigation[2].option("visible", false);
  }
}

var restClose = new restaurantClose();