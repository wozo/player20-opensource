$(document).ready(function(){  

	swfpluginCheck = function(cv) {
	    var cv=cv;
	    var swPluginVersion = 0;
	    if(typeof(navigator.plugins["Shockwave Flash"]) == "object") {
	        var descrip = navigator.plugins["Shockwave Flash"].description;
	        //alert("descrip:"+descrip);
	        swPluginVersion  = descrip.substr(16, (descrip.indexOf(".", 16) - 16));
	    }
	
	    else if(typeof(ActiveXObject) == "function") {
	        for(var i = 1; i <= (cv); i ++) {
	           try {
	                if(typeof(new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i)) == "object") {
	                    swPluginVersion = i;
	                }
		   }
	           catch(error){
	           }
	        }
	    }
	
	    return swPluginVersion;
	}
});
