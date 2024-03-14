const companion_pre_bool = localStorage.getItem("companion_switch_local");
let companion_switch_display = 'none';
switch (companion_pre_bool){
    case "0":
    case "1":
        companion_switch_display = "block"
}

const companion = document.getElementById('companion')
if (companion) {
  companion.style.display = companion_switch_display
}