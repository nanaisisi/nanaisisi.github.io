function tp_top() {
  const tp_top_btn = document.getElementById("tp_top_btn");
  /** @type {HTMLFrameElement} */
  const top_iframe = document.getElementById("top_iframe");
  if (top_iframe) {
    const top_iframe_window = top_iframe.contentWindow;
    if (tp_top_btn) {
      tp_top_btn.addEventListener("click", () => {
        if (top_iframe_window)
          top_iframe_window.scroll({
            top: 0,
            behavior: "smooth",
          });
      });
    }
  }

  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const darkModeOn = darkModeMediaQuery.matches;
  const color_scheme_btn = document.getElementById("scheme_toggle");
  if (color_scheme_btn) {
    color_scheme_btn.addEventListener("click", () => {
      if (darkModeOff) {
        document.documentElement.classList.add("darkmode");
      } else {
        document.documentElement.classList.remove("darkmode");
      }
    });
  }
}
