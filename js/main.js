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

    document.getElementById("result").innerHTML =
        "Loan Amount: " + currency + loanAmount.toFixed(2) + "<br><br>" +
        "Monthly Payment: " + currency + monthlyPayment.toFixed(2) + "<br>" +
        "Total Payment: " + currency + totalPayment.toFixed(2) + "<br>" +
        "Total Interest: " + currency + totalInterest.toFixed(2);
}
