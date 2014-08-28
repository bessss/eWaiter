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
  this.infoCarousel = new infoCarousel();
  this.curentPage = 'Страница по умолчанию';

  this.chngTab = 0;

  this.RestDB = new RestDB();

  this.secondsStart = new Date();
  this.secondsEnd = new Date();
  this.secondsStart.getSeconds();

  this.slideLeftPanel = slideLeftPanel;
  this.selectMenu = selectMenu;
}

function selectMenu(name)
{
  switch (name)
  {
    case 'map':
    {
      this.curentPage = 'Где доступен сервис';
      if ( Ext.getCmp('tabPanel') != undefined )
      {
        Ext.getCmp('tabPanel').setStyle({'z-index':'5000'});
      }
      Ext.getCmp('defaultPanel').setStyle({'z-index':'5001'});
      Ext.getCmp('infoCarousel').setStyle({'z-index':'5002'});
      Ext.getCmp('mapPanel').setStyle({'z-index':'5003'});
      break;
    }
    case 'menu':
    {
      Ext.getCmp('defaultPanel').setStyle({'z-index':'5000'});
      Ext.getCmp('infoCarousel').setStyle({'z-index':'5001'});
      this.curentPage = 'Меню ресторана';
      if ( Ext.getCmp('tabPanel') != undefined )
      {
        Ext.getCmp('tabPanel').setStyle({'z-index':'5003'});
      }
      else
      {
        Ext.getCmp('defaultPanel').setStyle({'z-index':'5003'});
      }
      Ext.getCmp('mapPanel').setStyle({'z-index':'5002'});
      break;
    }
    case 'defaultPanel':
    {
      this.curentPage = 'Страница по умолчанию';
      Ext.getCmp('defaultPanel').setStyle({'z-index':'5003'});
      Ext.getCmp('infoCarousel').setStyle({'z-index':'5000'});
      if ( Ext.getCmp('tabPanel') != undefined )
      {
        Ext.getCmp('tabPanel').setStyle({'z-index':'5001'});
      }
      Ext.getCmp('mapPanel').setStyle({'z-index':'5002'});
      break;
    }
    case 'infoCarousel':
    {
      this.curentPage = 'Как пользоваться сервисом';
      Ext.getCmp('mapPanel').setStyle({'z-index':'5000'});
      Ext.getCmp('defaultPanel').setStyle({'z-index':'5001'});
      if ( Ext.getCmp('tabPanel') != undefined )
      {
        Ext.getCmp('tabPanel').setStyle({'z-index':'5002'});
      }
      Ext.getCmp('infoCarousel').setStyle({'z-index':'5003'});
      break;
    }
  }
  autoSlideCarousel($(document).width()*-1,0);
}

function analizSlideLeftPanel(shift)
{
  if ( shift != 244 )
  {
    $('#titleButton').css('display','none');
    $('#page_title').html('<p>' + mainObject.curentPage + '</p>');
  }
  else
  {
    $('#titleButton').css('display','block');
    $('#page_title').html('');
  }
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