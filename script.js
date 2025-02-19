async function getCountryInfo() {
    const countryName = document.getElementById('countryInput').value || 'Philippines';
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length > 0) {
            const country = data[0];
            document.getElementById('countryInfo').innerHTML = `
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name} (${Object.keys(country.currencies)[0]})</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="150">
            `;
        } else {
            document.getElementById('countryInfo').innerHTML = '<p>Country not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}
