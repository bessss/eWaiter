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
  var tmpHeight = mainObject.selectRestaurant.restaurantStore.length*42;
  if (tmpHeight > 240 )
  {
    tmpHeight = 240;
  }
  
  this.panel = Ext.create('Ext.Panel',{
    top: 10,
    id: 'selectRestPanel',
    modal: true,
    hideOnMaskTap: true,
    width: 200,
    height: tmpHeight+40,
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    contentEl: 'content',
    style: {
      'box-shadow' : '0 0 12px #ffffff',
      'border-radius': '0.6125em',
      'background-color': '#DDDDDD'
    },
    styleHtmlContent: 'border-radius: 0.6125em;',
    items: [
      {
        xtype: 'titlebar',
        height: 40,
        docked: 'top',
        title: 'Доступные рестораны',
        style: {
        'border-radius': '0.6125em 0.6125em 0em 0em',
        'background-color': '#3914AF'
        }
      },
      {
        xtype: 'list',
        width: 200,
        height: tmpHeight,
        id: 'selectRestPanelList',
        scrollable: {
          direction: 'vertical'
        },
        style: {
          'border-radius': '0em 0em 0.6125em 0.6125em',
        },
        styleHtmlContent: 'border-radius: 0em 0em 0.6125em 0.6125em;',
        itemTpl: '<div style="text-align: center;font-size: 14px;">{shotName}</div>\
                  <div style="text-align: center;font-size: 12px;">({adress})</div>',
        data: mainObject.selectRestaurant.restaurantStore,
        listeners: {
                itemtap: function (list, idx, target, record, evt) {
                    mainObject.selectRestaurant.selectRestPanel.buttonClickSRP( idx );
                }
            }
      }
    ]
  });
  
  this.panel.setCentered(true).show();
  Ext.Viewport.add(this.panel);
}