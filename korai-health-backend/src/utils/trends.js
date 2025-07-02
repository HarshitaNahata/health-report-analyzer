// src/utils/trends.js

/**
 * Calculates trend data for a health parameter across reports.
 * @param {Array} reports - Array of report objects (with parameters and uploadedAt)
 * @param {string} parameterName - Name of the health parameter to track
 * @returns {Array} Array of { date, value }
 */
exports.calculateTrends = (reports, parameterName) => {
    const trendData = [];
    // Sort reports by date ascending
    const sortedReports = reports.slice().sort(
        (a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt)
    );
    sortedReports.forEach(report => {
        if (Array.isArray(report.parameters)) {
            report.parameters.forEach(param => {
                if (param.parameter === parameterName) {
                    trendData.push({
                        date: report.uploadedAt,
                        value: param.value
                    });
                }
            });
        }
    });
    return trendData;
};
