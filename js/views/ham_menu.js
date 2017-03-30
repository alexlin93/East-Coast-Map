$(function() {

  initDropDowns($("div.mobile-menu"));

});

function initDropDowns(allMenus) {

  allMenus.children(".menu-hamburger").on("click", function() {

    var thisTrigger = jQuery(this),
      thisMenu = thisTrigger.parent(),
      thisPanel = thisTrigger.next();

    if (thisMenu.hasClass("is-open")) {

          thisMenu.removeClass("is-open");

          jQuery(document).off("click");
          thisPanel.off("click");

    } else {

        allMenus.removeClass("is-open");
      thisMenu.addClass("is-open");

      jQuery(document).on("click", function() {
        allMenus.removeClass("is-open");
      });
      thisPanel.on("click", function(e) {
        e.stopPropagation();
      });
    }

    return false;
  });
}
