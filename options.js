// Saves options to chrome.storage
function save_options() {
  var apiKey = document.getElementById('api_key').value;
  chrome.storage.sync.set({
    apiKey: apiKey,
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    apiKey: '',
  }, function (items) {
    document.getElementById('api_key').value = items.apiKey;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('api_key').addEventListener('change', save_options);