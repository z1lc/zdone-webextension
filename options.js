// Saves options to chrome.storage
function save_options() {
  let apiKey = document.getElementById('api_key').value;
  let readwiseAccessToken = document.getElementById('readwise_access_token').value;
  chrome.storage.sync.set({
    apiKey: apiKey,
    readwiseAccessToken: readwiseAccessToken
  });
}

// Restores state using the preferences stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    apiKey: '',
    readwiseAccessToken: '',
  }, function (items) {
    document.getElementById('api_key').value = items.apiKey;
    document.getElementById('readwise_access_token').value = items.readwiseAccessToken;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('api_key').addEventListener('change', save_options);
document.getElementById('readwise_access_token').addEventListener('change', save_options);