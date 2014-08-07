function mapInfoPanel(owner)
{
  this.owner = owner;
  this.html = '';
  this.marker = new Object();

  this.hideInfoPanel = hideInfoPanel;
  this.setRoute = setRoute;
  this.linkageInfo = linkageInfo;
  this.createInfoPanel = createInfoPanel;
}

function hideInfoPanel()
{
  if ( $('#mapInfoPanel').css('display') != 'none' )
  {
    $('#mapInfoPanel').slideUp('slow');
  }
}

function setRoute(lat, long)
{
  var obj = this;
  if ( this.mainObject.map.map.routes.length != 0 )
  {
    this.mainObject.map.map.cleanRoute();
  }
  this.mainObject.map.map.drawRoute({
    origin: [this.mainObject.map.latitude, this.mainObject.map.longitude],
    destination: [lat, long],
    travelMode: 'driving',
    strokeColor: '#FF0000',
    strokeOpacity: 0.6,
    strokeWeight: 4
  });
  this.mainObject.map.map.hideInfoWindows();
}

function linkageInfo()
{
  this.html = '<div style="float: left;height: 200px;width: ' + tempWidth/4 + 'px;color: black;background-color: #d6d6d6;padding-left: 12px;min-width:240px;">\
                 <div style="font-size: 14px;text-decoration: underline;font-weight: bold;">' + marker.title + '</div>\
                 <div style="font-size: 12px;">' + marker.adress + '</div>\
                 <div style="font-size: 10px;">' + marker.contact + '</div>\
               </div>\
               <div style="float: left;height: 200px;width: 60px;color: black;">\
                 <div style="width: 22px;height: 22px;background-image: url(\'images/googleImg.png\');margin: 0 auto;"></div>\
                 <div style="color: black;font-weight: 12px;margin: 0 auto;text-align: center;" onclick="setRoute(' + marker.position.k + ',' + marker.position.B + ')">Как добраться</div>\
               </div>';
}

function createInfoPanel(marker)
{
  
  var tempWidth = $('#mapPanel').width() - 10;
  if ( Ext.getCmp('mapInfoPanel') == undefined )
  {
    Ext.create('Ext.Panel', {
      html: 'Floating Panel',
      id: 'mapInfoPanel',
      minWidth: '300px',
      width: tempWidth/4 + 60,
      height: '80px',
      hidden: true,
      style: 'background-color: white;position: absolute;bottom: 0px;',
      renderTo: Ext.get('mapPanel'),
      html: this.html
    });
    $('#mapInfoPanel').slideToggle('slow');
  }
  else
  {
    if ( $('#mapInfoPanel').css('display') == 'none' )
    {
      $('#mapInfoPanel').css('display','block');
    }
    Ext.getCmp('mapInfoPanel').setHtml( this.html );
  }
}