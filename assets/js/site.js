/* 轻交互：代码复制、当前页导航高亮。
   页面不依赖本文件也能正常阅读。 */
(function () {
  "use strict";

  function addCopyButtons() {
    var blocks = document.querySelectorAll("pre");
    if (!blocks.length || !navigator.clipboard) return;

    blocks.forEach(function (pre) {
      var btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.textContent = "copy";
      btn.setAttribute("aria-label", "复制代码");

      btn.addEventListener("click", function () {
        var text = pre.querySelector("code")
          ? pre.querySelector("code").innerText
          : pre.innerText;
        navigator.clipboard.writeText(text).then(
          function () {
            btn.textContent = "copied";
            setTimeout(function () {
              btn.textContent = "copy";
            }, 1500);
          },
          function () {
            btn.textContent = "failed";
          }
        );
      });

      pre.appendChild(btn);
    });
  }

  function markCurrentNav() {
    var path = window.location.pathname.replace(/\/index\.html$/, "/");
    var links = document.querySelectorAll(".site-nav a[href]");
    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      var resolved = new URL(href, window.location.href).pathname.replace(
        /\/index\.html$/,
        "/"
      );
      if (resolved === path) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      addCopyButtons();
      markCurrentNav();
    });
  } else {
    addCopyButtons();
    markCurrentNav();
  }
})();
