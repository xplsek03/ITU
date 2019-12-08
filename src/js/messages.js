jQuery.extend(jQuery.validator.messages, {
    required: "Toto pole je povinné.",
    remote: "Opravte prosím toto pole.",
    email: "Nevalidní formát e-mailové adresy.",
    url: "Nevalidní URL adresa.",
    date: "Vložte platné datum.",
    dateISO: "Vložte planté ISO datum.",
    number: "Vložte číslo.",
    digits: "Vložte pouze číslice.",
    creditcard: "Neplatné číslo kreditní karty.",
    equalTo: "Odlišná hodnota, opravte.",
    accept: "Neplatná koncovka souboru.",
    maxlength: jQuery.validator.format("Vložte maximálně {0} znaků."),
    minlength: jQuery.validator.format("Vložte nejméně {0} znaků."),
    rangelength: jQuery.validator.format("Vložte hodnotu dlouhou {0} až {1} znaků."),
    range: jQuery.validator.format("Vložte hodnotu mezi {0} a {1}."),
    max: jQuery.validator.format("Hodnota musí být stjená nebo menší než {0}."),
    min: jQuery.validator.format("Hodnota musí být stejná nebo větší než {0}.")
});
