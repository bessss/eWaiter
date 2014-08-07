function main()
{
  this.idRest = 0;
  this.dishes = new menu();
  this.menu = new menuType();
  this.map = new Object();
  this.selectRestaurant = new selectRestaurant(this);
  this.preloader = new preloader();
  this.defaultPanel = new defaultPanel();
  this.leftPanel = new leftPanel();
  
  this.chngTab = 0;
  
  this.loadingPanel = new loadingPanel();
  
  this.RestDB = new RestDB();

  this.secondsStart = new Date();
  this.secondsEnd = new Date();
  this.secondsStart.getSeconds();

  this.setMainParameters = setMainParameters;
  this.slideLeftPanel = slideLeftPanel;
  this.selectMenu = selectMenu;
}

function setMainParameters()
{
  $('#page_title').html('<p>Меню ресторана</p>');
}

function selectMenu(name)
{
  switch (name)
  {
    case 'map':
    {
      if ( Ext.getCmp('tabPanel') != undefined )
      {
        Ext.getCmp('tabPanel').setStyle({'display':'none'});
      }
      Ext.getCmp('defaultPanel').setStyle({'display':'none'});
      Ext.getCmp('mapPanel').setStyle({'display':'block','width': $(document).width() + 'px','height': $(document).height() - Ext.get('title').getHeight() + 'px'});
      mainObject.map.reCreateMap();

      $('#page_title').html('<p>Где доступен сервис</p>');
      break;
    }
    case 'menu':
    {
      Ext.getCmp('mapPanel').setStyle({'display':'none'});
      Ext.getCmp('defaultPanel').setStyle({'display':'none'});
      if ( Ext.getCmp('tabPanel') != undefined )
      {
        Ext.getCmp('tabPanel').setStyle({'display':'block','width': $(document).width() + 'px','height': $(document).height() - Ext.get('title').getHeight() + 'px'});
      }
      else
      {
        Ext.getCmp('defaultPanel').setStyle({'display':'block','width': $(document).width() + 'px','height': $(document).height() - Ext.get('title').getHeight() + 'px'});
      }

      $('#page_title').html('<p>Меню ресторана</p>');

      break;
    }
    case 'defaultPanel':
    {
      Ext.getCmp('defaultPanel').setStyle({'display':'block','width': $(document).width() + 'px','height': $(document).height() - Ext.get('title').getHeight() + 'px'});
      if ( Ext.getCmp('tabPanel') != undefined )
      {
        Ext.getCmp('tabPanel').setStyle({'display':'none'});
      }
      Ext.getCmp('mapPanel').setStyle({'display':'none'});
      break;
    }
  }
  autoSlideCarousel($(document).width()*-1,0);
}

function slideLeftPanel(from,to)
{
  if ( to == 0 )
  {
    Ext.getCmp('leftPanel').setModal(true);
    $('#sliderRightButton').attr('id','sliderLeftButton');
    //this.swipeObj.swipeSetBaseParameters( Ext.get( Ext.getCmp('leftPanel').getModal().id ) );
  }

  var tempObj = Ext.get('leftPanel');
  Ext.Animator.run({
    element: tempObj,
    duration: 400,
    easing: 'ease-in',
    preserveEndState: true,
    from: {
        left: from
    },
    to: {
        left: to
    }
  });

  if ( to != 0 )
  {
    $('#sliderLeftButton').attr('id','sliderRightButton');
    Ext.getCmp('leftPanel').setModal(false);
  }
}