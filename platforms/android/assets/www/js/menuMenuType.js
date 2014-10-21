var MMTlist = new DevExpress.data.DataSource([]);

function menuMenuType()
{
  this.menuMenuTypeStore = new Object();
  this.menuTypeStore = new Object();
  this.items = new Array();
  this.idMenu = null;
  this.options = {
    dataSource: undefined,
    itemTemplate: ''
  }
  this.detailPage = new Object();
  this.status = false;

  this.getMenu = getMenu;
  this.setItems = setItems;
  this.getImagePath = getImagePath;
  this.deletePivot = deletePivot;
  this.createDetailPage = createDetailPage;
}

function createDetailPage()
{
  this.detailPage = $(
          '<div data-options="dxView : { name: \'menuDetail_\' + mainObject.additionInfo[\'menuId\'], title: mainObject.additionInfo[\'name\']} ">' +
            '<div id="detailMenu" data-bind="dxList: { dataSource: detailMenu, grouped: true }">' +
              '<div data-options="dxTemplate: { name: \'group\' }">' +
                '<div id="nameDiches" style="margin: 0px 3% 10px 3%;color: #ffffff;text-align: center;" data-bind="text: name"></div>' +
                '<div style="text-align: center;"><img style="width: 94%;" data-bind="attr: { src: image }" /></div>' +
                '<div style="margin: 10px 3% 0px 3%;text-align: justify;text-indent: 10px;text-transform: none;font: 14px sans-serif normal;" data-bind="text: shortDescription"></div>' +
                '<div style="margin: 30px 3% 0px 3%;height: 50px;">' +
                  '<div style="font-size: 12px;margin: 0px 0px 4px 8px;">Оцените блюдо</div>' +
                  '<div class="rating" id="stars" style="height: 36px;">' +
                    '<input type="hidden" name="val" value="' + mainObject.additionInfo.rating + '">' +
                    '<input type="hidden" name="votes" value="' + mainObject.additionInfo.voiceCount + '">' +
                  '</div>' +
                  '<input type="hidden" id="index"  data-bind="text: index">' +
                  '<div style="text-align: right;color: #ffffff;" data-bind="text: price"></div>' +
                  '<div style="text-align: right;font-size: 10px;">id: ' +
                    '<span id="menuId" data-bind="text: menuId"></span>' +
                  '</div>' +
                '</div>' +
                 '<div style="background-image: url(\'images/share_40x40.png\');background-repeat: no-repeat;margin: 20px 0px 0px 3%; " data-bind="dxButton: { text: \'Поделиться\', clickAction: buttonClickedTest }"></div>' +
                '<span id="urlDiches" data-bind="text: urlRest" style="visibility: hidden;"></span>' +
                 '<div id="disqus_thread""></div>' +
                '<div style="width: 100%;height: 300px;margin-top: 14px;" id="iFRM"></div>' +
              '</div>' +
            '</div>' +
          '</div>');
  if ( !MyApp.app.getViewTemplateInfo( 'menuDetail_' + mainObject.additionInfo['menuId'] ) ) {
      MyApp.app.loadTemplates( MMT.detailPage );
  }
}

function deletePivot()
{
  MMT.options.itemTemplate = '';
  MMT.options.dataSource = undefined;
  $('#pivotMenu').dxPivot( MMT.options );
}

function getImagePath(imagePath)
{
  return 'http://admin.ewaiter.info/' + imagePath;
}

function setItems(status)
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
  
  if ( status == undefined )
  {
    setTimeout(function(){LP.createToastMessage('Меню получено',3000);},1000);
  }
  navigator.vibrate(300);
}

function getMenu()
{
  LP.createLoadPanel('Получение меню ресторана');
  MyApp.app.navigation[0].option("title",selectRest.restTitle);
  mainObject.modeCss();

  MMT.options.itemTemplate = undefined;
  MMT.options.dataSource = undefined;
  //$('#pivotMenu').dxPivot( MMT.options );
  $('#pivotMenu').css('display','none');

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
        $('#pivotMenu').css('display','block');
        var temp = JSON.parse(msg);
        obj.menuMenuTypeStore = temp['menuMenuType'];
        obj.menuTypeStore = temp['menuType'];
        obj.setItems();
      }
      else
      {
        MyApp.app.navigation[1].option("visible", false);
        LP.createToastMessage('Меню для этого ресторана отсутствует',3000,1);
      }
    }
  });

  LP.deleteLoadPanel();
}

var MMT = new menuMenuType();