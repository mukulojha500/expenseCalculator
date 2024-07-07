import React, { useEffect, useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState();
  const [expense, setExpense] = useState([]);
  const [total, setTotal] = useState(0);

  console.log(expense);

  useEffect(() => {
    const intialExpense = JSON.parse(localStorage.getItem("expense")) || [];
    setExpense(intialExpense);
    const intialTotal = intialExpense.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0
    );
    setTotal(intialTotal);
  }, []);

  useEffect(() => {
    expense.length !== 0 &&
      localStorage.setItem("expense", JSON.stringify(expense));
  }, [expense]);

  return (
    <div className="container">
      <h1>Expense Calculator</h1>
      <form>
        <lable>Item Name:</lable>
        <input
          type="text"
          className="form-text"
          placeholder="Enter item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <lable>Item Amount:</lable>
        <input
          type="number"
          className="form-number"
          placeholder="Enter item amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </form>
      <div className="form-button">
        <button
          onClick={() => {
            setExpense([...expense, { item, amount }]);
            setTotal(total + Number(amount));
            setAmount("");
            setItem("");
          }}
        >
          Add item
        </button>
        <button
          onClick={() => {
            setExpense([]);
            localStorage.clear();
          }}
        >
          Clear All
        </button>
      </div>
      <div className="form-items">
        {expense.length !== 0 && (
          <>
            <ul className="form-items-list">
              {(expense || []).map((element, index) => (
                <li key={index} className="form-items-list-item">
                  {element.item}: ${element.amount}
                </li>
              ))}
            </ul>
            <span>{total}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
