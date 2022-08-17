import { useEffect, useState } from 'react';
import './App.css';

const numRegex = /^\d+$/;

function App() {
  const [matrixDimension, setMatrixDimension] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    for (let i = 0; i < matrixDimension; i++) {
      for (let j = 0; j < matrixDimension; j++) {
        const tdId = `${i}x${j}`;
        const value = Math.floor(Math.random() * 1000).toString();

        setValues(prevVal => ({
          ...prevVal,
          [tdId]: value
        }));
      }
    }
  }, [matrixDimension]);

  const increaseMatrixHandler = () => {
    setMatrixDimension(prevMatrixDim => prevMatrixDim + 1);
  };

  const decreaseMatrixHandler = () => {
    if (matrixDimension > 0) {
      setMatrixDimension(prevMatrixDim => prevMatrixDim - 1);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, tdId: string) => {
    const value = e.target.value;

    if (value.length > 3) return;

    if (numRegex.test(value) || value.length === 0) {
      setValues(preVal => {
        return {
          ...preVal,
          [tdId]: e.target.value
        }
      });
    }
  };

  let tableBody: JSX.Element[] = [];
  let totalSum = 0;

  for (let i = 0; i < matrixDimension; i++) {
    let tds: JSX.Element[] = [];

    let sum = 0;

    for (let j = 0; j < matrixDimension; j++) {
      const tdId = `${i}x${j}`;

      sum += Number(values[tdId] ? values[tdId] : 0);

      tds.push(
        <td key={tdId}>
          <input
            value={values[tdId] ? values[tdId] : ''}
            onChange={(e) => onChangeHandler(e, tdId)} />
        </td>
      );
    }

    totalSum += sum;

    tds.push(
      <td key={`td-${i}`}>
        <div className='rowSum'>
          {sum}
        </div>
      </td>
    );

    const tr = <tr key={`tr-${i}`}>{tds}</tr>;
    tableBody.push(tr);
  }

  return (
    <div className='app'>
      <h1>Super Simple Excel</h1>
      <div className='info'>Click button + or - to increase or decrease matrix</div>
      <div className='buttons'>
        <button onClick={increaseMatrixHandler}>
          +
        </button>
        <button onClick={decreaseMatrixHandler}>
          -
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th colSpan={matrixDimension}>Matrix n x n</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
          <tr>
            <td colSpan={matrixDimension}></td>
            <td>
              <div className='totalSum'>
                {totalSum}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
