function mainObject()
{
  this.idRest = null;

  this.modeCss = modeCss;

}

function modeCss(operation)
{
  $('.cssOver').remove();

  if ( operation == undefined )
  {
    $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_' + selectRest.cssName + '.css" class="cssOver" />');
  }
  else
  {
    $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_default.css" class="cssOver" />');
  }
}

var mainObject = new mainObject();