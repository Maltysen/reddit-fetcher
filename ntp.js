fetcher = chrome.extension.getBackgroundPage()

function set_image() {
    document.getElementById("main_img").src = fetcher.src_url
    document.getElementById("img_link").href = fetcher.im_url
    document.getElementById("title").href = fetcher.comments
    document.getElementById("title").innerHTML = fetcher.post_title.length < 40 ? fetcher.post_title : fetcher.post_title.slice(0, 35) + ". . ."
}

// function set_zoom(zoom) {
//     document.body.style["background-size"]=zoom=="scale" ? "100% 100%" : zoom
// }

if (fetcher.image)
    set_image()
    // set_zoom(fetcher.zoom)

fetcher.addEventListener("message", function(e) {
    if (e.data.type=="subreddit_changed")
        set_image()
    // else if (e.data.type=="zoom_changed")
        // set_zoom(e.data.zoom)
})
