<?php 

	session_start();

	$invalid = False;

	if(!isset($_SESSION["score1"]) || empty($_SESSION["score1"]))
   		$invalid = True;
   		
   	if(!isset($_POST["errcount"]) || !empty($_POST["errcount"]))
   		$invalid = True;
   	if(!is_numeric($_POST["errcount"]))
   		$invalid = True;
   	if(!$invalid && ($_POST["errcount"] > 10 || $_POST["errcount"] < 0))
   		$invalid = True;
   	
   	if(!$invalid)
		$_SESSION["score2"] = $_POST["errcount"];  		
	else {
		session_unset();
		session_destroy();
	}
	
	$invalid = False; // DEBUG
?>

<?php include("head.php"); ?>
<?php include("test-header.php"); ?>

<div class="outern test-outern">

	<div class="content test-content">

		<div class="inner-content test-inner-content">

			<?php if(!$invalid): ?>
		
			<!-- dialogy //-->
				<div class="dialog" id="dialog1">
					<div class="hundred margin-bottom">Zapamatujte si pořadí barev. Máte na to 10 sekund.</div>
					<a class="button" href="#" id="submit1">Zobrazit barvy</a>
				</div>
			<!-- dialogy end //-->
		
			<div class="test disappear">
			
				<div id="helptext" class="hundred margin-bottom disappear">Barvy seřaďte do původního pořadí přetažením myší:</div>
			
				<ul id="sortable" class="margin-bottom">
					<li class="test-3-block" href="#"></li>
					<li class="test-3-block" href="#"></li>
					<li class="test-3-block" href="#"></li>
					<li class="test-3-block" href="#"></li>
					<li class="test-3-block" href="#"></li>
					<li class="test-3-block" href="#"></li>
					<li class="test-3-block" href="#"></li>
					<li class="test-3-block" href="#"></li>
				</ul>
				
				<a class="test-3-lightswitch disappear button" id ="submit2" href="#">Klikněte sem pro rozsvícení světel</a>

				<form class="default disappear" id="dialogform1" action="test4.php" method="post">
					<input type="hidden" value="" name="errcount" id="errcount" />
					<a class="button" href="#" id="submit3">Další test</a>
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
	3 / 8
	</div>
</div>


<script type="text/javascript" src ="js/common.js"></script>
<script type="text/javascript" src ="js/test3.js"></script>

<?php include("footer.php"); ?>
