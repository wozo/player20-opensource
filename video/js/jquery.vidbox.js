$(document).ready(function(){
	
	//colorbox
	$("div#preview").addClass("plwr_default");
	$(".singlevideobox").colorbox({
		//single video
		onLoad:function(){  $("div#preview").removeClass("plwr_default"); $("div#preview").addClass("plwr_big"); $("div#videobox").removeClass("vb_default"); $("div#videobox").addClass("vb_big"); },
		onComplete:function(){ playerInits(playerFlvBig,playerWidth,playerHeight,playerFlvImg); $("a.hc_bg1").focus();},
		onClosed:function(){ playerInits(playerFlv,playerWidth,playerHeight,playerFlvImg); $("div#preview").removeClass("plwr_big"); $("div#preview").addClass("plwr_default");  $("div#videobox").removeClass("vb_big"); $("div#videobox").addClass("vb_default"); $("#extfilmmenue").focus();},
		width:"715px", height:"790", inline:true, close: "<a  title=\"schlie&szlig;en\" class=\"cb_clo\" href=\"javascript:void(0)\">schlie&szlig;en</a>", href:"#videobox"
	});
	
	$('a.videoskip').focus(function() {
		$.colorbox.close()
	});
	// / colorbox  
	
	
	
	//transkript toggle
        $("#vie_tv-transkript-hide").click(function() {
            $("#vie_tv-transkript").toggle("fast");
            $("#vie_tv-transkript-hide").css('display', 'none');
            $("#vie_tv-transkript-show").css('display', 'block');
        });
        $("#vie_tv-transkript-show").click(function() {
            $("#vie_tv-transkript").toggle("fast");
            $("#vie_tv-transkript-hide").css('display', 'block');
            $("#vie_tv-transkript-show").css('display', 'none');
        });
        // / transkript toggle
        
        
	
});