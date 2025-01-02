/// <reference types="./nhi.d.ts" />

const OLD_NHI_FORMAT = /^[A-HJ-NP-Z]{3}\d{4}$/;
const NEW_NHI_FORMAT = /^[A-HJ-NP-Z]{3}\d{2}[A-HJ-NP-Z]{2}$/;

/**
 * Checks a string against the New Zealand Ministry of Health NHI specification
 * defined by HISO 10046:2023 and the NHI validation routine
 *
 * @see {@link https://www.tewhatuora.govt.nz/publications/hiso-100462023-consumer-health-identity-standard/|HISO 10046:2023 Standard}
 *
 * @param {string} nhi a potential NHI number
 * @return {boolean} true if the given nhi value is a valid NHI number and false otherwise
 */
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


/**
 * @param {number[]} codes
 * @returns {number}
 */
function weightedCodes(codes) {
    return codes
        .slice(0, -1)
        .map((c, i) => c * (7 - i))
        .reduce((acc, e) => acc + e, 0);
}


/**
 * @param {string} nhi
 * @returns {number[]}
 */
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
