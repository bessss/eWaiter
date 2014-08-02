document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var sdex = 0;
	var gret = 1;
	//navigator.splashscreen.hide();
	deviceInfoApp = new deviceInfoApp();
	deviceInfoApp.run();
}

function deviceInfoApp() {
}

deviceInfoApp.prototype = {
    
	run:function() {
		var that = this;
		document.getElementById("cordova").addEventListener("click", function() {
			that._viewDeviceName.apply(that, arguments);
		});
	},
    
	_viewDeviceName : function() {
		var infoField = document.getElementById("cordova");
		infoField.innerHTML = device.model;
	},
    
	_viewCordovaVersion : function() {
		var infoField = device.cordova;
	},
    
	_viewDevicePlatform : function () {
		var infoField = device.platform;
	},
    
	_viewDeviceUUID : function () {
		var infoField = device.uuid;
	},
    
	_viewDeviceVersion:function viewDeviceVersion() {
		var infoField = device.version;
	}
};