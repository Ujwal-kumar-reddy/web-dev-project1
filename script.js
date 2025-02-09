document.addEventListener("DOMContentLoaded", loadJobs);

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let jobId = event.dataTransfer.getData("text");
    let jobElement = document.getElementById(jobId);
    event.target.appendChild(jobElement);
    saveJobs();
}

function addJob() {
    let title = document.getElementById("job-title").value;
    let company = document.getElementById("company-name").value;

    if (title.trim() === "" || company.trim() === "") {
        alert("Please enter job details.");
        return;
    }

    let jobId = `job-${Date.now()}`;
    let jobElement = document.createElement("div");
    jobElement.classList.add("job-card");
    jobElement.id = jobId;
    jobElement.draggable = true;
    jobElement.ondragstart = drag;
    jobElement.innerHTML = `<strong>${title}</strong> at ${company}`;

    document.getElementById("applied-list").appendChild(jobElement);
    document.getElementById("job-title").value = "";
    document.getElementById("company-name").value = "";

    saveJobs();
}

function saveJobs() {
    let data = {
        applied: document.getElementById("applied-list").innerHTML,
        interview: document.getElementById("interview-list").innerHTML,
        offer: document.getElementById("offer-list").innerHTML
    };

    localStorage.setItem("jobs", JSON.stringify(data));
    updateStats();
}

function loadJobs() {
    let data = JSON.parse(localStorage.getItem("jobs"));

    if (data) {
        document.getElementById("applied-list").innerHTML = data.applied;
        document.getElementById("interview-list").innerHTML = data.interview;
        document.getElementById("offer-list").innerHTML = data.offer;

        document.querySelectorAll(".job-card").forEach(job => {
            job.draggable = true;
            job.ondragstart = drag;
        });
    }

    updateStats();
}

function updateStats() {
    document.getElementById("applied-count").textContent = document.getElementById("applied-list").childElementCount;
    document.getElementById("interview-count").textContent = document.getElementById("interview-list").childElementCount;
    document.getElementById("offer-count").textContent = document.getElementById("offer-list").childElementCount;
}
