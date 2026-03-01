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
// ===== SVG Icon System Configuration =====
const SVG_CONFIG = {
    // SVG canvas settings
    viewBox: { width: 120, height: 80 },
    
    // Responsive size settings  
    sizes: {
        desktop: { width: 120, height: 80 },
        tablet: { width: 100, height: 67 },
        mobile: { width: 80, height: 53 }
    },
    
    // Color theme
    colors: {
        pin: '#8B5A2B',        // Brown pin color
        pinHole: '#654321',    // Darker brown for holes
        ground: '#6B4423',     // Slightly darker for ground
        body: '#F5F5DC',       // Beige body color
        bodyStroke: '#D2B48C', // Tan stroke
        socket: '#E8E8E8',     // Light gray socket
        accent: '#A0522D',     // Saddle brown accent
        clip: '#8B7355'        // Grounding clip color
    },
    
    // Common styles
    styles: {
        pinStyle: 'fill:#8B5A2B;stroke:#654321;stroke-width:1.2',
        groundStyle: 'fill:#6B4423;stroke:#543018;stroke-width:1.2', 
        bodyStyle: 'fill:#F5F5DC;stroke:#D2B48C;stroke-width:1.5',
        socketStyle: 'fill:#E8E8E8;stroke:#CCCCCC;stroke-width:1',
        clipStyle: 'fill:#8B7355;stroke:#6B5B42;stroke-width:1'
    }
};

