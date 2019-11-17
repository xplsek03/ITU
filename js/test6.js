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
	canv.width = 100;
	canv.height = 50;
	var ctx = canv.getContext("2d");
	ctx.font = "25px Georgia";
	ctx.strokeText(captcha.join(""), 0, 30);
	//storing captcha so that can validate you can save it somewhere else according to your specific requirements
	code = captcha.join("");
	document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
	event.preventDefault();
	
	if(field_ok()) { // captcha je spravne vyplnena, ale znaky mohou byt spatne
		if (document.getElementById("cpatchaTextBox").value == code) { // schvalne vyhod chybu
			if(count == 3)
				$("#captcha-error").text("Spatne vlozena captcha.");
			if(count == 2)
				$("#captcha-error").text("Captcha se bohuzel neulozila, zkuste to jeste jednou.");
			if(count == 1)
				$("#captcha-error").text("A jeste jednou :)");
			createCaptcha();
		}
		else { // zvoral vyplnovani
			$("#captcha-error").text("Spatne vlozena captcha.");
			createCaptcha();
		}
	}
	else {
		$("#captcha-error").text("Spatne jste vyplnili captcha formular.");
		return;
	}
}

var count = 3; // pocet captcha formularu

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
    	$("#errcount").val(validate_number()); // zvaliduj kolik tam ma chyb
    	$("#dialogform3").submit(); // odesli formular a hod sem dalsi test
	});

	// klikni na odeslat captcha, zobraz 3 * chybovou zpravu
	$("#captcha-pain").click(function() {

		if(!field_ok()) // captcha je schvalne spatne vyplnena
			return;
		captcha_hell();
	});

	// kliknuti na start testu
    $("#submit1").click(function() {

    	$(".test").toggleClass("disappear");
    	$("#dialog1").toggleClass("disappear");

		// 15s, nez vyskoci prvni captcha
		setTimeout(function() {
			$('.alert-cover').toggleClass("disappear");
			$('#alert1').toggleClass("disappear");
			captcha_hell();			
		}, 1500);	
    
    });
});




