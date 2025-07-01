import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import HealthTable from '../components/HealthTable';
import { extractHealthData } from '../services/ocrService';

const Dashboard = () => {
    const [healthData, setHealthData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Added for error display

    const handleFileUpload = async (file) => {
        setIsLoading(true);
        setError(null); // Reset error state
        try {
            const extractedData = await extractHealthData(file);
            setHealthData(extractedData);
        } catch (error) {
            console.error('Extraction error:', error);
            setError(error.message || 'Failed to process report'); // Capture error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <h1>Health Report Analyzer</h1>

                {/* Error display */}
                {error && (
                    <div className="error-alert">
                        {error} <button onClick={() => setError(null)}>Dismiss</button>
                    </div>
                )}

                <section className="upload-section">
                    <FileUpload onFileSelect={handleFileUpload} />
                </section>

                {isLoading ? (
                    <div className="loader">
                        <div className="spinner"></div>
                        Processing report...
                    </div>
                ) : (
                    healthData.length > 0 && (
                        <section className="results-section">
                            <h2>Health Parameters</h2>
                            <HealthTable healthData={healthData} />

                            <div className="trends-section">
                                <h3>Historical Trends</h3>
                                <div className="trends-list">
                                    <p>Hemoglobin: 12.5 → 13.2 → 14.0 g/dL (3 months)</p>
                                    <p>Glucose: 110 → 102 → 98 mg/dL (3 months)</p>
                                </div>
                            </div>
                        </section>
                    )
                )}
            </div>
        </div>
    );
};

export default Dashboard;
