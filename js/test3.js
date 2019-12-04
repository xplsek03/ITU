var blockbutton = false; // zablokuj klikani na tlacitko vypinace
var colors = [['0','brown'],['1','purple'],['2','yellow'],['3','red'],['4','pink'],['5','green'],['6','orange'],['7','blue']]; // seznam barev bloku
shuffle(colors); //zamichej barvy - vychozi poradi
var origin = Array.from(colors); // udelej kopii puvodnich barev
var counter = 7; // pocitadlo vterin textu lightswitche

// prirad barvy
for(let i = 0; i < 8; i++) {
	$('.test-3-block:eq('+ i +')').css("background", colors[i][1]);
}

// zmen text tlacitka lightswitche
function changetext() {
	if(counter > 3) {
		$("#submit2").text("Probíhá výměna žárovky (" + counter + ")");
		counter--;
	}
}

// zvaliduj poradi barev a odesli
function validate_colors() {
	var err = 0; // pocet chyb
	for(let i = 0; i < 8; i++) {
		let c = $('.test-3-block:eq('+ i +')').attr('class').split(' ')[1][5]; // ze split. tridy - je to druha polozka - vyber paty znak (cislo)
		if(c !== origin[i][0])
			err++;
	}
	$("#errcount").val(err);
	$("#dialogform1").submit();	
} 

$(document).ready(function() {

	// klikni na odeslani formulare
	$("#submit3").click(function() {
		validate_colors();	
	});

	// kliknuti na "rozsvitit" :))
    $("#submit2").click(function() {
		
		if(!blockbutton) { // jeste se neklikalo na vypinac
			blockbutton = true; // zablokuj dalsi klikani na tlacitko
			var text = setInterval(changetext, 1000);		
	
			// po pet sekund men obsah tlacitka, potom nasleduje tohle
			setTimeout(function() {
			
				clearInterval(text); // zrus obnovovani textu vypinace
    			$("#submit2").toggleClass("disappear"); // nech  zmizet vypinac	
				
				// CREEPY START
				$(".test").toggleClass("disappear"); // schovej test
				let audio = new Audio('sound/test3/creepy.mp3'); // musi mit akorat 3s
				audio.play();
				$("body").css("background", "url('img/test3/creepy.jpg') no-repeat center center fixed");
				$("body").css("background-size", "cover");
	
				shuffle(colors); // zamichej znovu barvy
				// znovu prirad barvy
				for(let i = 0; i < 8; i++) {
					$('.test-3-block:eq('+ i +')').css("background", colors[i][1]);
					$('.test-3-block:eq('+ i +')').addClass("color"+colors[i][0]);
				}
		
				// po uplynuti dalsich 3s
				setTimeout(function() {
					audio.pause();
					$(".test").toggleClass("disappear"); // zobraz test
					$("body").css("background", "white");
					$("#dialogform1").toggleClass("disappear"); // ukaz formular odeslani
					$("#helptext").toggleClass("disappear");
					
					$("header").toggleClass("disappear");
					$(".test-nav").toggleClass("disappear");
				
					// barvy se ted daji pretahovat
    				$("#sortable").sortable();
    				$("#sortable").disableSelection();
					
				}, 3000);
		
			}, 5000);
		}		
	});

	// kliknuti na start testu
    $("#submit1").click(function() {
    	$(".test").toggleClass("disappear");
    	$("#dialog1").toggleClass("disappear");
    	
		setTimeout(function() {
			// po uplynuti cekaci doby
			for(let i = 0; i < 8; i++) {
				$('.test-3-block:eq('+ i +')').css("background", "white");
			}	
			$("header").toggleClass("disappear"); // zmiz hlavicku
			$(".test-nav").toggleClass("disappear"); // zmiz footer	
			$("body").css("background","black"); // ztmav to, bloky se krasne nasviti
			$("#submit2").toggleClass("disappear"); // zobraz lightswitch
			
		}, 10000);			
	});
});




