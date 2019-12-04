<?php 

	session_start();

	$invalid = False;

	if(!isset($_SESSION["score6"]) || empty($_SESSION["score6"]))
   		$invalid = True;
   		
   	if(!isset($_POST["errcount"]) || empty($_POST["errcount"]))
   		$invalid = True;
   	if(!is_numeric($_POST["errcount"]))
   		$invalid = True;
   	if(!$invalid && ($_POST["errcount"] < 0 || $_POST["errcount"] > 8))
   		$invalid = True;
   	
   	if(!$invalid)
		$_SESSION["score7"] = $_POST["errcount"];  		
	else {
		session_unset();
		session_destroy();
	}
	
	//$invalid = False; // DEBUG
?>

<?php include("head.php"); ?>
<?php include("test-header.php"); ?>

<div class="outern test-outern">

	<div class="content test-content">

		<div class="inner-content test-inner-content">

			<?php if(!$invalid): ?>
		
			<!-- dialogy //-->
				<div class="dialog" id="dialog1">
					<div class="hundred margin-bottom">Přehrajeme Vám sekvenci obrázků, každý bude zobrazen po 2 sekundy. Pokud se některý z nich objeví opakovaně, stiskněte MEZERNÍK. V mezičase průběžně mačkejte příslušné šipky, které se budou objevovat pod obrázky, jakmile dojedou do středu zeleného kruhu.</div>
					<a class="button" href="#" id="submit1">Začít přehrávání</a>
				</div>

			<!-- dialogy end //-->
		
			<div class="test disappear test-8-block">
			
					<img id="test-8-image" />
			
					<form id="dialogform3" action="result.php" method="post">					
						<input type="hidden" value="" id="errcount" name="errcount" />
					</form>
					<div id="arrow-hero">
						<div id="catcher"></div>
						<div id="arrow" class="disappear">&larr;</div>
					</div>
			</div>

			<?php else: ?>
			
				<?php include("hacker.php"); ?>
			
			<?php endif; ?>
			
		</div>
	</div>

</div>

<div class="test-nav">
	<div class="test-nav-inner">
	8 / 8
	</div>
</div>

<script type="text/javascript" src ="js/common.js"></script>
<script type="text/javascript" src ="js/test8.js"></script>

<?php include("footer.php"); ?>
