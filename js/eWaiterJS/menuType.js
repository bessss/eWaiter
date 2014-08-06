function menuType()
{
  this.menuTypeArray = new Object();
  this.menuType = '';
  this.localPreloaderHtml = '';
  this.tabPanel = new Object();
  this.menuStore = new Object();
  this.getMenuType = getMenuType;
  this.create_menuType = create_menuType;
  this.getFirstMenu = getFirstMenu;
  this.onChangeTab = onChangeTab;
  this.deletTabPanel = deletTabPanel;
  this.localPreloader = localPreloader;
  this.hideLocalPreloader = hideLocalPreloader;
}

function hideLocalPreloader()
{
  if ( $('#smallPreloader').length == 1 )
  {
    $('#smallPreloader').css('display','none');
  }
}

function localPreloader()
{
  if ( $('#smallPreloader').length == 0 )
  {
    this.localPreloaderHtml = '<div id="smallPreloader" style="display: table-cell;vertical-align: middle; text-align: center;opacity: 0.4;position: absolute;top: 0px; left: 0px;\
      width: ' + $(document).width() + 'px;height: ' + ( $(document).height() - Ext.get('title').getHeight() ) + 'px;\
      background-color: grey;z-index: 10001;"><img src="images/OMG.gif" /></div>';
    $('#mainContainer').append( this.localPreloaderHtml );
  }
  else
  {
    $('#smallPreloader').css('display','table-cell');
  }
}

function deletTabPanel()
{
  for ( var i = 0;i < Ext.getCmp('mainContainer').items.items.length; ++i )
  {
    if ( Ext.getCmp('mainContainer').items.items[i]['$className'] == 'Ext.tab.Panel' )
    {
      Ext.getCmp('tabPanel').un('activeitemchange',onChangeTab);
      Ext.getCmp('mainContainer').removeAt(i);
    }
  }

  this.menuType = new Array();
}

function create_menuType()
{
  this.deletTabPanel();
  var obj = this;

  if ( this.menuStore[0]['id'] != 'new' )
  {
    for ( var i = 0; i < this.menuStore.length; ++i )
    {
      this.menuType[i] = {'title' : this.menuStore[i]['menuType'],'html' : '','id' : 'tab_' + this.menuStore[i]['id']};
    }
  }

  this.tabPanel = Ext.create('Ext.TabPanel', {
    id: 'tabPanel',
    styleHtmlContent : true,
    height: $(document).height() - Ext.get('title').getHeight() + 'px',
    width: $(document).width() + 'px',
    items: obj.menuType,
    defaults: {
        scrollable: true
    },
    tabBar:{
      scrollable:{
        direction: 'horizontal',
        directionLock: true,
        indicators: false
      },
      layout:{
        pack : 'center',
        align: 'center'
      }
    }
  });

  Ext.getCmp('mainContainer').add( Ext.getCmp('tabPanel') );
  this.getFirstMenu();

  mainObject.preloader.deletePreloader(4000);
  Ext.getCmp('tabPanel').addListener('activeitemchange',onChangeTab);
}

function onChangeTab()
{
  try{
    mainObject.menu.localPreloader();
    mainObject.dishes.getMenu( (Ext.getCmp('tabPanel').getActiveItem().id).substr(4,(Ext.getCmp('tabPanel').getActiveItem().id).length) );
    mainObject.chngTab = 1;
  }
  catch(e)
  {
  //
  }
}

function getFirstMenu()
{
  if ( this.menuStore.length > 0 )
  {
    mainObject.dishes.getMenu( this.menuStore[0]['id'] );
  }
}

function getMenuType()
{
  mainObject.preloader.setPreText('Получение меню');
  var obj = this;
  Ext.Ajax.request({
      url: 'http://admin.ewaiter.info/outputs/outputMenuType.php?idRestaurant=' + mainObject.selectRestaurant.idRest + '&latitude=' + mainObject.map.latitude + '&longitude=' + mainObject.map.longitude + '&accuracy=' + mainObject.map.accuracy,
      method: 'GET',
      headers:{'Content-Type:': 'application/x-ww-urlencoded; charset=UTF-8'},
      success: function(response, options){
          obj.menuStore = Ext.decode(response.responseText);
          obj.create_menuType();
      },
      failure: function(response, options){
          alert("Ошибка: " + response.statusText);
      }
  });
}