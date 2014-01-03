$(document).ready(function(){  

	//case audiobutt off, caps on: default start with caps or not
	var startWithCaps = "false";

	var swfpluginVersion = swfpluginCheck(9);
	//alert("swfpluginVersion:" + swfpluginVersion);
	
	isiPhone = function(){
	    return (
	        (navigator.platform.indexOf("iPhone") != -1) ||
	        (navigator.platform.indexOf("iPod") != -1) ||
	        (navigator.platform.indexOf("iPad") != -1)
	    );
	}
	
	
	if(swfpluginVersion>=9 || isiPhone()) {
	
		if ($('div#warningtext').length > 0) {
			$('div#warningtext').remove();
	        }
	}
	else {
		if(swfpluginVersion==0) {
			if ($('div#warningtext').length > 0) {
				$('div#warningtext').html('<h2>Achtung:</h2>Zur Betrachtung des Videos wird ein <a href="http://get.adobe.com/de/flashplayer/">Flash Plugin benoetigt</a><br />Installationszeit unter 1 Minute<br /><br />');
				$('div#extplayercontrolsid').style('dispay', 'none');
			}
		}
		
		else {
			$('div#warningtext').html('<h2>Achtung:</h2>Zur reibungslosen Betrachtung des Videos wird ein <a href="http://get.adobe.com/de/flashplayer/">neueres Flash Plugin benoetigt</a><br />Installationszeit unter 1 Minute<br /><br />');
		}
	}
		
	player = null;	

	playerReady = function(thePlayer) {

		player = window.document[thePlayer.id];
		player.addControllerListener("MUTE","muteTracker");
		player.addControllerListener("VOLUME", "volumeListener");
		player.addModelListener("TIME", "positionListener");

	}
	
	playerInits = function(playerFlvi,playerWidth,playerHeight,playerImg) { 	
		//alert("playerInits called");
		
		if (startWithCaps == "true") {
		
			if (captionButton == "on" && audioButton == "on"){
				writeDynPlayer(playerFlvi,playerWidth,playerHeight,playerImg, 0);
				changeAaccButt('off');
			}
			else if (captionButton == "on" && audioButton == "off"){
				writeDynPlayer(playerFlvi,playerWidth,playerHeight,playerImg, 1);
				changeCapsButt('off');
			}		
			else if (captionButton == "off" && audioButton == "on"){
				writeDynPlayer(playerFlvi,playerWidth,playerHeight,playerImg, 2);
				changeAudioButt('off');
			}
			else{
				writeDynPlayer(playerFlvi,playerWidth,playerHeight,playerImg, 3);
			}
		}
		else {
			
			if (captionButton == "on" && audioButton == "on"){
				writeDynPlayer(playerFlvi,playerWidth,playerHeight,playerImg, 0);
				changeAaccButt('off');
			}
			else if (captionButton == "on" && audioButton == "off"){
				writeDynPlayer(playerFlvi,playerWidth,playerHeight,playerImg, 3);
				changeCapsButt('on');
			}		
			else if (captionButton == "off" && audioButton == "on"){
				writeDynPlayer(playerFlvi,playerWidth,playerHeight,playerImg, 2);
				changeAudioButt('off');
			}
			else{
				writeDynPlayer(playerFlvi,playerWidth,playerHeight,playerImg, 3);
			}			
			
		}
		
	}	
	if (!currentVolume) {
		var currentVolume = 80;
	}
	volumeListener = function(obj) { 
		currentVolume = obj.percentage; 
	}

	positionListener = function(obj) { 
		currentPosition = obj.position; 
	}	


	writeDynPlayer = function(playerFlvi,playerWidth,playerHeight,playerImg,plType) {
		//alert("writeDynPlayer called: "+plType);
		
		var playerInsert = "";
		var accAllon = "";
		var capOnlyon = "";
		var adOnlyon = "";
		var audioState = "true";
		var capsState = "true";
		var playStretching = "fill";
		var playAllowfullscreen = "true";
		var playBgcolor = "#FFFFFF";


		if (plType == 0) {
		//accessibility all on
			accAllon = "&plugins=" + accessibilityPluginsPath + "&audiodescription.file=" + audioDescFile + "&audiodescription.state=" + audioState + "&audiodescription.volume=" + audioDescVolume + "&captions.file=" + captionFile + "&captions.state=" + capsState + "&captions.back=" + captionBackground;
		}
		else if (plType == 1) {
		//cc only on
			
			capOnlyon = "&plugins=" + accessibilityPluginsCapsOnlyPath + "&captions.file=" + captionFile + "&captions.state=" + capsState + "&captions.back=" + captionBackground; 
		}
		
		else if (plType == 2) {
		//ad only on
			adOnlyon = "&plugins=" + accessibilityPluginsAudioOnlyPath + "&audiodescription.file=" + audioDescFile + "&audiodescription.state=" + audioState + "&audiodescription.volume=" + audioDescVolume;  
		}
		
		else {
		//standard
			var accAllon = "";
			var capOnlyon = "";
			var adOnlyon = "";	
		}
		
		//ff 
		var prevVidViClass = "prevvidvi";
		var prevVidObClass = "prevvidob2";
		var prevVidEmClass = "prevvidem";
		
		if ( $.browser.msie ) {
		
			//if ( $.browser.version == "8.0" ) {
				var prevVidViClass = "prevvidvi";
				var prevVidObClass = "prevvidob";
				var prevVidEmClass = "prevvidem";
			//}
		}
		
		
		if(isiPhone()){
		    //alert("iphone or ipod");

			playerInsert = "<video class='" + prevVidViClass + "' width='" + playerWidth + "' height='" + playerHeight + "' controls poster='" + playerImg + "'>\n";
			playerInsert = playerInsert + "<source src='" + playerFlvi + "' type='video/mp4' />\n";
			playerInsert = playerInsert + "Dieser Browser ist nicht HTML 5 kompatibel.\n";
			playerInsert = playerInsert + "</video>\n";
		}	
		else {	
		

			playerInsert = "<object class='" + prevVidObClass + "' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='" + playerWidth + "' height='" + playerHeight + "' id='single1' name='single1'>\n";
			playerInsert = playerInsert + "<param name='movie' value='" + playerUrl + "'>\n";
			playerInsert = playerInsert + "<param name='allowfullscreen' value='" + playAllowfullscreen + "'>\n";
			playerInsert = playerInsert + "<param name='allowscriptaccess' value='always'>\n";
			playerInsert = playerInsert + "<param name='wmode' value='opaque'>\n";
			playerInsert = playerInsert + "<param name='flashvars' value='file=" + playerFlvi + "&skin=" + playerSkin + "&image=" + playerImg + "&stretching=" + playStretching + "" + accAllon + "" + capOnlyon + "" + adOnlyon + "'>\n";
			playerInsert = playerInsert + "<embed class='" + prevVidEmClass + "' \n";
			playerInsert = playerInsert + "  id='single2'\n";
			playerInsert = playerInsert + "  name='single2'\n";
			playerInsert = playerInsert + "  src='" + playerUrl + "'\n";
			playerInsert = playerInsert + "  width='" + playerWidth + "'\n";
			playerInsert = playerInsert + "  height='" + playerHeight + "'\n";
			playerInsert = playerInsert + "  bgcolor='" + playBgcolor + "'\n";
			playerInsert = playerInsert + "  allowscriptaccess='always'\n";
			playerInsert = playerInsert + "  allowfullscreen='" + playAllowfullscreen + "'\n";
			playerInsert = playerInsert + "  flashvars='file=" + playerFlvi + "&skin=" + playerSkin + "&image=" + playerImg + "&stretching=" + playStretching + "" + accAllon + "" + capOnlyon + "" + adOnlyon + "'\n";
			playerInsert = playerInsert + "/>\n";
			playerInsert = playerInsert + "</object>\n";
		}
		
		$('div#preview').html(playerInsert);		

	}
	

		
	
	initPlayerControls = function(action) {
		//alert("initPlayerControls called");
		
		var playerControls;
		
		if(isiPhone()){
			//alert("iphone or ipod");
			playerControls = "";
		}
		else {
			playerControls = "<div id=\"extfilmmenue\" class=\"extplayercontrolshead\">\n";
			playerControls = playerControls + "<a name=\"extcontrol\" class=\"hidden\"></a><h2><a href=\"javascript:void(0)\" class=\"hc_bg1\" accesskey=\"9\" title=\"Accesskey 9\">Filmsteuerung erweitern</a></h2>\n";
			playerControls = playerControls + "</div>\n";
			playerControls = playerControls + "<div id=\"helpcontrol\">\n";
			playerControls = playerControls + "<ul>\n";
			playerControls = playerControls + "<li ><a class=\"eins\" href=\"javascript:void(0)\" accesskey=\"1\" title=\"Accesskey 1\" onclick=\"player.sendEvent('PLAY')\">Abspielen/Pause</a></li>\n";
			playerControls = playerControls + "<li ><a class=\"zwei\" href=\"javascript:void(0)\" accesskey=\"2\" title=\"Accesskey 2\" onclick=\"player.sendEvent('STOP')\">Stop</a></li>\n";
			
			playerControls = playerControls + "<li><a class=\"drei_1\" href=\"javascript:void(0)\" onclick=\"player.sendEvent('PLAY'); player.sendEvent('SEEK', currentPosition+5)\">vorspulen</a></li>\n";
			playerControls = playerControls + "<li><a class=\"drei_2\" href=\"javascript:void(0)\" onclick=\"player.sendEvent('PLAY'); player.sendEvent('SEEK', currentPosition-20)\">zur&uuml;ckspulen</a></li>\n";
			
			if (audioButton=="on" && captionButton=="on") {
				playerControls = playerControls + "<li id=\"aaccpp\"><a class=\"vier\"  href=\"javascript:void(0)\" onclick=\"writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); changeAaccButt('on');\">Untertitel und Audiobeschreibung ausschalten</a></li>\n";
			}
			if (audioButton=="on" && captionButton=="off") {
				playerControls = playerControls + "<li id=\"audipp\"><a class=\"vier\"  href=\"javascript:void(0)\" onclick=\"writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); changeAudioButt('on');\">Audiobeschreibung ausschalten</a></li>\n";
			}
			
			if (startWithCaps=="true") {
				if (audioButton=="off" && captionButton=="on") {
					playerControls = playerControls + "<li id=\"capspp\"><a class=\"vier\"  href=\"javascript:void(0)\" onclick=\"writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); changeCapsButt('on');\">Untertitel ausschalten</a></li>\n";
				}	
			} 
			else{
				if (audioButton=="off" && captionButton=="on") {
					playerControls = playerControls + "<li id=\"capspp\"><a class=\"vier\"  href=\"javascript:void(0)\" onclick=\"writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,1); changeCapsButt('of');\">Untertitel</a></li>\n";
				}
			}		
				
			playerControls = playerControls + "<li id=\"playermute\"><a class=\"fuenf\"   href=\"javascript:void(0)\" onclick=\"playerMute(0)\">Ton aus</a> <a class=\"acht\"   href=\"javascript:void(0)\" onclick=\"playerMuteMod(0)\">Ton lauter</a> <a class=\"neun\"   href=\"javascript:void(0)\" onclick=\"playerMuteMod(1)\">Ton leiser</a></li>\n";
			
			if (signButton=="on") {
			
				if (audioButton=="on" && captionButton=="on") {
					playerControls = playerControls + "<li><a class=\"sechs\"  href=\"javascript:void(0)\" onclick=\"writeDynPlayer(signLanguageUrl,playerWidth,playerHeight,signLanguageImg,3); changeAaccButt('on');\">Geb&auml;rdensprachvideo</a></li>\n";
					playerControls = playerControls + "<li><a class=\"sieben\"  href=\"javascript:void(0)\" onclick=\"writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); changeAaccButt('on');\">Originalvideo</a></li>\n";
				}
				else if (audioButton=="off" && captionButton=="on") {
					playerControls = playerControls + "<li><a href=\"javascript:void(0)\" onclick=\"writeDynPlayer(signLanguageUrl,playerWidth,playerHeight,signLanguageImg,1); changeCapsButt('on');\">Geb&auml;rdensprachvideo</a></li>\n";
					playerControls = playerControls + "<li><a href=\"javascript:void(0)\" onclick=\"writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); changeCapsButt('on');\" >Originalvideo</a></li>\n";
				}
				else if (audioButton=="on" && captionButton=="off") {
					playerControls = playerControls + "<li><a href=\"javascript:void(0)\" onclick=\"writeDynPlayer(signLanguageUrl,playerWidth,playerHeight,signLanguageImg,3); changeAudioButt('on');\">Geb&auml;rdensprachvideo</a></li>\n";
					playerControls = playerControls + "<li><a href=\"javascript:void(0)\" onclick=\"writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); changeAudioButt'on');\" >Originalvideo</a></li>\n";	
				}
				else {	
					playerControls = playerControls + "<li><a href=\"javascript:void(0)\" onclick=\"writeDynPlayer(signLanguageUrl,playerWidth,playerHeight,signLanguageImg,3);\">Geb&auml;rdensprachvideo</a></li>\n";
					playerControls = playerControls + "<li><a href=\"javascript:void(0)\" onclick=\"writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); \" >Originalvideo</a></li>\n";		
				}	
			}
			
			playerControls = playerControls + "</ul>\n";
			
			playerControls = playerControls + "</div>\n";
			
			//alert(playerControls);	
			$('div#extplayercontrolsid').html(playerControls);
			
			$('a.hc_bg1').text("Filmsteuerung erweitern"); 
			$('a.hc_bg1').click(function () {         
				//alert("a.hc_bg1 klick");     
				$("div#helpcontrol").animate({height: "toggle"}, 400, function () {$('a.hc_bg1').text() == "Filmsteuerung erweitern" ? $('a.hc_bg1').text("Filmsteuerung minimieren") : $('a.hc_bg1').text("Filmsteuerung erweitern");});
			});	
			
		}	
	}
	
	playerMute = function(action) {
		var iaction = 0;
		var iaction = action;
			
		if (iaction == 0) {	
			$('li#playermute').html('<a class="fuenf2"  href="javascript:void(0)" onclick="playerMute(1);">Ton ein</a> <a class="acht"   href="javascript:void(0)" onclick="playerMuteMod(0)">Ton lauter</a> <a class="neun"   href="javascript:void(0)" onclick="playerMuteMod(1)">Ton leiser</a>');
			player.sendEvent('MUTE');
			return;
		}
		
		if (iaction == 1) {	
			$('li#playermute').html('<a class="fuenf"  href="javascript:void(0)" onclick="playerMute(0);">Ton aus</a> <a class="acht"   href="javascript:void(0)" onclick="playerMuteMod(0)">Ton lauter</a> <a class="neun"   href="javascript:void(0)" onclick="playerMuteMod(1)">Ton leiser</a>');
			player.sendEvent('MUTE');
			return;
		}
	}
	
	playerMuteMod = function(action) {
		//alert("currentVolume: " + currentVolume);
		var iaction = 0;
		var iaction = action;
		
		if(currentVolume<=0) {
			playerMute(0);
		}

		if (iaction == 0 && currentVolume<100) {		
			currentVolumeMod=currentVolume+10;
			player.sendEvent('VOLUME', currentVolumeMod);
			return;
		}
		
		if (iaction == 1 && currentVolume>0) {	
			currentVolumeMod=currentVolume-10;
			player.sendEvent('VOLUME', currentVolumeMod);
			return;
		}
	}
	
	
	
	muteTracker = function(obj) { 
		if (obj.state == true){
			//ton aus
			$('li#playermute').html('<a class="fuenf2"  href="javascript:void(0)" onclick="playerMute(1);">Ton ein</a> <a class="acht"   href="javascript:void(0)" onclick="playerMuteMod(0)">Ton lauter</a> <a class="neun"   href="javascript:void(0)" onclick="playerMuteMod(1)">Ton leiser</a>');
		}
		
		if (obj.state == false){
			//ton ein
			$('li#playermute').html('<a class="fuenf"  href="javascript:void(0)" onclick="playerMute(0);">Ton aus</a> <a class="acht"   href="javascript:void(0)" onclick="playerMuteMod(0)">Ton lauter</a> <a class="neun"   href="javascript:void(0)" onclick="playerMuteMod(1)">Ton leiser</a>');
		}
	}


	changeAaccButt = function(pi) { 
		if (pi == "on" ){
			//aacc ein
			$('li#aaccpp').html('<a class="vier"  href="javascript:void(0)" onclick="writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,0); changeAaccButt(\'off\');">Untertitel und Audiobeschreibung</a>');
		}
		else {
			//aacc aus
			$('li#aaccpp').html('<a class="vier"  href="javascript:void(0)" onclick="writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); changeAaccButt(\'on\');">Untertitel und Audiobeschreibung ausschalten</a>');
		}	
	}

	changeCapsButt = function(pi) { 
		if (pi == "on" ){
			//caps ein
			$('li#capspp').html('<a class="vier"  href="javascript:void(0)" onclick="writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,1); changeCapsButt(\'off\');">Untertitel</a>');
		}
		else {
			//caps aus	
			$('li#capspp').html('<a class="vier"  href="javascript:void(0)" onclick="writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); changeCapsButt(\'on\');">Untertitel ausschalten</a>')
		}	
	}


	changeAudioButt = function(pi) { 
		if (pi == "on" ){
			//audio ein
			$('li#audipp').html('<a class="vier"  href="javascript:void(0)" onclick="writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,2); changeAudioButt(\'off\');">Audiobeschreibung</a>');
		}
		else {
			//audio aus
			$('li#audipp').html('<a class="vier"  href="javascript:void(0)" onclick="writeDynPlayer(playerFlv,playerWidth,playerHeight,playerFlvImg,3); changeAudioButt(\'on\');">Audiobeschreibung ausschalten</a>');
		}	
	}
	
	loadMovie = function(urlw) {
		player.sendEvent('LOAD', urlw);
	}	
	

				

	
});