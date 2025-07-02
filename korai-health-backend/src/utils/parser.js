// src/utils/parser.js

/**
 * Parses health report text to extract parameters, values, units, and ranges.
 * @param {string} text - OCR-extracted text from the report.
 * @returns {Array} Array of parameter objects
 */
exports.parseHealthData = (text) => {
    const lines = text.split('\n');
    const params = [];
    // Regex: Parameter: value unit (range)
    const pattern = /([A-Za-z\s]+):?\s*([\d.]+)\s*([a-zA-Z/%μ]+)?\s*\(?([\d.-]+)?-?([\d.-]+)?\)?/;

    lines.forEach(line => {
        const match = line.match(pattern);
        if (match) {
            const parameter = match[1].trim();
            const value = parseFloat(match[2]);
            const unit = match[3] ? match[3].trim() : '';
            let range = '';
            if (match[4] && match[5]) {
                range = `${match[4]}-${match[5]}`;
            }
            params.push({
                parameter,
                value,
                unit,
                range
            });
        }
    });

    return params;
};
