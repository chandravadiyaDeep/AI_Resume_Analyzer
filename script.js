// Function to upload resume and get AI analysis
async function analyzeResume() {

    // Get selected file
    const file = document.getElementById("resume").files[0];

    if (!file) {
        alert("Please select a PDF resume.");
        return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("resume", file);

    // Show loading message
    document.getElementById("result").innerText = "Analyzing resume...";

    try {

        // Send PDF to Flask backend
        const response = await fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        // Display result
        document.getElementById("result").innerText = data.analysis;

    } catch (error) {

        document.getElementById("result").innerText =
            "Something went wrong!";

        console.log(error);
    }
}