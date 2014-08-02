function selectRestPanel()
{
  this.panel = new Object();
  this.buttonStore = new Array();
  this.deleteSRP = deleteSRP;
  this.createSRP = createSRP;
  this.createItemsSRP = createItemsSRP;
  this.buttonClickSRP = buttonClickSRP;
}

function deleteSRP()
{
  try{
    this.panel.destroy();
    this.panel.items.items = [];
    this.buttonStore = [];
  }
  catch(e){
  
  }

}

function buttonClickSRP(index)
{
  mainObject.selectRestaurant.idRest = mainObject.selectRestaurant.restaurantStore[index]['idRestaurant'];
  $('.cssOver').remove();
  $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_' + mainObject.selectRestaurant.restaurantStore[index]['cssName'] + '.css" class="cssOver" />');
  $('#menuLogo').html('<img src="http://ewaiter.info/application/images/'+mainObject.selectRestaurant.restaurantStore[index]['cssName']+'_theme_logo.png" />');
  mainObject.selectRestaurant.restTitle = '<p>Вы в ресторане:</p><p>'+mainObject.selectRestaurant.restaurantStore[index]['shotName']+'</p>';
  Ext.fly('restName').setHtml(mainObject.selectRestaurant.restTitle);
  mainObject.menu.getMenuType();
  this.deleteSRP();
}

function createItemsSRP(restaurantStore)
{
  this.deleteSRP();
  this.buttonStore[0] = {
      xtype: 'titlebar',
      height: 40,
      docked: 'top',
      title: 'Доступные рестораны',
      style: {
      'border-radius': '0.6125em 0.6125em 0em 0em',
      'background-color': 'blue'
      }
    };

  for ( var i = 0; i < restaurantStore.length; ++i )
  {
    var b_rad = '0em';
    if (i==restaurantStore.length-1)
    {
      b_rad = '0em 0em 0.6125em 0.6125em';
    }
    this.buttonStore[i + 1] = {
      'xtype': 'button',
      'text': restaurantStore[i]['shotName'],
      height: 40,
      docked: 'top',
      zIndex: i,
      style: 'border-radius: '+b_rad,
      handler: function()
      {
        mainObject.selectRestaurant.selectRestPanel.buttonClickSRP( this.getZIndex() );
      }
    };
  }
}

function createSRP(restaurantStore)
{
  this.createItemsSRP(restaurantStore);
  this.panel = Ext.create('Ext.Panel',{
    top: 10,
    id: 'selectRestPanel',
    modal: true,
    hideOnMaskTap: true,
    width: 200,
    maxWidth: 320,
    maxHeight: $(document).height(),
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    contentEl: 'content',
    scrollable: true,
    style: {
      'box-shadow' : '0 0 12px #ffffff',
      'border-radius': '0.6125em',
      'background-color': '#DDDDDD'
    },
    styleHtmlContent: 'border-radius: 0.6125em;',
    items: mainObject.selectRestaurant.selectRestPanel.buttonStore
  }).setCentered(true).show();
  Ext.Viewport.add(this.panel);
}