function mapSettingsPanel(owner)
{
  this.owner = owner;
  this.html = '';
  this.marker = new Object();

  this.hideSettingsPanel = hideSettingsPanel;
  this.settingsInfo = settingsInfo;
  this.createSettingsPanel = createSettingsPanel;
}

function hideSettingsPanel()
{
  if ( $('#mapSettingsPanel').css('display') != 'none' )
  {
    $('#mapSettingsPanel').slideUp('slow');
  }
}

function settingsInfo()
{
  var tempWidth = $('#mapPanel').width() - 10;
  this.html = '<div style="float: left;height: 200px;width: ' + tempWidth/4 + 'px;color: black;background-color: #d6d6d6;padding-left: 12px;min-width:240px;">\
               </div>';
}

function createSettingsPanel()
{
  //mainObject.map.mapSettingsPanel.settingsInfo();
  var tempWidth = $('#mapPanel').width() - 10;
  if ( Ext.getCmp('mapSettingsPanel') == undefined )
  {
    Ext.create('Ext.Panel', {
      html: 'Floating Settings Panel',
      id: 'mapSettingsPanel',
      minWidth: '220px',
      width: tempWidth/2,
      height: '80px',
      hidden: true,
      style: 'background-color: white;position: absolute;top: 0px;left: '+ tempWidth/4 +'px;',
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
    Ext.getCmp('mapSettingsPanel').setHtml( this.html );
  }
}