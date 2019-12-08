var user_input = false; // odkdy muze klikat na prvky aby zmizely
var count = 10; // pocet vyskakovacich oken
var order = [0,1,2,3,4,5,6,7,8]; // poradi v kterem budou mizet
shuffle(order); // vytvor puvodni poradi, podle ktereho se to bude posuzovat
var user_order = []; // uzivatelsky vstup klikanim

// falesna skore
var score = range(27,89);
var score2 = 100 - score;

// nech zmizet postupne jeden prvek za druhym
function disappear(i) {
	$('.test-4-block:eq('+ order[i] +')').toggleClass("hide"); // nech zmizet jeden / s
}

// vygeneruj cisla z range
function range(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// vygeneruj vyskakovaci okno
function generate_alert() {
	$("#disrupt").text("Váš momentální percentil (v %): " + score + "\n(hodnota říká, kolik procent testovaných skončilo v této fázi testu za Vámi).");
	$('#alert1').css("top",range(50,200)+"px");
	$('#alert1').css("left",range(50,600)+"px");
	$('#alert1').toggleClass("disappear");	
}

// zacni zobrazovat alerty
function byrocrat_hell() {
	for(let i = 0; i < 9; i++) { // nastav zpet viditelnost policek
		$('.test-4-block:eq('+ order[i] +')').toggleClass("hide");	
	}
	$('.alert-cover').toggleClass("disappear");	
	generate_alert(); // vygeneruj alert okno
	count--;
}

// spocitej chyby pri klikani na boxiky
function validate_input() {
	var err = 0; // pocet chyb
	for(let i = 0; i < 9; i++) {
		if(user_order[i] !== order[i])
			err++;
	}
	$('#errcount').val(err);// ukaz tlacitko odeslani a zvaliduj napred
	$('#dialogform1').toggleClass("disappear"); // ukaz odesilaci formular
}

$(document).ready(function() {

	// kliknuti na testovou polozku
	$(".test-4-block").click(function() {
		if(user_input) { // odted uz muze klikat
			user_order.push($(this).index()); // uloz do pole klikani usera
			$(this).toggleClass("hide"); // nech kliknutej prvek zmizet
			if(user_order.length == 9) { // kliknul na vsechny
				$('#disappearing').toggleClass("disappear"); // ukaz odesilaci formular
				validate_input();
			}
			
		}
	});

	// klinkuti na odeslani vysledku testu
	$("#submit3").click(function() {
		$('#dialogform1').submit();
	});

	// klinkuti na potvrzeni alertu
	$("#submit2").click(function() {
		$('#alert1').toggleClass("disappear");
		if(count) {
			generate_alert(); // vygeneruj alert okno
			count--;			
		}
		else { // konec vsech alertu
			$('#helptext').toggleClass("disappear");
			$('.alert-cover').toggleClass("disappear");
			user_input = true; // odted muze klikat
		}
	});

	// klik na start testu
	$("#submit1").click(function() {
		$("#dialog1").toggleClass("disappear");
		$(".test").toggleClass("disappear");

		setTimeout(function() { // vterinu pockej
			// nech je postupne zmizet
			for(let i = 0; i < 9; i++) {
				setTimeout(disappear, 1000 * i, i);
			}			
		}, 1000);
		
		setTimeout(function() {
			byrocrat_hell(); // spust urednicke peklo
		}, 10500);
		
	});
});




