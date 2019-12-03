<?php include("head.php"); ?>
<?php include("test-header.php"); ?>

<div class="outern test-outern">

	<div class="content test-content">

		<div class="inner-content test-inner-content">
		
			<!-- dialogy //-->
				<div class="dialog" id="dialog1">
					<form class="default" id="dialogform1">
						<div class="hundred margin-bottom">Vaším úkolem je projít pexesem 3x4 s co nejmenším počtem chybných kliknutí.</div>
						<a class="button" id="submit1" href="#">Přejdi na pexeso</a>
					</form>
				</div>

				<div class="dialog disappear" id="dialog2">
					<form class="default" id="dialogform2">
						<label>Věk</label><input type="number" id="age" name="age" />
						<label>Obor</label>					
						 <select id="spec">
  							<option value="t">Techologie</option>
  							<option value="h">Humanitní vědy</option>
  							<option value="s">Přírodní vědy</option>
  							<option value="n">Nic z výše uvedeného</option>
						</select> 
						
						<label>Počet dětí</label><input type="number" name="child" id="child" />
						<label>Ženatý/vdaná</label><input type="checkbox" id="married" />
						
						<div class="hundred">
							<input class="button" type="button" value="Zpátky k pexesu" id="submit2" />
						</div>
					</form>
				</div>

				<div class="dialog disappear" id="dialog3">
					
					<div class="margin-bottom hundred">Vyberte, jak moc vykonáváte kterou z činností:</div>
					
					<form class="default" id="dialogform3">
					
						<label>Sledování TV</label>
						<div class="row">
						<input type="radio" name="tv" value="1"> <span class="radio-label">Vůbec</span>
						<input type="radio" name="tv" value="2"> <span class="radio-label">Málo</span>
						<input type="radio" name="tv" value="3" checked> <span class="radio-label">Vcelku</span>
						<input type="radio" name="tv" value="4"> <span class="radio-label">Hodně</span>
						<input type="radio" name="tv" value="5"> <span class="radio-label">Pořád</span>
						</div>

						<label>Používání PC</label>
						<div class="row">
						<input type="radio" name="pc" value="1"> <span class="radio-label">Vůbec</span>
						<input type="radio" name="pc" value="2"> <span class="radio-label">Málo</span>
						<input type="radio" name="pc" value="3" checked> <span class="radio-label">Vcelku</span>
						<input type="radio" name="pc" value="4"> <span class="radio-label">Hodně</span>
						<input type="radio" name="pc" value="5"> <span class="radio-label">Pořád</span>
						</div>
						
						<label>Používání sociálních sítí</label>
						<div class="row">
						<input type="radio" name="fb" value="1"> <span class="radio-label">Vůbec</span>
						<input type="radio" name="fb" value="2"> <span class="radio-label">Málo</span>
						<input type="radio" name="fb" value="3" checked> <span class="radio-label">Vcelku</span>
						<input type="radio" name="fb" value="4"> <span class="radio-label">Hodně</span>
						<input type="radio" name="fb" value="5"> <span class="radio-label">Pořád</span>
						</div>
						
						<label>Četba knih</label>
						<div class="row">
						<input type="radio" name="book" value="1"> <span class="radio-label">Vůbec</span>
						<input type="radio" name="book" value="2"> <span class="radio-label">Málo</span>
						<input type="radio" name="book" value="3" checked> <span class="radio-label">Vcelku</span>
						<input type="radio" name="book" value="4"> <span class="radio-label">Hodně</span>
						<input type="radio" name="book" value="5"> <span class="radio-label">Pořád</span>
						</div>

						<label>Hraní PC her</label>
						<div class="row">
						<input type="radio" name="game" value="1"> <span class="radio-label">Vůbec</span>
						<input type="radio" name="game" value="2"> <span class="radio-label">Málo</span>
						<input type="radio" name="game" value="3" checked> <span class="radio-label">Vcelku</span>
						<input type="radio" name="game" value="4"> <span class="radio-label">Hodně</span>
						<input type="radio" name="game" value="5"> <span class="radio-label">Pořád</span>
						</div>

						<label>Poslech hudby</label>
						<div class="row">
						<input type="radio" name="music" value="1"> <span class="radio-label">Vůbec</span>
						<input type="radio" name="music" value="2"> <span class="radio-label">Málo</span>
						<input type="radio" name="music" value="3" checked> <span class="radio-label">Vcelku</span>
						<input type="radio" name="music" value="4"> <span class="radio-label">Hodně</span>
						<input type="radio" name="music" value="5"> <span class="radio-label">Pořád</span>
						</div>

						<input class="button" type="button" value="Pokracuj" id="submit3" />
					</form>
				</div>

				<div class="dialog disappear" id="dialog_final">
					<div class="hundred margin-bottom">Gratulujeme, prošli jste prvním testem. To je ale pouze začátek.</div>
					<form id="dialogformfinal" method="post" action="test2.php">
						<input type="hidden" value="" id="final_age" name="final_age" />
						<input type="hidden" value="" id="final_spec" name="final_spec" />
						<input type="hidden" value="" id="final_child" name="final_child" />
						<input type="hidden" value="" id="final_married" name="final_married" />
						
						<input type="hidden" value="" id="final_tv" name="final_tv" />
						<input type="hidden" value="" id="final_fb" name="final_fb" />
						<input type="hidden" value="" id="final_game" name="final_game" />
						<input type="hidden" value="" id="final_book" name="final_book" />
						<input type="hidden" value="" id="final_music" name="final_music" />
						<input type="hidden" value="" id="final_pc" name="final_pc" />
						
						<input type="hidden" value="" id="final_time" name="final_time" />
						
						<input class="button" type="submit" value="Další test" />
					</form>
				</div>

			<!-- dialogy end //-->
		
			<div class="test disappear">	
				<div class="test-1-line">	
					<a class="test-1-pexeso" href="#"></a>
					<a class="test-1-pexeso" href="#"></a>
					<a class="test-1-pexeso" href="#"></a>
					<a class="test-1-pexeso" href="#"></a>
				</div>
				
				<div class="test-1-line">	
					<a class="test-1-pexeso" href="#"></a>
					<a class="test-1-pexeso" href="#"></a>
					<a class="test-1-pexeso" href="#"></a>
					<a class="test-1-pexeso" href="#"></a>
				</div>
				
				<div class="test-1-line">	
					<a class="test-1-pexeso" href="#"></a>
					<a class="test-1-pexeso" href="#"></a>
					<a class="test-1-pexeso" href="#"></a>
					<a class="test-1-pexeso" href="#"></a>
				</div>
			</div>
		</div>
	</div>

</div>

<div class="test-nav">
	<div class="test-nav-inner">
	1 / 8
	</div>
</div>

<script type="text/javascript" src ="js/common.js"></script>
<script type="text/javascript" src ="js/test1.js"></script>

<?php include("footer.php"); ?>
