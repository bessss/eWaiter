function selectRestaurant()
{
  this.restaurantStore = new Object();
  this.updateTimeRest = 30000;
  //this.selectRestPanel = new selectRestPanel();
  //this.restaurantClose = new restaurantClose();
  this.idRest = null;
  this.checkRest = false;
  //this.userInput = undefined;//TODO: нужен ли ?
  this.restCount = 0; // счетчик количества ресторанов
  //this.restTitle = ''; // название ресторана для левого меню //TODO: нужен ли ?
  //this.userSelect = false;//TODO: нужен ли ?

  this.updateRest = updateRest;
  this.affordabilityAnalysis = affordabilityAnalysis;//TODO: нужен ли ?
  this.checkRestaurant = checkRestaurant;
  this.selectCountRest = selectCountRest;
}

function updateRest()
{
  var obj = this;
  setInterval(function(){
    var obj = this;
    $.ajax({
      type: "POST",
      url: "http://admin.ewaiter.info/outputs/outputRestaurantCoordinates.php",
      data: "name=updateRest",
      success: function(msg){
        if ( msg != '' )
        {
          var temp = JSON.parse(msg);
          obj.updateUser = temp['updateTimeUser'];
          selectRest.updateTimeRest = temp['updateTimeRest'];
          restClose.store = temp["restaurant"];
        }
      }
    });
  },obj.updateTimeRest);
}

function checkRestaurant()
{
  //Проверяем не сейчас ли мы в этом ресторане
  this.checkRest = false;
  for ( var i = 0; i < restClose.store.length; ++i )
  {
    if ( restClose.store[i]['idRestaurant'] == this.idRest )
    {
      this.checkRest = true;
      break;
    }
  }
}

function selectCountRest()
{
  switch ( restClose.store.length )
  {
    case 0:
    {
      /*this.selectRestPanel.deleteSRP();
      $('.cssOver').remove();
      $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_default.css" class="cssOver" />');
      $('#menuLogo').html('<img src="http://ewaiter.info/application/images/default_theme_logo.png" />');
      if (this.restCount != 0)
      {
        // если перед этим были рестораны - отображает панель о покидании ресторана
        Ext.Msg.alert('Внимание !', 'Вы вне зоны действия ресторана 0', Ext.emptyFn);
        this.restCount = 0;
        mainObject.menu.deletTabPanel();
        //TO DO --> Обсудить необходимость this.leaveRestPanel.createLRP();
      }*/
      this.idRest = 0;
      break;
    }
    case 1:
    {
      /*this.idRest = this.restaurantStore[0]['idRestaurant'];
      this.userSelect = true;
      $('.cssOver').remove();
      $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_' + this.restaurantStore[0]['cssName'] + '.css" class="cssOver" />');
      $('#menuLogo').html('<img src="http://ewaiter.info/application/images/'+this.restaurantStore[0]['cssName']+'_theme_logo.png" />');
      this.restTitle = '<p>Вы в ресторане:</p><p>'+this.restaurantStore[0]['shotName']+'</p>';
      Ext.fly('restName').setHtml(this.restTitle);
      if (this.restCount >= 1)
      {
        // если перед этим было несколько ресторанов, либо был другой ресторан
        Ext.Msg.alert('Внимание !', 'Вы вне зоны действия ресторана 1', Ext.emptyFn);
        this.selectRestPanel.createSRP();
        mainObject.menu.getMenuType();
      }
      else
      {
        mainObject.menu.getMenuType();
      }*/
      this.restCount = 1;
      break;
    }
    default:
    {
      /*if (this.checkRest == false && this.restCount != 0)
      {
        // если перед этим был был другой ресторан
        mainObject.menu.deletTabPanel();
        Ext.Msg.alert('Внимание !', 'Вы вне зоны действия ресторана мн', Ext.emptyFn);
        this.selectRestPanel.createSRP( this.restaurantStore );
      }
      else
      {
        this.selectRestPanel.createSRP( this.restaurantStore );
      }*/
      this.restCount = restClose.store.length;
      break;
    }
  }
}

function affordabilityAnalysis()
{
  /*this.checkRestaurant();
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
  }*/
}

var selectRest = new selectRestaurant();