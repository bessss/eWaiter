function selectRestPanel()
{
  this.restStore = [];
  this.options = {
    dataSource: [],
    visible: false,
    title: 'Рестораны рядом',
    cancelClickAction: function ()
    {
      SRP.options.visible = false;
    }
  }

  this.createPanel = createPanel;
}

function createPanel(restStore,user)
{
  var obj = this;
  //LP.deleteLoadPanel();
  LP.createLoadPanel('Поиск ресторанов рядом с Вами');

  if ( user == undefined )
  {
    //Запрос не от пользователя
    this.restStore = restStore;
    for ( var i = 0; i < this.restStore.length; ++i )
    {
      this.restStore[i]['clickAction'] = function ()
      {
        SRP.options.visible = false;
        selectRest.idRest = this._options.idRestaurant;
        selectRest.restTitle = this._options.title;
        selectRest.cssName = this._options.cssName;
        MMT.getMenu();
      }
    }
  }
  else
  {
    this.restStore = selectRest.restaurantStore;
  }

  if ( this.restStore.length > 0 )
  {
    this.options.visible = true;
    this.options.dataSource = this.restStore;
  }
  else
  {
    this.options.visible = false;
  }

  this.map = $('#selectRestPanel').dxActionSheet( obj.options );
  LP.deleteLoadPanel();
}

var SRP = new selectRestPanel();