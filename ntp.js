fetcher = chrome.extension.getBackgroundPage()

function set_image() {
    document.body.style["background-image"]="url('"+fetcher.image.src+"')"
}

function set_zoom(zoom) {
    document.body.style["background-size"]=zoom=="scale" ? "100% 100%" : zoom
}

if (fetcher.image)
    set_image()
    set_zoom(fetcher.zoom)

chrome.extension.getBackgroundPage().addEventListener("message", function(e) {
    if (e.data.type=="subreddit_changed")
        set_image()
    else if (e.data.type=="zoom_changed")
        set_zoom(e.data.zoom)
        set_zoom(e.data.zoom)
})