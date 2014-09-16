function loadPanel()
{
  this.options = {
    visible: false,
    message: ''
  }

  this.toastOptions = {
    message: '',
    displayTime: 3000,
    type: 'success',
    visible: false
  }

  this.createLoadPanel = createLoadPanel;
  this.deleteLoadPanel = deleteLoadPanel;

  this.createToastMessage = createToastMessage;
  this.deleteToastMessage = deleteToastMessage;
}

function createToastMessage(message,displayTime,status)
{
  var obj = this;
  switch ( status )
  {
    case 0:{
      this.toastOptions.type = 'error';
      break;
    }
    case 1:{
      this.toastOptions.type = 'warning';
      break;
    }
    default:{
      this.toastOptions.type = 'success';
      break;
    }
  }

  this.toastOptions.message = message;
  this.toastOptions.visible = true;
  this.toastOptions.displayTime = displayTime;
  $('#toastPanel').dxToast( obj.toastOptions );

  setTimeout(function(){
    obj.deleteToastMessage();
  },displayTime);
}

function deleteToastMessage()
{
  var obj = this;
  this.toastOptions.visible = false;
  this.toastOptions.message = '';
  $('#toastPanel').dxToast( obj.toastOptions );
}

function deleteLoadPanel()
{
  var obj = this;
  this.options.message = '';
  this.options.visible = false;
  $('#loadPanel').dxLoadPanel( obj.options );
}

function createLoadPanel(message)
{
  var obj = this;
  LP.options.message = message;
  LP.options.visible = true;
  $('#loadPanel').dxLoadPanel( obj.options );
}

var LP = new loadPanel();