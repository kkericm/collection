
const db = {
    themes: [
        "light",
        "dark"
    ]
}

var configSheets = {
    theme: db.themes[parseInt(getCookie("theme") ?? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 1 : 0))]
}

function update(config = configSheets) {
    document.body.className = config.theme
}

function getCookie(key) {
    let cookies = document.cookie;
    if (cookies.includes(';')) {
        for (let i of cookies.split(";")) {
            if (i.startsWith(key)) {
                return i.split('=')[1]
            }
        }
    } else {
        return cookies.startsWith(key) ? cookies.split("=")[1] : undefined
    }
}

function addCookie(key, value, espire=1, path="/") {
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + (espire * 60 * 60 * 1000));
    document.cookie = `${key}=${value}; expires=${expDate.toUTCString()}; path=${path};`
}

function changeMenu() {
    let menu = document.querySelector(".menu");
    if (menu.classList.contains("hidden")) {
        document.querySelector(".menuButton > img").src = "assets/img/close.png";
        menu.classList.remove("hidden");

        menu.classList.remove("qtoleft");
        menu.classList.add("stoleft");
    } else {
        document.querySelector(".menuButton > img").src = "assets/img/menu.png";
        menu.classList.remove("stoleft");
        menu.classList.add("qtoleft");
        setTimeout(() => {
            menu.classList.add("hidden");
        }, 200)
    }
}

function closeDialog() {
    let dialog = document.querySelector(".dialog-container > :not(.hidden)");
    let container = document.querySelector(".dialog-container");
    
    container.classList.remove("show");
    container.classList.add("quit");
    setTimeout(() => {
        dialog.classList.add("hidden");
        container.classList.add("hidden");
    }, 500);
}

function openDialogMenu(dialogName) {
    document.querySelector(".menuButton > img").src = "assets/img/menu.png";

    // document.querySelector(".menu").classList.add("hidden");
    changeMenu()
    document.querySelector(`#${dialogName}`).classList.remove("hidden");
    
    let container = document.querySelector(".dialog-container");

    container.classList.remove("hidden");
    container.classList.remove("quit");
    container.classList.add("show");
}

function settingsShow() {
    // document.querySelectorAll(".theme-settings input[name=theme-radio]").item(parseInt(getCookie("theme"))).checked = true
    document.querySelectorAll(".theme-settings input[name=theme-radio]").item(db.themes.indexOf(configSheets.theme)).checked = true

    openDialogMenu('settings')
}

function saveSettings() {
    let guest = {
        theme: 0
    }
    document.querySelectorAll(".theme-settings input[name=theme-radio]").forEach((d, e) => {
        if (d.checked) {
            addCookie("theme", e);
            guest.theme = db.themes[e];
        }
    })
    update(guest)
    closeDialog()
}

update()