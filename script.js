async function getCountryInfo() {
    const countryName = document.getElementById('countryInput').value || 'Philippines';
    const countryApiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    try {
        // Fetch country data
        const countryResponse = await fetch(countryApiUrl);
        const countryData = await countryResponse.json();

        if (countryData.length > 0) {
            const country = countryData[0];
            const currencyCode = Object.keys(country.currencies)[0];
            const currencyName = country.currencies[currencyCode].name;

            // Fetch exchange rate to PHP
            const apiKey = 'f06b9265da507566dfb0511d';
            const exchangeRateApiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyCode}`;
            const exchangeRateResponse = await fetch(exchangeRateApiUrl);
            const exchangeRateData = await exchangeRateResponse.json();

            if (exchangeRateData.result === 'success') {
                const rateToPHP = exchangeRateData.conversion_rates.PHP;

                // Display country and currency information
                document.getElementById('countryInfo').innerHTML = `
                    <h2>${country.name.common}</h2>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Currency:</strong> ${currencyName} (${currencyCode})</p>
                    <p><strong>Exchange Rate:</strong> 1 ${currencyCode} = ${rateToPHP.toFixed(2)} PHP</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="150">
                `;
            } else {
                document.getElementById('countryInfo').innerHTML = '<p>Error fetching exchange rate data.</p>';
            }
        } else {
            document.getElementById('countryInfo').innerHTML = '<p>Country not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('countryInfo').innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
}
