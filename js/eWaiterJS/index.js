var mainObject = new Object();

Ext.onReady(function(){
  mainObject = new main();

  Ext.application({
    name: 'eWaiter',
    launch: function()
    {
      Ext.create('Ext.Panel',{
        fullscreen: true,
        title: 'eWaiter',
        id: 'mainPanel',
        cls: 'mainPanel',
        layout: 'fit',
        scroll : 'vertical',
        items:
        [
          {
            xtype: 'panel',
            id: 'title',
            docked: 'top',
            style: 'height: 40px;line-height: 40px;',
            items:[
            {
              xtype: 'button',
              id: 'titleLeftButton',
              width: '20px',
              height: '40px',
              baseCls: 'leftTopButton',
              handler: function()
              {
                if ( $('#leftPanelContainer').offset().left < 0 )
                {
                  //Выдвинуть
                  autoSlideCarousel(244 - $(document).width(),244);
                }
                else
                {
                  //Задвинуть
                  autoSlideCarousel($(document).width()*-1,0);
                }
              }
            },
            {
              xtype: 'button',
              id: 'titleButton',
              width: '90px',
              height: '40px',
              baseCls: 'topLogo',
              style: 'display: none;'
            }
            ],
            cls: 'title'
          }
        ]
      });
    }
  });

  tempP = '<div id="page_title" style="height: 40px ! important;"></div>';
  Ext.fly('titleButton').insertHtml( 'afterEnd', tempP, true );
  analizSlideLeftPanel(0);
  createCarousel();
  mainObject.map = new googleMap();
  mainObject.defaultPanel.createDefaultPanel();
  mainObject.leftPanel.createLeftPanel();
  mainObject.infoCarousel.createIC();
});