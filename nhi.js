/// <reference types="./nhi.d.ts" />

const OLD_NHI_FORMAT = /^[A-HJ-NP-Z]{3}\d{4}$/;
const NEW_NHI_FORMAT = /^[A-HJ-NP-Z]{3}\d{2}[A-HJ-NP-Z]{2}$/;

export function isNhi(nhi) {
    nhi = nhi.toUpperCase();
    if (NEW_NHI_FORMAT.test(nhi)) {
        const codes = charCodes(nhi);
        const checkDigit = 23 - weightedCodes(codes) % 23;
        return checkDigit === codes[6];
    } else if (OLD_NHI_FORMAT.test(nhi)) {
        const codes = charCodes(nhi);
        const checksum = weightedCodes(codes) % 11;
        const checkDigit = (11 - checksum) % 10;
        return checksum !== 0 && checkDigit === codes[6];
    } else {
        return false;
    }
}

function weightedCodes(codes) {
    return codes
        .slice(0, -1)
        .map((c, i) => c * (7 - i))
        .reduce((acc, e) => acc + e, 0);
}

function charCodes(nhi) {
    return [...nhi].map(c => {
        if (!isNaN(c)) {
            return Number(c);
        } else {
            return c.charCodeAt(0)
                - "@".charCodeAt(0)
                - (c > "I" ? 1 : 0)
                - (c > "O" ? 1 : 0);
        }
    });
}
