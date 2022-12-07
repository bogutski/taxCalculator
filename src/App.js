// tax calculator
// inputs
// 1. salary
// 2. select - martial status
// 3. number of dependents
// 4. houshold expenses

import {useState} from "react";

function App() {

  const [salary, setSalary] = useState(30000);
  const [martialStatus, setMartialStatus] = useState("single");
  const [dependents, setDependents] = useState(0);
  const [householdExpenses, setHouseholdExpenses] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);

  const [warningMessage, setWarningMessage] = useState("");

  const [tax, setTax] = useState(0);

  const onChangeMartialStatus = (event) => {
    setMartialStatus(event.target.value);
  }

  const calculateTax = () => {
    let tax = 0;
    let percentage = 0;

    const netIncome = salary - householdExpenses;

    if (netIncome > 20000 && netIncome <= 50000) {
      percentage = 11;
    } else if (netIncome > 50000 && netIncome <= 80000) {
      percentage = 12;
    } else if (netIncome > 80000 && netIncome <= 120000) {
      percentage = 13;
    } else if (netIncome > 120000 && netIncome <= 200000) {
      percentage = 14;
    } else if (netIncome > 200000 && netIncome <= 1000000) {
      percentage = 15;
    } else if (netIncome > 1000000) {
      percentage = 17;
    }

    if (martialStatus === "married") {
      percentage = percentage - 2;
    } else if (martialStatus === "single") {
      percentage = percentage + 0.5;
    }

    // each dependent is 0.5% less
    // if dependents are more than 7, then 7 is the max
    if (dependents > 7) {
      percentage = percentage - 3.5;
    } else {
      percentage = percentage - (dependents * 0.5);
    }

    // if percentage is less than 0, set it to 0
    if (percentage < 0) {
      percentage = 0;
    }

    // in net income less than 20000, no tax
    if (netIncome <= 20000) {
      percentage = 0;
    }

    tax = netIncome * (percentage / 100);
    percentage = +percentage.toFixed(2)


    // if any is nan or undefined, set it to 0
    if (isNaN(tax) || isNaN(percentage)) {
      tax = 0;
      percentage = 0;
      setWarningMessage("Please enter valid values");
    } else {
      setWarningMessage("");
    }

    setTaxPercentage(percentage);
    setTax(+tax.toFixed(2));
  }

  return (
    <div className="container">

      <h1>Tax Calculator v1</h1>

      <div className="mb-3">
        <label htmlFor="salary" className="form-label">Salary</label>
        <input className="form-control" id="salary" value={salary} onChange={e => setSalary(e.target.value)}/>
      </div>

      <div className="mb-3">
        <label htmlFor="martialStatus" className="form-label">Martial Status</label>
        <select className="form-select" id="martialStatus" onChange={onChangeMartialStatus}
                defaultValue={martialStatus}>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="dependents" className="form-label">Number of Dependents</label>
        <input className="form-control" id="dependents" value={dependents}
               onChange={e => setDependents(e.target.value)}/>
      </div>

      <div className="mb-3">
        <label htmlFor="householdExpenses" className="form-label">Household Expenses</label>
        <input className="form-control" id="householdExpenses" value={householdExpenses}
               onChange={e => setHouseholdExpenses(e.target.value)}/>
      </div>


      {/*<hr/>*/}
      {/*<div>Salary: {salary}</div>*/}
      {/*<div>Martial Status: {martialStatus}</div>*/}
      {/*<div>Number of Dependents: {dependents}</div>*/}
      {/*<div>Household Expenses: {householdExpenses}</div>*/}

      <button onClick={calculateTax} className='btn btn-primary'>Calculate tax</button>

      {warningMessage && <div className="alert alert-danger mt-3" role="alert">
        {warningMessage}
      </div>
      }

      <h2 className='mt-4'>Tax ${tax}, ({taxPercentage}%)</h2>


    </div>
  );
}

export default App;
