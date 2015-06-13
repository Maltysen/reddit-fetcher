// Saves options to chrome.storage
function save_options() {
  subreddit = document.getElementById('subreddit').value;
  sort = $("input[name=sort]:checked").val()
  zoom = $("input[name=zoom]:checked").val()
  chrome.storage.sync.set({
    subreddit: subreddit,
    sort: sort,
    zoom: zoom
  }, function() {
    fetcher=chrome.extension.getBackgroundPage()
        fetcher.subreddit = subreddit
        fetcher.sort = sort
        fetcher.change_zoom(zoom)
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  chrome.storage.sync.get({
      subreddit: "pics",
      sort: "hot",
      zoom: "cover"
  }, function(items) {
    document.getElementById('subreddit').value = items.subreddit
    $("input[name=sort][value="+items.sort+"]").prop('checked', true)
    $("input[name=zoom][value="+items.zoom+"]").prop('checked', true)
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);