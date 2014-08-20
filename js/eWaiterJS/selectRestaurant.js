//$('head').append('<script type="text/javascript" src="js/eWaiterJS/restaurantClose.js"></script>');

function selectRestaurant()
{
  this.restaurantStore = new Object();
  this.selectRestPanel = new selectRestPanel();
  //this.leaveRestPanel = new leaveRestPanel();
  this.restaurantClose = new restaurantClose();
  this.idRest = null;
  this.checkRest = false;
  this.userInput = undefined;
  this.restCount = 0; // счетчик количества ресторанов
  this.restTitle = ''; // название ресторана для левого меню
  this.getRestaurants = getRestaurants;
  this.affordabilityAnalysis = affordabilityAnalysis;
  this.checkRestaurant = checkRestaurant;
  this.selectCountRest = selectCountRest;
}

function checkRestaurant()
{
  //Проверяем не сейчас ли мы в этом ресторане
  this.checkRest = false;
  for ( var i = 0; i < this.restaurantStore.length; ++i )
  {
    if ( this.restaurantStore[i]['idRestaurant'] == this.idRest )
    {
      this.checkRest = true;
      break;
    }
  }
}

function selectCountRest()
{
  switch ( this.restaurantStore.length )
  {
    case 0:
    {
      mainObject.preloader.deletePreloader(0);
      this.idRest = null;
      this.selectRestPanel.deleteSRP();
      $('.cssOver').remove();
      $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_default.css" class="cssOver" />');
      $('#menuLogo').html('<img src="http://ewaiter.info/application/images/default_theme_logo.png" />');
      if (this.restCount != 0)
      {
        // если перед этим были рестораны - отображает панель о покидании ресторана
        Ext.Msg.alert('Внимание !', 'Вы вне зоны действия ресторана', Ext.emptyFn);
        this.restCount = 0;
        mainObject.menu.deletTabPanel();
        //TO DO --> Обсудить необходимость this.leaveRestPanel.createLRP();
      }
      break;
    }
    case 1:
    {
      this.idRest = this.restaurantStore[0]['idRestaurant'];
      $('.cssOver').remove();
      $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_' + this.restaurantStore[0]['cssName'] + '.css" class="cssOver" />');
      $('#menuLogo').html('<img src="http://ewaiter.info/application/images/'+this.restaurantStore[0]['cssName']+'_theme_logo.png" />');
      this.restTitle = '<p>Вы в ресторане:</p><p>'+this.restaurantStore[0]['shotName']+'</p>';
      Ext.fly('restName').setHtml(this.restTitle);
      if (this.restCount >= 1)
      {
        // если перед этим было несколько ресторанов, либо был другой ресторан
        Ext.Msg.alert('Внимание !', 'Вы вне зоны действия ресторана', Ext.emptyFn);
        this.leaveRestPanel.createLRP();
        mainObject.menu.getMenuType();
      }
      else
      {
        mainObject.menu.getMenuType();
      }
      this.restCount = 1;
      break;
    }
    default:
    {
      mainObject.preloader.deletePreloader(0);
      if (this.checkRest == false && this.restCount != 0)
      {
        // если перед этим был был другой ресторан
        this.restCount = this.restaurantStore.length;
        mainObject.menu.deletTabPanel();
        Ext.Msg.alert('Внимание !', 'Вы вне зоны действия ресторана', Ext.emptyFn);
        this.selectRestPanel.createSRP( this.restaurantStore );
      }
      else
      {
        this.restCount = this.restaurantStore.length;
        this.selectRestPanel.createSRP( this.restaurantStore );
      }
      break;
    }
  }
  mainObject.leftPanel.ifOneRest();
}

function affordabilityAnalysis()
{
  this.checkRestaurant();
  if ( this.checkRest == false ) // если не в ресторане
  {
    this.selectCountRest();
  }
  else
  {
    //Если мы в ресторане, но нажали в левом меню
    if ( this.userInput == true )
    {
      this.selectCountRest();
    }
  }
}

function getRestaurants(userInput)
{
  /*mainObject.preloader.setPreText('Получение списка ресторанов');
  this.userInput = userInput;
  Ext.Ajax.request({
    //url: 'http://admin.ewaiter.info/outputs/outputRestaurantsClose.php?latitude=59.832991&longitude=30.362699&accuracy=30',
    url: 'http://admin.ewaiter.info/outputs/outputRestaurantsClose.php?latitude=' + mainObject.map.latitude + '&longitude=' + mainObject.map.longitude + '&accuracy=' + mainObject.map.accuracy,
    method: 'GET',
    headers:{'Content-Type:': 'application/x-ww-urlencoded; charset=UTF-8'},
    success: function(response, options){
      mainObject.selectRestaurant.restaurantStore = Ext.decode(response.responseText);
      mainObject.selectRestaurant.affordabilityAnalysis();
      mainObject.leftPanel.ifOneRest();
    },
    failure: function(response, options){
      //alert("Ошибка получения доступных ресторанов: " + response.responseText);
    }
  });*/
}