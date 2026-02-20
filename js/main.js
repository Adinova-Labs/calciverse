function calculateMortgage() {

    const currency = document.getElementById("currency").value;
    const homePrice = parseFloat(document.getElementById("homePrice").value);
    const downPayment = parseFloat(document.getElementById("downPayment").value);
    const annualRate = parseFloat(document.getElementById("interestRate").value);
    const years = parseFloat(document.getElementById("loanYears").value);

    if (!homePrice || !annualRate || !years) {
        document.getElementById("result").innerHTML = "Please enter required fields correctly.";
        return;
    }

    const loanAmount = homePrice - (downPayment || 0);
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
}
// Amortization Schedule
let balance = loanAmount;
let scheduleHTML = "<h3 style='margin-top:30px;'>Amortization Schedule (Yearly)</h3>";
scheduleHTML += "<table style='width:100%; margin-top:10px; border-collapse:collapse;'>";
scheduleHTML += "<tr style='background:#E2E8F0;'>
<th style='padding:8px; border:1px solid #CBD5E1;'>Year</th>
<th style='padding:8px; border:1px solid #CBD5E1;'>Principal Paid</th>
<th style='padding:8px; border:1px solid #CBD5E1;'>Interest Paid</th>
<th style='padding:8px; border:1px solid #CBD5E1;'>Remaining Balance</th>
</tr>";

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

    scheduleHTML += "<tr>";
    scheduleHTML += "<td style='padding:8px; border:1px solid #CBD5E1;'>" + year + "</td>";
    scheduleHTML += "<td style='padding:8px; border:1px solid #CBD5E1;'>" + currency + formatNumber(yearlyPrincipal) + "</td>";
    scheduleHTML += "<td style='padding:8px; border:1px solid #CBD5E1;'>" + currency + formatNumber(yearlyInterest) + "</td>";
    scheduleHTML += "<td style='padding:8px; border:1px solid #CBD5E1;'>" + currency + formatNumber(balance) + "</td>";
    scheduleHTML += "</tr>";
}

scheduleHTML += "</table>";

document.getElementById("amortization").innerHTML = scheduleHTML;
