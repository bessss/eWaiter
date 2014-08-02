function leaveRestPanel()
{
  this.panel = new Object();
  this.createLRP = createLRP;
}

function createLRP()
{
  this.panel = Ext.create('Ext.Panel',{
    top: 10,
    id: 'selectRestPanel',
    modal: true,
    width: 200,
    height: 130,
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    contentEl: 'content',
    scrollable: true,
    style: {
      'box-shadow' : '0 0 12px #ffffff',
      'border-radius': '0.3125em',
      'background-color': '#DDDDDD'
    },
    items: [
      {
        xtype: 'titlebar',
        height: 40,
        docked: 'top',
        title: 'Внимание!',
        style: 'background:#c70505'
      },
      {
        xtype: 'panel',
        width: 200,
        height: 40,
        padding: 10,
        html: 'Вы покинули ресторан',
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        contentEl: 'content',
        style: {
          'font-size':'14px',
          'text-align':'center'
        }
      },
      {
        xtype: 'button',
        text: 'OK',
        height: 30,
        width: 180,
        margin: '10',
        ui: 'confirm-round',
        handler: function()
          {
            mainObject.selectRestaurant.leaveRestPanel.panel.hide();
            mainObject.selectRestaurant.leaveRestPanel.panel.destroy();
          }
        }
    ]
  }).setCentered(true).show();
  Ext.Viewport.add(this.panel);
}