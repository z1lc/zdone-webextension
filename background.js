chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url.match(/zdone.co/)) {
    chrome.pageAction.show(tabId);
  } else {
    chrome.pageAction.hide(tabId);
  }
});