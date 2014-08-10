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
  mainObject.map.auto_center = auto_center;
  
}

function createSettingsPanel()
{
  var tempWidth = $('#mapPanel').width();
  if ( mainObject.map.mapSettingsPanel.panel == undefined )
  {
    mainObject.map.mapSettingsPanel.panel = Ext.create('Ext.form.Panel', {
      id: 'mapSettingsFormPanel',
      minWidth: '220px',
      width: tempWidth - 40,
      left: '20px',
      height: '200px',
      baseCls: 'mapSettingsPanel',
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
                    xtype: 'button',
                    id : 'del_route',
                    width: '40%',
                    height: '30px',
                    margin: '0 10 10 10',
                    text: 'Очистить маршрут',
                    ui: 'decline-round',
                    handler: function()
                    {
                      mainObject.map.map.cleanRoute();
                    }
                },
                {
                    xtype: 'button',
                    id: 'map_settings_ok',
                    width: '40%',
                    height: '30px',
                    margin: '0 10 10 10',
                    text: 'Применить',
                    ui: 'confirm-round',
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