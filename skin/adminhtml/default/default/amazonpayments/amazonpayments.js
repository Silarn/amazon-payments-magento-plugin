// Amazon Payments Adminhtml

// var amazonSimplepathUrl is defined in Amazon_Payments_Model_System_Config_Backend_Enabled->getCommentText()

document.observe("dom:loaded", function() {
  if ($("payment_amazon_payments")) {
    var amazonSimplepath = $("amazon_simplepath");
    var amazonInstructions = $("amazon_instructions");
    //var amazonFields = $("payment_amazon_payments").select("table")[0];
    var amazonFields = $$("#payment_amazon_payments tr");
    var amazonImport = $("row_payment_ap_credentials_simplepath_json");
    var amazonImportButton = $("row_payment_ap_credentials_simplepath_import_button");


    amazonInstructions.hide();
    amazonFields.each(Element.hide);
    amazonImport.hide();


    var form = new Element('form', { method: 'post', action: amazonSimplepathUrl, id: 'simplepath_form', target: 'simplepath'});
    amazonSimplepath.wrap(form);

    // Get Started
    $("simplepath_form").observe("submit", function(e) {
        // window.open('', 'simplepath', "height=500, width=500");
        e.stop();
        //window.open(amazonSimplepathUrl, 'simplepath', "height=500, width=500");
        window.launchPopup(amazonSimplepathUrl, 768, 820);

        // Show Credentials group and Import option
        amazonFields[1].show();
        amazonImport.show();
        amazonImportButton.hide();

    });


    // User has account info
    amazonSimplepath.select("a")[0].observe("click", function(e) {
        e.stop();
        amazonFields.each(Element.show);
        amazonImport.hide();
        amazonInstructions.show();
        amazonSimplepath.hide();
    });


    amazonImportButton.select("button")[0].observe("click", function(e) {
        amazonImportButton.hide();
        amazonImport.show();
    });

    if (!amazonIsSecure) {
        $("amazon_https_required").show();
    }
    if (!amazonHasOpenssl) {
        $("amazon_openssl_required").show();
    }

  }


});



(function () {
    'use strict';

    function launchPopup(url, requestedWidth, requestedHeight) {
        var leftOffset = getLeftOffset(requestedWidth),
            topOffset = getTopOffset(requestedHeight),
            newWindow = window.open(url, 'simplepath', 'scrollbars=yes, width=' + requestedWidth + ', height=' + requestedHeight + ', top=' + topOffset + ', left=' + leftOffset);

        if (window.focus) {
            newWindow.focus();
        }
    }

    function getLeftOffset(requestedWidth) {
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;

        return ((windowWidth() / 2) - (requestedWidth / 2)) + dualScreenLeft;
    }

    function getTopOffset(requestedHeight) {
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

        return ((windowHeight() / 2) - (requestedHeight / 2)) + dualScreenTop;
    }

    function windowWidth() {
        if (window.innerWidth) {
            return window.innerWidth;
        } else if (document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        } else {
            return screen.width;
        }
    }

    function windowHeight() {
        if (window.innerHeight) {
            return window.innerHeight;
        } else if (document.documentElement.clientHeight) {
            return document.documentElement.clientHeight;
        } else {
            return screen.height;
        }
    }

    window.launchPopup = launchPopup;
})();

