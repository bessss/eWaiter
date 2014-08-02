function RestDB(owner)
{
Ext.define("Restaurant", {
  extend: "Ext.data.Model",
  config: {
      fields: [
          {name: "rest_id", type: "string"},
          {name: "css_name",  type: "string"}
      ]
  }
});
this.restaurantDB = Ext.create("Ext.data.Store", {
  model: "Restaurant",
  storeId: "RestaurantDB",
  proxy: {
     type: "sql"
  }
});

  this.addItem = addItem;
}

function addItem(rest,css)
{
  Ext.getStore("RestaurantDB").removeAll();
  Ext.getStore("RestaurantDB").add([{
    rest_id: rest,
    css_name: css
  }]);
}
