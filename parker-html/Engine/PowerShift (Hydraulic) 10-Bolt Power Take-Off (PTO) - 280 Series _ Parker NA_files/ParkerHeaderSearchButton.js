	var IsMSIE6= false;
	var IsMSIE7= false;
	var IsNetscape= false;
	var IsMSIE8= false;
	var version = navigator.appVersion;
	try {
	if (version != "")
	{
		var iParen = version.indexOf("(", 0);
		var sUsrAgent = new String(navigator.userAgent);
		sUsrAgent = sUsrAgent.toLowerCase();
		navigator.clientVersion = version.substring(0, iParen - 1);
		if (sUsrAgent.indexOf("msie 6.0", 0) > 0) {
		IsMSIE6 = true;
		}else if (sUsrAgent.indexOf("msie 7.0", 0) > 0) {
		IsMSIE7 = true;
		}else if (sUsrAgent.indexOf("msie 8.0", 0) > 0) {
		IsMSIE8 = true;
		}else if (sUsrAgent.indexOf("mozilla", 0) >= 0) {
		IsNetscape = true;
		}
	}
	if(!IsMSIE8 && IsMSIE7 && !IsNetscape){
		if(document.documentMode=='8'){
			var searcha = document.getElementById("searchbutton");
			//var searchb = document.getElementById("searchbutton2");
			//document.getElementById("navSupport").style.right="2px";
			//document.getElementById("linktopid").style.top="85px";
			searcha.style.minWidth = "54px";
			//searchb.style.minWidth = "54px";
		}
	}
	} catch(e) {console.log(e);}