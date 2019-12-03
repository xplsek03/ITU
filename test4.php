<?php 

	session_start();

	$invalid = False;

	if(!isset($_SESSION["score2"]) || empty($_SESSION["score2"]))
   		$invalid = True;
   		
   	if(!isset($_POST["errcount"]) || !empty($_POST["errcount"]))
   		$invalid = True;
   	if(!is_numeric($_POST["errcount"]))
   		$invalid = True;
   	if(!$invalid && ($_POST["errcount"] < 0 || $_POST["errcount"] > 8))
   		$invalid = True;
   	
   	if(!$invalid)
		$_SESSION["score3"] = $_POST["errcount"];  		
	else {
		session_unset();
		session_destroy();
	}
	
	$invalid = False; // DEBUG
?>

<?php include("head.php"); ?>
<?php include("test-header.php"); ?>

	<!-- alerty start //-->
	
	<div class="alert-cover disappear"></div>
	<div id="alert1" class="alert disappear">
  		<div class="hundred margin-bottom" id="disrupt"></div>
  		<a class="button alert-button" id="submit2" href="#">Potvrdit</a>
	</div>			
	
	<!-- alerty end //-->

	<header class="test-header">
	<a class="icon" href="#"></a>
	</header>

<div class="outern test-outern">

	<div class="content test-content">

		<div class="inner-content test-inner-content">

			<?php if(!$invalid): ?>
		
			<!-- dialogy //-->
				<div class="dialog" id="dialog1">
					<div class="hundred margin-bottom">Zapamatujte si pořadí, ve kterém bloky zmizí.</div>
					<a class="button" href="#" id="submit1">Zobrazit bloky</a>
				</div>
			<!-- dialogy end //-->
		
			<div class="test disappear">
			
				<div id="helptext" class="hundred margin-bottom disappear">Klikněte na bloky postupně v pořadí, ve kterém zmizely:</div>
			
				<div class="margin-bottom" id="disappearing">
					<div class="test-4-line">
						<a class="test-4-block" href="#"></a>
						<a class="test-4-block" href="#"></a>
						<a class="test-4-block" href="#"></a>
					</div>
					
					<div class="test-4-line">
						<a class="test-4-block" href="#"></a>
						<a class="test-4-block" href="#"></a>
						<a class="test-4-block" href="#"></a>
					</div>
					
					<div class="test-4-line">
						<a class="test-4-block" href="#"></a>
						<a class="test-4-block" href="#"></a>
						<a class="test-4-block" href="#"></a>
					</div>
				</div>

				<form class="default disappear" id="dialogform1" action="test5.php" method="post">
					<input type="hidden" value="" id="errcount" name="errcount" />
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
	4 / 8
	</div>
</div>

<script type="text/javascript" src ="js/common.js"></script>
<script type="text/javascript" src ="js/test4.js"></script>

<?php include("footer.php"); ?>
