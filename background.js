'use strict';

// handle login with portal Tabulex and Tabulex Tea login. Force the use of UNI-login. Fjern eller kommenter alle linjerne ud til "handle Youtube cookies", hvis denne ikke ønskes. 

chrome.webRequest.onBeforeSendHeaders.addListener(    
    function(details) {
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if(details.requestHeaders[i].name === 'Cookie') {
                
              details.requestHeaders[i].value = details.requestHeaders[i].value.replace ('idpdisco_istidpdisco_lastidp=https%3A%2F%2Fadfs.aarhuskommune.dk%2Fadfs%2Fservices%2Ftrust','idpdisco_istidpdisco_lastidp=https%3A%2F%2Fatlas.uni-login.dk%2Fsimplesaml%2Fsaml2%2Fidp%2Fmetadata.php')
                                
                
//             details.requestHeaders[i].value = '';
              break;
             }
          }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["https://saml.personale.tabulex.dk/simplesaml/*",
        "https://fravaer.tabulex.net/"]},
    
        ["blocking", "requestHeaders", "extraHeaders"]);

// handle Youtube cookies. 
// When using Youtube without permission to log in, playing videoes can sometimes cause problems.

var requestMade = false;

chrome.webRequest.onBeforeRequest.addListener(
  function (request) {
      
      const url = new URL(request.url);

      chrome.cookies.getAll({ url: url.origin }, function (cookies) {
          

          
        if (cookies.length === 0) {
   //         console.log(cookies + "deleted");
          return;
        } else {
          cookies.forEach((c) =>
                          
                          {              
     //                     console.log("cookies " + c.name + "-value-" + c.value + "-path-" + c.path + "-domain-" + c.domain);
              
            chrome.cookies.remove({
              name: c.name,
              url: url.origin,
              storeId: c.storeId,
            })
          }
          );
        }
      });

  },
  { urls: ["https://consent.youtube.com/*"] }
);
