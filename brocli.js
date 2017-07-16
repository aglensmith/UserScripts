// ==UserScript==
// @name         brocli
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @match        http*://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    var css =`.brocli {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 90000000;
    display: none;
}

`;
    
    var code =`
var down = [];
$(document).keydown(function(e) {
    down[e.keyCode] = true;
}).keyup(function(e) {
    if (down[17] && down[66]) {
        $('.brocli').toggle();
        $('input.brocli').focus();
    }
    down[e.keyCode] = false;
});

$(document).keypress(function(e) {
  if (e.which == 13) {
      var rawCommand = $('input.brocli')[0].value;
      var splitCommand = rawCommand.split(" ");

      console.log(splitCommand);
      console.log(rawCommand);

      $('input.brocli')[0].value = "";
      if (splitCommand[0] == 'order'){
          var orderNum = splitCommand[1];
          var orderUrl = 'store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D'+orderNum+'&ovw=1&ovn=0';
          window.location = window.location.href + orderUrl;
      }

}
});
`;
    
    //build brocli style and inject
    var brocliCSS = document.createElement("style");
    brocliCSS.innerHTML = css;
    document.head.appendChild(brocliCSS);
    
    //build brocli html and inject
    var broccliInput = document.createElement("input");
    broccliInput.setAttribute("class", "brocli");
    var broccliDiv = document.createElement("div");
    broccliDiv.setAttribute("class", "brocli");
    broccliDiv.appendChild(broccliInput);
    document.body.appendChild(broccliDiv);

    //build brocli js and inject
    var script = document.createElement("script");
    script.setAttribute("type","text/javascript");
    script.innerHTML = code;
    document.body.appendChild(script); 
})();