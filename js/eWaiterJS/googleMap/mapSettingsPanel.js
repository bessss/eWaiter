function mapSettingsPanel(owner)
{
  this.owner = owner;
  this.panel = undefined;
  this.auto_center = null;
  this.active_rest = null;
  
  this.intervalID = undefined;

  this.hideSettingsPanel = hideSettingsPanel;
  this.createSettingsPanel = createSettingsPanel;
  this.changeMapSettings = changeMapSettings;
}

function hideSettingsPanel()
{
  if ( $('#mapSettingsFormPanel').length > 0 )
  {
    if ( $('#mapSettingsFormPanel').css('display') != 'none' )
    {
      var values = mainObject.map.mapSettingsPanel.panel.getValues();

      mainObject.map.mapSettingsPanel.auto_center = values.auto_center;
      mainObject.map.mapSettingsPanel.active_rest = values.active_rest;

      mainObject.map.mapSettingsPanel.changeMapSettings(values.auto_center, values.active_rest);
      //Ext.Msg.alert(' Изменение настроек ','Настройки отображения карты изменены', Ext.emptyFn);
      mainObject.map.mapSettingsPanel.panel.hide();
    }
  }
}

function changeMapSettings(auto_center,active_rest)
{
  mainObject.map.auto_center = auto_center;
  if ( active_rest == true )
  {
    mainObject.map.markers.createMarkers();
    //this.intervalID = setInterval(function(){mainObject.map.markers.createActiveMarkers()}, 18000);
  }
  else
  {
    //clearInterval(mainObject.map.mapSettingsPanel.intervalID);// не хочет работать((((
    //this.intervalID = undefined;
    //mainObject.map.map.removeMarkers();
    mainObject.map.markers.createMarkers();
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
      width: tempWidth,
      height: '170px',
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