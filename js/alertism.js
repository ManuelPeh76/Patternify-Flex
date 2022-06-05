/*jshint esversion: 10, -W030*/
const AlertismBackdrop = document.createElement("div"),
    AlertismAlertContainer = document.createElement("div"),
    AlertismCrossBtn = document.createElement("button"),
    AlertismIcon = document.createElement("div"),
    AlertismHeading = document.createElement("h2"),
    AlertismContent = document.createElement("p"),
    AlertismInput = document.createElement("input"),
    AlertismTextarea = document.createElement("textarea"),
    AlertismBtnContainer = document.createElement("div"),
    AlertismOkBtn = document.createElement("button"),
    AlertismCloseBtn = document.createElement("button"),
    AlertismGlassMorphism = document.createElement("div"),
    AlertismFooter = document.createElement("div"),
    AlertismTimerCountDown = document.createElement("div"),
    AlertismToastContainer = document.createElement("div"),
    AlertismToast = document.createElement("div"),
    AlertismToastGlassMorphism = document.createElement("div"),
    AlertismToastIcon = document.createElement("div"),
    AlertismToastId = [],
    AlertismToastText = document.createElement("h4"),
    AlertismToastTimerCountDown = document.createElement("div"),
    checkIcon = {
        tickIcon: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.867 477.867" style="enable-background:new 0 0 477.867 477.867;" xml:space="preserve"><path fill="#32be46" d="M238.933,0C106.974,0,0,106.974,0,238.933s106.974,238.933,238.933,238.933s238.933-106.974,238.933-238.933    C477.726,107.033,370.834,0.141,238.933,0z M238.933,443.733c-113.108,0-204.8-91.692-204.8-204.8s91.692-204.8,204.8-204.8    s204.8,91.692,204.8,204.8C443.611,351.991,351.991,443.611,238.933,443.733z"/><path fill="#32be46" d="M370.046,141.534c-6.614-6.388-17.099-6.388-23.712,0v0L187.733,300.134l-56.201-56.201    c-6.548-6.78-17.353-6.967-24.132-0.419c-6.78,6.548-6.967,17.353-0.419,24.132c0.137,0.142,0.277,0.282,0.419,0.419    l68.267,68.267c6.664,6.663,17.468,6.663,24.132,0l170.667-170.667C377.014,158.886,376.826,148.082,370.046,141.534z"/></svg>',
        crossIcon: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="0 0 512 512" width="512pt"><path fill="#f03d30" d="m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0"/><path fill="#f03d30" d="m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0"/><path fill="#f03d30" d="m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0"/></svg>',
        infoIcon: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"><path fill="#ccc" d="M165,0C74.019,0,0,74.02,0,165.001C0,255.982,74.019,330,165,330s165-74.018,165-164.999C330,74.02,255.981,0,165,0z    M165,300c-74.44,0-135-60.56-135-134.999C30,90.562,90.56,30,165,30s135,60.562,135,135.001C300,239.44,239.439,300,165,300z"/><path fill="#ccc" d="M164.998,70c-11.026,0-19.996,8.976-19.996,20.009c0,11.023,8.97,19.991,19.996,19.991   c11.026,0,19.996-8.968,19.996-19.991C184.994,78.976,176.024,70,164.998,70z"/><path fill="#ccc" d="M165,140c-8.284,0-15,6.716-15,15v90c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-90C180,146.716,173.284,140,165,140z"/></svg>',
        warningIcon: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="#ffa500" d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256    C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216    c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z"/><path fill="#ffa500" d="M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877    C276,137.831,267.046,128.877,256,128.877z"/><circle fill="#ffa500" cx="256" cy="349.16" r="27"/></svg>',
        errorIcon: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path fill="#f03d30" d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256    C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216    c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z"/><path fill="#f03d30" d="M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877    C276,137.831,267.046,128.877,256,128.877z"/><circle fill="#f03d30" cx="256" cy="349.16" r="27"/></svg>',
        questionIcon: '<svg class="icon" xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="0 0 512 512" width="512pt"><path fill="#87adbd" d="m277.332031 384c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0"/><path fill="#87adbd" d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"/><path fill="#87adbd" d="m256 314.667969c-8.832031 0-16-7.167969-16-16v-21.546875c0-20.308594 12.886719-38.507813 32.042969-45.269532 25.492187-8.980468 42.625-36.140624 42.625-55.851562 0-32.363281-26.304688-58.667969-58.667969-58.667969s-58.667969 26.304688-58.667969 58.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16c0-49.984375 40.664063-90.667969 90.667969-90.667969s90.667969 40.683594 90.667969 90.667969c0 35.585938-28.097657 73.367188-63.980469 86.039062-6.398438 2.238282-10.6875 8.316407-10.6875 15.101563v21.527344c0 8.832031-7.167969 16-16 16zm0 0"/></svg>'
    };
