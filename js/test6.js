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
	canv.width = 200;
	canv.height = 60;
	var ctx = canv.getContext("2d");
	ctx.font = "25px Georgia";
	ctx.strokeText(captcha.join(""), 0, 30);
	//storing captcha so that can validate you can save it somewhere else according to your specific requirements
	code = captcha.join("");
	console.log(code);
	document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
	event.preventDefault();
	
	if(field_ok()) { // captcha je spravne vyplnena, ale znaky mohou byt spatne
		if (document.getElementById("cpatchaTextBox").value == code) { // schvalne vyhod chybu
			$("#captcha-error").text("Spatne vlozena captcha. Nebo ne? :)");
			createCaptcha();
		}
		else { // zvoral vyplnovani
			$("#captcha-error").text("Spatne vlozena captcha.");
			createCaptcha();
		}
	}
	else {
		$("#captcha-error").text("Spatne vyplneny captcha formular.");
		return;
	}
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
var count = 3; // pocet captcha formularu
var full_list = [['zhulena liska',24],['boxovaci pytel',50],['cervena karkulka',11],['modry notebook',67],['Linz',689],
				['vanocni cukrovi',22],['google.cz',36],['douhe bidlo',98],['nechutny obed',33],['modry pomeranc',44],
				['mechanicky pomeranc',1],['rychle a zbesile',3],['dovolena v karibiku',89],['tri muzi ve clunu',6],['dveste parku',5],
				['parkova oslava',35],['futro',37],['mnozina prvocisel',54],['odkladac',555],['ucpanej zachod',5],
				['zelena zirafa',150],['modry destnik',30],['golfova hul',58],['pripojka na iphone',111],['mixer na kafe',231],
				['big shock',2],['vodka s dzusem',467]];

shuffle(full_list);
var list = full_list.slice(0,7); // seznam pouzitych prvku

$('#test-6-receipt').append("<i>LEDL, maloobchodni prodejna</i><br><i>Falesna 1, Brno-Lesna</i><br><i>id uctenky: 456743678976</i><br><i>datum a cas prodeje: 15/4/2019 5:25:25</i><br><i>id pro EET: g0t0h411y0u455</i><br><br>"); // uvod uctenky

// napln uctenku
for(let i = 0; i < list.length; i++) {
	$('#test-6-receipt').append(list[i][0]);
	$('#test-6-receipt').append(" .......... ");
	$('#test-6-receipt').append(list[i][1]+"€");
	$('#test-6-receipt').append('<br>');
}
$('#test-6-receipt').append("<br><i>celkova cena: ");
let price = 0;
for(let i = 0; i < list.length; i++)
	price += list[i][1];
$('#test-6-receipt').append(price + "€</i><br>");
$('#test-6-receipt').append("<i>celkem zaplaceno: 0€</i><br>");
$('#test-6-receipt').append("<i>Dekujeme Vam za nakup!</i><br><br>");

// vytvor falesnou uctenku
function fake_receipt() {

	var fake_list = full_list.slice(0,20); // fake seznam obsahuje i spravne polozky
	shuffle(fake_list); // zamichej falesny seznam

	$('#test-6-receipt').empty(); // vyprazdni uctenku

	$('#test-6-receipt').append("<i>LEMPL, velkoobchodni prodejna</i><br><i>Prava 2, Brno-Stred</i><br><i>id uctenky: 45674367897</i><br><i>datum a cas prodeje: 15/4/2019 5:35:25</i><br><i>id pro EET: l4ugh1ngm4n</i><br><br>"); // uvod uctenky
	
	// napln uctenku
	for(let i = 0; i < fake_list.length; i++) {
	
		if(list.indexOf(fake_list[i]) >= 0)	
			$('#test-6-receipt').append("<a class=\"fake-item padding\">" + fake_list[i][0] + " .......... " + fake_list[i][1]+"€</a><br>");
		else
			$('#test-6-receipt').append("<a class=\"fake-item\">" + fake_list[i][0] + " .......... " + fake_list[i][1]+"€</a><br>");
	}
	$('#test-6-receipt').append("<br><i>celkova cena: ");
	let price = 0;
	for(let i = 0; i < fake_list.length; i++)
		price += fake_list[i][1];
	$('#test-6-receipt').append(price + "€</i><br>");
	$('#test-6-receipt').append("<i>celkem zaplaceno: 1€</i><br>");
	$('#test-6-receipt').append("<i>Nedekujeme Vam za nakup!</i><br><br>");
		
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
		
	return err;
	
}

// over, jestli se formular captcha pokusil spravne vyplnit
function field_ok() {
	var s = document.getElementById("cpatchaTextBox").value;
	if(s[0] !== code[0] || s[1] !== code[1]) // prvni a druhe znaky nesedi, hacker se musi trochu snazit
		return 0;
	if(s.length !== 6) // delka neni sest znaku
		return 0;
	// porovnej postupne znaky, jeslti tam nezadal nejake stejne
	for(let i = 0; i < s.length-1; i++) {
		var c = s.charAt(i); // aktualni znak
		for(let j = i+1; j < s.length; j++) {
			if(c == s[j])
				return 0;
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
    	$("#errcount").val(validate_items()); // zvaliduj kolik tam ma chyb
    	$("#dialogform3").submit(); // odesli formular a hod sem dalsi test
	});

	// klikni na odeslat captcha, zobraz 3 * chybovou zpravu
	$("#captcha-pain").click(function() {

		if(!field_ok()) // captcha je schvalne spatne vyplnena, hacker!
			return;
		captcha_hell();
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




