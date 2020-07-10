'use strict';

const forms = document.getElementsByTagName("form");
if (forms.length > 0) {

    hide();

    const form = forms[0];
    const selectedIdp = document.createElement("input");
    selectedIdp.setAttribute("type", "hidden");
    selectedIdp.setAttribute("name", "selectedIdp");
    selectedIdp.setAttribute("value", "aarhus");
    form.appendChild(selectedIdp);
    form.submit();
}

function hide() {
    const rootElement = document.documentElement;
    rootElement.hidden = true;
}




