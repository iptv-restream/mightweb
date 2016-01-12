
/*
 * See: http://stackoverflow.com/questions/1459321/how-to-show-full-screen-popup-with-javascript
 */

function detectVersion()
{
    version = parseInt(navigator.appVersion);
    return version;
}

function detectOS()
{
    if (navigator.userAgent.indexOf('Win') == -1) {
        OS = 'Macintosh';
    } else {
        OS = 'Windows';
    }
    return OS;
}

function detectBrowser()
{
    if (navigator.appName.indexOf('Netscape') == -1) {
        browser = 'IE';
    } else {
        browser = 'Netscape';
    }
    return browser;
}

function FullScreen(url){

    var adjWidth;
    var adjHeight;

    if ((detectOS() == 'Macintosh') && (detectBrowser() == 'Netscape')) {
        adjWidth = 20;
        adjHeight = 35;
    }
    if ((detectOS() == 'Macintosh') && (detectBrowser() == 'IE')) {
        adjWidth = 20;
        adjHeight = 35;
        winOptions = 'fullscreen=yes';
    }
    if ((detectOS() == 'Windows') && (detectBrowser() == 'Netscape')) {
        adjWidth = 30;
        adjHeight = 30;
    }
    if (detectVersion() < 4) {
        self.location.href = url;
    } else {
        var winWidth = screen.availWidth - adjWidth;
        var winHeight = screen.availHeight - adjHeight;
        var winSize = 'width=' + winWidth + ',height=' + winHeight;
        var thewindow = window.open(url, 'WindowName', winSize);
        thewindow.moveTo(0,0);
    }
}

function MakeItSo(url){
    if ((detectOS() == 'Windows') && (detectBrowser() == 'IE')) {
        window.open(url,'windowname','fullscreen=yes');
    } else {
        onload=FullScreen();
    }
}