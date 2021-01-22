'use strict';

// handle Youtube cookies. 
// When using Youtube without permission to log in, playing videoes can sometimes cause problems.

var requestMade = false;

chrome.webRequest.onBeforeRequest.addListener(
  function (youtube) {
    if (!requestMade) {
      const url = new URL(youtube.url);

      chrome.cookies.getAll({ url: url.origin }, function (cookies) {
        if (cookies.length === 0) {
//            console.log(cookies + "deleted");
          return;
        } else {
          cookies.forEach((c) =>
            chrome.cookies.remove({
              name: c.name,
              url: url.origin,
              storeId: c.storeId,
            })
          );
        }
      });

      requestMade = true;
      setTimeout(() => {
        requestMade = !requestMade;
      }, 20000);
    }
  },
  { urls: ["*://www.youtube.com/*"] }
);