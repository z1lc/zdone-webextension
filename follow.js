chrome.storage.sync.get("apiKey", function (items) {
  if (items.apiKey.length !== 36) {
    alert("zdone-webextension API key is invalid. Please set it by visiting zdone.co and clicking the extension.")
  } else {
    let pageName = window.location.href.split('/').pop();
    $.get(`https://www.zdone.co/api/${items.apiKey}/follow/${pageName}/`, function (data) {
      var button = document.createElement("button");
      var css = "position: fixed; top: 10px; left: 10px; z-index: 1000;"
      button.id = "zdone_wiki_follow"

      if (data === 'true') {
        button.textContent = "✔ Following"
      } else if (data === 'false') {
        button.textContent = "+ Follow"
        button.addEventListener(
          'click',
          function () {
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