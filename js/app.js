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

// Enhanced plug visual blueprints with more detail (ViewBox 0 0 120 80)
const plugVisualBlueprints = {
    A: {
        connectors: [
            { shape: 'rect', x: 32, y: 12, width: 12, height: 46, rx: 4 },
            { shape: 'rect', x: 66, y: 12, width: 12, height: 46, rx: 4 }
        ],
        extras: [
            // Add plastic body detail
            { shape: 'rect', x: 30, y: 60, width: 60, height: 8, rx: 4, kind: 'body' }
        ]
    },
    B: {
        connectors: [
            { shape: 'rect', x: 32, y: 16, width: 12, height: 42, rx: 4 },
            { shape: 'rect', x: 66, y: 16, width: 12, height: 42, rx: 4 },
            { shape: 'rect', x: 54, y: 2, width: 12, height: 30, rx: 4, kind: 'ground' }
        ],
        extras: [
            { shape: 'rect', x: 30, y: 60, width: 60, height: 8, rx: 4, kind: 'body' }
        ]
    },
    C: {
        connectors: [
            { shape: 'circle', cx: 42, cy: 36, r: 7 },
            { shape: 'circle', cx: 78, cy: 36, r: 7 }
        ],
        extras: [
            // Add Europlug body outline
            { shape: 'rect', x: 35, y: 58, width: 50, height: 14, rx: 7, kind: 'body' }
        ]
    },
    D: {
        connectors: [
            { shape: 'circle', cx: 60, cy: 16, r: 8, kind: 'ground' },
            { shape: 'circle', cx: 36, cy: 52, r: 8 },
            { shape: 'circle', cx: 84, cy: 52, r: 8 }
        ],
        extras: [
            // Add Indian plug body
            { shape: 'rect', x: 25, y: 62, width: 70, height: 12, rx: 6, kind: 'body' }
        ]
    },
    E: {
        connectors: [
            { shape: 'circle', cx: 42, cy: 40, r: 7 },
            { shape: 'circle', cx: 78, cy: 40, r: 7 },
            { shape: 'circle', cx: 60, cy: 24, r: 5.5, kind: 'ground' }
        ],
        extras: [
            { shape: 'rect', x: 32, y: 60, width: 56, height: 14, rx: 7, kind: 'body' }
        ]
    },
    F: {
        connectors: [
            { shape: 'circle', cx: 42, cy: 36, r: 7 },
            { shape: 'circle', cx: 78, cy: 36, r: 7 }
        ],
        extras: [
            // Schuko grounding clips - make them more prominent
            { shape: 'rect', x: 18, y: 28, width: 8, height: 24, rx: 3, kind: 'clip' },
            { shape: 'rect', x: 94, y: 28, width: 8, height: 24, rx: 3, kind: 'clip' },
            { shape: 'rect', x: 32, y: 58, width: 56, height: 16, rx: 8, kind: 'body' }
        ]
    },
    G: {
        connectors: [
            { shape: 'rect', x: 34, y: 42, width: 12, height: 28, rx: 3 },
            { shape: 'rect', x: 74, y: 42, width: 12, height: 28, rx: 3 },
            { shape: 'rect', x: 54, y: 8, width: 12, height: 32, rx: 3, kind: 'ground' }
        ],
        extras: [
            // UK plug body - make it more distinctive
            { shape: 'rect', x: 28, y: 72, width: 64, height: 6, rx: 3, kind: 'body' }
        ]
    },
    H: {
        connectors: [
            { shape: 'rect', x: 32, y: 24, width: 10, height: 36, rx: 3, transform: 'rotate(-22 37 42)' },
            { shape: 'rect', x: 78, y: 24, width: 10, height: 36, rx: 3, transform: 'rotate(22 83 42)' },
            { shape: 'rect', x: 55, y: 10, width: 12, height: 38, rx: 3, kind: 'ground' }
        ],
        extras: [
            // Israeli plug body
            { shape: 'rect', x: 30, y: 60, width: 60, height: 14, rx: 7, kind: 'body' }
        ]
    },
    I: {
        connectors: [
            { shape: 'rect', x: 34, y: 26, width: 10, height: 34, rx: 3, transform: 'rotate(-15 39 43)' },
            { shape: 'rect', x: 76, y: 26, width: 10, height: 34, rx: 3, transform: 'rotate(15 81 43)' },
            { shape: 'rect', x: 55, y: 10, width: 12, height: 38, rx: 3, kind: 'ground' }
        ],
        extras: [
            { shape: 'rect', x: 30, y: 60, width: 60, height: 14, rx: 7, kind: 'body' }
        ]
    },
    J: {
        connectors: [
            { shape: 'circle', cx: 40, cy: 42, r: 7 },
            { shape: 'circle', cx: 80, cy: 42, r: 7 },
            { shape: 'circle', cx: 60, cy: 20, r: 6, kind: 'ground' }
        ],
        extras: [
            // Swiss plug distinctive shape
            { shape: 'rect', x: 28, y: 62, width: 64, height: 12, rx: 6, kind: 'body' }
        ]
    },
    K: {
        connectors: [
            { shape: 'circle', cx: 42, cy: 36, r: 7 },
            { shape: 'circle', cx: 78, cy: 36, r: 7 },
            { shape: 'circle', cx: 96, cy: 20, r: 6, kind: 'ground' }
        ],
        extras: [
            // Danish plug body
            { shape: 'rect', x: 32, y: 58, width: 56, height: 16, rx: 8, kind: 'body' }
        ]
    },
    L: {
        connectors: [
            { shape: 'circle', cx: 60, cy: 16, r: 6, kind: 'ground' },
            { shape: 'circle', cx: 60, cy: 36, r: 6 },
            { shape: 'circle', cx: 60, cy: 56, r: 6 }
        ],
        extras: [
            // Italian plug inline configuration
            { shape: 'rect', x: 45, y: 66, width: 30, height: 10, rx: 5, kind: 'body' }
        ]
    },
    M: {
        connectors: [
            { shape: 'circle', cx: 60, cy: 16, r: 8, kind: 'ground' },
            { shape: 'circle', cx: 34, cy: 54, r: 8 },
            { shape: 'circle', cx: 86, cy: 54, r: 8 }
        ],
        extras: [
            // South African large plug body
            { shape: 'rect', x: 22, y: 66, width: 76, height: 10, rx: 5, kind: 'body' }
        ]
    },
    N: {
        connectors: [
            { shape: 'circle', cx: 42, cy: 38, r: 7 },
            { shape: 'circle', cx: 78, cy: 38, r: 7 },
            { shape: 'circle', cx: 60, cy: 18, r: 6, kind: 'ground' }
        ],
        extras: [
            // Brazilian plug body
            { shape: 'rect', x: 32, y: 60, width: 56, height: 14, rx: 7, kind: 'body' }
        ]
    }
};

