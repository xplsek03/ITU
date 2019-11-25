var touchable = true; // muze klikat na obrazovku
var time = 0; // pocet s
var move = 0; // pocet tahu
var turned = []; // bufer otoceneho paru
var finished = []; // dokoncene pozice
var active_dialog = 1; // ktery dialog se ma zrovna postupne zobrazit
const data = shuffle([0,1,2,3,4,5,6,7,8,9,10,11]); // pomichej hodnoty konkretnich karticek
// indexy: [0 1 2 3 ..]: 0,1: 1.jpg, 2,3: 2.jpg ..
// 0 1 : 1
// 2 3 : 2
// 4 5 : 3
// 6 7 : 4
// 8 9 : 5
// 10 11: 6
var dialog = true; // ukazuje se dialog / nebo se ukazuje test

// namapuj karticku na prideleny obrazek
function findcard(x, data) {
	for(let i = 0; i < 12; i++) {
		if(x == data[i]) {
			if(i < 2)
				return 1;
			else if(i < 4)
				return 2;
			else if(i < 6)
				return 3;
			else if(i < 8)
				return 4;
			else if(i < 10)
				return 5;
			else
				return 6;	
		}
	}
}

// najdi jestli k sobe karticky patri
function samecard(x,y) {
	for(let i = 0; i < 12; i += 2) {
		if(x == data[i] || y == data[i]) { // jeden z nich odpovida prvnimu prvku z tuple
			if(y == data[i+1] || x == data[i+1])
				return true;
		}
	}
	return false;
}

// prvek je v listu dokoncenych paru
function inlist(x) {
	for(let i = 0; i < finished.length; i++) {
		if(x == finished[i])
			return true;
	}
	return false;
}

// pocitej cas
function tajm(t) {
	if(!dialog)
    	t++;
}

// zvaliduj dialog a pokracuj dal
function next() {
    $(".test").toggleClass("disappear");
    $("#dialog"+active_dialog).toggleClass("disappear");	
    dialog = false;
    active_dialog++; // priste budes prepinat dialog o jedna vyssi
}

setInterval(tajm,1000); // every millisecond call updateDisplay

// callback na kliknuti na karticku
$(".test-1-pexeso").click(function() {

	if(touchable) { // smi klikat
	
    	let x = $('.test-1-pexeso').index(this); // ktery je konkretni karticka element
    	
    	if(!inlist(x) && !(turned.length == 1 && turned[0] == x)) { // POKUD NEKLIKNUL NA TO CO UZ TAM MA NA PRVNIM MISTE NEBO CO UZ JE OTOCENE
    	
    		turned.push(x); // pridej do seznamu otocenych
    		$(this).addClass("pexeso" + findcard(x,data));
	
    		if(turned.length == 2) { // POROVNAT POKUD MA OTOCENE DVE
    		
    			if(!samecard(turned[0],turned[1])) { // nejsou stejne
    				touchable = false; // nesmi klikat
    				setTimeout(function() {
    					$('.test-1-pexeso:eq('+ turned[0] +')').removeClass("pexeso" + findcard(turned[0],data));
    					$('.test-1-pexeso:eq('+ turned[1] +')').removeClass("pexeso" + findcard(turned[1],data));  	
    					move++;
    					turned = []; // vyprazdni seznam 
    					touchable = true; // zapni zpet klikani
    				}, 500); // chvili pockej nez nechas zmizet spatny par
    			} 
    			else { // jsou stejne
       				if(active_dialog < 4) { // postupne zobrazis tri dialogy
       					$(".test").toggleClass("disappear");
    					$("#dialog"+active_dialog).toggleClass("disappear");
    				}
    				finished.push(turned[0]); // uloz do seznamu hotovych
    				finished.push(turned[1]); // uloz do seznamu hotovych
    				dialog = true;	
    				move++;
    				turned = []; // vyprazdni seznam 
    				
    				// ZOBRAZ UKONCOVACI DIALOG
    				if(finished.length == 12) {
   						$(".test").toggleClass("disappear");
    					$("#dialog_final").toggleClass("disappear");	    					
    				}
    				
    			}	    	
    		}
    		
    	}
	}    	  
    
});

// DOM OPS

$(document).ready(function() {
    $("#dialogform1").validate({
  		rules: {
    		username: {
      		required: true,
      		minlength: 1,
      		maxlength: 10
    		},
    		pwd1: {
      		required: true,
      		minlength: 5,
      		maxlength: 10
    		},
    		pwd2: {
      		required: true,
      		minlength: 5,
      		maxlength: 10,
      		equalTo: "#pwd1"
    		}
  		}
    });
    $("#submit1").click(function() {
        $("#dialog1").toggleClass("disappear");
        $(".test").toggleClass("disappear");
    });

    $("#dialogform2").validate({
  		rules: {
    		age: {
      		required: true,
      		max: 120,
      		min: 5
    		},
    		child: {
      		required:  false,
      		max: 25
    		}
  		}
    });
    $("#submit2").click(function() {
        if($("#dialogform2").valid()) {
            next();
            $("#final-age").val($("#age").val());
            $("#final-spec").val($("#spec").val());
            $("#final-child").val($("#child").val());
            $("#final-married").val($("#married").val());
        }
    });
    
    $("#submit3").click(function() {
        next();
        $("#final-book").val( $('input[name=book]:checked', '#dialogform3').val() );
        $("#final-tv").val( $('input[name=tv]:checked', '#dialogform3').val() );
        $("#final-pc").val( $('input[name=pc]:checked', '#dialogform3').val() );
        $("#final-game").val( $('input[name=game]:checked', '#dialogform3').val() );
        $("#final-fb").val( $('input[name=fb]:checked', '#dialogform3').val() );
        $("#final-music").val( $('input[name=music]:checked', '#dialogform3').val() );
    });
});
