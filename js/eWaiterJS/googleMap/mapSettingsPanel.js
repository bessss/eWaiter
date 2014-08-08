function mapSettingsPanel(owner)
{
  this.owner = owner;

  this.hideSettingsPanel = hideSettingsPanel;
  this.createSettingsPanel = createSettingsPanel;
}

function hideSettingsPanel()
{
  if ( $('#mapSettingsPanel').css('display') != 'none' )
  {
    $('#mapSettingsPanel').slideUp('slow');
  }
}

function createSettingsPanel()
{
  var tempWidth = $('#mapPanel').width();
  if ( Ext.getCmp('mapSettingsPanel') == undefined )
  {
    Ext.create('Ext.Panel', {
      id: 'mapSettingsPanel',
      minWidth: '220px',
      width: tempWidth/2,
      height: '80px',
      hidden: true,
      style: 'position: absolute;top: 0px;left: '+ tempWidth/4 +'px;',
      renderTo: Ext.get('mapPanel'),
      items: [
        {
            xtype: 'fieldset',
            title: 'Настройки карты',
            instructions: 'Выберите соответствующие настройки',
            items: [
                {
                    xtype: 'checkboxfield',
                    name : 'auto_center',
                    labelWidth: '80%',
                    label: 'Автоматическое центрирование'
                },
                {
                    xtype: 'checkboxfield',
                    name : 'active_rest',
                    labelWidth: '80%',
                    label: 'Открытые рестораны'
                },
                {
                    xtype: 'checkboxfield',
                    name : 'del_route',
                    labelWidth: '80%',
                    label: 'Очистить маршрут'
                },
                {
                    xtype: 'button',
                    id: 'map_settings_ok',
                    width: '40%',
                    height: '30px',
                    margin: '0 10 0 10',
                    text: 'Применить',
                    ui: 'round',
                    handler: function()
                    {
                      alert('Tapped');
                    }
                }
            ]
        }
    ]
    });
    $('#mapSettingsPanel').slideToggle('slow');
  }
  else
  {
    if ( $('#mapSettingsPanel').css('display') == 'none' )
    {
      $('#mapSettingsPanel').css('display','block');
    }
    //Ext.getCmp('mapSettingsPanel').setHtml( this.html );
  }
}