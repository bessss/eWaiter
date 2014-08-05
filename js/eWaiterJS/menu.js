function menu()
{
  this.dishesStore = new Object();
  this.menuList = new Object();
  this.menu = '';
  this.menuType = '';
  this.getMenu = getMenu;
  this.createMenu = createMenu;
}

function createMenu()
{
  var tempId = mainObject.menu.tabPanel.getActiveItem().innerHtmlElement.id;
  
  if (mainObject.chngTab == 1)
  {
    var panel = Ext.create('Ext.Panel',{
      top: 10,
      id: 'loadingTabPanel',
      modal: true,
      width: 200,
      height: 200,
      html: '<img src="images/OMG.gif">',
      contentEl: 'content'
    });
  
    mainObject.menu.tabPanel.add(panel.setCentered(true));
  }
  else
  {
    mainObject.loadingPanel.createLP();
  }

  var tempCount = Math.floor( $(document).width()/150 );
  if ( tempCount > this.dishesStore.length )
  {
    tempCount = this.dishesStore.length;
  }

  this.menu = '<div style="display: table;margin: 0 auto;width: ' + tempCount*150 + 'px;" id="menuGrid">';
  for ( var i = 0; i < this.dishesStore.length; ++i )
  {
    var tmpName = this.dishesStore[i]['name'];
    if (tmpName.length > 50)
    {
      tmpName = tmpName.slice(0,45)+'...';
    }
    
    this.menu += '<div class="frame">\
                    <img src="' + this.dishesStore[i]['path'] + '" style="width: 140px;height: 142px;">\
                    <div style="display: block;width: 140px;height: 34px;" id="description">' + tmpName + '</div>\
                    <div style="display: block;float: right;text-align: right;margin: 10px 10px 4px 0px;color: grey;" id="price">' + this.dishesStore[i]['price'] + ' руб</div>\
                  </div>';
  }
  this.menu += '</div>';

  
  Ext.get( tempId ).setHtml(this.menu);
  mainObject.curentPage = 'Меню ресторана';
  if (mainObject.chngTab == 1)
  {
    mainObject.menu.tabPanel.getComponent('loadingTabPanel').destroy();
  }
  else
  {
    mainObject.loadingPanel.deleteLP();
  }
  
  mainObject.chngTab = 0;
  Ext.getCmp('menuRest').setHidden(false);
}

function getMenu(menuType)
{
  mainObject.preloader.setPreText('Получение блюд');
  var obj = this;
  Ext.Ajax.request({
      url: 'http://admin.ewaiter.info/outputs/outputMenu.php?idRestaurant=' + mainObject.selectRestaurant.idRest + '&latitude=' + mainObject.map.latitude + '&longitude=' + mainObject.map.longitude + '&accuracy=' + mainObject.map.accuracy + '&menuType=' + menuType,
      method: 'GET',
      headers:{'Content-Type:': 'application/x-ww-urlencoded; charset=UTF-8'},
      success: function(response, options){
        if ( response.responseText != 'noMenu' )
        {
          obj.dishesStore = Ext.decode(response.responseText);
          obj.createMenu();
        }
        else
        {
          alert('Для данного ресторана нет блюд в базе');
        }
      },
      failure: function(response, options){
          alert("Ошибка: " + response.statusText);
      }
  });
}