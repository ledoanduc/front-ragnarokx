/**
 * TNK Web CPA API
 * 
 * tnk-webapi-cpatrack.1.4.js
 * 
 * Copyright 2020 tnkfactory. All rights reserved. 
 * 
 */
  var TnkSession = {
      ver: 1.4,
      debug: 0,
      ptype : 2,
      SLD_SET : ["co","ne","nm","or","re","pe","go","mil","ac","hs","ms","es","sc","kg", "com"],
      TNK_COOKIE_NAME: "__twcc__",
      TNK_COOKIE_NAME2: "__twcc2__",
      TNK_ADKEY_NAME: "adkey",
      TNK_CHKEY_NAME: "chkey",
      TNK_TOKEN_NAME: "token",
      TNK_COOKIE_AVAILABLE_DAYS: 7,
      getadkey : function() {
          var q = window.location.search.substring(1);
          if ( window.location.href.indexOf("#") > 0 ) {
            q += "&";
            q += window.location.hash.substring(1);
          }
          var p = q.split('&');
          for (var i = 0; i < p.length; i++) {
              var k = p[i].split('=');
              if (k[0] == this.TNK_ADKEY_NAME) {
                  return k[1];
              }
          }
          if (this.debug) {  console.log('no adkey'); }
          return '';
      },
      getchkey : function() {
          var q = window.location.search.substring(1);
          if ( window.location.href.indexOf("#") > 0 ) {
            q += "&";
            q += window.location.hash.substring(1);
          }
          var p = q.split('&');
          for (var i = 0; i < p.length; i++) {
              var k = p[i].split('=');
              if (k[0] == this.TNK_CHKEY_NAME) {
                  return k[1];
              }
          }
          if (this.debug) {  console.log('no adkey'); }
          return '';
      },
      setcookie : function(cname, cvalue) {
          var d = new Date();
          d.setTime(d.getTime() + (this.TNK_COOKIE_AVAILABLE_DAYS * 24 * 60 * 60 * 1000));
          var expires = "expires=" + d.toUTCString();
          var domain = this.getdomain();
          document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/' + ';domain=' + domain;
      },
      init : function() {
          var a = this.getadkey();
          var b = this.getchkey();
          
          if (this.debug) {  
            console.log('adkey is ' + a + ', chkey is ' + b) ;  
          }
          if (a != '' && b != '') {

              this.setcookie(this.TNK_COOKIE_NAME, a);
              this.setcookie(this.TNK_COOKIE_NAME2, b);

              if (this.debug) {  console.log('put the adkey'); }
              
          } else {
            
              if (this.debug) {  console.log('no adkey'); }
          }
      },
      getcookie : function(cname) {
          var name = cname + "=";
          if (this.debug) {  console.log(document.cookie)};
          var decodedCookie = '';
          try {
              decodedCookie = decodeURIComponent(document.cookie);
          } catch (e) {
              if (this.debug) { console.log(e) };
              decodedCookie = document.cookie;
          }
          if (this.debug) {  console.log(decodedCookie) }
          var ca = decodedCookie.split(';');
          for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return '';
      },
      track : function(a, e, c) {
          var s = document.createElement("script");
          var u = 'https://ads.tnkad.net/tnk/psb.postback.main?lb=scriptv2';
          //var u = '//api3.tnkfactory.com/tnk/api/postback/scriptv2/';
          var p = '&event=';
          //var p = '/?event=';
          var d = '&callback=fn' + new Date().getTime();
          var f = '&chkey=' + c
          s.src = u + a + p + e + f + d;

          if (this.debug) { console.log(s.src); }
          try {
              document.body.appendChild(s); 

          } catch (e) {
              if (this.debug) {   console.log('error:' + e);  }
              
              document.getElementsByTagName("head")[0].appendChild(s);
              if (this.debug) { console.log('invoked head'); }
          }
          
          if (this.debug)  {  console.log('invoked'); }
      },
      track2 : function(a, e, c) {
      
          var url = "https://ads.tnkad.net/tnk/psb.postback.main?lb=scriptv2&cbid="+a+"&chkey="+c+"&event="+e;
          //var url = '//api3.tnkfactory.com/tnk/api/postback/scriptv2/' + a + "/?event=" + e + "&chkey=" + c;

          if (this.debug) { console.log("track2:" + url); }

          var xhttp = new XMLHttpRequest();
          if (this.debug) {
              xhttp.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.debug) { console.log("invoke response," + this.status); }
              }
            };
          }
          xhttp.open("GET", url, true);
          xhttp.send();
          if (this.debug) {
            console.log('invoked track2');
          }
      },
      actionCompleted : function(e) {

        if(e == '' || e == undefined) { 
          e = 'action_complete';
        }
        var a = this.getcookie(this.TNK_COOKIE_NAME);
        var b = this.getcookie(this.TNK_COOKIE_NAME2);
        if (a != '' && b != '') {
            if(this.ptype==1){
                this.track(a, e, b);
            } else {
              this.track2(a, e, b);
            }
          } else {
              if (this.debug) { console.log('no adkey or chkey:' + a + "," + b); }
          }
      },
      getdomain : function() {
          var h = location.hostname;
          var d =this.findsubdomain(h);
          if (this.debug) { console.log(d); }
          return d;
      },
      findsubdomain : function(domain) {
    	  
    	  if (this.isipaddr(domain)) {
    		  return domain;
    	  }
    	  
    	  var domainArr = domain.split(".");
    	  var arrLength = domainArr.length;
    	  
    	  if (arrLength < 3) {
    		  return domain;
    	  }
    	  
    	  var domainSubstr1 = domainArr[arrLength - 1];
    	  var domainSubstr2 = domainArr[arrLength - 2];
    	  var domainSubstr3 = domainArr[arrLength - 3];
    	  
    	  var returnDomainArr = new Array();
    	  returnDomainArr.push(domainSubstr1);
    	  returnDomainArr.push(domainSubstr2);
    	  
    	  if (this.SLD_SET.includes(domainSubstr2)) {
    		  returnDomainArr.push(domainSubstr3);
    	  }
    	  
    	  returnDomainArr.reverse();
    	  
    	  return returnDomainArr.join(".");
	}
    ,isipaddr : function (ipaddress) {  
    	
    	try {
			if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
			    return true;  
			}  
    	} catch (error) {
    		return false;
    	}
		return false;  
	 }
	
  };

  TnkSession.init();
