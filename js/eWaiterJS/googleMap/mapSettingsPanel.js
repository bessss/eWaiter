function mapSettingsPanel(owner)
{
  this.owner = owner;
  this.panel = undefined;

  this.hideSettingsPanel = hideSettingsPanel;
  this.createSettingsPanel = createSettingsPanel;
  this.changeMapSettings = changeMapSettings;
}

function hideSettingsPanel()
{
  mainObject.map.mapSettingsPanel.panel.hide();
}

function changeMapSettings(auto_center,active_rest,del_route)
{
  if ( del_route == true)
  {
    mainObject.map.map.cleanRoute();
    this.panel.items.items[0].items.items[2].uncheck();
  }
}

function createSettingsPanel()
{
  var tempWidth = $('#mapPanel').width();
  if ( mainObject.map.mapSettingsPanel.panel == undefined )
  {
    mainObject.map.mapSettingsPanel.panel = Ext.create('Ext.form.Panel', {
      id: 'mapSettingsFormPanel',
      minWidth: '220px',
      width: tempWidth/2,
      left: tempWidth/4,
      height: '160px',
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
                    height: '30px',
                    label: 'Автоматическое центрирование'
                },
                {
                    xtype: 'checkboxfield',
                    name : 'active_rest',
                    labelWidth: '80%',
                    height: '30px',
                    label: 'Открытые рестораны'
                },
                {
                    xtype: 'checkboxfield',
                    name : 'del_route',
                    labelWidth: '80%',
                    height: '30px',
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
                      var values = mainObject.map.mapSettingsPanel.panel.getValues();
                      mainObject.map.mapSettingsPanel.changeMapSettings(values.auto_center, values.active_rest, values.del_route);
                      //Ext.Msg.alert(' Изменение настроек ',Ext.String.format('{0} {1} {2}', values.auto_center, values.active_rest, values.del_route), Ext.emptyFn);
                      mainObject.map.mapSettingsPanel.panel.hide();
                    }
                }
            ]
        }
    ]
    });
    mainObject.map.mapSettingsPanel.panel.show();
  }
  else
  {
    mainObject.map.mapSettingsPanel.panel.show();
  }
}