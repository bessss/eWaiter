//$('head').append('<script type="text/javascript" src="js/eWaiterJS/shadow.js"></script>');

function leftPanel()
{
  this.html = '';
  this.panel = new Object();
  this.createLeftPanel = createLeftPanel;
  this.ifOneRest = ifOneRest;
}

function createLeftPanel()
{
  this.panel = Ext.create('Ext.Panel',{
    width: '244px',
    height: $(document).height() - Ext.get('title').getHeight() + 'px',
    id: 'leftPanel',
    layout: 'hbox',
    //left: -244, 
    modal: false,
    //scrollable: true,
    style: 'position: absolute;z-index: 9999;top: -40px;',
    items: [
    {
      xtype: 'panel',
      width: '244px',
      items:[
      {
        xtype: 'button',
        width: '100%',
        height: '144px',
        id: 'iconRest',
        baseCls: 'iconRest'
      },
      {
        xtype: 'panel',
        width: '244px',
        height: '50px',
        padding: 10,
        id: 'restName',
        html: 'Welcome to eWaiter',
        style: {
          'text-align': 'center',
          'font-weight':'bold'
        }},
      {
        xtype: 'button',
        width: '100%',
        height: '40px',
        id: 'menuRest',
        text: 'Меню ресторана',
        style: 'display: none',
        iconCls: 'menuRest',
        handler: function()
        {
          mainObject.selectMenu('menu');
      }},
      {
        xtype: 'button',
        width: '100%',
        height: '40px',
        text: 'Выбрать другой ресторан',
        style: 'display: none',
        id: 'changeResT',
        iconCls: 'changeResT',
        handler: function()
        {
          //if ( Ext.get('selectRestPanel') == null )
          //{
            autoSlideCarousel($(document).width()*-1,0);
            //Ext.getCmp('menuRest').setHidden(true);
            //mainObject.selectRestaurant.getRestaurants(true);
            mainObject.selectRestaurant.restCount = 0;
            mainObject.selectRestaurant.selectRestPanel.deleteSRP();
            mainObject.selectRestaurant.restaurantClose.searchRest(true);
          //}
      }},
      {
        xtype: 'button',
        width: '100%',
        height: '44px',
        text: 'Где доступен сервис',
        iconCls: 'whereRest',
        handler: function()
        {
          mainObject.selectMenu('map');
        }},
      {
        xtype: 'button',
        width: '100%',
        height: '40px',
        iconCls: 'howUse',
        text: 'Как пользоваться',
        handler: function()
        {
          mainObject.selectMenu('infoCarousel');
        }
      }]},
    {
      xtype: 'button',
      //width: '8px',
      width: '0px',
      height: $(document).height() - Ext.get('title').getHeight() + 'px',
      id: 'slideLeft'
    }]
  });
  Ext.getCmp('leftPanelContainer').add( Ext.getCmp('leftPanel') );
  $('#slideLeft').attr('id','sliderRightButton');
}

function ifOneRest()
{
  switch ( mainObject.selectRestaurant.restaurantStore.length )
  {
    case 0:
    {
      Ext.getCmp('menuRest').setHidden(true);
      Ext.getCmp('changeResT').setHidden(true);
      break;
    }
    case 1:
    {
      Ext.getCmp('menuRest').setHidden(false);
      Ext.getCmp('changeResT').setHidden(true);
      break;
    }
    default:
    {
      if ( mainObject.selectRestaurant.userInput == true )
      {
        Ext.getCmp('menuRest').setHidden(false);
      }
      else
      {
        Ext.getCmp('menuRest').setHidden(true);
      }
      
      Ext.getCmp('changeResT').setHidden(false);
      break;
    }
  }
}