// Enhanced plug specifications with accurate real-world dimensions and features
const PLUG_SPECIFICATIONS = {
    A: {
        name: 'Type A (NEMA 1-15)',
        pins: [
            { type: 'flat', x: 42, y: 25, width: 6, height: 30, rotation: 0 },
            { type: 'flat', x: 72, y: 25, width: 6, height: 30, rotation: 0 }
        ],
        body: { x: 35, y: 58, width: 50, height: 15, radius: 5 },
        features: ['polarized_capable']
    },
    
    B: {
        name: 'Type B (NEMA 5-15)',
        pins: [
            { type: 'flat', x: 42, y: 28, width: 6, height: 25, rotation: 0 },
            { type: 'flat', x: 72, y: 28, width: 6, height: 25, rotation: 0 },
            { type: 'round_ground', x: 57, y: 15, radius: 4 }
        ],
        body: { x: 32, y: 58, width: 56, height: 15, radius: 6 },
        features: ['grounded', 'polarized']
    },
    
    C: {
        name: 'Type C (Europlug)', 
        pins: [
            { type: 'round', x: 45, y: 35, radius: 4 },
            { type: 'round', x: 75, y: 35, radius: 4 }
        ],
        body: { x: 38, y: 50, width: 44, height: 22, radius: 8 },
        features: ['universal', 'compact']
    },
    
    D: {
        name: 'Type D (Indian)',
        pins: [
            { type: 'round_ground', x: 60, y: 20, radius: 5 },
            { type: 'round', x: 45, y: 48, radius: 5 },
            { type: 'round', x: 75, y: 48, radius: 5 }
        ],
        body: { x: 30, y: 58, width: 60, height: 16, radius: 6 },
        features: ['grounded', 'triangular_layout']
    },
    
    E: {
        name: 'Type E (French)',
        pins: [
            { type: 'round', x: 45, y: 38, radius: 5 },
            { type: 'round', x: 75, y: 38, radius: 5 }
        ],
        socket_ground: { x: 56, y: 22, width: 8, height: 4 },
        body: { x: 35, y: 55, width: 50, height: 18, radius: 7 },
        features: ['grounded', 'socket_earth']
    },
    
    F: {
        name: 'Type F (Schuko)',
        pins: [
            { type: 'round', x: 45, y: 35, radius: 5 },
            { type: 'round', x: 75, y: 35, radius: 5 }
        ],
        clips: [
            { x: 25, y: 28, width: 6, height: 24, radius: 2 },
            { x: 89, y: 28, width: 6, height: 24, radius: 2 }
        ],
        body: { x: 32, y: 55, width: 56, height: 18, radius: 8 },
        features: ['grounded', 'side_clips']
    },
    
    G: {
        name: 'Type G (UK)',
        pins: [
            { type: 'flat', x: 42, y: 38, width: 8, height: 22, rotation: 0 },
            { type: 'flat', x: 70, y: 38, width: 8, height: 22, rotation: 0 },
            { type: 'flat_ground', x: 56, y: 18, width: 8, height: 18 }
        ],
        body: { x: 28, y: 62, width: 64, height: 12, radius: 4 },
        features: ['grounded', 'fused', 'shuttered']
    },
    
    H: {
        name: 'Type H (Israeli)',
        pins: [
            { type: 'flat', x: 40, y: 32, width: 6, height: 24, rotation: -15 },
            { type: 'flat', x: 74, y: 32, width: 6, height: 24, rotation: 15 },
            { type: 'round_ground', x: 57, y: 18, radius: 4 }
        ],
        body: { x: 32, y: 58, width: 56, height: 16, radius: 6 },
        features: ['grounded', 'angled_pins']
    },
    
    I: {
        name: 'Type I (Australian)',
        pins: [
            { type: 'flat', x: 42, y: 32, width: 6, height: 20, rotation: -30 },
            { type: 'flat', x: 72, y: 32, width: 6, height: 20, rotation: 30 },
            { type: 'round_ground', x: 57, y: 15, radius: 4 }
        ],
        body: { x: 32, y: 55, width: 56, height: 18, radius: 7 },
        features: ['grounded', 'angled_pins', 'insulated']
    },
    
    J: {
        name: 'Type J (Swiss)',
        pins: [
            { type: 'round', x: 42, y: 42, radius: 5 },
            { type: 'round', x: 78, y: 42, radius: 5 },
            { type: 'round_ground', x: 60, y: 22, radius: 4 }
        ],
        body: { x: 32, y: 58, width: 56, height: 16, radius: 6 },
        features: ['grounded', 'hexagonal_layout']
    },
    
    K: {
        name: 'Type K (Danish)',
        pins: [
            { type: 'round', x: 45, y: 38, radius: 5 },
            { type: 'round', x: 75, y: 38, radius: 5 },
            { type: 'round_ground', x: 60, y: 20, radius: 4 }
        ],
        body: { x: 35, y: 55, width: 50, height: 18, radius: 7 },
        features: ['grounded', 'semi_circular']
    },
    
    L: {
        name: 'Type L (Italian)',
        pins: [
            { type: 'round', x: 60, y: 25, radius: 4 },
            { type: 'round', x: 45, y: 45, radius: 4 },
            { type: 'round', x: 75, y: 45, radius: 4 }
        ],
        body: { x: 38, y: 58, width: 44, height: 16, radius: 6 },
        features: ['grounded', 'inline_layout']
    },
    
    M: {
        name: 'Type M (South African)',
        pins: [
            { type: 'round_ground', x: 60, y: 18, radius: 6 },
            { type: 'round', x: 42, y: 48, radius: 6 },
            { type: 'round', x: 78, y: 48, radius: 6 }
        ],
        body: { x: 28, y: 58, width: 64, height: 16, radius: 6 },
        features: ['grounded', 'large_pins']
    },
    
    N: {
        name: 'Type N (Brazilian)',
        pins: [
            { type: 'round', x: 45, y: 38, radius: 5 },
            { type: 'round', x: 75, y: 38, radius: 5 },
            { type: 'round_ground', x: 60, y: 22, radius: 4 }
        ],
        body: { x: 35, y: 55, width: 50, height: 18, radius: 7 },
        features: ['grounded', 'modern_design']
    }
};

// Legacy adapter for backward compatibility
const plugVisualBlueprints = PLUG_SPECIFICATIONS;

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

// ===== Responsive SVG Generation System =====

// Get responsive size based on screen width
function getResponsiveSize() {
    const width = window.innerWidth;
    if (width < 576) return SVG_CONFIG.sizes.mobile;
    if (width < 992) return SVG_CONFIG.sizes.tablet;
    return SVG_CONFIG.sizes.desktop;
}

