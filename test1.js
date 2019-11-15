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

// funkce na michani poradi
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

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
