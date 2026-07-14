// ===============================
// Selected File
// ===============================

let selectedFile = null;

// Wait until page is loaded
document.addEventListener("DOMContentLoaded", () => {

    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("resume");
    const fileName = document.getElementById("file-name");

    console.log("Script Loaded");

    // Click Upload
    dropArea.addEventListener("click", () => {
        fileInput.click();
    });

    // Select File
    fileInput.addEventListener("change", () => {

        if(fileInput.files.length > 0){

            selectedFile = fileInput.files[0];

            fileName.innerHTML = "✅ " + selectedFile.name;

        }

    });

    // Drag Enter
    dropArea.addEventListener("dragenter",(e)=>{

        e.preventDefault();

        console.log("Drag Enter");

        dropArea.classList.add("dragover");

    });

    // Drag Over
    dropArea.addEventListener("dragover",(e)=>{

        e.preventDefault();

        console.log("Dragging");

        dropArea.classList.add("dragover");

    });

    // Leave
    dropArea.addEventListener("dragleave",()=>{

        console.log("Leave");

        dropArea.classList.remove("dragover");

    });

    // Drop
    dropArea.addEventListener("drop",(e)=>{

        e.preventDefault();

        console.log("Dropped");

        dropArea.classList.remove("dragover");

        const files = e.dataTransfer.files;

        if(files.length===0) return;

        const file = files[0];

        if(file.type !== "application/pdf"){

            alert("Only PDF files are allowed.");

            return;

        }

        selectedFile = file;

        fileName.innerHTML = "✅ " + file.name;

    });

});


// ===============================
// Analyze Resume
// ===============================

async function analyzeResume(){

    if(selectedFile===null){

        alert("Please select a PDF.");

        return;

    }

    const formData=new FormData();

    formData.append("resume",selectedFile);

    document.getElementById("result").innerHTML=
    "⏳ AI is analyzing your resume...";

    try{

        const response=await fetch("/analyze",{

            method:"POST",

            body:formData

        });

        const data=await response.json();

        document.getElementById("result").innerText=data.analysis;

    }

    catch(error){

        document.getElementById("result").innerHTML=
        "❌ Something went wrong.";

        console.log(error);

    }

}