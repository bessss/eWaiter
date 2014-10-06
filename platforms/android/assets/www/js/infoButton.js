function infoButton()
{
  this.count = 0;

  this.createIB = createIB;
  this.emptyIB = emptyIB;
  this.setRestCount = setRestCount;
  this.analizIB = analizIB;
  this.viewMessage = viewMessage;
  this.createIB();
}

function viewMessage()
{
  var obj = this;
  LP.createToastMessage('Поблизости ' + obj.count + ' ресторанов',3000,2);
}

function analizIB(count)
{
  this.count = count;

  if ( count > 0 )
  {
    this.setRestCount( count );
  }
  else
  {
    this.emptyIB();
  }
}

function emptyIB()
{
  $('#IB').css('background-color','#e08c13');
  $('#IB').html('0');
}

function setRestCount(count)
{
  $('#IB').css('background-color','#109642');
  $('#IB').html(count);
}

function createIB()
{
  if ( $('#IB').length == 0 )
  {
    $('body').append( '<div id="IB" class="IB" onclick="IB.viewMessage();"></div>' );
  }
}

var IB = new Object();