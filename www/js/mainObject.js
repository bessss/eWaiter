function mainObject()
{
  this.idRest = null;
  this.additionInfo = {};
  this.networkType = 'No network connection';

  this.modeCss = modeCss;
  this.searchIdMenu = searchIdMenu;
  this.setRatingHook = setRatingHook;

}

function setRatingHook()
{
  var intervalID3 = setInterval(function(){
    if ( $('div.rating').length != undefined && $('div.rating').length > 0 )
    {
      $('div.rating').rating();
      clearInterval( intervalID3 );
    }
  },400);
}

function modeCss(operation)
{
  if ( operation == undefined )
  {
    $('.cssOver').remove();
    $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_' + selectRest.cssName + '.css" class="cssOver" />');
  }
  else
  {
    if ( $('.cssOver').attr('href') != 'css/restaurant_default.css' )
    {
      $('.cssOver').remove();
      $('head').append('<link rel="stylesheet" type="text/css" href="css/restaurant_default.css" class="cssOver" />');
    }
  }
}

function searchAdditionInfo(menuId)
{
  mainObject.additionInfo = {};
  for ( var i = 0; i < MMT.menuMenuTypeStore.length; ++i )
  {
    if ( MMT.menuMenuTypeStore[i]['menuId'] == menuId )
    {
      mainObject.additionInfo = {
        image: 'http://admin.ewaiter.info/' + MMT.menuMenuTypeStore[i]['image'],
        price: MMT.menuMenuTypeStore[i]['price'],
        menuId: menuId,
        ratingImage: MMT.menuMenuTypeStore[i]['ratingImage'],
        voiceCount: MMT.menuMenuTypeStore[i]['voiceCount'],
        name: MMT.menuMenuTypeStore[i]['menuName'],
        rating: MMT.menuMenuTypeStore[i]['rating'],
        index: i,
        urlRest: MMT.menuMenuTypeStore[i]['urlRest']
      };
    }
  }
  return mainObject.additionInfo;
}

function searchIdMenu(element)
{
  element.id = 'idMenu';

  $('#idMenu').each(function(i,elem) {
    var oneDiv = $(this);
    var countDiv = oneDiv.find('div').length - 1;
    for(i = 0; i <= countDiv; i++)
    {
      if ( oneDiv.find('div').eq(i).attr('divid') != undefined)
      {
        //console.log( oneDiv.find('div').eq(i).html() );
        //MyApp.app.navigate("menuDetail");
        detailMenu = new DevExpress.data.DataSource([]);
        detailMenu.store().insert( searchAdditionInfo( oneDiv.find('div').eq(i).html() ) );
        MMT.createDetailPage();
        MyApp.app.navigate('menuDetail_' + mainObject.additionInfo['menuId']);
        reloadMD();
        //mainObject.setRatingHook();
      }
    }
  });

  $('#idMenu').attr('id','');
}

var detailMenu = new Object();
var DISQUS = new Object();
var disqus_shortname = 'ewaiter';
var disqus_identifier = 'none_identifie';
var disqus_title = 'none_title';
var disqus_url = 'none';

function CCD()
{	
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    disqus_shortname = 'ewaiter'; // required: replace example with your forum shortname
    disqus_identifier = mainObject.additionInfo['menuId'];
    disqus_title = mainObject.additionInfo['name'];
    disqus_url = 'http://application/menuDetail_' + mainObject.additionInfo['menuId'] + '_url';
    DISQUS = new Object();
    //var disqus_category_id = 'menuDetail_' + mainObject.additionInfo['menuId'] + '_disqus_category_id';

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
}

function reloadMD()
{
  var intervalID2 = setInterval(function(){
    if ( $('#iFRM').length != undefined && $('#iFRM').length > 0 )
    {
      //$('#detailMenu').dxList({ dataSource: detailMenu });

      //CCD();
      //$('#ifrm').attr('src','http://ewaiter.info/application/www/index.html?disqus_shortname=' + disqus_shortname + '&disqus_identifier=' + disqus_identifier);
      //$('#iframeDisc').remove();
      //$('<iframe style="width: 100%; height: 300px;display: table;" id="iframeDisc" src="http://ewaiter.info/application/www/index.html?disqus_shortname=' + disqus_shortname + '&disqus_identifier=' + disqus_identifier + '&disqus_title=' + disqus_title + '"></iframe>').appendTo('#iFRM');
      $('#stars').rating({fx: 'half',image: 'images/stars.png',loader: 'images/ajax-loader.gif',width: 20,url: 'http://admin.ewaiter.info/includes/insertVoise.php'});
      clearInterval( intervalID2 );
    }
  },400);
}

var mainObject = new mainObject();
