chrome.runtime.onInstalled.addListener(() => {
    console.log("GFG POTD Helper installed.");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "requestHints") {
        sendResponse({ hints: ["Think about edge cases!", "Check time complexity."] });
    }
});
