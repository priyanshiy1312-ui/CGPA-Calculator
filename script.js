const addSubjectBtn = document.getElementById("addSubject");
const calculateBtn = document.getElementById("calculateSGPA");
const saveSemesterBtn = document.getElementById("saveSemester");
const resetBtn = document.getElementById("reset");

const sgpaResult = document.getElementById("sgpaResult");
const cgpaResult = document.getElementById("cgpaResult");
const semesterList = document.getElementById("semesterList");

let semesterSGPAs = [];
let currentSGPA = 0;

addSubjectBtn.addEventListener("click", () => {
    const row = document.createElement("div");
    row.classList.add("subject-row");

    row.innerHTML = `
        <input type="text" placeholder="Subject Name">
        <input type="number" placeholder="Credits" class="credit">
        <input type="number" placeholder="Marks" class="marks">
    `;

    document.getElementById("subjects").appendChild(row);
});

function getGradePoint(marks){

    if(marks >= 90) return 10;
    if(marks >= 80) return 9;
    if(marks >= 70) return 8;
    if(marks >= 60) return 7;
    if(marks >= 50) return 6;
    if(marks >= 40) return 5;

    return 0;
}

calculateBtn.addEventListener("click", () => {

    const credits = document.querySelectorAll(".credit");
    const marks = document.querySelectorAll(".marks");

    let totalCredits = 0;
    let totalPoints = 0;

    for(let i=0;i<credits.length;i++){

        const credit = Number(credits[i].value);
        const mark = Number(marks[i].value);

        const gradePoint = getGradePoint(mark);

        totalCredits += credit;
        totalPoints += credit * gradePoint;
    }

    currentSGPA = totalPoints / totalCredits;

    sgpaResult.textContent =
    `SGPA: ${currentSGPA.toFixed(2)}`;
});

saveSemesterBtn.addEventListener("click", () => {

    if(currentSGPA === 0){
        alert("Calculate SGPA first");
        return;
    }

    semesterSGPAs.push(currentSGPA);

    const li = document.createElement("li");

    li.textContent =
    `Semester ${semesterSGPAs.length}: ${currentSGPA.toFixed(2)}`;

    semesterList.appendChild(li);

    let total = semesterSGPAs.reduce(
        (sum,value)=> sum + value,0
    );

    let cgpa = total / semesterSGPAs.length;

    cgpaResult.textContent =
    `CGPA: ${cgpa.toFixed(2)}`;
});

resetBtn.addEventListener("click", () => {

    document.getElementById("subjects").innerHTML = `
    <div class="subject-row">
        <input type="text" placeholder="Subject Name">
        <input type="number" placeholder="Credits" class="credit">
        <input type="number" placeholder="Marks" class="marks">
    </div>
    `;

    sgpaResult.textContent = "SGPA: --";
    currentSGPA = 0;
});