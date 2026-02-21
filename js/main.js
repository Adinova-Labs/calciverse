function calculateMortgage() {

    const currency = document.getElementById("currency").value;
    const homePrice = parseFloat(document.getElementById("homePrice").value);
    const downPayment = parseFloat(document.getElementById("downPayment").value) || 0;
    const annualRate = parseFloat(document.getElementById("interestRate").value);
    const years = parseFloat(document.getElementById("loanYears").value);

    if (!homePrice || !annualRate || !years) {
        document.getElementById("result").innerHTML = "Please enter required fields correctly.";
        document.getElementById("amortization").innerHTML = "";
        return;
    }

    const loanAmount = homePrice - downPayment;
    const monthlyRate = (annualRate / 100) / 12;
    const totalPayments = years * 12;

    const monthlyPayment =
        loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - loanAmount;

    const formatNumber = (num) => {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    document.getElementById("result").innerHTML =
        "Loan Amount: " + currency + formatNumber(loanAmount) + "<br><br>" +
        "Monthly Payment: " + currency + formatNumber(monthlyPayment) + "<br>" +
        "Total Payment: " + currency + formatNumber(totalPayment) + "<br>" +
        "Total Interest: " + currency + formatNumber(totalInterest);

    // ===== Amortization Schedule =====
    let balance = loanAmount;
    let scheduleHTML = "<h3 style='margin-top:30px;'>Amortization Schedule (Yearly)</h3>";
    scheduleHTML += "<table style='width:100%; margin-top:10px; border-collapse:collapse;'>";
    scheduleHTML += "<tr style='background:#E2E8F0;'>" +
        "<th style='padding:8px; border:1px solid #CBD5E1;'>Year</th>" +
        "<th style='padding:8px; border:1px solid #CBD5E1;'>Principal Paid</th>" +
        "<th style='padding:8px; border:1px solid #CBD5E1;'>Interest Paid</th>" +
        "<th style='padding:8px; border:1px solid #CBD5E1;'>Remaining Balance</th>" +
        "</tr>";

    for (let year = 1; year <= years; year++) {

        let yearlyPrincipal = 0;
        let yearlyInterest = 0;

        for (let month = 1; month <= 12; month++) {

            let interestPayment = balance * monthlyRate;
            let principalPayment = monthlyPayment - interestPayment;

            yearlyPrincipal += principalPayment;
            yearlyInterest += interestPayment;

            balance -= principalPayment;

            if (balance < 0) balance = 0;
        }

        scheduleHTML += "<tr>" +
            "<td style='padding:8px; border:1px solid #CBD5E1;'>" + year + "</td>" +
            "<td style='padding:8px; border:1px solid #CBD5E1;'>" + currency + formatNumber(yearlyPrincipal) + "</td>" +
            "<td style='padding:8px; border:1px solid #CBD5E1;'>" + currency + formatNumber(yearlyInterest) + "</td>" +
            "<td style='padding:8px; border:1px solid #CBD5E1;'>" + currency + formatNumber(balance) + "</td>" +
            "</tr>";
    }

    scheduleHTML += "</table>";

    document.getElementById("amortization").innerHTML = scheduleHTML;
}
function calculateLoan() {

    const currency = document.getElementById("loanCurrency").value;
    const loan = parseFloat(document.getElementById("loanAmountInput").value);
    const annualRate = parseFloat(document.getElementById("loanInterestRate").value);
    const years = parseFloat(document.getElementById("loanYearsInput").value);

    if (!loan || !annualRate || !years) {
        document.getElementById("loanResult").innerHTML = "Please enter required fields correctly.";
        return;
    }

    const monthlyRate = (annualRate / 100) / 12;
    const totalPayments = years * 12;

    const emi =
        loan * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalPayment = emi * totalPayments;
    const totalInterest = totalPayment - loan;

    const formatNumber = (num) => {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    document.getElementById("loanResult").innerHTML =
        "Monthly EMI: " + currency + formatNumber(emi) + "<br><br>" +
        "Total Payment: " + currency + formatNumber(totalPayment) + "<br>" +
        "Total Interest: " + currency + formatNumber(totalInterest);
}
function calculateCompound() {

    const currency = document.getElementById("ciCurrency").value;
    const principal = parseFloat(document.getElementById("ciPrincipal").value);
    const rate = parseFloat(document.getElementById("ciRate").value);
    const years = parseFloat(document.getElementById("ciYears").value);
    const frequency = parseFloat(document.getElementById("ciFrequency").value);

    if (!principal || !rate || !years) {
        document.getElementById("ciResult").innerHTML = "Please enter required fields correctly.";
        return;
    }

    const r = rate / 100;
    const amount = principal * Math.pow((1 + r / frequency), frequency * years);
    const interest = amount - principal;

    const formatNumber = (num) => {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    document.getElementById("ciResult").innerHTML =
        "Final Amount: " + currency + formatNumber(amount) + "<br><br>" +
        "Total Interest Earned: " + currency + formatNumber(interest);
}
let sipChartInstance = null;

function calculateSIP() {

  const currency = document.getElementById("currency").value;
  const monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const years = parseFloat(document.getElementById("years").value);

  if (!monthlyInvestment || !annualRate || !years) {
    document.getElementById("result").innerHTML = "Please fill all fields.";
    return;
  }

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  let maturityAmount = 0;
  let totalInvestment = 0;

  let labels = [];
  let investmentData = [];
  let valueData = [];

  for (let i = 1; i <= months; i++) {

    maturityAmount =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate) *
      (1 + monthlyRate);

    totalInvestment = monthlyInvestment * i;

    if (i % 12 === 0) {
      labels.push("Year " + (i / 12));
      investmentData.push(totalInvestment.toFixed(2));
      valueData.push(maturityAmount.toFixed(2));
    }
  }

  const totalReturns = maturityAmount - (monthlyInvestment * months);

  document.getElementById("result").innerHTML =
    "Total Investment: " + currency + (monthlyInvestment * months).toFixed(2) + "<br>" +
    "Estimated Returns: " + currency + totalReturns.toFixed(2) + "<br><br>" +
    "<strong>Maturity Amount: " + currency + maturityAmount.toFixed(2) + "</strong>";

  const ctx = document.getElementById("sipChart").getContext("2d");

  if (sipChartInstance) {
    sipChartInstance.destroy();
  }

  sipChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Investment",
          data: investmentData,
          borderWidth: 2,
          fill: false
        },
        {
          label: "Investment Value",
          data: valueData,
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        }
      }
    }
  });
}
