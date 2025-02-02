import React, { useState } from 'react';
import QueenImage from '../Queen.png'; // Adjusted path to import the image
import './Table.css'; // Importing the CSS file

// N-Queens Solver Function
function solveNQueens(n) {
    const col = new Set();
    const posDiag = new Set(); // (r + c)
    const negDiag = new Set(); // (r - c)
    const res = [];
    const board = Array.from({ length: n }, () => Array(n).fill('.'));

    function backtrack(r) {
        if (r === n) {
            const copy = board.map(row => row.join(''));
            res.push(copy);
            return;
        }

        for (let c = 0; c < n; c++) {
            if (col.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) {
                continue;
            }

            col.add(c);
            posDiag.add(r + c);
            negDiag.add(r - c);
            board[r][c] = 'Q';

            backtrack(r + 1);

            col.delete(c);
            posDiag.delete(r + c);
            negDiag.delete(r - c);
            board[r][c] = '.';
        }
    }

    backtrack(0);
    return res;
}

// React Component
function Table() {
    const [n, setN] = useState(); // Default N value
    const [solutions, setSolutions] = useState([]);
    const [totalSolutions, setTotalSolutions] = useState(0);

    const handleGenerate = () => {
        const result = solveNQueens(n);
        setTotalSolutions(result.length);
        setSolutions(result.slice(0, 400)); // Limit to 200 solutions
    };

    return (
        <div className="table-container">
            <h1>N-Queens Table</h1>
            <div className="input-container">
                <label>N: </label>
                <input
                    // type="number"
                    value={n}
                    onChange={(e) => setN(Number(e.target.value))}
                    min="1"
                />
                <button onClick={handleGenerate}>Generate</button>
            </div>
            <div className="solutions-container">
                {totalSolutions > 200 ? (
                    <p>
                        Total Solutions: <strong>{totalSolutions}</strong><br />
                        Displaying the first 200 solutions.
                    </p>
                ) : (<p>Total Solutions: <strong>{totalSolutions}</strong></p>)}
                {solutions.length > 0 && (
                    solutions.map((solution, index) => (
                        <div key={index} className="solution">
                            <h3>Solution {index + 1}</h3>
                            <table>
                                <tbody>
                                    {solution.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.split('').map((cell, cellIndex) => (
                                                <td key={cellIndex} className={(rowIndex + cellIndex) % 2 === 0 ? 'cell light' : 'cell dark'}>
                                                    {cell === 'Q' ? (<img src={QueenImage} alt="Queen" className="queen-img" />) : ('')}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Table;

// created by: Syed Muhammad Kumail (Fa-2023-BSCS-284)