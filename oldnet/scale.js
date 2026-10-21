function legacyScaleNumber(value, factor) {
    var text = String(value);
    var number;
    if (text == "" || text == "auto" || text.indexOf("%") >= 0 || text.indexOf("em") >= 0) return value;
    number = parseFloat(text);
    if (isNaN(number)) return value;
    return (number * factor) + "px";
}

function sbaScalePage(mode) {
    var designWidth = 1040;
    var contentWidth = 1000;
    var availableWidth = 0;
    var factor;
    var offsetX;
    var elements;
    var i;
    var element;
    var style;
    var attribute;
    var originalSize;

    if (window.screen && window.screen.width) availableWidth = window.screen.width;
    if (document.body && document.body.clientWidth) availableWidth = document.body.clientWidth;
    if (!availableWidth) availableWidth = 640;

    factor = availableWidth / designWidth;
    if (factor > 1) factor = 1;
    if (factor < 0.25) factor = 0.25;
    offsetX = (availableWidth - (contentWidth * factor)) / 2;
    elements = document.all;
    if (!elements) return;

    if (mode == "absolute") {
        for (i = 0; i < elements.length; i++) {
            element = elements[i];
            style = element.style;
            if (!style) continue;
            if (style.position == "absolute") {
                style.left = legacyScaleNumber(style.left, factor);
                style.top = legacyScaleNumber(style.top, factor);
                if (style.left != "") style.left = (parseFloat(style.left) + offsetX) + "px";
            }
            style.width = legacyScaleNumber(style.width, factor);
            style.height = legacyScaleNumber(style.height, factor);
            style.fontSize = legacyScaleNumber(style.fontSize, factor);
            style.lineHeight = legacyScaleNumber(style.lineHeight, factor);
            style.padding = legacyScaleNumber(style.padding, factor);
            style.paddingTop = legacyScaleNumber(style.paddingTop, factor);
            style.borderWidth = legacyScaleNumber(style.borderWidth, factor);
        }
        document.body.style.height = (1600 * factor) + "px";
    } else {
        for (i = 0; i < elements.length; i++) {
            element = elements[i];
            style = element.style;
            if (style) {
                style.width = legacyScaleNumber(style.width, factor);
                style.height = legacyScaleNumber(style.height, factor);
                style.fontSize = legacyScaleNumber(style.fontSize, factor);
                style.lineHeight = legacyScaleNumber(style.lineHeight, factor);
                style.padding = legacyScaleNumber(style.padding, factor);
                style.paddingTop = legacyScaleNumber(style.paddingTop, factor);
                style.borderWidth = legacyScaleNumber(style.borderWidth, factor);
            }
            if (element.getAttribute) {
                attribute = element.getAttribute("width");
                if (attribute != null && String(attribute).indexOf("%") < 0 && !isNaN(parseFloat(attribute))) element.setAttribute("width", Math.round(parseFloat(attribute) * factor));
                if (element.tagName != "IMG") {
                    attribute = element.getAttribute("height");
                    if (attribute != null && String(attribute).indexOf("%") < 0 && !isNaN(parseFloat(attribute))) element.setAttribute("height", Math.round(parseFloat(attribute) * factor));
                }
                attribute = element.getAttribute("cellpadding");
                if (attribute != null && !isNaN(parseFloat(attribute))) element.setAttribute("cellpadding", Math.round(parseFloat(attribute) * factor));
                attribute = element.getAttribute("cellspacing");
                if (attribute != null && !isNaN(parseFloat(attribute))) element.setAttribute("cellspacing", Math.round(parseFloat(attribute) * factor));
                attribute = element.getAttribute("border");
                if (attribute != null && !isNaN(parseFloat(attribute))) element.setAttribute("border", Math.max(0, Math.round(parseFloat(attribute) * factor)));
                if (element.tagName == "FONT") {
                    originalSize = parseInt(element.getAttribute("size"), 10);
                    if (!isNaN(originalSize)) element.setAttribute("size", Math.max(1, Math.round(1 + ((originalSize - 1) * factor))));
                }
            }
        }
        document.body.style.width = (contentWidth * factor) + "px";
        document.body.style.marginLeft = offsetX + "px";
        document.body.style.marginRight = offsetX + "px";
        document.body.style.fontSize = (100 * factor) + "%";
    }
    window.status = "Scarred By Anger: " + availableWidth + "px viewport, scale " + factor;
}




