function infoCarousel()
{
  this.panel = new Object();
  this.createIC = createIC;
}

function createIC()
{
  this.panel = Ext.create('Ext.Carousel', {
    width: $(document).width() + 'px',
    height: $(document).height() - Ext.get('title').getHeight() + 'px',
    id: 'infoCarousel',

    defaults: {
        styleHtmlContent: true
    },
    style: 'display: none;',
    items: [
        {
          html : '<div style="width: ' + $(document).width() + 'px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table;">\
                    <div style="width: 300px;height: ' + ($(document).height() - Ext.get('title').getHeight()) + 'px;display: table-cell;vertical-align: middle;text-align: center;"><img src="images/test1.png" /></div>\
                  </div>',
          style: 'background-color: #5E99CC'
        },
        {
            html : 'Item 2',
            style: 'background-color: #759E60'
        },
        {
            html : 'Item 3'
        }
    ]
  });

  Ext.getCmp('mainContainer').add( Ext.getCmp('infoCarousel') );
}