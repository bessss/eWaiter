function loadingPanel()
{
  this.panel = new Object();
  this.createLP = createLP;
  this.deleteLP = deleteLP;
}

function deleteLP()
{
  this.panel.destroy();
}

function createLP()
{
  this.panel = Ext.create('Ext.Panel',{
    top: 10,
    id: 'loadingPanel',
    modal: true,
    width: 200,
    height: 200,
    html: '<img src="images/OMG.gif">',
    contentEl: 'content'
  }).setCentered(true).show();
  Ext.Viewport.add(this.panel);
}