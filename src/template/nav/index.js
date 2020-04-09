import { getCurrentLanguage } from "../../utils/i18n/index";
$(() => {
  const flow = (flag = true) => (flag ? "auto" : "hidden");
  const collapse = () => {
    let bsNavbarCollapseL = 0;
    const bsNavbarCollapse = $("#bsNavbarCollapse");
    let bsNavbarCollapseH = bsNavbarCollapse.css("width");
    $("#overlay").fadeToggle();
    let bodyFlow = false;
    if (parseInt(bsNavbarCollapse.css("right")) == 0) {
      bsNavbarCollapseH = 0;
      bsNavbarCollapseL = "-100%";
      bodyFlow = true;
    }
    $("body").css({
      overflow: flow(bodyFlow)
    });
    bsNavbarCollapse.css({
      overflow: flow(!bodyFlow)
    });
    bsNavbarCollapse.animate({ right: bsNavbarCollapseL }, 500);
    $(".offset_panel").each((index, el) => {
      $(el).animate({ right: `${bsNavbarCollapseH}` }, 500);
    });
    $("#header").animate({ right: `${bsNavbarCollapseH}` }, 500);
  };

  $("#foldBtn").click(e => {
    collapse();
    e.preventDefault();
  });
  $("#overlay").click(e => {
    collapse();
    e.preventDefault();
  });

  const language = getCurrentLanguage();

  const btns = $("button[data-language]");
  btns.each(function(index, item) {
    const _this = $(this);
    const lan = _this.attr("data-language");
    if (lan == language) {
      replaceBtnStatus(_this);
    }
  });
  $(".nav_language").click(function() {
    replaceBtnStatus($(this));
  });

  function replaceBtnStatus(_this) {
    const parent = _this.parent().siblings();
    const btn = parent.find(".btn");

    _this.removeClass("btn-default");
    _this.removeClass("btn-primary");
    _this.addClass("btn-default");
    _this.parent().removeClass("active");

    btn.removeClass("btn-default");
    btn.removeClass("btn-primary");
    btn.addClass("btn-primary");
    parent.addClass("active");
  }
});
