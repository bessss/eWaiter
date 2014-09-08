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
  LP.deleteLoadPanel();

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
        MMT.getMenu();
      }
    }
  }

  if ( this.restStore.length > 0 )
  {
    this.options.visible = true;
    this.options.dataSource = this.restStore;
    
    this.map = $('#selectRestPanel').dxActionSheet( obj.options );
  }
}

var SRP = new selectRestPanel();