'use strict';

const hostname = location.host;
// console.log(hostname);  Can be used to find the hostname.


// If you dont want to use all the functions of LetLogin, comment out all three lines of code connected to the function you dont need. Fx. comment out line 9-11 if you dont want automatic direction to UNI-login broker in Tabulex
switch (hostname) {
    case 'saml.personale.tabulex.dk':
        handleTabulex();
        break;
    case 'broker.unilogin.dk':
        handleUnilogin();
        break;
    case 'drive.google.com':
        handleDrive();
        break;
    default:
        break;
}

function handleTabulex() {
    const buttons = document.getElementsByTagName('button'); // getElementsById if the button has an ID
//    console.log (location);
    for (const button of buttons) {
        inspectTabulexButton(button);
    }
}


function handleDrive() {
    window.setInterval(async () => {
        let frame = Array.from(document.getElementsByTagName('iframe')).find((x) =>
            x.src.includes('/sharing/') && x.tabIndex > -1
        );

        if (!frame) return;

        if (frame.contentDocument.getElementById('unique-identifier-for-direct-download')) return;

        let cpButton = Array.from(frame.contentDocument.querySelectorAll('button'))
            .filter((bt) => !bt.disabled)
            .find((bt) => bt.innerText.toLowerCase() === 'copy link' || bt.innerText.toLowerCase() === 'kopiér link')

        if (!cpButton) return;

        const useWorkaround = true;
        // This is workaround for Google not updating the file id in the frame, when trying to share 1 file after another.
        // Workaround requires "clipboardRead" to be set in permissions in manifest.json.
        if (useWorkaround) {
            cpButton.click(); // Click Copy Link button, to get file url into clipboard.
            setTimeout(() => { // Timeout needed to allow the link to get into clipboard, before reading.
                const el = document.createElement('input'); // Create an input element, that fileUrl can be pasted into
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                el.select();
                document.execCommand('paste'); // Paste fileUrl.

                const fileUrl = el.value.slice() // Read fileUrl from input element.

                document.body.removeChild(el); // Remove element.

                const downloadLink = extractDownloadLink(fileUrl);

                createDownloadAnchor(cpButton, downloadLink)
            })
        } else {
            const downloadLink = extractDownloadLink(frame.contentDocument.body.innerHTML);

            createDownloadAnchor(cpButton, downloadLink)
        }
    }, 1000);
}

// Extract download link from text, using regex.
function extractDownloadLink(text) {
    // https://drive.google.com/file/d/1YoBin34eJZsXF6s2u2KAIm_CuElM4GKB/view?usp=sharing
    let matched = text.match(
        'https://drive.google.com/file/d/(.*?)/'
    );

    if (matched) {
        let fid = matched[1];
        // https://drive.google.com/u/0/uc?id=1YoBin34eJZsXF6s2u2KAIm_CuElM4GKB&export=download
        return 'https://drive.google.com/u/0/uc?id=' + fid + '&export=download';
    } else {
        return undefined;
    }
}

// Creates the download anchor/button.
function createDownloadAnchor(cpButton, downloadLink) {
    let a = document.createElement('a')
    a.href = downloadLink;
    a.innerText = 'Direct download';
    a.style.fontSize = '0.8rem;'
    a.style.width = '90%'
    a.style.textAlign = 'center'
    a.id = 'unique-identifier-for-direct-download'
    a.hidden = downloadLink === undefined;
    cpButton.parentElement.insertAdjacentElement('afterend', a)
}

function inspectTabulexButton(button) {

    const onClickAttribute = button.getAttribute('onclick');

    if (onClickAttribute && onClickAttribute.includes('atlas.uni-login.dk')) {
        hide();
        button.click();
    }
}

function handleUnilogin() {

    const forms = document.getElementsByTagName('form');
    if (forms.length > 0) {

        hide();

        const form = forms[0];
        const selectedIdp = document.createElement('input');
        selectedIdp.setAttribute('type', 'hidden');
        selectedIdp.setAttribute('name', 'selectedIdp');
        selectedIdp.setAttribute('value', 'jammerbugt');
        form.appendChild(selectedIdp);
        form.submit();
    }
}

function hide() {
    const rootElement = document.documentElement;
    rootElement.hidden = true;
}



