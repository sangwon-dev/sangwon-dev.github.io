function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

document
  .getElementById('calculator')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const initialAmount = parseFloat(
      document.getElementById('initialAmount').value.replace(/,/g, '')
    );
    const interestRate =
      parseFloat(document.getElementById('interestRate').value) / 100;
    const period = parseInt(document.getElementById('period').value);
    const periodUnit = document.getElementById('periodUnit').value;

    let intervals = period;
    let intervalUnit;
    if (periodUnit === 'months') {
      intervals = period;
      intervalUnit = 'month';
    } else if (periodUnit === 'years') {
      intervals = period;
      intervalUnit = 'year';
    } else {
      intervalUnit = 'day';
    }

    const resultTable = document.getElementById('resultTable');
    const resultTableBody = document.getElementById('resultTableBody');
    resultTableBody.innerHTML = '';
    resultTable.style.display = 'table';

    let totalAmount = initialAmount;
    let currentDate = new Date();
    currentDate.setHours(9, 0, 0, 0);

    for (let i = 0; i < intervals; i++) {
      const interest = totalAmount * interestRate;
      totalAmount += interest;

      const tr = document.createElement('tr');
      const tdDate = document.createElement('td');
      tdDate.textContent = currentDate.toISOString().slice(0, 10);
      tr.appendChild(tdDate);

      const tdInterest = document.createElement('td');
      tdInterest.textContent = numberWithCommas(interest.toFixed(2)) + '円';
      tr.appendChild(tdInterest);

      const tdTotalAmount = document.createElement('td');
      tdTotalAmount.textContent =
        numberWithCommas(totalAmount.toFixed(2)) + '円';
      tr.appendChild(tdTotalAmount);

      const tdInterestRate = document.createElement('td');
      tdInterestRate.textContent =
        numberWithCommas(((totalAmount / initialAmount - 1) * 100).toFixed(2)) +
        '%';
      tr.appendChild(tdInterestRate);

      resultTableBody.appendChild(tr);

      if (intervalUnit === 'month') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (intervalUnit === 'year') {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  });