AlertismCrossBtn.innerText = "X";
AlertismBackdrop.className = "alert-backdrop";
AlertismAlertContainer.classList.add("alert-container");
AlertismCrossBtn.className = "alert-close alert-hide";
AlertismIcon.classList.add("alert-hide");
AlertismHeading.classList.add("alert-heading");
AlertismContent.classList.add("alert-content");
AlertismInput.className = "alert-input alert-hide";
AlertismInput.type = "text";
AlertismInput.value = "";
AlertismInput.placeholder = "Enter Text";
AlertismTextarea.className = "alert-input";
AlertismTextarea.value = "";
AlertismTextarea.placeholder = "Enter Text";
AlertismIcon.innerHTML = checkIcon.tickIcon;
AlertismToastIcon.innerHTML = checkIcon.tickIcon;
AlertismBtnContainer.classList.add("alert-buttons-container");
AlertismCloseBtn.classList.add("alert-hide");
AlertismGlassMorphism.className = "alert-glassmorphism";
AlertismFooter.className = "alert-footer alert-hide";
AlertismTimerCountDown.className = "alert-time-line alert-hide";
AlertismToastContainer.className = "alert-toast-container";
AlertismToast.className = "alert-toast";
AlertismToastGlassMorphism.className = "alert-glassmorphism alert-hide";
AlertismToastIcon.classList.add("alert-hide");
AlertismToastTimerCountDown.className = "alert-time-line alert-hide";
let AlertismAnimateOut = "";
AlertismBackdrop.appendChild(AlertismAlertContainer);
AlertismAlertContainer.appendChild(AlertismCrossBtn);
AlertismAlertContainer.appendChild(AlertismIcon);
AlertismAlertContainer.appendChild(AlertismHeading);
AlertismAlertContainer.appendChild(AlertismContent);
AlertismAlertContainer.appendChild(AlertismInput);
AlertismAlertContainer.appendChild(AlertismBtnContainer);
AlertismBtnContainer.appendChild(AlertismOkBtn);
AlertismBtnContainer.appendChild(AlertismCloseBtn);
AlertismAlertContainer.appendChild(AlertismFooter);
AlertismAlertContainer.appendChild(AlertismGlassMorphism);
AlertismAlertContainer.appendChild(AlertismTimerCountDown);
AlertismToastContainer.appendChild(AlertismToast);
AlertismToast.appendChild(AlertismToastGlassMorphism);
AlertismToast.appendChild(AlertismToastIcon);
AlertismToast.appendChild(AlertismToastText);
AlertismToast.appendChild(AlertismToastTimerCountDown);

