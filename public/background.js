chrome.runtime.onInstalled.addListener(() => {
    console.log("GFG POTD Helper installed.");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "requestHints") {
        sendResponse({ hints: ["Think about edge cases!", "Check time complexity."] });
    } else if (request.action === "show_solution") {
        // Mock solution data - in a real extension, this would fetch from an API
        const mockSolution = {
            code: `class Solution {
    int solve(int N, int[] A) {
        // Your solution code here
        int result = 0;
        // Implementation details
        return result;
    }
}`,
            explanation: "This solution works by analyzing the problem constraints and implementing an efficient algorithm."
        };

        // Store in local storage for the popup to access
        chrome.storage.local.get("cachedSolutions", (result) => {
            const cachedSolutions = result.cachedSolutions || {};

            // We would normally use the actual problem title here
            // For demo purposes, we're using a placeholder
            cachedSolutions["Current POTD Title"] = mockSolution;

            chrome.storage.local.set({ cachedSolutions });
        });

        sendResponse({ success: true });
    }
    return true;
});
