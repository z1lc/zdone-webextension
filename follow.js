chrome.storage.sync.get("apiKey", function (items) {
  if (items.apiKey.length !== 36) {
    alert("zdone-webextension API key is invalid. Please set it by visiting zdone.co and clicking the extension.")
  } else if (window.location.href.includes("en.wikipedia.org")) {
    let pageName = window.location.href.split('/').pop();
    $.get(`https://www.zdone.co/api/${items.apiKey}/follow/${pageName}/`, function (data) {
      let button = document.createElement("button");
      let css = "position: fixed; top: 10px; left: 10px; z-index: 1000;"
      button.id = "zdone_wiki_follow"

      if (data === 'true') {
        button.textContent = "✔ Following"
      } else if (data === 'false') {
        button.textContent = "+ Follow"
        button.addEventListener(
          'click',
          function () {
            $('button#zdone_wiki_follow').text("⌛ Adding...");
            $.post(`https://www.zdone.co/api/${items.apiKey}/follow/${pageName}/`, function (data) {
              if (data === 'true') {
                $('button#zdone_wiki_follow').text("✔ Following");
              } else {
                $('button#zdone_wiki_follow').text("Error :(");
              }
            });
          },
          {
            once: true
          })
      }
      button.style.cssText = css;
      document.body.appendChild(button);
    });
  }
})

chrome.storage.sync.get("readwiseAccessToken", function (items) {
  if (items.readwiseAccessToken.length !== 50) {
    alert("The Readwise Access Token is invalid. Please set it by clicking the extension.")
  } else {
    document.onkeyup = function (event) {
    if (event.key.toLowerCase() === 'a') {
      let maybe_selection = window.getSelection().toString();
      if (maybe_selection !== "") {
        $
          .ajax({
            contentType: "application/json",
            url: `https://readwise.io/api/v2/highlights/`,
            type: "POST",
            headers: {
              "Authorization": `Token ${items.readwiseAccessToken}`,
            },
            data: JSON.stringify({
              "highlights": [{
                text: maybe_selection,
                title: document.title,
                source_url: window.location.href,
                source_type: 'zdone-webextension',
                category: 'articles',
                location: (Date.now() / 1000).toFixed(),
                location_type: 'time_offset',
                highlighted_at: new Date().toISOString(),
              }]
            })
          })
          .fail(function (xhr, status, error) {
            alert(`Received error response: ${xhr.responseText}`);
          })
          .done(function () {
            window.getSelection().removeAllRanges();
          })
      }
    }
  }
  }
})
