function changeCoord()
{
  this.posCount = 0;
  this.timer = '';

  this.setChangeCoordTimer = setChangeCoordTimer;
  this.changeCoordinates = changeCoordinates;
}

function changeCoordinates()
{
  switch( this.timer )
  {
    case 1:
    {
      mapObject.latitude = 60.0012;
      mapObject.longitude = 30.202;
      LP.createToastMessage('Смена позиции - ДОМ',2000,0);
      break;
    }
    case 2:
    {
      mapObject.latitude = 59.9982;
      mapObject.longitude = 30.1973;
      LP.createToastMessage('Смена позиции - РУСЯ',2000,0);
      break;
    }
    case 3:
    {
      mapObject.latitude = 60.0043;
      mapObject.longitude = 30.2059;
      LP.createToastMessage('Смена позиции - ВЛАДА',2000,0);
      break;
    }
    case 4:
    {
      mapObject.latitude = 59.9977;
      mapObject.longitude = 30.2125;
      LP.createToastMessage('Смена позиции - ПУСТЫРЬ',2000,0);
      break;
    }
    default:
    {
      this.timer = 0;
      break;
    }
  }
  mapObject.setPosition();
}

function setChangeCoordTimer()
{
  this.timer = setInterval(function(){
    CC.timer += 1;
    CC.changeCoordinates();
  },10000);
}

var CC = new changeCoord();