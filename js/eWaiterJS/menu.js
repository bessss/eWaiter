$('head').append('<link rel="stylesheet" type="text/css" href="css/diches.css" />');
function menu()
{
  this.dishesStore = new Object();
  this.menuList = new Object();
  this.menu = '';
  this.menuType = '';
  this.getMenu = getMenu;
  this.createMenu = createMenu;
  this.createReiting = createReiting;
}

function createReiting(reiting,voices)
{
  var tempHtml = '';
  for ( var i = 0; i < 5; ++i )
  {
    if ( i < reiting )
    {
      tempHtml += '<div class="starOn"></div>';
    }
    else
    {
      tempHtml += '<div class="starOf"></div>';
    }
  }

  tempHtml += '<div class="voice">' + voices + '</div>';

  return tempHtml;
}

function createMenu()
{
  var tempId = mainObject.menu.tabPanel.getActiveItem().innerHtmlElement.id;//Ext.get( tempId ).setHtml('');
  var obj = this;

  this.menu = Ext.create('Ext.List', {
    width: $(document).width() + 'px',
    height: $(document).height() - Ext.get('title').getHeight() - 40 + 'px',
    id: 'menuList',
    renderTo: Ext.get( tempId ),
    style: 'color: black;',
    itemTpl: '<table class="dishTable" style="width: ' + $(document).width() + 'px;">\
                <tr>\
                  <td style="width: 140px;"><img src="{path}" style="width: 140px;" /></td>\
                  <td>\
                    <div class="name">{name}</div>\
                    <div class="price">{price} <span>руб.</span></div>\
                    <div class="reiting">' + obj.createReiting(3,0) + '</div>\
                  </td>\
                </tr>\
              </table>',
    data: obj.dishesStore
  });

  mainObject.curentPage = 'Меню ресторана';
  mainObject.selectMenu('menu');
  analizSlideLeftPanel(0);
  Ext.getCmp('menuRest').setHidden(false);
  mainObject.menu.hideLocalPreloader();
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