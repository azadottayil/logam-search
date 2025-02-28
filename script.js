async function performSearch() {
    const query = document.getElementById('searchBox').value;
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    document.getElementById('results').innerHTML = "<p>Loading results...</p>";

    try {
        // Fetch AI-powered answer from Google Gemini
        const aiResponse = await fetch(`https://api.example.com/gemini-ai?q=${encodeURIComponent(query)}`);
        const aiData = await aiResponse.json();
        const aiAnswer = aiData.answer || "No AI response available.";

        // Fetch web results from DuckDuckGo
        const duckDuckResponse = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
        const duckDuckData = await duckDuckResponse.json();
        
        let resultsHTML = `<h2>AI Answer</h2><p>${aiAnswer}</p>`;
        
        // Process DuckDuckGo results
        if (duckDuckData.RelatedTopics.length > 0) {
            resultsHTML += `<h2>Web Results</h2><ul>`;
            duckDuckData.RelatedTopics.forEach(topic => {
                if (topic.Text && topic.FirstURL) {
                    resultsHTML += `<li><a href="${topic.FirstURL}" target="_blank">${topic.Text}</a></li>`;
                }
            });
            resultsHTML += `</ul>`;
        } else {
            resultsHTML += `<p>No web results found.</p>`;
        }

        document.getElementById('results').innerHTML = resultsHTML;
    } catch (error) {
        console.error(error);
        document.getElementById('results').innerHTML = `<p>Error fetching results.</p>`;
    }
}
