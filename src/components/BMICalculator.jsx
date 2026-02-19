import { useState } from "react";
import "../App.css";
import obese from "../assets/obese.jpg";
import normal from "../assets/normal.jpg";
import underweight from "../assets/underweight.jpg";

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");  
  const [heightUnit, setHeightUnit] = useState("cm");   
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [showResult, setShowResult] = useState(false);


  const calculateBMI = () => {
    if (!weight || !height) {
      alert("Please enter valid values");
      return;
    }

    let weightNum = parseFloat(weight);
    let heightNum = parseFloat(height);

    if (weightNum <= 0 || heightNum <= 0) {
      alert("Values must be greater than 0");
      return;
    }

    if (weightUnit === "lb") {
      weightNum = weightNum * 0.453592;
    }

    let heightInMeters = 0;

    if (heightUnit === "cm") {
      heightInMeters = heightNum / 100;
    } else if (heightUnit === "m") {
      heightInMeters = heightNum;
    } else if (heightUnit === "ft") {
      heightInMeters = heightNum * 0.3048;
    } else if (heightUnit === "in") {
      heightInMeters = heightNum * 0.0254;
    }

    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) setStatus("Underweight");
    else if (bmiValue < 24.9) setStatus("Normal");
    else setStatus("Obese");
    setShowResult(true);
  };

  const resetFields = () => {
    setWeight("");
    setHeight("");
    setWeightUnit("kg");
    setHeightUnit("cm");
    setBmi(null);
    setStatus("");
    setShowResult(false);
  };

  return (
    <div className="container">
      <h1>BMI Calculator</h1>

     {!showResult && (
  <>
    {/* Weight Input + Unit */}
    <div className="input-group">
      <input
        type="number"
        placeholder="Enter weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
        <option value="kg">kg</option>
        <option value="lb">lb</option>
      </select>
    </div>

    {/* Height Input + Unit */}
    <div className="input-group">
      <input
        type="number"
        placeholder="Enter height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
        <option value="cm">cm</option>
        <option value="m">m</option>
        <option value="ft">ft</option>
        <option value="in">in</option>
      </select>
    </div>

    <div className="btn-group">
      <button onClick={calculateBMI}>Calculate BMI</button>
      <button className="reset" onClick={resetFields}>
        Reset
      </button>
    </div>
  </>
)}

      { showResult && bmi !== null && (
        <div className="result">
          <h2>Your BMI: {bmi}</h2>
          <p>Status: {status}</p>

          {status === "Underweight" && (
            <img src={underweight} alt="Underweight" className="bmi-img" />
          )}

          {status === "Normal" && (
            <img src={normal} alt="Normal weight" className="bmi-img" />
          )}

          {status === "Obese" && (
            <img src={obese} alt="Obese" className="bmi-img" />
          )}
        </div>
      )}
    </div>
  );
}

export default BMICalculator;
