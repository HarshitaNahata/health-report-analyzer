// src/services/reportService.js

/**
 * Example parser for health report text.
 * You should customize regex patterns to match your report formats.
 */
exports.parseHealthData = (text) => {
    const lines = text.split('\n');
    const params = [];

    // Example: Look for lines like "Hemoglobin: 14.2 g/dL (12-16)"
    const regex = /([A-Za-z\s]+):?\s*([\d.]+)\s*([a-zA-Z/%μ]+)?\s*\(?([\d.-]+)?-?([\d.-]+)?\)?/;

    lines.forEach(line => {
        const match = line.match(regex);
        if (match) {
            params.push({
                parameter: match[1].trim(),
                value: parseFloat(match[2]),
                unit: match[3] ? match[3].trim() : '',
                range: match[4] && match[5] ? `${match[4]}-${match[5]}` : '',
            });
        }
    });

    return params;
};