const plugSvgPalettes = {
    plug: {
        base: '#fff7ec',
        baseStroke: '#ddcab7',
        highlight: '#f8ede0'
    },
    socket: {
        base: '#f4f6fb',
        baseStroke: '#cad4e6',
        highlight: '#e6ecf7'
    }
};

const plugStatusInfo = {
    match: { text: 'Works abroad', chipClass: 'status-match', cardClass: 'card-match' },
    adapter: { text: 'Adapter needed', chipClass: 'status-adapter', cardClass: 'card-adapter' },
    home: { text: 'Home plug', chipClass: 'status-home', cardClass: 'card-home' }
};

function getConnectorFill(kind = 'pin', mode = 'plug') {
    const palettes = {
        plug: { 
            pin: '#c28a53', 
            ground: '#a4682e', 
            clip: '#98a6c2',
            body: '#f5f5f5'
        },
        socket: { 
            pin: '#1f2a37', 
            ground: '#0f172a', 
            clip: '#465364',
            body: '#e5e7eb'
        }
    };
    const palette = palettes[mode];
    return palette[kind] || palette.pin;
}

function getConnectorStroke(kind = 'pin', mode = 'plug') {
    const strokes = {
        plug: { 
            pin: '#8b5f2d', 
            ground: '#74461c', 
            clip: '#6e7787',
            body: '#d1d5db'
        },
        socket: { 
            pin: '#0b1220', 
            ground: '#05070d', 
            clip: '#1f2937',
            body: '#9ca3af'
        }
    };
    const palette = strokes[mode];
    return palette[kind] || palette.pin;
}

function renderConnector(connector, mode) {
    if (!connector) return '';
    const fill = getConnectorFill(connector.kind, mode);
    const stroke = getConnectorStroke(connector.kind, mode);
    const transformAttr = connector.transform ? ` transform="${connector.transform}"` : '';
    if (connector.shape === 'rect') {
        const rx = connector.rx ?? 3;
        const ryAttr = connector.ry !== undefined ? ` ry="${connector.ry}"` : '';
        return `<rect x="${connector.x}" y="${connector.y}" width="${connector.width}" height="${connector.height}" rx="${rx}"${ryAttr} fill="${fill}" stroke="${stroke}" stroke-width="1.5"${transformAttr} />`;
    }
    if (connector.shape === 'circle') {
        return `<circle cx="${connector.cx}" cy="${connector.cy}" r="${connector.r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"${transformAttr} />`;
    }
    return '';
}

