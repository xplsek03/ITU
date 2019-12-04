// https://codepen.io/manishjanky/pen/eRNKLL
var code;
function createCaptcha() {
	//clear the contents of captcha div first 
	document.getElementById('captcha').innerHTML = "";
	var charsArray =
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var lengthOtp = 6;
	var captcha = [];
	for (var i = 0; i < lengthOtp; i++) {
		//below code will not allow Repetition of Characters
		var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
		if (captcha.indexOf(charsArray[index]) == -1)
    		captcha.push(charsArray[index]);
		else i--;
	}
	var canv = document.createElement("canvas");
	canv.id = "captcha";
	$("#captcha").addClass("test-6-canvas");
	canv.width = 250;
	canv.height = 60;
	var ctx = canv.getContext("2d");
	ctx.font = "25px Georgia";
	ctx.strokeText(captcha.join(""), 0, 30);
	//storing captcha so that can validate you can save it somewhere else according to your specific requirements
	code = captcha.join("");
	document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
	event.preventDefault();
	
	if(!field_ok()) { // captcha je schvalne spatne vyplnena, hacker!
		if(count < 3)
			count++; // vrat hacker attempt zpatky za trest
		$("#captcha-error").text("Schválně špatně vyplněný captcha formulář.");
	}
	else { // nesnazi se to obejit
		if(document.getElementById("cpatchaTextBox").value == code) { // schvalne vyhod chybu
			$("#captcha-error").text("Špatně vložená validace. Nebo je to tak schválně? Vlož znovu :)");
		}
		else {
			$("#captcha-error").text("Špatně vyplněný captcha formulář.");
		}
	}
	$("#cpatchaTextBox").val("");
	captcha_hell();
	
}

// funkce na michani poradi
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var clicked = 0; // kolik polozek fake seznamu je zacernenych
var count = 2; // pocet captcha formularu
var full_list = [['Lososový filet',22.0],['Smetana do kávy',0.3],['Rohlík',0.03],['Školní sešit',1.4],['Pečicí papír',2.38],
				['Vánoční cukroví',14.50],['Rajčatový protlak',1.0],['Tuňáková konzerva',0.98],['Šunkový salám 150g',4.9],['Pomeranč 6ks',3.4],
				['Red Bull 1ks',1.09],['Balicí papír',3.4],['Broskvová zavařenina',0.66],['Žitný chléb 1ks',2.3],['Kečup 90%',3.4],
				['Kečup 95%',3.5],['Bageta',0.1],['Smetana na vaření',0.6],['Kapr 700g',16.0],['Záchodová štětka',2.5],
				['Pivo Heineken',0.88],['Meruňková zmrzlina',4.5],['Mleté hovězí maso',6.35],['Žvýkačky Orbit',0.9],['Žvýkačky Airways',0.7],
				['Rum Božkov',8.2],['Čínská polévka',0.13]];

shuffle(full_list);
var list = full_list.slice(0,7); // seznam pouzitych prvku

$('#test-6-receipt').append("<i>LÉDL, maloobchodní prodejna</i><br><i>Falešná 1, Brno-Lesná</i><br><i>id účtenky: 456743678976</i><br><i>datum a čas prodeje: 15/4/2019 5:25:25</i><br><i>id pro NéééT: g0t0h411y0u455</i><br><br>"); // uvod uctenky

// napln uctenku
for(let i = 0; i < list.length; i++) {
	$('#test-6-receipt').append(list[i][0]);
	$('#test-6-receipt').append(" .......... ");
	$('#test-6-receipt').append(list[i][1]+"€");
	$('#test-6-receipt').append('<br>');
}
$('#test-6-receipt').append("<br><i>celková cena: ");
let price = 0;
for(let i = 0; i < list.length; i++)
	price += list[i][1];
$('#test-6-receipt').append(price + "€</i><br>");
$('#test-6-receipt').append("<i>celkem zaplaceno: 0€</i><br>");
$('#test-6-receipt').append("<i>Děkujeme Vám za nákup!</i><br><br>");

