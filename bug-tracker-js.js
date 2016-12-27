(function(userInfo) {
  //add jquery
  if (!window.jQuery) {
    var script = document.createElement('script');
    script.src = '//code.jquery.com/jquery-1.11.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log('inserting jquery');
  } 
  //insert required string
  $('<link rel="stylesheet" href="https://rawgit.com/jrdesignhero/reportmybug/master/css/style.cssstyle.css">').appendTo('head');
  $('<div id="bug-app"> <div id="ty-container-bug-app"> <div id="thankyou-bug-sent"></div> <h2 id="ty-bug-sent-message">Your Bug Was Successfully Submitted<br /> Bug Report Number: 44548AAG</h2> </div> <ul id="bug-app_status-bar"> <li class="bug-app_status-tab"> <div class="bug-app_label-title">BUG REPORT STATUS</div> <div class="bug-app_status-data" id="reportTimeStamp">loading...</div> </li> <li class="bug-app_send-report"> <button id="sendData">Submit This Report</button> </li> <li class="bug-app_close-report"> <a href="#" id="bug-app_close-btn">X</a> </li> </ul> <div class="bug-app_container"> <ul id="bug-app_colum_1" class="bug-app_data-lists"> <li class="bug-app_list-title"><h2>Browser</h2></li> <li> <h3 class="bug-app_data-list-label">Web Browser</h3> <h4 class="bug-app_data-list-value" id="browserInfo">Loading...</h4> </li> <li> <h3 class="bug-app_data-list-label">Viewport Size</h3> <h4 class="bug-app_data-list-value" id="viewportInfo">Loading...</h4> </li> <li> <h3 class="bug-app_data-list-label">Cookies</h3> <h4 class="bug-app_data-list-value" id="cookieInfo">Loading...</h4> </li> <li> <h3 class="bug-app_data-list-label">Operating System</h3> <h4 class="bug-app_data-list-value" id="osInfo">Loading...</h4> </li> </ul> <ul class="bug-app_data-lists" id="bug-app_colum_2"> <li class="bug-app_list-title"><h2>Device</h2></li> <li> <h3 class="bug-app_data-list-label">Protocol</h3> <h4 class="bug-app_data-list-value" id="protocolInfo">Loading...</h4> </li> <li> <h3 class="bug-app_data-list-label">Host</h3> <h4 class="bug-app_data-list-value" id="hostInfo">Loading...</h4> </li> <li> <h3 class="bug-app_data-list-label">Path</h3> <h4 class="bug-app_data-list-value" id="pathInfo">Loading...</h4> </li> <li> <h3 class="bug-app_data-list-label">Internet Access</h3> <h4 class="bug-app_data-list-value" id="internetInfo">Loading...</h4> </li> </ul> <ul class="bug-app_data-lists" id="reportDetailsContainer"> <li class="bug-app_list-title"><h2>Report Details</h2></li> <li> <h3 class="bug-app_data-list-label">Reported By</h3> <h4 class="bug-app_data-list-value" id="userInfo">Anonymous User</h4> </li> <li> <h3 class="bug-app_data-list-label">Bug Comments</h3> <textarea id="bug-app_data-comments"></textarea> </li> </ul> </div></div>').appendTo('body');
  

  var User = userInfo;
  var bugData = {};
  //config 
    var appContainer = {
      element: document.getElementById('bug-app'),
      state: 0,
      showApp: function () {
        if (this.state) {
          return false;
        }
        this.getData();
        this.element.style.right = '0px';
        this.state = 1;
        return true;
      },
      hideApp: function () {
        if (this.state) {
          this.element.style.right='-800px';
          this.state=0;
          return true;
        }
        return false;
      },
      fillElement: function (elementId, value) {
        document.getElementById(elementId).innerHTML = value;
        bugData[elementId] = value;
      },
      getData: function () {
        var W = window;
        var Nav = window.navigator;
        var nAgt = Nav.userAgent;

        //find os
        var OSName="Unknown OS";
        if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
        if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
        if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
        if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

        //find browser and version
        var browserName;
        var fullVersion;
        var verOffset;

        // In Opera, the true version is after "Opera" or after "Version"
        if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
         browserName = "Opera";
         fullVersion = nAgt.substring(verOffset+6);
         if ((verOffset=nAgt.indexOf("Version"))!=-1) 
           fullVersion = nAgt.substring(verOffset+8);
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
         browserName = "Microsoft Internet Explorer";
         fullVersion = nAgt.substring(verOffset+5);
        }
        // In Chrome, the true version is after "Chrome" 
        else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
         browserName = "Chrome";
         fullVersion = nAgt.substring(verOffset+7);
        }
        // In Safari, the true version is after "Safari" or after "Version" 
        else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
         browserName = "Safari";
         fullVersion = nAgt.substring(verOffset+7);
         if ((verOffset=nAgt.indexOf("Version"))!=-1) 
           fullVersion = nAgt.substring(verOffset+8);
        }
        // In Firefox, the true version is after "Firefox" 
        else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
         browserName = "Firefox";
         fullVersion = nAgt.substring(verOffset+8);
        }
        // In most other browsers, "name/version" is at the end of userAgent 
        else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
                  (verOffset=nAgt.lastIndexOf('/')) ) 
        {
         browserName = nAgt.substring(nameOffset,verOffset);
         fullVersion = nAgt.substring(verOffset+1);
         if (browserName.toLowerCase()==browserName.toUpperCase()) {
          browserName = navigator.appName;
         }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix=fullVersion.indexOf(";"))!=-1)
           fullVersion=fullVersion.substring(0,ix);
        if ((ix=fullVersion.indexOf(" "))!=-1)
           fullVersion=fullVersion.substring(0,ix);

        majorVersion = parseInt(''+fullVersion,10);
        if (isNaN(majorVersion)) {
         fullVersion  = ''+parseFloat(navigator.appVersion); 
         majorVersion = parseInt(navigator.appVersion,10);
        }

        this.fillElement('browserInfo', browserName+'/'+fullVersion);
        this.fillElement('viewportInfo', W.innerWidth +' x '+W.innerHeight);
        this.fillElement('cookieInfo', Nav.cookieEnabled ? 'Enabled' : 'Disabled');
        this.fillElement('reportTimeStamp', new Date().toLocaleString());
        this.fillElement('osInfo', OSName);
        this.fillElement('protocolInfo', W.location.protocol);
        this.fillElement('hostInfo', W.location.host);
        this.fillElement('pathInfo', W.location.pathname);
        this.fillElement('internetInfo', Nav.onLine);
      },
      postData: function () {
        //append the rest of the bug data
        bComments = document.getElementById('bug-app_data-comments')
        bugData.bugComments = bComments.value;
        bugData.token = User.token;

        $.ajax({
          type: "POST",
          url: 'test-post.php',
          data: bugData,
          success: function (d) {
            document.getElementById('ty-container-bug-app').style.display="block";
            setTimeout(function() {
              document.getElementById('ty-container-bug-app').style.display="none";
              bComments.value = '';
              appContainer.hideApp();
            }, 2000);
            console.log('Developer sees this message: ', d);
          },
          dataType: 'json'
        });
      }
    }

  //events
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey === true && e.keyCode === 68) {
      appContainer.showApp();
    }
  });
  document.getElementById('sendData').addEventListener('click',function () { appContainer.postData() });
  document.getElementById('bug-app_close-btn').addEventListener('click', function () { appContainer.hideApp(); return false });
})(_RMB);