import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [currentProblem, setCurrentProblem] = useState(null)
  const [solution, setSolution] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if we're on a POTD page by asking the content script
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "get_problem_details" }, (response) => {
          if (response) {
            setCurrentProblem(response)

            // Check if we have a cached solution
            chrome.storage.local.get("cachedSolutions", (result) => {
              if (result.cachedSolutions && result.cachedSolutions[response.title]) {
                setSolution(result.cachedSolutions[response.title])
              }
              setLoading(false)
            })
          } else {
            setLoading(false)
          }
        })
      })
    } else {
      setLoading(false)
      console.warn("Chrome extension APIs not available.")
    }
  }, [])

  const handleFetchSolution = () => {
    setLoading(true)
    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage({ action: "show_solution" })

      // Poll for solution every second
      const checkInterval = setInterval(() => {
        chrome.storage.local.get("cachedSolutions", (result) => {
          if (result.cachedSolutions && currentProblem && result.cachedSolutions[currentProblem.title]) {
            setSolution(result.cachedSolutions[currentProblem.title])
            setLoading(false)
            clearInterval(checkInterval)
          }
        })
      }, 1000)

      // Stop polling after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval)
        setLoading(false)
      }, 10000)
    } else {
      setLoading(false)
      console.warn("Chrome extension APIs not available.")
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>GFG POTD Solver</h1>
      </header>

      <main>
        {loading ? (
          <div className="loading">
            <p>Loading...</p>
          </div>
        ) : currentProblem ? (
          <div className="problem-container">
            <h2>{currentProblem.title}</h2>

            {solution ? (
              <div className="solution-container">
                <h3>Solution</h3>
                <pre className="code-block">{solution.code}</pre>
                <div className="explanation">
                  <h4>Explanation</h4>
                  <p>{solution.explanation}</p>
                </div>
              </div>
            ) : (
              <button className="fetch-solution-btn" onClick={handleFetchSolution}>
                Get Solution
              </button>
            )}
          </div>
        ) : (
          <div className="not-potd">
            <p>Not on a GeeksforGeeks POTD page.</p>
            <p>Please navigate to a POTD page to use this extension.</p>
            <a
              href="https://practice.geeksforgeeks.org/problem-of-the-day"
              target="_blank"
              rel="noreferrer"
              className="potd-link"
            >
              Go to POTD
            </a>
          </div>
        )}
      </main>

      <footer>
        <p>Created by mainak1023</p>
      </footer>
    </div>
  )
}

export default App
