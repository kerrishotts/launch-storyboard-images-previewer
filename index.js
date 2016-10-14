"use strict";
(function (window, document) {
    
    //
    //
    // Images grid
    ////////////////////////////////////////////////////////////////////////////
    let idioms = ["universal", "iphone", "ipad"];
    let scalesForIdiom = {
        "universal": ["1x", "2x", "3x"],
        "iphone": ["1x", "2x", "3x"],
        "ipad": ["1x", "2x"]
    };
    let reversedScalesForIdiom = {
        "universal": ["3x", "2x", "1x"],
        "iphone": ["3x", "2x", "1x"],
        "ipad": ["2x", "1x"]
    };
    let sizes = ["any", "com"];
    
    function extractDefaultFromSearchString(parameter) {
        let searchString = window.location.search.substr(1);
        let searches = searchString.split("&");
        searches = searches.reduce((p, c) => {
            let [key, val] = c.split("=");
            p[key] = val;
            return p;
        }, {});
        return searches[parameter];
    }
    
    function buildCell(w, h, scale, idiom) {
        let el = document.createElement("div");
        let imgContainer = document.createElement("div");
        let img = document.createElement("img");
        let btn = document.createElement("input");

        imgContainer.className = "imgContainer";
        btn.setAttribute("type", "file");
        el.className = `cell size ${w}${h}`;
        el.setAttribute("data-size", `${w} ${h}`);
        btn.textContent = "Select...";
        
        let defaultImg = extractDefaultFromSearchString(`at${scale}-${idiom}-${w}${h}`);
        if (defaultImg) {
            img.src = defaultImg;
            el.setAttribute("data-has-image", "yes");
        }
       
        imgContainer.appendChild(img); 
        el.appendChild(imgContainer);
        el.appendChild(btn);
        
        return el;
    }
    
    function buildScaleColumn(scale, idiom) {
        let el = document.createElement("div");
        el.className = `scale at${scale}`;
        el.setAttribute("data-scale", `@${scale}`);
        
        for (let h of sizes) {
            for (let w of sizes) {
                el.appendChild(buildCell(w, h, scale, idiom));
            }
        }
        
        return el;
    }
    
    function buildIdiomGrid(idiom) {
        let el = document.createElement("div");
        el.className = `idiom ${idiom}`;
        el.setAttribute("data-idiom", idiom);
        
        for (let scale of scalesForIdiom[idiom]) {
            el.appendChild(buildScaleColumn(scale, idiom));
        }
        
        return el;
    }
    
    function buildImagesGrid() {
        let el = document.createElement("section");
        el.className = "images";
        for (let idiom of idioms) {
            el.appendChild(buildIdiomGrid(idiom));
        }
        
        el.addEventListener("change", (evt) => {
            let target = evt.target || window.event.srcElement;
            let sibling = target.previousSibling.firstChild;
            // modified from http://stackoverflow.com/a/3814285
            if (FileReader && target.files && target.files.length) {
                let fileReader = new FileReader();
                fileReader.onload = function () {
                    sibling.src = fileReader.result;
                    sibling.parentElement.parentElement.setAttribute("data-has-image", "yes");
                    updatePreviewsFromImages();
                }
                fileReader.readAsDataURL(target.files[0]);
            }
        });
        
        return el;
    }
    
    //
    //
    // Build the previews grid
    ////////////////////////////////////////////////////////////////////////////
    let devices = [
        // all size classes based on http://www.sizeclasses.com
        // iPhones
        {name:"iPhone 6+, 6s+, 7+", orientation: "Portrait",  diagonal: "5.5", resolution: [1242, 2208], size: ["com", "any"], scale: "3x", idiom: "iphone"},
        {name:"iPhone 6+, 6s+, 7+", orientation: "Landscape", diagonal: "5.5", resolution: [2208, 1242], size: ["any", "com"], scale: "3x", idiom: "iphone"},
        {name:"iPhone 6, 6s, 7",    orientation: "Portrait",  diagonal: "4.7", resolution: [750,  1334], size: ["com", "any"], scale: "2x", idiom: "iphone"},
        {name:"iPhone 6, 6s, 7",    orientation: "Landscape", diagonal: "4.7", resolution: [1334,  750], size: ["com", "com"], scale: "2x", idiom: "iphone"},
        {name:"iPhone 5, 5s, SE",   orientation: "Portrait",  diagonal: "4.0", resolution: [640,  1136], size: ["com", "any"], scale: "2x", idiom: "iphone"},
        {name:"iPhone 5, 5s, SE",   orientation: "Landscape", diagonal: "4.0", resolution: [1136,  640], size: ["com", "com"], scale: "2x", idiom: "iphone"},
        // iPads
        {name:"iPad Pro",               orientation: "Portrait",  diagonal: "12.9",     resolution: [2048, 2732], size: ["any", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Pro",               orientation: "Landscape", diagonal: "12.9",     resolution: [2732, 2048], size: ["any", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Retina, Mini, Pro", orientation: "Portrait",  diagonal: "9.7, 7.9", resolution: [1536, 2048], size: ["any", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Retina, Mini, Pro", orientation: "Landscape", diagonal: "9.7, 7.9", resolution: [2048, 1536], size: ["any", "any"], scale: "2x", idiom: "ipad"},
        // iPad Multitasking; based on https://medium.design/regular-and-compact-ios-display-size-breakdown-for-designers-d3ff3044e06e#.xg73rh9wx
        {name:"iPad Pro",               orientation: "Portrait",  diagonal: "12.9",     resolution: [2048, 2732], multitasking: 750, size: ["com", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Pro",               orientation: "Landscape", diagonal: "12.9",     resolution: [2732, 2048], multitasking: 750, size: ["com", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Pro",               orientation: "Landscape", diagonal: "12.9",     resolution: [2732, 2048], multitasking: 1356, size: ["any", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Pro",               orientation: "Portrait",  diagonal: "12.9",     resolution: [2048, 2732], multitasking: 1278, size: ["com", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Pro",               orientation: "Landscape", diagonal: "12.9",     resolution: [2732, 2048], multitasking: 1962, size: ["any", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Retina, Mini, Pro", orientation: "Portrait",  diagonal: "9.7, 7.9", resolution: [1536, 2048], multitasking: 640, size: ["com", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Retina, Mini, Pro", orientation: "Landscape", diagonal: "9.7, 7.9", resolution: [2048, 1536], multitasking: 640, size: ["com", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Retina, Mini, Pro", orientation: "Landscape", diagonal: "9.7, 7.9", resolution: [2048, 1536], multitasking: 1014, size: ["com", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Retina, Mini, Pro", orientation: "Portrait",  diagonal: "9.7, 7.9", resolution: [1536, 2048], multitasking: 876, size: ["com", "any"], scale: "2x", idiom: "ipad"},
        {name:"iPad Retina, Mini, Pro", orientation: "Landscape", diagonal: "9.7, 7.9", resolution: [2048, 1536], multitasking: 1388, size: ["any", "any"], scale: "2x", idiom: "ipad"}
    ];
    
    function buildPreviewCell(device) {
        let scaleFactor = 10;
        let w = Math.round(device.resolution[0]/scaleFactor);
        let h = Math.round(device.resolution[1]/scaleFactor); 
        let mw = device.multitasking ? (device.multitasking/scaleFactor) : w;
        let pw = mw / w;
        
        let el = document.createElement("div");
        el.className = "device";
       
        let imgContainer = document.createElement("div");
        imgContainer.className = `imgContainer ${pw <= 0.5 ? "right" : (pw < 1 ? "left" : "full")}`;
        imgContainer.style.width = `${w + 10}px`;
        imgContainer.style.height = `${h + 10}px`;

        let img = document.createElement("img");
        img.style.width = `${mw}px`;
        img.style.height = `${h}px`;
        let queryStrings = getMatchingQueryStringsInOrderOfPreference(device);
        let sourceImage = queryStrings.reduce((p, c) => {
            let el = document.querySelector(c);
            let parentEl = document.querySelector(c.replace("com", "any"));
            if (p) {
                return p;
            } else {
                if (parentEl && parentEl.src && el && el.src) {
                    return el;
                } else {
                    return p;
                }
            }
        }, undefined);
        if (sourceImage) {
            img.style.backgroundImage = `url(${sourceImage.src})`;
        }
        imgContainer.appendChild(img);
        el.appendChild(imgContainer);
        
        let caption = document.createElement("p");
        caption.textContent = `${device.orientation} ${device.name} (${device.diagonal}, ${device.resolution[0]}x${device.resolution[1]})`;
        el.appendChild(caption);
        
        let secondCaption = document.createElement("p");
        secondCaption.textContent = `@${device.scale} [ ${device.size[0]} ${device.size[1]} ] (${device.multitasking ? device.multitasking : device.resolution[0]}x${device.resolution[1]})`;
        el.appendChild(secondCaption);
        
        return el;
    }
    
    function buildPreviewsGrid() {
        let el = document.createElement("section");
        el.className = "previews";
        for (let device of devices) {
            el.appendChild(buildPreviewCell(device));
        }
        return el;
    }
    
    function getMatchingQueryStringsInOrderOfPreference(device) {
        let queryStrings = [];
        for (let idiom of [device.idiom, "universal"]) {
            for (let scale of reversedScalesForIdiom[idiom]) {
                if (scale <= device.scale) {
                    for (let h of [device.size[1], "any"]) {
                        for (let w of [device.size[0], "any"]) {
                            queryStrings.push(`.images .${idiom} .at${scale} .${w}${h} .imgContainer img`);
                        }
                    }
                }
            }
        }
        return queryStrings;
    }
    
    function updatePreviewsFromImages() {
        let previewsEl = document.querySelector(".previews");
        let scrollTop = previewsEl.scrollTop;
        previewsEl.innerHTML = "";
        previewsEl.parentElement.replaceChild(buildPreviewsGrid(), previewsEl)
        previewsEl = document.querySelector(".previews");
        previewsEl.scrollTop = scrollTop;
    }

    //
    //
    // Build the user interface
    ////////////////////////////////////////////////////////////////////////////
    
    function buildUI() {
       let df = document.createDocumentFragment(); 
        
        let rootEl = document.createElement("article");
        rootEl.appendChild(buildImagesGrid());
        rootEl.appendChild(buildPreviewsGrid());
        
        df.appendChild(rootEl);
        
        document.body.appendChild(df);
    }
    
    //
    //
    // Start!
    ////////////////////////////////////////////////////////////////////////////
    
    document.addEventListener("DOMContentLoaded", () => {
        buildUI();
        if (window.location.search) {
            window.setTimeout(() => updatePreviewsFromImages(), 250);
        }
    });
    
})(window, document);