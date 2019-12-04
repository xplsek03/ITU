<?php 

	session_start();

	$invalid = False;

	if(!isset($_SESSION["score5"]) || empty($_SESSION["score5"]))
   		$invalid = True;
   		
   	if(!isset($_POST["errcount"]) || empty($_POST["errcount"]))
   		$invalid = True;
   	if(!is_numeric($_POST["errcount"]))
   		$invalid = True;
   	if(!$invalid && ($_POST["errcount"] < 0 || $_POST["errcount"] > 7))
   		$invalid = True;
   	
   	if(!$invalid)
		$_SESSION["score6"] = $_POST["errcount"];  		
	else {
		session_unset();
		session_destroy();
	}
	
	$invalid = False; // DEBUG
?>

<?php include("head.php"); ?>
<?php include("test-header.php"); ?>

	<div class="alert-cover disappear"></div>
	<div id="alert1" class="alert test-7-alert disappear" style="width: 500px;">
		<div class="margin-bottom" style="width: 500px;">
			Bludiště ovládejte šipkami. Snažte se dostat zelenou tečkou (vlevo dole) k fialové tečce (vpravo nahoře). Pokud bludiště nereaguje, klikněte na něj myší.
		</div>
		<div class="test-7-labyrinth"></div>
	</div>

<div class="outern test-outern">

	<div class="content test-content">

		<div class="inner-content test-inner-content">
		
			<?php if(!$invalid): ?>
		
			<!-- dialogy //-->
				<div class="dialog" id="dialog1">
					<div class="hundred margin-bottom">Dostali jste šanci prohlédnout si správné výsledky testu před tím, než se bude psát! Zapamatujte si odpovědi na otázky (ABCD), než se profesor za 15 sekund vrátí a test začne.</div>
					<a class="button" href="#" id="submit1">Zobrazit test</a>
				</div>

			<!-- dialogy end //-->
		
			<div class="test disappear test-7-notebook">
			</div>
			<div class="disappear test-7-send hundred margin-bottom">
					<form id="dialogform3" action="test8.php" method="post">
						<input type="hidden" value="" name="errcount" id="errcount" />
						<input type="submit" class="button" id="submit2" value="Odevzdat test">
					</form>
			</div>

			<?php else: ?>
			
				<?php include("hacker.php"); ?>
			
			<?php endif; ?>
			
		</div>
	</div>

</div>

<div class="test-nav">
	<div class="test-nav-inner">
	7 / 8
	</div>
</div>

<script type="text/javascript" src ="js/common.js"></script>
<script type="text/javascript" src ="js/test7.js"></script>

<?php include("footer.php"); ?> 