// Create pin/connector element
function createPin(pin) {
    const { colors, styles } = SVG_CONFIG;
    let element = '';
    
    switch (pin.type) {
        case 'flat':
            const transform = pin.rotation ? `transform="rotate(${pin.rotation} ${pin.x + pin.width/2} ${pin.y + pin.height/2})"` : '';
            element = `<rect x="${pin.x}" y="${pin.y}" width="${pin.width}" height="${pin.height}" 
                             rx="2" ry="2" style="${styles.pinStyle}" ${transform}/>
                       <rect x="${pin.x + 1}" y="${pin.y + 2}" width="${pin.width - 2}" height="${pin.height - 4}" 
                             rx="1" fill="${colors.accent}" opacity="0.6" ${transform}/>`;
            break;
            
        case 'flat_ground':
            element = `<rect x="${pin.x}" y="${pin.y}" width="${pin.width}" height="${pin.height}" 
                             rx="2" ry="2" style="${styles.groundStyle}"/>
                       <rect x="${pin.x + 1}" y="${pin.y + 2}" width="${pin.width - 2}" height="${pin.height - 4}" 
                             rx="1" fill="${colors.accent}" opacity="0.8"/>`;
            break;
            
        case 'round':
            element = `<circle cx="${pin.x}" cy="${pin.y}" r="${pin.radius}" style="${styles.pinStyle}"/>
                       <circle cx="${pin.x}" cy="${pin.y}" r="${pin.radius - 1}" fill="${colors.accent}" opacity="0.6"/>
                       <circle cx="${pin.x - 1}" cy="${pin.y - 1}" r="1.5" fill="${colors.body}" opacity="0.9"/>`;
            break;
            
        case 'round_ground':
            element = `<circle cx="${pin.x}" cy="${pin.y}" r="${pin.radius}" style="${styles.groundStyle}"/>
                       <circle cx="${pin.x}" cy="${pin.y}" r="${pin.radius - 1}" fill="${colors.accent}" opacity="0.8"/>
                       <circle cx="${pin.x - 1}" cy="${pin.y - 1}" r="1.5" fill="${colors.body}" opacity="0.9"/>`;
            break;
    }
    
    return element;
}

// Create socket hole (recessed pin hole appearance for socket mode)
function createSocketHole(pin) {
    let element = '';
    switch (pin.type) {
        case 'round':
        case 'round_ground': {
            const r = pin.radius;
            // Outer rim (raised edge), deep dark interior, subtle top highlight
            element =
                `<circle cx="${pin.x}" cy="${pin.y}" r="${r + 1.5}" fill="#b0b6c4" stroke="#9098aa" stroke-width="0.8"/>` +
                `<circle cx="${pin.x}" cy="${pin.y}" r="${r}" fill="#111827"/>` +
                `<ellipse cx="${pin.x}" cy="${pin.y - r * 0.38}" rx="${r * 0.42}" ry="${r * 0.20}" fill="rgba(255,255,255,0.10)"/>`;
            break;
        }
        case 'flat':
        case 'flat_ground': {
            const cx = pin.x + pin.width / 2;
            const cy = pin.y + pin.height / 2;
            const transform = pin.rotation ? `transform="rotate(${pin.rotation} ${cx} ${cy})"` : '';
            element =
                `<rect x="${pin.x - 1.5}" y="${pin.y - 1.5}" width="${pin.width + 3}" height="${pin.height + 3}" rx="3.5" fill="#b0b6c4" stroke="#9098aa" stroke-width="0.8" ${transform}/>` +
                `<rect x="${pin.x}" y="${pin.y}" width="${pin.width}" height="${pin.height}" rx="2" fill="#111827" ${transform}/>` +
                `<rect x="${pin.x + 1}" y="${pin.y + 1}" width="${pin.width - 2}" height="1.5" rx="0.5" fill="rgba(255,255,255,0.08)" ${transform}/>`;
            break;
        }
    }
    return element;
}

// Create body element
function createBody(body) {
    const { colors, styles } = SVG_CONFIG;
    return `<rect x="${body.x}" y="${body.y}" width="${body.width}" height="${body.height}" 
                  rx="${body.radius}" ry="${body.radius}" style="${styles.bodyStyle}"/>
            <rect x="${body.x + 2}" y="${body.y + 1}" width="${body.width - 4}" height="3" 
                  rx="1" fill="${colors.accent}" opacity="0.4"/>`;
}

// Create grounding clips (for Schuko)
function createClips(clips) {
    const { styles } = SVG_CONFIG;
    return clips.map(clip => 
        `<rect x="${clip.x}" y="${clip.y}" width="${clip.width}" height="${clip.height}" 
               rx="${clip.radius}" ry="${clip.radius}" style="${styles.clipStyle}"/>`
    ).join('');
}

// Create socket ground element (for Type E)
function createSocketGround(socketGround) {
    const { colors } = SVG_CONFIG;
    return `<rect x="${socketGround.x}" y="${socketGround.y}" width="${socketGround.width}" height="${socketGround.height}" 
                  rx="2" fill="${colors.socket}" stroke="${colors.ground}" stroke-width="2"/>`;
}

