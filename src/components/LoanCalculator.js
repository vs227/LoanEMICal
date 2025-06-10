import React, { useState, useRef } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import './LoanCalculator.css';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(5);

  const rate = interestRate / 100 / 12;
  const term = loanTerm * 12;
  const emi = (loanAmount * rate) / (1 - Math.pow(1 + rate, -term));
  const totalPayment = emi * term;
  const totalInterest = totalPayment - loanAmount;

  // Helper to keep only numbers for loanAmount and loanTerm, float allowed for interestRate
  const sanitizeNumber = (value, allowFloat = false) => {
    if (allowFloat) {
      return value.replace(/[^0-9.]/g, '');
    }
    return value.replace(/\D/g, '');
  };

  // Handlers for contentEditable blur or input events
  const handleLoanAmountChange = (e) => {
    const val = sanitizeNumber(e.target.innerText);
    const num = Number(val);
    if (!isNaN(num) && num >= 10000 && num <= 10000000) {
      setLoanAmount(num);
    }
  };

  const handleInterestRateChange = (e) => {
    const val = sanitizeNumber(e.target.innerText, true);
    const num = Number(val);
    if (!isNaN(num) && num >= 1 && num <= 20) {
      setInterestRate(num);
    }
  };

  const handleLoanTermChange = (e) => {
    const val = sanitizeNumber(e.target.innerText);
    const num = Number(val);
    if (!isNaN(num) && num >= 1 && num <= 30) {
      setLoanTerm(num);
    }
  };

  const data = [
    { name: 'Principal Amount', value: loanAmount },
    { name: 'Interest Amount', value: totalInterest }
  ];

  return (
    <div className="calculator-card">
      <div className="calculator-form">
        <h1>EMI Calculator</h1>

        <label>Loan amount</label>
        <div
          className="value-display editable"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={handleLoanAmountChange}
          spellCheck={false}
        >
          ₹ {loanAmount.toLocaleString('en-IN')}
        </div>
        <input
          type="range"
          min="10000"
          max="10000000"
          step="10000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
        />

        <label>Rate of interest (p.a)</label>
        <div
          className="value-display editable"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={handleInterestRateChange}
          spellCheck={false}
        >
          {interestRate}%
        </div>
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />

        <label>Loan tenure (years)</label>
        <div
          className="value-display editable"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={handleLoanTermChange}
          spellCheck={false}
        >
          {loanTerm}
        </div>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={loanTerm}
          onChange={(e) => setLoanTerm(Number(e.target.value))}
        />

        <div className="result-section">
          <div>Monthly EMI: ₹{emi.toFixed(0).toLocaleString('en-IN')}</div>
          <div>Principal amount: ₹{loanAmount.toLocaleString('en-IN')}</div>
          <div>Total interest: ₹{totalInterest.toFixed(0).toLocaleString('en-IN')}</div>
          <div>Total amount: ₹{totalPayment.toFixed(0).toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="chart-section">
        <ResponsiveContainer width="100%" height={450}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === 'Interest Amount' ? '#0A41F5': '#000000'}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={50} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LoanCalculator;
