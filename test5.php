<?php 

	session_start();

	$invalid = False;

	if(!isset($_SESSION["score3"]) || empty($_SESSION["score3"]))
   		$invalid = True;
   		
   	if(!isset($_POST["errcount"]) || empty($_POST["errcount"]))
   		$invalid = True;
   	if(!is_numeric($_POST["errcount"]))
   		$invalid = True;
   	if(!$invalid && ($_POST["errcount"] < 0 || $_POST["errcount"] > 9))
   		$invalid = True;
   	
   	if(!$invalid)
		$_SESSION["score4"] = $_POST["errcount"];  		
	else {
		session_unset();
		session_destroy();
	}
	
	//$invalid = False; // DEBUG
?>

<?php include("head.php"); ?>
<?php include("test-header.php"); ?>

	<!-- someone calling //-->
	<div class="alert-cover disappear"></div>
	<div id="alert1" class="alert disappear test-5-calling">
  		<div class="hundred margin-bottom" id="disrupt">
  			<div class="test-5-contact"></div>
  			<div class="test-5-number">+420 774 861 199</div>
  			<div class="test-5-counter disappear"></div>
  		</div>
  		<a class="button alert-button green" id="takecall" href="#">Přijmout</a>
  		<a class="button alert-button red right" id="hangcall" href="#">Odmítnout</a>
	</div>
	<!-- someone calling - end //-->

<div class="outern test-outern">

	<div class="content test-content">

		<div class="inner-content test-inner-content">
		
			<?php if(!$invalid): ?>
		
			<!-- dialogy //-->
				<div class="dialog" id="dialog1">
					<div class="hundred margin-bottom">Zapamatujte si následující telefonní číslo. Máte na to 10 sekund.</div>
					<a class="button" href="#" id="submit1">Zobrazit číslo</a>
				</div>
				
				<div class="dialog disappear" id="dialog3">
					<div class="hundred margin-bottom">Zadejte telefonní číslo (9 číslic bez mezer, bez předvolby):</div>
					<div class="hundred margin-bottom">
					<form class="default" id="dialogform3" action="test6.php" method="post">
						<input type="number" class="test-5-phone" id="finalnumber" name="finalnumber">
						<input type="hidden" value="" name="errcount" id="errcount" />
					</form>
					</div>
					<a class="button" href="#" id="submit2">Další test</a>
				</div>

			<!-- dialogy end //-->
		
			<div class="test disappear">
				<input class="test-2-word" type="number" id="original-number" readonly />	
			</div>
			
			<?php else: ?>
			
				<?php include("hacker.php"); ?>
			
			<?php endif; ?>
			
		</div>
	</div>

</div>

<div class="test-nav">
	<div class="test-nav-inner">
	5 / 8
	</div>
</div>

<script type="text/javascript" src ="js/common.js"></script>
<script type="text/javascript" src ="js/test5.js"></script>

<?php include("footer.php"); ?>
