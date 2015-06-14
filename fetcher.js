subreddit="pics"
sort="hot"
zoom="cover"

image_pattern = /\.(png|jpg|gif|svg|jpeg)$/i
imgur_pattern = /^http:\/\/imgur\.com\/[A-Za-z\d]{7}$/

chrome.storage.sync.get({
      subreddit: "pics",
      sort: "hot",
      zoom: "cover"
  }, function(items) {
      subreddit=items.subreddit
      sort=items.sort
      change_zoom(items.zoom)
  });

function change_zoom(z) {
    zoom = z
    postMessage({type: "zoom_changed", zoom: zoom}, "*")
}

function query_imgur(url) {
    $.get(url, function(data) {
        img_url=url+"."+new RegExp('<img src="//i.imgur.com/' + url.slice(-7) + '\.(png|jpg|jpeg|gif|svg)').exec(data)[1]
        query_image(img_url)
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
                    query_imgur(im_url)
                }
                return
            }


        }
        
        if (im_url!=im_url_new) {
            im_url=im_url_new
            query_image(im_url)
        }

    })
}

//Caching the image
function query_image(url) {
    image = new Image
    image.onload = function() {
        postMessage({ type: "subreddit_changed", url: im_url}, "*")
    }
    image.src=url
}

im_url=null
im_url_new=null
image = null

setInterval(query_reddit, 1000)

query_reddit()