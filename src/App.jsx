import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [problemDetails, setProblemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hints, setHints] = useState([]);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    // Query the active tab to get problem details
    if (chrome?.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url.includes('geeksforgeeks.org')) {
          chrome.tabs.sendMessage(
            currentTab.id,
            { action: "getProblemDetails" },
            (response) => {
              if (response) {
                setProblemDetails(response);
                // Generate some basic hints based on the problem
                generateBasicHints(response);
              }
              setLoading(false);
            }
          );
        } else {
          setLoading(false);
        }
      });
    } else {
      // For development outside of Chrome extension
      setLoading(false);
    }
  }, []);

  const generateBasicHints = (problem) => {
    // In a real extension, you might want to use an API for this
    // This is just a simple example
    if (problem) {
      const newHints = [
        "Try breaking down the problem into smaller steps",
        "Consider edge cases like empty inputs or large values",
        "Think about using common data structures (arrays, stacks, queues, etc.)",
        "Check if dynamic programming might be applicable",
        "Consider time and space complexity requirements"
      ];
      setHints(newHints);
    }
  };

  // For development preview
  const previewProblem = {
    title: "Sample Problem: Find Maximum Subarray Sum",
    description: "Given an array of integers, find the contiguous subarray with the largest sum.",
    examples: "<pre>Input: [-2,1,-3,4,-1,2,1,-5,4]<br>Output: 6<br>Explanation: [4,-1,2,1] has the largest sum = 6.</pre>"
  };

  // Use preview data if no problem details are available (for development)
  const displayProblem = problemDetails || previewProblem;

  return (
    <div className="App">
      <header className="App-header">
        <h1>GFG POTD Helper</h1>
        <div className="tabs">
          <button
            className={activeTab === 'details' ? 'active' : ''}
            onClick={() => setActiveTab('details')}
          >
            Problem Details
          </button>
          <button
            className={activeTab === 'hints' ? 'active' : ''}
            onClick={() => setActiveTab('hints')}
          >
            Hints
          </button>
        </div>
      </header>

      <div className="content">
        {loading ? (
          <p>Loading...</p>
        ) : !chrome?.tabs ? (
          <div className="dev-mode-notice">
            <p>Running in development mode. Chrome API not available.</p>
            <p>This is a preview of the extension interface.</p>
          </div>
        ) : (
          <>
            {activeTab === 'details' && (
              <div className="problem-details">
                <h2>{displayProblem.title}</h2>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: displayProblem.description }}
                />
                <div
                  className="examples"
                  dangerouslySetInnerHTML={{ __html: displayProblem.examples }}
                />
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="hints">
                <h2>Helpful Hints</h2>
                {hints.length > 0 ? (
                  <ul>
                    {hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No hints available for this problem yet.</p>
                )}
                <div className="approach-section">
                  <h3>General Approach</h3>
                  <p>1. Understand the problem statement thoroughly</p>
                  <p>2. Identify input constraints and edge cases</p>
                  <p>3. Consider multiple algorithm approaches</p>
                  <p>4. Code the solution step by step</p>
                  <p>5. Test with examples and edge cases</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;