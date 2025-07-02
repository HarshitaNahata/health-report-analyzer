// src/services/aiService.js

// Example reference ranges (customize as needed)
const referenceRanges = {
    Hemoglobin: { min: 12, max: 16, unit: 'g/dL' },
    Glucose: { min: 70, max: 100, unit: 'mg/dL' },
    Cholesterol: { min: 0, max: 200, unit: 'mg/dL' },
    // Add more parameters as needed
};

exports.flagAbnormalValues = (healthParams) => {
    return healthParams.map(param => {
        const ref = referenceRanges[param.parameter];
        let status = 'Normal';
        if (ref) {
            if (param.value < ref.min || param.value > ref.max) {
                status = 'Needs Attention';
            }
        }
        return { ...param, status };
    });
};
