// ===== Data & State =====
let countriesData = null;

// Country code to flag emoji mapping
const countryFlags = {
    'AR': '🇦🇷', 'AU': '🇦🇺', 'AT': '🇦🇹', 'BE': '🇧🇪', 'BR': '🇧🇷',
    'KH': '🇰🇭', 'CA': '🇨🇦', 'CL': '🇨🇱', 'CN': '🇨🇳', 'CO': '🇨🇴',
    'CR': '🇨🇷', 'HR': '🇭🇷', 'CZ': '🇨🇿', 'DK': '🇩🇰', 'EG': '🇪🇬',
    'FI': '🇫🇮', 'FR': '🇫🇷', 'DE': '🇩🇪', 'GR': '🇬🇷', 'HK': '🇭🇰',
    'HU': '🇭🇺', 'IS': '🇮🇸', 'IN': '🇮🇳', 'ID': '🇮🇩', 'IE': '🇮🇪',
    'IL': '🇮🇱', 'IT': '🇮🇹', 'JP': '🇯🇵', 'KE': '🇰🇪', 'MY': '🇲🇾',
    'MV': '🇲🇻', 'MX': '🇲🇽', 'MA': '🇲🇦', 'NL': '🇳🇱', 'NZ': '🇳🇿',
    'NG': '🇳🇬', 'NO': '🇳🇴', 'PE': '🇵🇪', 'PH': '🇵🇭', 'PL': '🇵🇱',
    'PT': '🇵🇹', 'QA': '🇶🇦', 'RU': '🇷🇺', 'SA': '🇸🇦', 'SG': '🇸🇬',
    'ZA': '🇿🇦', 'KR': '🇰🇷', 'ES': '🇪🇸', 'LK': '🇱🇰', 'SE': '🇸🇪',
    'CH': '🇨🇭', 'TW': '🇹🇼', 'TH': '🇹🇭', 'TR': '🇹🇷', 'AE': '🇦🇪',
    'GB': '🇬🇧', 'US': '🇺🇸', 'VN': '🇻🇳'
};

// Plug type icons (using electrical symbols)
const plugIcons = {
    'A': '⚡', 'B': '⚡', 'C': '⭕', 'D': '🔌', 'E': '⭕',
    'F': '⭕', 'G': '🔲', 'H': '🔻', 'I': '⚡', 'J': '⭕',
    'K': '⭕', 'L': '⭕', 'M': '🔌', 'N': '⭕'
};

// Priority countries to show first in dropdowns
const priorityCountries = [
    'United States', 'United Kingdom', 'India', 'Singapore',
    'Australia', 'Germany', 'Japan', 'China', 'Thailand', 'Malaysia'
];

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    populateDropdowns();
    renderPlugTypes();
    renderCountries();
    setupEventListeners();
});

// ===== Data Loading =====
async function loadData() {
    try {
        const response = await fetch('data/countries.json');
        countriesData = await response.json();
    } catch (error) {
        console.error('Failed to load country data:', error);
    }
}

// ===== Dropdown Population =====
function populateDropdowns() {
    const homeSelect = document.getElementById('home-country');
    const destSelect = document.getElementById('dest-country');
    
    const countries = Object.values(countriesData.countries);
    
    // Sort: priority countries first, then alphabetically
    const sortedCountries = countries.sort((a, b) => {
        const aPriority = priorityCountries.indexOf(a.name);
        const bPriority = priorityCountries.indexOf(b.name);
        
        if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
        if (aPriority !== -1) return -1;
        if (bPriority !== -1) return 1;
        return a.name.localeCompare(b.name);
    });
    
    // Add options to both dropdowns
    sortedCountries.forEach((country, index) => {
        const flag = countryFlags[country.code] || '🌍';
        const optionHTML = `${flag} ${country.name}`;
        
        const option1 = new Option(optionHTML, country.name);
        const option2 = new Option(optionHTML, country.name);
        
        homeSelect.add(option1);
        destSelect.add(option2);
        
        // Add separator after priority countries
        if (index === priorityCountries.length - 1) {
            const sep1 = new Option('──────────', '');
            sep1.disabled = true;
            const sep2 = new Option('──────────', '');
            sep2.disabled = true;
            homeSelect.add(sep1);
            destSelect.add(sep2);
        }
    });
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Form submission
    document.getElementById('adapter-form').addEventListener('submit', handleCheck);
    
    // Swap countries
    document.getElementById('swap-countries').addEventListener('click', swapCountries);
    
    // Region filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterByRegion(btn.dataset.region));
    });
}

// ===== Swap Countries =====
function swapCountries() {
    const homeSelect = document.getElementById('home-country');
    const destSelect = document.getElementById('dest-country');
    
    const temp = homeSelect.value;
    homeSelect.value = destSelect.value;
    destSelect.value = temp;
}

