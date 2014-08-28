function defaultPanel()
{
  this.createDefaultPanel = createDefaultPanel;
  this.setDefaultPanelOnly = setDefaultPanelOnly;
}

function createDefaultPanel()
{
  this.panel = Ext.create('Ext.Panel',{
    width: $(document).width() + 'px',
    height: $(document).height() - Ext.get('title').getHeight() + 'px',
    id: 'defaultPanel',
    html: '',
    style: 'position: absolute; top: 0px;left: 0px;z-index: 5002;background-color: #323232;'
  });
  Ext.getCmp('mainContainer').add( Ext.getCmp('defaultPanel') );
}

function setDefaultPanelOnly()
{
  if ( Ext.getCmp('tabPanel') != undefined )
  {
    for ( var i = 0;i < Ext.getCmp('mainContainer').items.items.length; ++i )
    {
      if ( Ext.getCmp('mainContainer').items.items[i]['$className'] == 'Ext.tab.Panel' )
      {
        Ext.getCmp('tabPanel').un('activeitemchange',onChangeTab);
        Ext.getCmp('mainContainer').removeAt(i);
      }
    }
  }
}