function renderPlugSvg(type, mode = 'plug') {
    const blueprint = plugVisualBlueprints[type];
    if (!blueprint) {
        return `<div class="plug-visual-placeholder">Type ${type}</div>`;
    }
    const palette = plugSvgPalettes[mode];
    const connectorsMarkup = (blueprint.connectors || []).map(connector => renderConnector(connector, mode)).join('');
    const extrasMarkup = (blueprint.extras || []).map(extra => renderConnector(extra, mode)).join('');
    
    // Enhanced body shapes with more details
    const bodyShape = mode === 'plug'
        ? `<path d="M20 18c0-10 8-18 18-18h44c10 0 18 8 18 18v44c0 10-8 18-18 18H38c-10 0-18-8-18-18V18z" fill="${palette.base}" stroke="${palette.baseStroke}" stroke-width="2"/>
           <rect x="22" y="2" width="76" height="8" rx="4" fill="${palette.highlight}" opacity="0.6"/>`
        : `<rect x="12" y="14" width="96" height="52" rx="14" fill="${palette.base}" stroke="${palette.baseStroke}" stroke-width="2"/>`;
    
    const highlight = mode === 'plug'
        ? `<rect x="30" y="18" width="60" height="10" rx="5" fill="${palette.highlight}" opacity="0.75"/>
           <ellipse cx="60" cy="40" rx="25" ry="8" fill="${palette.highlight}" opacity="0.3"/>`
        : `<rect x="20" y="22" width="80" height="36" rx="10" fill="${palette.highlight}" opacity="0.9"/>`;
    
    return `
        <svg viewBox="0 0 120 80" role="img" aria-label="Type ${type} ${mode === 'plug' ? 'plug' : 'socket'} illustration" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="shadow-${type}-${mode}" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
            </defs>
            <g filter="url(#shadow-${type}-${mode})">
                ${bodyShape}
                ${highlight}
                ${connectorsMarkup}
                ${extrasMarkup}
            </g>
        </svg>
    `;
}

function renderPlugPhotoCard(type, status = 'neutral') {
    const plugTypeInfo = countriesData?.plugTypes?.[type];
    const description = plugTypeInfo?.description || 'Plug illustration';
    const statusDetails = plugStatusInfo[status] || null;
    const statusChip = statusDetails
        ? `<span class="plug-status ${statusDetails.chipClass}">${statusDetails.text}</span>`
        : '';
    const statusClass = statusDetails ? statusDetails.cardClass : '';
    return `
        <div class="plug-photo-card ${statusClass}">
            <div class="plug-photo-header">
                <span class="plug-type-label">Type ${type}</span>
                ${statusChip}
            </div>
            <div class="plug-visual-pair">
                <div class="plug-visual plug">${renderPlugSvg(type, 'plug')}</div>
                <div class="plug-visual socket">${renderPlugSvg(type, 'socket')}</div>
            </div>
            <p>${description}</p>
        </div>
    `;
}

function renderCountryPlugGallery(country, options = {}) {
    if (!country) return '';
    const heading = options.heading || `${country.name} plug styles`;
    const statusFn = options.statusFn || (() => 'neutral');
    const plugTypes = country.plugTypes || [];
    if (!plugTypes.length) {
        return `
            <div class="country-plug-gallery">
                <h4>${heading}</h4>
                <p class="plug-photo-empty">No plug information available.</p>
            </div>
        `;
    }
    const cards = plugTypes.map(type => renderPlugPhotoCard(type, statusFn(type))).join('');
    return `
        <div class="country-plug-gallery">
            <h4>${heading}</h4>
            <div class="plug-photo-grid">
                ${cards}
            </div>
        </div>
    `;
}

function buildPlugVisualSection(home, dest, compatibleTypes) {
    if (!home || !dest) return '';
    return `
        <div class="plug-photo-section">
            ${renderCountryPlugGallery(home, {
                heading: `${countryFlags[home.code] || '🌍'} ${home.name} plug styles`,
                statusFn: type => (compatibleTypes.includes(type) ? 'match' : 'home')
            })}
            ${renderCountryPlugGallery(dest, {
                heading: `${countryFlags[dest.code] || '🌍'} ${dest.name} socket styles`,
                statusFn: type => (compatibleTypes.includes(type) ? 'match' : 'adapter')
            })}
        </div>
    `;
}

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

    const plugVisualSection = buildPlugVisualSection(home, dest, compatible);
    
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
        ${plugVisualSection}
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
        <div class="col-lg-2 col-md-3 col-sm-4 col-6">
            <div class="plug-card h-100" data-type="${type}">
                <div class="plug-icon-svg">${renderPlugSvg(type, 'plug')}</div>
                <h3>Type ${type}</h3>
                <p>${data.description}</p>
                <div class="voltage">${data.voltage}</div>
            </div>
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
            <div class="col-lg-4 col-md-6 col-12">
                <div class="country-card h-100" data-country="${country.name}">
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
