function defaultPanel()
{
  this.createDefaultPanel = createDefaultPanel;
  this.setDefaultPanelOnly = setDefaultPanelOnly;
}

function createDefaultPanel()
{
  this.panel = Ext.create('Ext.Panel',{
    width: screen.width + 'px',
    height: screen.height - ( Ext.get('title').getHeight() + 40 ) + 'px',
    id: 'defaultPanel',
    html: '',
    style: 'display: none;'
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