# NHI

A function to check strings against the New Zealand Ministry of Health NHI
Validation Routine.
Supports the old and new NHI number formats specified in
[HISO 10046:2023](https://www.tewhatuora.govt.nz/publications/hiso-100462023-consumer-health-identity-standard/).

## Install

```
deno add jsr:@james-ansley/nhi
```

## Usage

```javascript
import {isNhi} from "@james-ansley/nhi";

isNhi("WLD9413");  // true
isNhi("zsc21tn");  // true
isNhi("zzZ0044");  // false
isNhi("ZZZ00AA");  // false
```

Checks are case-insensitive.

***Note:*** This does not check that the NHI number has been _assigned_ to
a person, it merely checks the NHI is consistent with the HISO 10046:2023
standard.

### Excluding Testcases

NHI numbers that begin with `Z` are reserved for testing.
If you wish to exclude these values, you will need to manually check for a `Z`
prefix:

```javascript
import {isNhi} from "@james-ansley/nhi";

const value = "zvb97xq";

isNhi(value);  // true
!value.toUpperCase().startsWith('Z') && isNhi(value);  // false
```

***Note:*** This check does not mean that the NHI number has been _assigned_ to
a person, it just means that the NHI value is not reserved for testing.

## See Also

- https://www.tewhatuora.govt.nz/publications/hiso-100462023-consumer-health-identity-standard/
- https://www.tewhatuora.govt.nz/our-health-system/digital-health/health-identity/national-health-index/information-for-health-it-vendors-and-developers
