function selectRestPanel()
{
  this.panel = new Object();
  this.buttonStore = new Array();
  this.deleteSRP = deleteSRP;
  this.createSRP = createSRP;
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
  mainObject.preloader.createPreloader();
  mainObject.selectRestaurant.idRest = mainObject.selectRestaurant.restaurantStore[index]['idRestaurant'];
  $('.cssOver').remove();
  $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_' + mainObject.selectRestaurant.restaurantStore[index]['cssName'] + '.css" class="cssOver" />');
  $('#menuLogo').html('<img src="http://ewaiter.info/application/images/'+mainObject.selectRestaurant.restaurantStore[index]['cssName']+'_theme_logo.png" />');
  mainObject.selectRestaurant.restTitle = '<p>Вы в ресторане:</p><p>'+mainObject.selectRestaurant.restaurantStore[index]['shotName']+'</p>';
  Ext.fly('restName').setHtml(mainObject.selectRestaurant.restTitle);
  mainObject.menu.getMenuType();
  this.deleteSRP();
}

function createSRP(restaurantStore)
{
  var obj = this;
  
  this.panel = Ext.create('Ext.List', {
    width: 200,
    height: 280,
    id: 'selectRestPanel',
    scrollable: {
        direction: 'vertical'
    },
    style: {
      'box-shadow' : '0 0 12px #ffffff',
      'border-radius': '0.6125em',
      'background-color': '#969292'
    },
    styleHtmlContent: 'border-radius: 0.6125em;',
    itemTpl: '<div>{shotName}</div>',
    data: mainObject.selectRestaurant.restaurantStore,
     listeners: {
                itemtap: function (list, idx, target, record, evt) {
                    mainObject.selectRestaurant.selectRestPanel.buttonClickSRP( idx );
                }
            }
  });
  
  this.panel.setCentered(true).show();
  Ext.Viewport.add(this.panel);
}