// ===== Adapter Check =====
function handleCheck(e) {
    e.preventDefault();
    
    const homeCountry = document.getElementById('home-country').value;
    const destCountry = document.getElementById('dest-country').value;
    
    if (!homeCountry || !destCountry) {
        showResult('error', 'Please select both countries.');
        return;
    }
    
    const home = countriesData.countries[homeCountry];
    const dest = countriesData.countries[destCountry];
    
    if (!home || !dest) {
        showResult('error', 'Country data not found.');
        return;
    }
    
    // Find compatible and incompatible plug types
    const homePlugs = new Set(home.plugTypes);
    const destPlugs = new Set(dest.plugTypes);
    
    const compatible = [...homePlugs].filter(p => destPlugs.has(p));
    const needAdapter = [...destPlugs].filter(p => !homePlugs.has(p));
    
    // Check voltage compatibility
    const homeVoltage = parseInt(home.voltage);
    const destVoltage = parseInt(dest.voltage);
    const voltageMatch = Math.abs(homeVoltage - destVoltage) <= 20;
    
    // Build result
    let resultClass = '';
    let title = '';
    let message = '';
    
    if (compatible.length > 0) {
        if (needAdapter.length === 0) {
            resultClass = 'success';
            title = '✅ No Adapter Needed!';
            message = `Great news! Your plugs from ${home.name} will work in ${dest.name}.`;
        } else {
            resultClass = 'warning';
            title = '⚠️ Partial Compatibility';
            message = `Some of your plugs will work, but you may need an adapter for certain outlets.`;
        }
    } else {
        resultClass = 'adapter-needed';
        title = '🔌 Adapter Required!';
        message = `You'll need a plug adapter to use your devices in ${dest.name}.`;
    }
    
    // Voltage warning
    let voltageWarning = '';
    if (!voltageMatch) {
        voltageWarning = `<p style="margin-top: 15px; color: var(--danger);">
            ⚡ <strong>Voltage Warning:</strong> ${dest.name} uses ${dest.voltage} (${dest.frequency}). 
            Check if your devices support this voltage, or bring a converter.
        </p>`;
    }
    
    const resultHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
        <div class="result-details">
            <div class="result-detail">
                <strong>${countryFlags[home.code] || '🌍'} ${home.name}</strong>
                <div class="plug-badges">
                    ${home.plugTypes.map(p => `<span class="plug-badge">Type ${p}</span>`).join('')}
                </div>
                <small>${home.voltage} / ${home.frequency}</small>
            </div>
            <div class="result-detail">
                <strong>${countryFlags[dest.code] || '🌍'} ${dest.name}</strong>
                <div class="plug-badges">
                    ${dest.plugTypes.map(p => {
                        const isCompatible = compatible.includes(p);
                        return `<span class="plug-badge ${isCompatible ? 'compatible' : 'incompatible'}">Type ${p}</span>`;
                    }).join('')}
                </div>
                <small>${dest.voltage} / ${dest.frequency}</small>
            </div>
        </div>
        ${voltageWarning}
        ${dest.notes ? `<p class="country-notes">💡 <strong>Tip:</strong> ${dest.notes}</p>` : ''}
    `;
    
    showResult(resultClass, resultHTML);
}

function showResult(className, content) {
    const resultDiv = document.getElementById('result');
    resultDiv.className = `result ${className}`;
    resultDiv.innerHTML = content;
    resultDiv.classList.remove('hidden');
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== Render Plug Types =====
function renderPlugTypes() {
    const grid = document.getElementById('plug-grid');
    
    const plugTypesHTML = Object.entries(countriesData.plugTypes).map(([type, data]) => `
        <div class="plug-card" data-type="${type}">
            <div class="plug-icon">${plugIcons[type] || '🔌'}</div>
            <h3>Type ${type}</h3>
            <p>${data.description}</p>
            <div class="voltage">${data.voltage}</div>
        </div>
    `).join('');
    
    grid.innerHTML = plugTypesHTML;
}

// ===== Render Countries =====
function renderCountries(regionFilter = 'all') {
    const grid = document.getElementById('country-grid');
    
    const countries = Object.values(countriesData.countries)
        .filter(c => regionFilter === 'all' || c.region === regionFilter)
        .sort((a, b) => a.name.localeCompare(b.name));
    
    const countriesHTML = countries.map(country => {
        const flag = countryFlags[country.code] || '🌍';
        return `
            <div class="country-card" data-country="${country.name}">
                <div class="country-header">
                    <span class="country-flag">${flag}</span>
                    <div>
                        <div class="country-name">${country.name}</div>
                        <div class="country-region">${country.region}</div>
                    </div>
                </div>
                <div class="country-info">
                    <div class="country-info-item">
                        <strong>Plug Types</strong>
                        <span>${country.plugTypes.join(', ')}</span>
                    </div>
                    <div class="country-info-item">
                        <strong>Voltage</strong>
                        <span>${country.voltage}</span>
                    </div>
                    <div class="country-info-item">
                        <strong>Frequency</strong>
                        <span>${country.frequency}</span>
                    </div>
                </div>
                ${country.notes ? `<div class="country-notes">💡 ${country.notes}</div>` : ''}
            </div>
        `;
    }).join('');
    
    grid.innerHTML = countriesHTML;
}

// ===== Region Filter =====
function filterByRegion(region) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.region === region);
    });
    
    // Re-render countries
    renderCountries(region);
}
