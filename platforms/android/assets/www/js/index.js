  var MyApp = window.MyApp = { };
  $(function() {
    MyApp.app = new DevExpress.framework.html.HtmlApplication({
      namespace: MyApp,
      layoutSet: DevExpress.framework.html.layoutSets['slideout'],
      navigation: [
      {
        title: 'eWaiter - меню всегда с Вами'
      },
      {
        title: "Меню ресторана",
        action: "#home",
        icon: "home",
        visible: false
      },
      {
        title: "Выбрать другой ресторан",
        action: function()
        {
          SRP.createPanel(undefined,'user');
        },
        icon: "refresh",
        visible: false
      },
      {
        title: "Где доступен сервис",
        action: "#where",
        icon: "map"
      },
      {
        title: "Как пользоваться",
        action: "#how",
        icon: "tips"
      }]
    });

    MyApp.app.router.register(":view", { view: "home" });
    MyApp.app.navigate();
    IB = new infoButton();
    
    MyApp.app.viewShown.add(function(arg) {
      $('.dx-scrollview-content:first').attr('id','nav');
      if ( arg.viewInfo.viewName == 'home' )
      {
        if ( MMT.status == true )
        {
          MMT.setItems(true);
          MMT.status = false;
        }
      }
    })
    
    /*MyApp.app.navigatingBack.add(function (e) {console.log(MyApp.app.currentViewModel.name);
        if (MyApp.app.currentViewModel.name == 'home') {alert('');};
    });*/
    
  });