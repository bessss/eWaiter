function selectRestaurant()
{
  this.restaurantStore = new Object();
  this.updateTimeRest = 30000;
  this.idRest = null;
  this.checkRest = false;
  //this.userInput = undefined;//TODO: нужен ли ?
  this.restCount = 0; // счетчик количества ресторанов
  this.restTitle = 'eWaiter'; // название ресторана для левого меню
  this.cssName = 'default';

  this.updateRest = updateRest;
  this.checkRestaurant = checkRestaurant;
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
          restClose.store = temp['restaurant'];
        }
      }
    });
  },30000);//obj.updateTimeRest);
}

function checkRestaurant( tempArray )
{
  //Проверяем не сейчас ли мы в этом ресторане
  this.checkRest = false;
  for ( var i = 0; i < tempArray.length; ++i )
  {
    if ( tempArray[i]['idRestaurant'] == this.idRest )
    {
      this.checkRest = true;
      break;
    }
  }
}

var selectRest = new selectRestaurant();