import React, { useState } from 'react';

export default function Home() {
    const [rows, setRows] = useState([{ subject: '', credit: '', grade: '' }]);
    const [sgpa, setSgpa] = useState(null);

    const gradeValue = {
        'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'E': 0, 'F': 0, 'I': 0, 'X': 0
    };

    const handleAdd = () => {
        setRows([...rows, { subject: '', credit: '', grade: '' }]);
    };

    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const handleCalculate = () => {
        let totalCredits = 0;
        let totalWeightedGrade = 0;

        for (let row of rows) {
            const credit = parseFloat(row.credit);
            const grade = gradeValue[row.grade];

            if (!isNaN(credit) && grade !== undefined) {
                totalCredits += credit;
                totalWeightedGrade += credit * grade;
            }
        }

        if (totalCredits === 0) {
            setSgpa('Invalid Input');
        } else {
            const result = (totalWeightedGrade / totalCredits).toFixed(2);
            setSgpa(result);
        }
    };

    return (
        <div style={styles.app}>
            <style>{`
                body, html {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                }
                .sticky-top {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                .sticky-bottom {
                    position: sticky;
                    bottom: 0;
                }
                .form-control:focus {
                    box-shadow: none;
                }
            `}</style>

            {/* Header */}
            <nav className="navbar bg-danger text-white p-3 sticky-top">
                <h3 className="m-0 w-100 text-center"><b>GPA Calculator</b></h3>
            </nav>

            {/* Main Content */}
            <div className="flex-fill text-center p-3" style={{ overflowY: 'auto' }}>
                <h2 className='mt-4'>Fill your Details!</h2>
                <div className="container text-center mt-3">
                    {rows.map((row, index) => (
                        <form key={index} className="form-control d-flex m-1">
                            <input
                                className="form-control m-1"
                                type="text"
                                placeholder="Subject code"
                                value={row.subject}
                                onChange={(e) => handleChange(index, 'subject', e.target.value)}
                            />
                            <input
                                className="form-control m-1"
                                type="number"
                                placeholder="Credit"
                                value={row.credit}
                                onChange={(e) => handleChange(index, 'credit', e.target.value)}
                            />
                            <select
                                className="form-control m-1"
                                value={row.grade}
                                onChange={(e) => handleChange(index, 'grade', e.target.value)}
                            >
                                <option value="">Select Grade</option>
                                {Object.keys(gradeValue).map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </form>
                    ))}

                    <button className="btn btn-primary mt-3" onClick={handleAdd}>
                        <b>+</b>
                    </button>
                    <br />
                    <button className="btn btn-danger mt-2" onClick={handleCalculate}>
                        CALCULATE
                    </button>

                    {sgpa !== null && (
                        <div className="alert alert-success mt-3">
                            Your SGPA is: <strong>{sgpa}</strong>
                        </div>
                    )}
                </div>
            </div>

            <div className="container w-75 text-center mt-4">
                <h3>Grade Table</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Grade</th>
                            <th>Point</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(gradeValue).map(([grade, point]) => (
                            <tr key={grade}>
                                <td>{grade}</td>
                                <td>{point}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <span><strong>Note : </strong>sgpa * 10 = percentage</span>
            </div>


            {/* Footer */}
            <footer className="container-fluid text-white text-center bg-danger py-1 sticky-bottom">
                <span>
                    Made by : <a
                        className="text-white text-decoration-underline"
                        // href="https://www.linkedin.com/in/prateek-srivastava-1005/"
                        href='#'
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Sakshi Kumari
                    </a>
                </span>
            </footer>
        </div>
    );
}

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
};
