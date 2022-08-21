if (typeof NSW_nprTrackParam == "undefined") {
	var NSW_nprTrackParam	= new Object();
}
var NSW_timeStampParam	= NSW_get_timestamp_param();
var NSW_bTestMode		= false;
var NSW_sPrStorageNm	= "pr_param";


function NSW_pre_reservation(aJsonParam) {
	// json값 가져옴
	NSW_nprTrackParam	= aJsonParam;

	try {
		var NSW_nprTrackScript		= document.createElement("script");
	    NSW_nprTrackScript.type		= "text/javascript";
	    NSW_nprTrackScript.charset	= "UTF-8";
		NSW_nprTrackScript.id		= "NSW_npr_track_dispatch";
	   	NSW_nprTrackScript.src		= "https://scr.nsmartad.com/nswitch/npr_track/npr_track_dispatch.js" + NSW_timeStampParam;
	   	
		document.getElementsByTagName('head')[0].appendChild(NSW_nprTrackScript);
		
	} catch(e) {}
};


function NSW_get_timestamp_param() {
	var sNowTimeStamp	= new Date().getTime();
	var sTimeStamp		= parseInt(sNowTimeStamp - (sNowTimeStamp % 10000000), 10);
	var sTimeStampParam	= "?time=" + sTimeStamp;
	
	
	return sTimeStampParam;
};


/**
 * 랜딩 후 초기화
 */
function NSW_init_pr_param() {
	var sSetPrParamYn	 = NSW_chk_pr_param(NSW_sPrStorageNm);

	if (sSetPrParamYn == "y") {
		localStorage.removeItem(NSW_sPrStorageNm);
		NSW_set_pr_param_storage(NSW_sPrStorageNm);
	}
}


function NSW_chk_pr_param(sPrStorageNm) {
	var sSetPrParamYn	= "y";
	var sChkKey			= "nsw_enc_sub";
	var aPrParam		= localStorage.getItem(sPrStorageNm) ? JSON.parse(localStorage.getItem(sPrStorageNm)) : "";
	var aUrlParam		= {};
    
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(sStr, sKey, sVal) {
    	aUrlParam[sKey] = decodeURIComponent(sVal);
    	//aUrlParam[sKey] = unescape(sVal);
    });

	// URL 파라미터에 체크 키값이 없고, 스토리지에 저장된 값은 있다면 초기화 안함
	if (aUrlParam.hasOwnProperty(sChkKey) === false && aPrParam.hasOwnProperty(sChkKey) === true) {
		sSetPrParamYn	= "n";
	}

	
	return sSetPrParamYn;
}


function NSW_set_pr_param_storage(sPrStorageNm) {
    var aPrParam	= {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(sStr, sKey, sVal) {
    	aPrParam[sKey] = decodeURIComponent(sVal);
    	//aPrParam[sKey] = unescape(sVal);
    });
    
    localStorage.setItem(sPrStorageNm, JSON.stringify(aPrParam));
}
