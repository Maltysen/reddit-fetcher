subreddit="pics"
sort="hot"
zoom="contain"

image_pattern = /\.(png|jpg|gif|svg|jpeg)$/i
imgur_pattern = /^http:\/\/imgur\.com\/[A-Za-z\d]{7}$/

chrome.storage.sync.get({
      subreddit: "pics",
      sort: "hot",
      zoom: "contain"
  }, function(items) {
      subreddit=items.subreddit
      sort=items.sort
    //   change_zoom(items.zoom)
  });

// function change_zoom(z) {
//     zoom = z
//     postMessage({type: "zoom_changed", zoom: zoom}, "*")
// }

function query_imgur(url, post) {
    $.get(url, function(data) {
        img_url=url+"."+new RegExp('<img src="//i.imgur.com/' + url.slice(-7) + '\.(png|jpg|jpeg|gif|svg)').exec(data)[1]
        query_image(img_url, post)
    })
}

function query_reddit() {
    $.getJSON("http://reddit.com/r/"+subreddit+"/"+sort+"/.json", function(data) {
        posts=data['data']['children']

        for (i in posts) {
            post=posts[i]

            if (image_pattern.test(post.data.url)) {
                im_url_new=post.data.url
                break
            }

            else if (imgur_pattern.test(post.data.url)) {
                im_url_new=post.data.url
                if (im_url!=im_url_new) {
                    im_url=im_url_new
                    query_imgur(im_url, post)
                }
                return
            }


        }

        if (im_url!=im_url_new) {
            im_url=im_url_new
            img_url=im_url_new
            query_image(im_url, post)
        }

    })
}

//Caching the image
function query_image(url, post) {
    image = new Image
    src_url = url
    comments = "http://reddit.com" + post.data["permalink"]
    post_title = post.data["title"]
    image.onload = function() {
        postMessage({ type: "subreddit_changed"}, "*")
    }
    image.src=url
}

im_url=null
im_url_new=null
image = null

setInterval(query_reddit, 1000)

query_reddit()
