// This script runs in the context of the GeeksForGeeks page
console.log("GFG POTD Helper content script loaded");

// Function to extract problem details
function extractProblemDetails() {
    const problemTitle = document.querySelector('.problem-tab h1')?.textContent || '';
    const problemDescription = document.querySelector('.problem-statement')?.innerHTML || '';
    const exampleSection = document.querySelector('.example')?.innerHTML || '';

    return {
        title: problemTitle,
        description: problemDescription,
        examples: exampleSection
    };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProblemDetails") {
        const details = extractProblemDetails();
        sendResponse(details);
    }
    return true;
});

// Inject helper buttons if we're on a problem page
function injectHelperUI() {
    if (window.location.href.includes('/problems/')) {
        // Find the editor section
        const editorSection = document.querySelector('.problems-editor');
        if (editorSection) {
            const helperButton = document.createElement('button');
            helperButton.textContent = 'Get Hints';
            helperButton.className = 'gfg-potd-helper-btn';
            helperButton.style.margin = '10px';
            helperButton.style.padding = '8px 16px';
            helperButton.style.backgroundColor = '#2f8d46';
            helperButton.style.color = 'white';
            helperButton.style.border = 'none';
            helperButton.style.borderRadius = '4px';
            helperButton.style.cursor = 'pointer';

            helperButton.addEventListener('click', () => {
                chrome.runtime.sendMessage({ action: "requestHints" });
            });

            // Insert the button at the top of the editor
            editorSection.insertBefore(helperButton, editorSection.firstChild);
        }
    }
}

// Run when page is fully loaded
window.addEventListener('load', injectHelperUI);