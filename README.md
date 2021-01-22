# LetLogin
En extension som letter brugerens flow igennem STILs UNI-login broker, bøvl med Youtube cookie, og andre må fix. Se listen nederst.

For at gøre det nemmere for brugerne af UNI-login og kommunal IdP, har Aarhus Kommune, Børn og Unge valgt at lave en tilføjelse til Chrome. Denne tilføjelse tager automatisk valgene "Log ind med f.eks. NemID" og valg af IdP, fx. Aarhus for brugeren.

For at gøre tilføjelsen klar til brug skal koden hentes her fra GitHub og pakkes ud. Pak zip-filen ud. Herefter skal id'et fra STILs IdP vælger ændres i forward.js på linje 55. Se /docs/idp-liste.txt - eller find den i kildekoden på broker.unilogin.dk. (søg efter " selectedIdp.setAttribute("value", "aarhuscloud"); ")

Herefter kan du lave de fornødne rettelser, fx IdP.

Herefter kan den installeres på egen chromebook via chrome://extensions/ -> "indlæs upakket". Vælg mappen hvor koden er placeret(gå ikke ind i mappen).

Når alt er testet ok, skal den udgives på jeres GSfE domaine. Dette gøres på https://chrome.google.com/webstore/devconsole/ . Der skal betales 5$ i oprettelsesgebyr. Husk at udgive udvidelsen som "Private" og synlig for eget domaine.

Private tilføjelser skal ikke igennem sikkerhedstjek osv, så det er ikke vigtigt at få udfyldt alle felter.

Held og lykke med at sætte det i sving :-)

Søren Torp tkso@aarhus.dk

****************************
Hvilke problemer kan LetLogin afhjælpe?
* Direkte flow igennem STILs broker
* Fix Youtube cookie problem. Hvis Youtube ikke er aktiveret som domaine-tjeneste, er det ikke muligt at logge ind. Dette kan give bøvl med Youtubes implementering af cookies.
* Vis "Direkte download af billede i Google Drev" til brug i fx. læringsplatform. Se billede i mappen Dokumentation.


