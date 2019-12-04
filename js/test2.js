// zvaliduj zadane slovo
function validate_word() {
	var origin = $("#original-word").val();
	var user = $("#finalword").val();
	var err = 0;
	
	for(let i = 0; i < user.length; i++) {
		if(user.charAt(i).toLowerCase() !== origin.charAt(i).toLowerCase()) {
			err++;
		}
	}
    $("#errcount").val(err); // zvaliduj kolik tam ma chyb
    $("#dialogform3").submit(); // odesli formular a hod sem dalsi test
}

// vygeneruj nahodny znak
function randchar(set) {
    return set[Math.floor(Math.random() * set.length)];
}

// trochu pouprav slovo a hlavne ho vytvor
function confuse_word() {

	var word = ""; // nahodne slovo
	// vytvoreni nahodneho slova
	for(let i = 0; i < 10; i++) {
		let l = randchar("abcdefghijklmnopqrstuvwxyz");
		if(range(0,1)) // 1 ku 2 ze bude male
			word += l;
		else
			word += l.toUpperCase(); // velke			
	}
	$("#original-word").val(word); // nahrej slovo

	var res = ""; // vysledne slovo
	var e = 2; // pocet zmen max 2
	for(let i = 0; i < word.length; i++) {
		var c = word.charAt(i);

		let x = range(1,3);
		if(x == 2 && i > 3 && e > 0) { // 1/3 pripadu, zmen pismeno na jine. Nezacinej od zacatku retezce! Zmen max. dve pismena!
			if(c.toLowerCase() == c)
				c = randchar('abcdehiklmnoprstv');
			else {
				c = randchar('ABCDEHIKLMNOPRSTV');
			}
			e--;
			res += c; // pridej pismeno zpet
		}
		else if(Math.round(Math.random())) { // 1/2 P ze se zmeni velikost
			if(c.toUpperCase() == c) { // byl velky
				res += c.toLowerCase();
			}
			else { // byl maly
				res += c.toUpperCase();
			}
		}
		else {
			res += c; // pridej pismeno zpet
		}			
	}
	$("#confused-word").val(res);
}


// FLOW
$(document).ready(function() {

 	$("#finalword").bind("cut copy paste",function(e) {
 		e.preventDefault();
 	});
	
 	$("#original-word").bind("cut copy paste",function(e) {
 		e.preventDefault();
 	});
 
	confuse_word(); // poprehazet slovo

	// validace a odeslani zadaneho slova
    $("#dialogform3").validate({
  		rules: {
    		finalword: {
      			required:  false,
      			maxlength: 10
    		}
  		}
    });
    $("#submit2").click(function() {
        if($("#dialogform3").valid()) {
            validate_word(); // spocitej chyby
        }
    });

	// kliknuti na start testu
    $("#submit1").click(function() {

		function hideword() {
    		setTimeout(function() {	
    		
    			// zastav ruseni
    			end2 = true;
    			end = true;	
				sir1.stop();
				osc3.stop();
				osc2.stop();
				osc1.stop();
				autoFilter.stop();
				noise.disconnect();
	
				$("body").css("background", "white");
	
    			$("#dialog2").toggleClass("disappear");
    			$("#dialog3").toggleClass("disappear");
							
			}, 10000);
		}
    
    	var end2 = false; // konec zmeny barev pozadi
    	var end = false; // konec ruseni
    	var endblink = false; // konec problikavani
    	
		var i1 = (Math.random()*(4000 - 200))+200; // interval zmeny
		var i2 = (Math.random()*(4000 - 200))+200; // interval zmeny
		var i3 = (Math.random()*(4000 - 200))+200; // interval zmeny
		var fq1 = (Math.random()*(15000 - 16))+16; // frekvence oscilatoru, 16hz - 20khz
		var fq2 = (Math.random()*(15000 - 16))+16; // frekvence oscilatoru, 16hz - 20khz
		var fq3 = (Math.random()*(15000 - 16))+16; // frekvence oscilatoru, 16hz - 20khz
		var s1 = (Math.random()*(1000 - 100))+100; // STOP SIRENA 1 :D
		
		// SUM
		var noise = new Tone.Noise("white").start();
		var autoFilter = new Tone.AutoFilter({
			"frequency" : "2m",
			"min" : 800,
			"max" : 15000
		}).connect(Tone.Master);
		noise.connect(autoFilter);
		autoFilter.start();
		
		// SIRENY A OSCILATORY
		var sir1 = new Tone.Oscillator(666, "sine5").toMaster().start();
		var osc1 = new Tone.Oscillator(fq1, "sine").toMaster().start();
		var osc2 = new Tone.Oscillator(fq2, "square").toMaster().start();
		var osc3 = new Tone.Oscillator(fq3, "triangle").toMaster().start();
		
		function swap1() {
			fq1 = (Math.random()*(15000 - 16))+16;
			osc1.frequency.value = fq1;
		}
		function swap2() {
			fq2 = (Math.random()*(15000 - 16))+16;
			osc2.frequency.value = fq2;
		}
		
		function swap3() {
			fq3 = (Math.random()*(15000 - 16))+16;
			osc3.frequency.value = fq3;
		}
		function sirena1() {
			sir1.stop();
			setTimeout(function() {
				if(!end)
					sir1.start();
			}, 10);		
		}
		
		// blikni na pozadi
		function blink() {
			if(!endblink) {
				$("body").toggleClass("test-2-blink");
				setTimeout(function() {
					$("body").toggleClass("test-2-blink");
				}, 50);	
			}		
		}
		
		// zmen barvu pozadi
		function background() {
			if(!end2) {
				$("body").css("background", "#"+((1<<24)*Math.random()|0).toString(16));
			}
		}
		
		// problikni falesne slovo
		function blink_word() {
			$("#confused-word").toggleClass("disappear"); // zobrazit ho
    		setTimeout(function() {
    			$("#confused-word").toggleClass("disappear"); // skryj ho
    		}, 1500);
		}
		
		setInterval(swap1,i1);
		setInterval(swap2,i2);
		setInterval(swap3,i3);
		setInterval(sirena1,s1);
    	setInterval(blink,1000);

		// 8s, nez obsah stranky zmizi
		setTimeout(function() {
		
			// nasleduje 10s ruseni
    		$(".test").toggleClass("disappear");
    		$("#dialog2").toggleClass("disappear");
    		endblink = true;
    		setInterval(background,500);
    		
    		setTimeout(function() {
    			blink_word();
    		}, 5000);
    		
    		hideword();
			
		}, 8000); // chvili pockej nez nechas zmizet spatny par
    
    	$(".test").toggleClass("disappear");
    	$("#dialog1").toggleClass("disappear");	
    
    });
});