// vytvor falesnou uctenku
function fake_receipt() {

	var fake_list = full_list.slice(0,20); // fake seznam obsahuje i spravne polozky
	shuffle(fake_list); // zamichej falesny seznam

	$('#test-6-receipt').empty(); // vyprazdni uctenku

	$('#test-6-receipt').append("<i>LEMPL, velkoobchodní prodejna</i><br><i>Zaručeně pravá 2, Brno-Střed</i><br><i>id účtenky: 45674367897</i><br><i>datum a čas prodeje: 15/4/2019 5:35:25</i><br><i>id pro E.T.: l4ugh1ngm4n</i><br><br>"); // uvod uctenky
	
	// napln uctenku
	for(let i = 0; i < fake_list.length; i++) {
	
		if(list.indexOf(fake_list[i]) >= 0)	
			$('#test-6-receipt').append("<a class=\"fake-item padding\">" + fake_list[i][0] + " .......... " + fake_list[i][1]+"€</a><br>");
		else
			$('#test-6-receipt').append("<a class=\"fake-item\">" + fake_list[i][0] + " .......... " + fake_list[i][1]+"€</a><br>");
	}
	$('#test-6-receipt').append("<br><i>celková cena: ");
	let price = 0;
	for(let i = 0; i < fake_list.length; i++)
		price += fake_list[i][1];
	$('#test-6-receipt').append(price + "€</i><br>");
	$('#test-6-receipt').append("<i>celkem zaplaceno: 1€</i><br>");
	$('#test-6-receipt').append("<i>Děkujeme Vám za nákyp!</i><br><br>");
		
	$('#test-6-receipt').toggleClass("disappear"); // zobraz uctenku
	$('#helptext').toggleClass("disappear");

	// klikni na polozku fake seznamu
	$(".fake-item").click(function() {
	
		if(clicked < fake_list.length-list.length) { // jeste muze klikat
			if($(this).hasClass("striked")) {
				// odcerni polozku
				clicked--;
				$(this).toggleClass("striked");
			}
			else {
				// zacerni polozku
				clicked++;
				$(this).toggleClass("striked");
			}
		}
		else if(clicked == fake_list.length-list.length) { // uz muze jedine odebrat polozku
			if($(this).hasClass("striked")) {
				// odcerni polozku
				clicked--;
				$(this).toggleClass("striked");
			}			
		}
	});

}

// over naklikane polozky nakupu
function validate_items() {
	var selected = $(".padding"); // vsechny spravne polozky	
	var err = 0; // pocet chyb
	
	for(let i = 0; i < selected.length; i++) { // neco co nemelo byt zaskrtnute zaskrtnul
		if($(selected[i]).hasClass("striked"))
			err++;
	}

	if(selected.length < list.length) {
		err += (list.length - selected.length); // nejake polozky nevybral, chyba
	}
	
	if(err > list.length) // korekce chyb
		err = list.length;
		
    $("#errcount").val(err); // zvaliduj kolik tam ma chyb
    $("#dialogform3").submit(); // odesli formular a hod sem dalsi test
	
}

// over, jestli se formular captcha pokusil spravne vyplnit
function field_ok() {
	var s = document.getElementById("cpatchaTextBox").value;
	if(s[0] !== code[0] || s[1] !== code[1])  {// prvni a druhe znaky nesedi, hacker se musi trochu snazit
		return 0;
	}
	if(s.length !== 6) {// delka neni sest znaku
		return 0;
	}
	// porovnej postupne znaky, jeslti tam nezadal nejake stejne
	for(let i = 0; i < s.length-1; i++) {
		var c = s.charAt(i); // aktualni znak
		for(let j = i+1; j < s.length; j++) {
			if(c == s[j]) {
				return 0;
			}
		}
	}
	return 1; // v poradku, nepokousel se podvadet
}

// captcha trikrat za sebou
function captcha_hell() {

	if(count) { // vygeneruj captcha
		createCaptcha();
		count--;
	}
	else { // konec generovani, zobraz vyplneni testu
		$('.alert-cover').toggleClass("disappear");
		$('#alert1').toggleClass("disappear");
	}
}

// vygeneruj cisla z range
function range(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// FLOW
$(document).ready(function() {

	// odeslani poctu chyb
    $("#submit2").click(function() {
		validate_items();
	});

	// kliknuti na start testu
    $("#submit1").click(function() {

    	$(".test").toggleClass("disappear");
    	$("#dialog1").toggleClass("disappear");

		// 10s, nez vyskoci prvni captcha
		setTimeout(function() {
			$('#test-6-receipt').toggleClass("disappear");
			$('.alert-cover').toggleClass("disappear");
			$('#alert1').toggleClass("disappear");
			captcha_hell();
			fake_receipt(); // vypln falesnou uctenku
		}, 10000);	
    
    });
});




