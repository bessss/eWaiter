var MMTlist = new DevExpress.data.DataSource([]);

function menuMenuType()
{
  this.menuMenuTypeStore = new Object();
  this.menuTypeStore = new Object();
  this.items = new Array();
  this.options = {
    dataSource: undefined,
    itemTemplate: ''
  }

  this.getMenu = getMenu;
  this.setItems = setItems;
  this.getImagePath = getImagePath;
}

function getImagePath(imagePath)
{
  return 'http://admin.ewaiter.info/' + imagePath;
}

function setItems()
{
  for ( var i = 0; i < MMT.menuTypeStore.length; ++i )
  {
    MMT.items[i] = {
      title: MMT.menuTypeStore[i]['menuTypeName'],
      MMTlist: new DevExpress.data.DataSource({
        store: MMT.menuMenuTypeStore, sort: 'menuName', filter: ['menuTypeName', '=', MMT.menuTypeStore[i]['menuTypeName']]
      })
    }
  }

  MyApp.app.navigation[1].option("visible", true);

  MMT.options.itemTemplate = 'MMTx';
  MMT.options.dataSource = MMT.items;
  $('#pivotMenu').dxPivot( MMT.options );
  setTimeout(function(){LP.createToastMessage('Меню получено',3000);},1000);
}

function getMenu()
{
  LP.createLoadPanel('Получение меню ресторана');

  MMT.options.itemTemplate = undefined;
  MMT.options.dataSource = undefined;
  $('#pivotMenu').dxPivot( MMT.options );

  var obj = this;
  $.ajax({
    type: "POST",
    url: 'http://admin.ewaiter.info/outputs/outputMenuMenuType.php?idRest=' + selectRest.idRest,
    data: "name=getMenu",
    error: function(){
      LP.deleteLoadPanel();
    },
    success: function(msg){
      if ( msg != 'no data' )
      {
        var temp = JSON.parse(msg);
        obj.menuMenuTypeStore = temp['menuMenuType'];
        obj.menuTypeStore = temp['menuType'];
        obj.setItems();
      }
      else
      {
        LP.createToastMessage('Меню для этого ресторана отсутствует',3000,1)
      }
    }
  });

  LP.deleteLoadPanel();
}

var MMT = new menuMenuType();