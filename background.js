'use strict';

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
