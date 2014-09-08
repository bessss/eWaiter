  var MyApp = window.MyApp = { };
  $(function() {

    

    MyApp.app = new DevExpress.framework.html.HtmlApplication({
      namespace: MyApp,
      layoutSet: DevExpress.framework.html.layoutSets['slideout'],
      navigation: [
      {
        //
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
          SRP.createPanel('','user');
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
    
    MyApp.app.viewShown.add(function(arg) {
      $('.dx-scrollview-content:first').attr('id','nav');
    })
    
  });