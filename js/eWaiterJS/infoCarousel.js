$('head').append('<link rel="stylesheet" type="text/css" href="css/infoCarousel.css" />');
function infoCarousel()
{
  this.panel = new Object();
  this.createIC = createIC;
}

function createIC()
{
  var tempMarginTop = ( $(document).height() - Ext.get('title').getHeight() )/6;
  var tempHeight = $(document).height() - Ext.get('title').getHeight();
  this.panel = Ext.create('Ext.Carousel', {
    width: $(document).width() + 'px',
    height: $(document).height() - Ext.get('title').getHeight() + 'px',
    id: 'infoCarousel',

    defaults: {
        styleHtmlContent: true
    },
    style: 'display: none;background-image: url(\'images/slider/Test_fon.jpg\');background-size: cover;',
    items: [
        {
          html : '<div class="slider_table" style="width: ' + $(document).width() + 'px;height: ' + tempHeight + 'px;">\
                    <div class="slider_cell" style="height: ' + tempHeight + 'px;">\
                      <div class="textBox">Выберите ресторан</div>\
                      <img src="images/slider/pic_1.png" style="width: ' + $(document).width() + 'px;margin-top: -' + tempMarginTop + 'px;" />\
                      <div class="textBoxSmall">Вы можете выбрать любой из находящихся поблизости ресторанов</div>\
                    </div>\
                  </div>'
        },
        {
          html : '<div class="slider_table" style="width: ' + $(document).width() + 'px;height: ' + tempHeight + 'px;">\
                    <div class="slider_cell" style="height: ' + tempHeight + 'px;">\
                      <div class="textBox">Ознакомьтесь с меню</div>\
                      <img src="images/slider/pic_2.png" style="width: ' + $(document).width() + 'px;margin-top: -' + tempMarginTop + 'px;" />\
                      <div class="textBoxSmall">Вы можете просмотреть меню выбранного Вами ресторана</div>\
                    </div>\
                  </div>'
        },
        {
          html : '<div class="slider_table" style="width: ' + $(document).width() + 'px;height: ' + tempHeight + 'px;">\
                    <div class="slider_cell" style="height: ' + tempHeight + 'px;">\
                      <div class="textBox">Детальная информация о блюде</div>\
                      <img src="images/slider/pic_3.png" style="width: ' + $(document).width() + 'px;margin-top: -' + tempMarginTop + 'px;" />\
                      <div class="textBoxSmall">Выбрав блюдо вы узнаете, что входит в его состав, и не только это...</div>\
                    </div>\
                  </div>'
        },
        {
          html : '<div class="slider_table" style="width: ' + $(document).width() + 'px;height: ' + tempHeight + 'px;">\
                    <div class="slider_cell" style="height: ' + tempHeight + 'px;">\
                      <div class="textBox">Где доступен сервис eWaiter</div>\
                      <img src="images/slider/pic_4.png" style="width: ' + $(document).width() + 'px;margin-top: -' + tempMarginTop + 'px;" />\
                      <div class="textBoxSmall">Узнайте, где поблизости есть рестораны с сервисом eWaiter</div>\
                    </div>\
                  </div>' 
        }
    ]
  });

  Ext.getCmp('mainContainer').add( Ext.getCmp('infoCarousel') );
}