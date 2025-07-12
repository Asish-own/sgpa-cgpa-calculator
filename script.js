document.documentElement.setAttribute("data-theme", "light");

function addSubject() {
  const container = document.getElementById('subjects');
  const div = document.createElement('div');
  div.classList.add('subject');
  div.innerHTML = `
    <input type="text" placeholder="Subject Name" required />
    <select required>
      <option value="">Grade</option>
      <option value="10.0">A+ (90–100)</option>
      <option value="9.0">A (80–90)</option>
      <option value="8.0">B+ (70–80)</option>
      <option value="7.0">B (60–70)</option>
      <option value="6.0">C+ (50–60)</option>
      <option value="5.0">C (45–50)</option>
      <option value="4.0">D (40–45)</option>
      <option value="0.0">F (&lt; 40)</option>
    </select>
    <input type="number" placeholder="Credits" min="0.5" step="0.5" required />
    <button class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
  `;
  container.appendChild(div);
}

function calculateSGPA() {
  const subjects = document.querySelectorAll('.subject');
  let totalCredits = 0;
  let totalPoints = 0;
  let valid = true;

  subjects.forEach(subject => {
    const [name, gradeSelect, creditInput] = subject.querySelectorAll('input, select');
    const gradePoint = parseFloat(gradeSelect.value);
    const credit = parseFloat(creditInput.value);

    if (!gradeSelect.value || isNaN(credit) || credit <= 0) {
      valid = false;
    } else {
      totalPoints += gradePoint * credit;
      totalCredits += credit;
    }
  });

  const resultEl = document.getElementById('result');
  if (!valid || totalCredits === 0) {
    resultEl.innerText = "⚠️ Please fill all fields correctly.";
    return;
  }

  const sgpa = totalPoints / totalCredits;
  resultEl.innerText = `🎓 Your SGPA is: ${sgpa.toFixed(2)} / 10.0`;
}

function addSGPAInput() {
  const div = document.createElement('input');
  div.type = 'number';
  div.placeholder = "Enter SGPA";
  div.step = "0.01";
  document.getElementById('cgpaInputs').appendChild(div);
}

function calculateCGPA() {
  const inputs = document.querySelectorAll('#cgpaInputs input');
  let sum = 0, count = 0;

  inputs.forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val) && val >= 0 && val <= 10) {
      sum += val;
      count++;
    }
  });

  const cgpaEl = document.getElementById('cgpaResult');
  if (count === 0) {
    cgpaEl.innerText = "⚠️ Please enter at least one valid SGPA.";
    return;
  }

  cgpaEl.innerText = `🎯 Your CGPA is: ${(sum / count).toFixed(2)} / 10.0`;
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  html.setAttribute("data-theme", current === "dark" ? "light" : "dark");
}

function downloadPDF() {
  const element = document.querySelector('.container');
  const opt = {
    margin: 0.5,
    filename: 'SGPA_CGPA_Report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
}

function showSGPA() {
  document.getElementById("sgpaSection").style.display = "block";
  document.getElementById("cgpaSection").style.display = "none";
}

function showCGPA() {
  document.getElementById("sgpaSection").style.display = "none";
  document.getElementById("cgpaSection").style.display = "block";
}

// Initial setup
addSubject();
