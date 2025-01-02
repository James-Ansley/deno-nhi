import {assert, assertFalse} from "@std/assert";
import {isNhi} from "./nhi.js";

Deno.test("valid old format NHI number", () => {
    assert(isNhi("JBX3656"));
    assert(isNhi("ZZZ0016"));
    assert(isNhi("ZZZ0024"));
    assert(isNhi("ZAA0067"));
    assert(isNhi("ZAA0075"));
    assert(isNhi("ZAA0083"));
    assert(isNhi("ZAA0091"));
    assert(isNhi("ZAA0105"));
    assert(isNhi("ZAA0113"));
    assert(isNhi("ZAA0121"));
    assert(isNhi("ZAA0130"));
    assert(isNhi("ZAA0148"));
    assert(isNhi("ZAA0156"));
    assert(isNhi("ZAC5361"));
});

Deno.test("valid new format NHI number", () => {
    assert(isNhi("ZBN77VL"));
    assert(isNhi("ZZZ00AC"));
    assert(isNhi("ZDR69YX"));
    assert(isNhi("ZSC21TN"));
    assert(isNhi("ZZB30NH"));
    assert(isNhi("ZYZ81ZV"));
    assert(isNhi("ZVB97XQ"));
    assert(isNhi("ZRA29VA"));
    assert(isNhi("ZYX61YS"));
});

Deno.test("no digit can be added to an old format NHI with a checksum of 0 to make it valid", () => {
    for (let i = 0; i < 10; i++) {
        assertFalse(isNhi(`ZZZ004${i}`));
    }
});

Deno.test("invalid old format NHI numbers", () => {
    assertFalse(isNhi("ZZZ0044"));
    assertFalse(isNhi("ZZZ0017"));
    assertFalse(isNhi("DAB8233"));

    // Needs a check digit of 6
    assertFalse(isNhi("JBX3650"));
    assertFalse(isNhi("JBX3651"));
    assertFalse(isNhi("JBX3652"));
    assertFalse(isNhi("JBX3653"));
    assertFalse(isNhi("JBX3654"));
    assertFalse(isNhi("JBX3655"));
    assertFalse(isNhi("JBX3657"));
    assertFalse(isNhi("JBX3658"));
    assertFalse(isNhi("JBX3659"));
});

Deno.test("invalid new format NHI numbers", () => {
    assertFalse(isNhi("ZZZ00AA"));
    assertFalse(isNhi("ZZZ00AY"));
    assertFalse(isNhi("ZVU27KY"));
    assertFalse(isNhi("ZVU27KA"));

    for (const c of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
        if (c !== "V") {
            assertFalse(isNhi(`ZHW58C${c}`));
        }
    }
});

Deno.test("random strings are invalid", () => {
    assertFalse(isNhi("not an NHI"));
    assertFalse(isNhi("!@#$%&*"));
    assertFalse(isNhi("AAANNNC"));
    assertFalse(isNhi("AAANNAC"));
    assertFalse(isNhi("ZVU27K"));
    assertFalse(isNhi("JBX365"));
});
Deno.test("isNhi is case insensitive", () => {
    assert(isNhi("jBx3656"));
    assert(isNhi("zZz0016"));
    assert(isNhi("zZz0024"));
    assert(isNhi("zAa0067"));
    assert(isNhi("zAa0075"));
    assert(isNhi("zAa0083"));
    assert(isNhi("zAa0091"));
    assert(isNhi("zAa0105"));
    assert(isNhi("zAa0113"));
    assert(isNhi("zAa0121"));
    assert(isNhi("zAa0130"));
    assert(isNhi("zAa0148"));
    assert(isNhi("zAa0156"));
    assert(isNhi("zAc5361"));
    assert(isNhi("zZz00aC"));
    assert(isNhi("zDr69yX"));
    assert(isNhi("zSc21tN"));
    assert(isNhi("zZb30nH"));
    assert(isNhi("zYz81Zv"));
    assert(isNhi("zVb97Xq"));
    assert(isNhi("zRa29Va"));
    assert(isNhi("zYx61Ys"));

    assertFalse(isNhi("zzZ0044"));
    assertFalse(isNhi("zzZ0017"));
    assertFalse(isNhi("daB8233"));
    assertFalse(isNhi("jbX3650"));
    assertFalse(isNhi("jbX3651"));
    assertFalse(isNhi("jbX3652"));
    assertFalse(isNhi("jbX3653"));
    assertFalse(isNhi("jbX3654"));
    assertFalse(isNhi("jbX3655"));
    assertFalse(isNhi("jbX3657"));
    assertFalse(isNhi("jbX3658"));
    assertFalse(isNhi("jbX3659"));
    assertFalse(isNhi("zzZ00aa"));
    assertFalse(isNhi("zzZ00ay"));
    assertFalse(isNhi("zvU27ky"));
    assertFalse(isNhi("zvU27ka"));
    assertFalse(isNhi("zhW58cz"));
});