function Alertism(args) {
    if (typeof args !== "object") return;
    if (args.close) {
        args.id && AlertismToastId.indexOf(args.id) > -1 && (
            AlertismToast.style.animation = args.animation ? args.animation + "-out 1s" : "Zoom-in-out 1s",
            setTimeout(function() { AlertismToastContainer.remove(); }, 900),
            args.onClose && args.onClose(),
            AlertismToastId.splice(AlertismToastId.indexOf(args.id), 1)
        );
        return;
    }

    document.body.appendChild(AlertismBackdrop);

    AlertismCrossBtn.innerText = "X";
    AlertismBackdrop.className = "alert-backdrop";
    AlertismAlertContainer.className = "alert-container";
    AlertismCrossBtn.className = "alert-close alert-hide";
    AlertismIcon.classList.add("alert-hide");
    AlertismHeading.classList.add("alert-heading");
    AlertismContent.classList.add("alert-content");
    AlertismInput.className = "alert-input alert-hide";
    AlertismInput.type = "text";
    AlertismInput.value = "";
    AlertismInput.placeholder = "Enter Text";
    AlertismTextarea.className = "alert-input";
    AlertismTextarea.type = "text";
    AlertismTextarea.value = "";
    AlertismTextarea.placeholder = "Enter Text";
    AlertismIcon.innerHTML = checkIcon.tickIcon;
    AlertismBtnContainer.classList.add("alert-buttons-container");
    AlertismCloseBtn.classList.add("alert-hide");
    AlertismGlassMorphism.className = "alert-glassmorphism alert-hide";
    AlertismFooter.className = "alert-footer alert-hide";
    AlertismTimerCountDown.className = "alert-time-line alert-hide";
    AlertismAlertContainer.style.background = args.background || "#fff";
    document.body.style.overflow = "hidden";

    args.backdrop !== undefined ? AlertismBackdrop.style.background = args.backdrop : AlertismBackdrop.style.background = "rgb(0 0 0 / 50%)";
    args.position !== undefined ? AlertismBackdrop.classList.add("alert-" + args.position) : AlertismBackdrop.className = "alert-backdrop";
    args.enableCloseBtn !== undefined ? args.enableCloseBtn === true ? AlertismCrossBtn.classList.remove("alert-hide") : AlertismCrossBtn.classList.add("alert-hide") : AlertismCrossBtn.classList.add("alert-hide");
    args.enableIcon !== undefined ? args.enableIcon === true ? AlertismIcon.classList.remove("alert-hide") : AlertismIcon.classList.add("alert-hide") : AlertismIcon.classList.add("alert-hide");
    args.icon !== undefined && (
        args.icon.type !== undefined && (AlertismIcon.innerHTML = checkIcon[args.icon.type + "Icon"]),
        args.icon.color !== undefined ? (document.querySelectorAll(".alert-backdrop .alert-container svg path").forEach(path => {path.style.fill = args.icon.color;}), args.icon.type === "warning" || args.icon.type === "error" && (document.querySelector(".alert-backdrop .alert-container svg circle").style.fill = args.icon.color)) : function(){},
        args.icon.position === "right" ? (document.querySelector(".alert-backdrop .alert-container svg").style.left = "100%", document.querySelector(".alert-backdrop .alert-container svg").style.transform = "translateX(-100%)") :
        args.icon.position === "left" && (document.querySelector(".alert-backdrop .alert-container svg").style.left = "0", document.querySelector(".alert-backdrop .alert-container svg").style.transform = "translateX(0)")
    );
    args.alertHeading !== undefined ? AlertismHeading.innerText = args.alertHeading :
    args.alertHeadingHTML !== undefined ? AlertismHeading.innerHTML = args.alertHeadingHTML : AlertismHeading.innerText = "Alert";
    args.alertText !== undefined ? AlertismContent.innerText = args.alertText :
    args.alertHTML !== undefined ? AlertismContent.innerHTML = args.alertHTML : AlertismContent.innerText = "This is an Alert Box. This is made by Alertism.js V2.0.0, The Alertism.js V2.0.0 is version 2 of a JavaScript Library by Assassin.";
    args.enableInput !== undefined ?  args.enableInput === true ? AlertismInput.classList.remove("alert-hide") : AlertismInput.classList.add("alert-hide") : AlertismInput.classList.add("alert-hide");
    args.btnText !== undefined ? AlertismOkBtn.innerText = args.btnText : AlertismOkBtn.innerText = "Ok";
    args.closeBtnText !== undefined ? (AlertismCloseBtn.classList.remove("alert-hide"), AlertismCloseBtn.innerText = args.closeBtnText) : (AlertismCloseBtn.classList.add("alert-hide"), AlertismCloseBtn.innerText = "");
    args.alertFooter !== undefined ? (AlertismFooter.classList.remove("alert-hide"), AlertismFooter.innerHTML = args.alertFooter) : (AlertismFooter.classList.add("alert-hide"), AlertismFooter.innerHTML = "");
    args.animation !== undefined ? AlertismAlertContainer.style.animation = args.animation + " 0.5s linear 1" : args.animationIn !== undefined ? AlertismAlertContainer.style.animation = args.animationIn + " 0.5s linear 1" : AlertismAlertContainer.style.animation = "";
    args.theme !== undefined ? args.theme === "glass" ? AlertismGlassMorphism.classList.remove("alert-hide") : (AlertismGlassMorphism.classList.add("alert-hide"), AlertismAlertContainer.classList.add("alert-" + args.theme)) : AlertismAlertContainer.className = "alert-container";
    args.input !== undefined ? (
        args.input.type !== undefined ? AlertismInput.type = args.input.type : args.input.type === "textarea" && AlertismInput.parentNode.replaceChild(AlertismTextarea, AlertismInput),
        args.input.value !== undefined && (AlertismInput.value = args.input.value, AlertismTextarea.value = args.input.value),
        args.input.placeholder !== undefined && (AlertismInput.placeholder = args.input.placeholder, AlertismTextarea.placeholder = args.input.placeholder)
    ) : AlertismInput.type = "text", AlertismInput.value = "", AlertismInput.placeholder = "Enter Text";
    args.timer !== undefined ? (AlertismTimerCountDown.classList.remove("alert-hide"), AlertismTimerCountDown.style.animation = "closeTimeLine " + args.timer + "ms linear", AlertismBtnContainer.classList.add("alert-hide"), AlertismCrossBtn.classList.add("alert-hide"), AlertismTimerCountDown.onanimationend = () => {AlertismTimerCountDown.classList.add("alert-hide");},
        setTimeout(() => {closeAlertism(args.animation, args.animationOut, args.onAutoClose);}, args.timer)
    ) : AlertismTimerCountDown.classList.add("alert-hide"), AlertismBtnContainer.classList.remove("alert-hide");

    AlertismOkBtn.onclick = () => {closeAlertism(args.animation, args.animationOut, args.onConfirmed);};
    AlertismCloseBtn.onclick = () => {closeAlertism(args.animation, args.animationOut, args.onDenied);};
    AlertismCrossBtn.onclick = () => {closeAlertism(args.animation, args.animationOut, args.onCanceled);};
}

