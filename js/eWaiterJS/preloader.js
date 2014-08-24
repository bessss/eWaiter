function preloader(owner)
{
  this.owner = owner;
  this.html = '';

  this.createPreloader = createPreloader;
  this.deletePreloader = deletePreloader;
  this.setOvalsEnable = setOvalsEnable;
  this.setPreText = setPreText;
  this.setOvalsEnable();
}

function setOvalsEnable()
{
  setTimeout(function()
  {
    $('#ovals').css('display','block');
  },4200);
}

function setPreText(text)
{
  $('#preText').html(text);
}

function createPreloader()
{
  var rnd = '?rnd=' + Math.random(0,100);
  Ext.get('preloader').setVisible(true);
  this.html = '<img id="podnos" src="images/podnos.gif' + rnd + '" style="display: none;position:absolute;top:50%;bottom:0;left:0;right:0;margin:0 auto;z-index: 1001;margin-top: -56px;" />\
               <img id="ovals" src="images/ovals2.gif" style="position:absolute;top:50%;bottom:0;left:0;right:0;margin:0 auto;z-index: 1002;display: none;margin-top: 8px;" />  ';
  $('#preloader').append( this.html );
  Ext.get('podnos').setStyle('display','block');
  
  this.setOvalsEnable();
}

function deletePreloader(delay)
{
  setTimeout(function()
  {
    Ext.get('preloader').setVisible(false);
    $('#podnos').remove();
    $('#ovals').remove();
  },delay);
}