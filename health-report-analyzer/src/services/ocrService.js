export const extractHealthData = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3001/api/reports/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    // ✅ Safe check before parsing JSON
    if (!response.ok) {
      const errorText = await response.text(); // read as plain text
      throw new Error(`OCR processing failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return await response.json(); // only runs if response is OK

  } catch (error) {
    console.error('OCR Error:', error.message);

    // Fallback to simulated data for development
    return [
      {
        parameter: 'Hemoglobin',
        value: '14.0',
        unit: 'g/dL',
        referenceRange: '13.5-17.5',
        status: 'normal'
      },
      {
        parameter: 'Glucose',
        value: '110',
        unit: 'mg/dL',
        referenceRange: '70-99',
        status: 'abnormal'
      },
      {
        parameter: 'Cholesterol',
        value: '190',
        unit: 'mg/dL',
        referenceRange: '<200',
        status: 'normal'
      }
    ];
  }
};