function closeAlertism(Canimation, Oanimation, Event) {
    Canimation ? AlertismAlertContainer.style.animation = Canimation + "-out 0.5s linear 1" :
    Oanimation ? AlertismAlertContainer.style.animation = Oanimation + " 0.5s linear 1" :
    AlertismAlertContainer.style.animation = "";
    setTimeout(() => {AlertismBackdrop.remove(); document.body.style.overflow = "auto"; Event && Event();}, 500);
}

function Toast(args) {
    AlertismToast.style.background = args.background || "#333";
    AlertismToast.style.color = args.color || "#fff";
    document.body.appendChild(AlertismToastContainer);

    args.HTML != undefined ? AlertismToastText.innerHTML = args.HTML :
    args.text != undefined && (AlertismToastText.innerText = args.text);
    args.position !== undefined ? AlertismToastContainer.classList.add("alert-" + args.position) : AlertismToastContainer.className = "alert-toast-container";
    args.enableIcon !== undefined ? args.enableIcon === true ? AlertismToastIcon.classList.remove("alert-hide") : AlertismToastIcon.classList.add("alert-hide") : AlertismToastIcon.classList.add("alert-hide");
    args.icon !== undefined && (
        args.icon.type !== undefined && (AlertismToastIcon.innerHTML = checkIcon[args.icon.type + "Icon"]),
        args.icon.color !== undefined ? (document.querySelectorAll(".alert-toast-container .alert-toast svg path").forEach(path => {path.style.fill = args.icon.color;}), args.icon.type === "warning" || args.icon.type === "error" && (document.querySelector(".alert-toast-container .alert-toast svg circle").style.fill = args.icon.color)) : function(){}
    );
    args.theme !== undefined ? (args.theme === "glass" ? AlertismToastGlassMorphism.classList.remove("alert-hide") : AlertismToastGlassMorphism.classList.add("alert-hide"), AlertismToast.classList.add("alert-" + args.theme)) : AlertismToast.className = "alert-toast";
    args.showTimeLine !== undefined ? (args.showTimeLine === true ? (AlertismToastTimerCountDown.classList.remove("alert-hide"), AlertismToastTimerCountDown.style.animation = "closeTimeLine " + (args.timer || 1500) + "ms linear", AlertismToastTimerCountDown.onanimationend = () => {AlertismToastTimerCountDown.classList.add("alert-hide");}) : AlertismToastTimerCountDown.classList.add("alert-hide")) : AlertismToastTimerCountDown.classList.add("alert-hide");

    AlertismAnimateOut = args.timer ? ", " + args.animation + "-out 0.5s " + (args.timer || 1500) + "ms" : "";
    AlertismToast.style.animation = args.animation !== undefined ? args.animation + " 0.5s" + AlertismAnimateOut : "Bottom 0.5s, Bottom-out 0.5s" + AlertismAnimateOut;

    if (!args.timer) {
        let length = AlertismToastId.length, lastId;
        length ? (lastId = AlertismToastId[length - 1], AlertismToastId.push(lastId + 1)) : AlertismToastId.push(1);
        return AlertismToastId[length || 0];
    }

    setTimeout(() => {
        AlertismToastContainer.remove();
        args.onClose && args.onClose();
    }, (args.timer || 1500) + 350);
}
