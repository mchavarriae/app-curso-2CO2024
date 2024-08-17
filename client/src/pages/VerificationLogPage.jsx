import { useState, useEffect } from 'react';
import axios from 'axios';

const VerificationLog = () => {
    const [logs, setLogs] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchLogs();
    }, [startDate, endDate]);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/verification-logs', {
                params: {
                    startDate,
                    endDate
                }
            });
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    return (
        <div>
            <h1>Verification Log</h1>
            <label>
                Start Date:
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </label>
            <button onClick={fetchLogs}>Filter</button>

            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email Sent Date</th>
                        <th>Verification Date</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log._id}>
                            <td>{log.user}</td>
                            <td>{new Date(log.emailSentDate).toLocaleDateString()}</td>
                            <td>{log.verificationDate ? new Date(log.verificationDate).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VerificationLog;