// Main SVG rendering function
function renderPlugSvg(type, mode = 'plug') {
    const spec = PLUG_SPECIFICATIONS[type];
    if (!spec) {
        return `<div class="plug-visual-placeholder">Type ${type}</div>`;
    }

    const size = getResponsiveSize();
    const { viewBox, colors } = SVG_CONFIG;

    const details = `
        <defs>
            <linearGradient id="plugGrad-${type}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:${colors.body};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${colors.bodyStroke};stop-opacity:1" />
            </linearGradient>
            <filter id="shadow-${type}" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.2"/>
            </filter>
        </defs>`;

    if (mode === 'socket') {
        // Realistic wall-plate socket rendering
        const socketPlate =
            // Outer shadow/border layer
            `<rect x="4" y="4" width="112" height="72" rx="12" fill="#9ea7b8" stroke="#8a93a8" stroke-width="1"/>` +
            // Main plate face (warm off-white like real plastic)
            `<rect x="6" y="6" width="108" height="68" rx="10" fill="#f0ede8" stroke="#d0ccc5" stroke-width="1.5"/>` +
            // Top bevel highlight
            `<rect x="8" y="8" width="104" height="3" rx="1.5" fill="rgba(255,255,255,0.70)"/>` +
            // Left bevel highlight
            `<rect x="8" y="8" width="3" height="62" rx="1.5" fill="rgba(255,255,255,0.40)"/>` +
            // Bottom/right shadow
            `<rect x="8" y="67" width="104" height="2" rx="1" fill="rgba(0,0,0,0.06)"/>`;

        // Schuko (Type F): circular recessed cavity
        const schukoCavity = spec.features?.includes('side_clips')
            ? `<circle cx="60" cy="40" r="26" fill="#e6e3dd" stroke="#c0bdb6" stroke-width="1.5"/>` +
              `<circle cx="60" cy="40" r="25.5" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="0.5"/>`
            : '';

        // Socket clips (Schuko metal contact strips)
        const socketClips = spec.clips ? spec.clips.map(clip =>
            `<rect x="${clip.x}" y="${clip.y}" width="${clip.width}" height="${clip.height}" rx="${clip.radius}" fill="#9098a8" stroke="#6a7280" stroke-width="0.8"/>` +
            `<rect x="${clip.x + 1}" y="${clip.y + 2}" width="${clip.width - 2}" height="${clip.height - 4}" rx="${clip.radius}" fill="#a8b0bc"/>`
        ).join('') : '';

        // Pin holes with depth/recess illusion
        const socketHoles = spec.pins?.map(pin => createSocketHole(pin)).join('') || '';

        // Type E French socket: protruding earth pin
        const earthPin = spec.socket_ground ? createSocketGround(spec.socket_ground) : '';

        return `
            <svg width="${size.width}" height="${size.height}" viewBox="0 0 ${viewBox.width} ${viewBox.height}"
                 role="img" aria-label="${spec.name} socket" xmlns="http://www.w3.org/2000/svg"
                 class="plug-svg plug-svg-socket">
                ${details}
                <g filter="url(#shadow-${type})">
                    ${socketPlate}
                    ${schukoCavity}
                    ${socketClips}
                    ${earthPin}
                    ${socketHoles}
                </g>
            </svg>
        `;
    }

    // Plug mode rendering
    const background = `<rect x="10" y="10" width="100" height="60" rx="8" fill="${colors.body}"
         stroke="${colors.bodyStroke}" stroke-width="2" opacity="0.9"/>`;

    const pins = spec.pins?.map(pin => createPin(pin)).join('') || '';
    const body = spec.body ? createBody(spec.body) : '';
    const clips = spec.clips ? createClips(spec.clips) : '';
    const socketGround = spec.socket_ground ? createSocketGround(spec.socket_ground) : '';
    const decoration =
        `<ellipse cx="60" cy="35" rx="20" ry="5" fill="${colors.accent}" opacity="0.2"/>` +
        `<rect x="25" y="12" width="70" height="6" rx="3" fill="${colors.accent}" opacity="0.3"/>`;

    return `
        <svg width="${size.width}" height="${size.height}" viewBox="0 0 ${viewBox.width} ${viewBox.height}"
             role="img" aria-label="${spec.name} plug" xmlns="http://www.w3.org/2000/svg"
             class="plug-svg plug-svg-plug">
            ${details}
            <g filter="url(#shadow-${type})">
                ${background}
                ${decoration}
                ${body}
                ${clips}
                ${socketGround}
                ${pins}
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
                <div class="plug-visual">${renderPlugSvg(type, 'plug')}</div>
                <div class="plug-visual">${renderPlugSvg(type, 'socket')}</div>
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
                <div class="plug-icon-svg">
                    ${renderPlugSvg(type, 'plug')}
                </div>
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
