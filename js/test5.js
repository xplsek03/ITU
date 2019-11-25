// zvaliduj zadane slovo
function validate_number() {
	var origin = $("#original-number").val().toString();
	var user = $("#finalnumber").val().toString();
	var err = 0;
	
	for(let i = 0; i < user.length; i++) {
		if(user.charAt(i).toLowerCase() !== origin.charAt(i).toLowerCase()) {
			err++;
		}
	}
	return err;
}

// vygeneruj nahodny znak
function randchar(set) {
    return set[Math.floor(Math.random() * set.length)];
}

// zobraz alert, nekdo vola
function someone_calling() {
	$('.alert-cover').toggleClass("disappear");
	$('#alert1').toggleClass("disappear");
	ringtone.loop = true;
	ringtone.play();
}

// ukonceni hovoru
function call_end() {
	speech.pause();
	$(".test-5-counter").text("Hovor ukončen");
	$("#hangcall").toggleClass("disappear");
	
	// nech zmizet alert
	setTimeout(function() {
		$('.alert-cover').toggleClass("disappear");
		$('#alert1').toggleClass("disappear");		
	}, 2000);
	
}

// zahajeni hovoru a pocitani casu
function call_counter() {
	// skryj cislo
	$(".test").toggleClass("disappear");
	$("#dialog3").toggleClass("disappear");
	
	// zacni mluvit
	ringtone.loop = false;
	ringtone.pause();
	speech.play();
	$("#hangcall").text("Zavěsit");
	calling = true; // probiha hovor
	$(".test-5-counter").toggleClass("disappear");
	
	for(let i = 1; i <= 10; i++) {
		setTimeout(function() {
			if(i < 10)
				$(".test-5-counter").text("00:0"+i);
			else
				$(".test-5-counter").text("00:"+i);
		}, i * 1000);
	}
	
	// ukonceni hovoru
	setTimeout(function() {
		call_end();
	}, 11000); 
}

// vygeneruj puvodni cislo a uloz ho
var numb = "";
numb += randchar("567");
for(let i = 0; i < 8; i++) {
	numb += randchar("0123456789");
}
$("#original-number").val(numb);

var speech = new Audio('sound/test5/call.mp3'); // hovor
var ringtone = new Audio('sound/test5/ringtone.mp3'); // vyzvaneni
var calling = false; // probihajici hovor
var hangstatus = 0; // kolikrat kliknul na zavesit

// FLOW
$(document).ready(function() {

	// validace a odeslani zadaneho slova
    $("#dialogform3").validate({
  		rules: {
    		finalnumber: {
      			required:  false,
      			maxlength: 10
    		}
  		}
    });
    $("#submit2").click(function() {
        if($("#dialogform3").valid()) {
        	$("#errcount").val(validate_number()); // zvaliduj kolik tam ma chyb
        	$("#dialogform3").submit(); // odesli formular a hod sem dalsi test
        }
    });

	// prijeti hovoru
	$("#takecall").click(function() {
		$("#takecall").toggleClass("disappear");
		call_counter();
	});
	
	// odmitnuti hovoru, dava mu to iluzi svobody; nez tam nedat zadny tlacitka
	$("#hangcall").click(function() {
	
		if(calling) { // probiha hovor, chce zavesit
			$("#hangcall").text("Někdo blokuje hovor.");
			setTimeout(function() {
				$("#hangcall").text("Zavěsit");
			}, 1000);
		}
		else { // chce odmitnout hovor
			if(hangstatus < 4) {
			if(hangstatus == 0)
				$("#hangcall").text("Zvedni to!");
			else if(hangstatus == 1)
				$("#hangcall").text("...");
			else if(hangstatus == 2)
				$("#hangcall").text("Už to nemačkej.");
			else
				$("#hangcall").toggleClass("disappear");
			hangstatus++;
			}
		}
	});

	// kliknuti na start testu
    $("#submit1").click(function() {

    	$(".test").toggleClass("disappear");
    	$("#dialog1").toggleClass("disappear");

		// 10s, nez nekdo zavola
		setTimeout(function() {
			someone_calling();			
		}, 10000);	
    
    });
});




