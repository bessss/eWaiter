function infoCarousel()
{
  this.panel = new Object();
  this.createIC = createIC;
}

function createIC()
{
  var tempMarginTop = ( $(document).height() - Ext.get('title').getHeight() )/6;
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
          html : '<div style="width: ' + $(document).width() + 'px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table;">\
                    <div style="width: 300px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table-cell;margin-top: -' + ($(document).height() - Ext.get('title').getHeight())/2 + 'px;text-align: center;">\
                      <img src="images/slider/pic_1.png" style="width: ' + $(document).width() + 'px;margin-top: -' + tempMarginTop + 'px;" /></div>\
                  </div>'
        },
        {
          html : '<div style="width: ' + $(document).width() + 'px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table;">\
                    <div style="width: 300px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table-cell;text-align: center;">\
                    <img src="images/slider/pic_2.png" style="width: ' + $(document).width() + 'px;margin-top: -' + tempMarginTop + 'px;" /></div>\
                  </div>'
        },
        {
          html : '<div style="width: ' + $(document).width() + 'px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table;">\
                    <div style="width: 300px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table-cell;vertical-align: middle;text-align: center;">\
                    <img src="images/slider/pic_3.png" style="width: ' + $(document).width() + 'px;margin-top: -' + tempMarginTop + 'px;" /></div>\
                  </div>'
        },
        {
          html : '<div style="width: ' + $(document).width() + 'px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table;">\
                    <div style="width: 300px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table-cell;vertical-align: middle;text-align: center;">\
                    <img src="images/slider/pic_4.png" style="width: ' + $(document).width() + 'px;margin-top: -' + tempMarginTop + 'px;" /></div>\
                  </div>'
        }
    ]
  });

  Ext.getCmp('mainContainer').add( Ext.getCmp('infoCarousel') );
}