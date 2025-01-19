/**
 * Checks a string against the New Zealand Ministry of Health NHI specification
 * defined by HISO 10046:2024 and the NHI validation routine
 *
 * @see {@link https://www.tewhatuora.govt.nz/publications/hiso-100462024-consumer-health-identity-standard|HISO 10046:2024 Standard}
 *
 * @param {string} nhi a potential NHI number
 * @return {boolean} true if the given nhi value is a valid NHI number and false otherwise
 */
export declare function isNhi(nhi: string): boolean;
