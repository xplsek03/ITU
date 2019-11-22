var inside = false; // sipka je uvnitr catcheru
var dir = 37; // smer sipky, start je vzdy doleva
var finished = false; // konec slideshow
var hits = 0; // kolikrat se trefil
var miss = 0; // pocet chyb

var clicked = false; // v tomto kole uz jednou kliknul

// skore obrazku
var img_miss = 0;
var img_hits = 0;

var origin = []; // pole puvodnich obrazku, prehazene a doplnene

// soucast fronty obrazku
var current = 0; // id aktualniho obrazku co zrovna sviti
var pos = 0; // pozice v seznamu

for(let i = 0; i < 15; i++) { // pro kazdy obrazek
	for(let j = 0; j < range(1,2); j++) { // vytvor nahodny pocet kopii
		origin.push(i); // a strc je do pole
	}
}
shuffle(origin);

// spust slideshow obrazku
function slideshow() {
	for(let i = 0; i < origin.length; i++) {
		setTimeout(function() {
			// zobraz obrazek ze seznamu
			$('#test-8-image').attr("src","img/test8/"+ origin[i] +".jpg");
			
			if(i == origin.length-1) { // posledni prvek
				setTimeout(function() {
					finished = true; // konec
				},2500);
			}

			current = origin[i]; // aktualni obrazek
			pos = i; // uloz pozici
			
		}, i * 2500);
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

// vygeneruj cisla z range
function range(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// jestli je tam obrazek poprve nebo ne
function firsttime() {
	for(let i = 0; i < pos; i++) {
		if(current == origin[i]) {
			return false;
		}
	}
	return true;
}

// stisknul klavesu
$(document).on('keyup',function(e) {

		if(e.which == 32) { // macka spacebar
		
			if(clicked_space) // uz na to predtim kliknul
				return;
		
			if(!firsttime()) { // pokud to zmacknul a obrazek tam neni poprve
				img_hits++;
				clicked_space = true;
			}
			else { // obrazek tam jeste nebyl
				img_miss++;
				clicked_space = true;
			}
		}
		else if(inside && !clicked) { // je uvnitr
			if(e.which == dir) { // trefil se sipkou
				$("#arrow").css({"background":"green"});
				hits++;
				clicked = true;
			}
			else {
				$("#arrow").css({"background":"red"});
				setTimeout(function() {
					$("#arrow").css({"background":"#843b62"});
				},200);
				miss++; // trefil se do jine sipky, neni to spacebar
				clicked = true;
			}
		}
		else {
			$("#arrow").css({"background":"red"});
			setTimeout(function() {
				$("#arrow").css({"background":"#843b62"});
			},200);
			miss++;		
			clicked_space = true;
		}
});

// spocitej pocet chyb
function count_result() {
	if((img_hits == 0 && img_miss == 0) || (miss == 0 && hits == 0)) // kdyby delal jenom jednu cast zaraz
		return 0;
	var c = 2 * img_hits + hits - 2 * img_miss - miss;
	if(c < 0)
		return 0;
	return c;	
}

// FLOW
$(document).ready(function() {

	// zmen sipku a jed znovu
	function loop_over() {
	
		if(finished) { // konec
    			$("#errcount").val(count_result()); // zvaliduj kolik udelal chyb
    			$("#dialogform3").submit(); // odesli formular a ukonci testovani
    			console.log($("#errcount").val());
			return;
		}
			
		$('#arrow').css({"display":"none"});
		dir = range(37,40); // vygeneruj smer sipky
		
		if(dir == 38)
			$('#arrow').text("↑");
		else if(dir == 37)
			$('#arrow').text("←");
		else if(dir == 40)
			$('#arrow').text("↓");
		else
			$('#arrow').text("→");

		setTimeout(function() {
			$('#arrow').css({"display":"block"});
			loop();
		},0);
	}

	// pohni sipkou
    function loop() {
    	clicked = false;
    	clicked_space = false;
    	$("#arrow").css({"background":"#843b62"});
        $('#arrow').css({left:0});
        $('#arrow').animate({left: '+=750'},
  
  			{
  				duration: 2500,
        		easing: 'linear',
  				step: function(now, fx) {
    				if(now >= 350-20 && now <= 400+20) // uvnitr catcheru
    					inside = true;
    				else
    					inside = false;
  				},
        		complete: loop_over
    		}  
        );
    }

	// kliknuti na start testu
    $("#submit1").click(function() {
    	$(".test").toggleClass("disappear");
    	$("#dialog1").toggleClass("disappear");
    	setTimeout(function() {
    		$("#arrow").toggleClass("disappear");
    		loop();
    	}, 2000);
    	setTimeout(function() {
    		slideshow();
    	}, 4000);    
    });
});




