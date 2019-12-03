<?php 

	session_start();

	$invalid = False;

	if(!isset($_SESSION["score4"]) || empty($_SESSION["score4"]))
   		$invalid = True;
   		
   	if(!isset($_POST["errcount"]) || !empty($_POST["errcount"]))
   		$invalid = True;
   	if(!is_numeric($_POST["errcount"]))
   		$invalid = True;
   	if(!$invalid && ($_POST["errcount"] > 9 || $_POST["errcount"] < 0))
   		$invalid = True;
   	
   	if(!$invalid)
		$_SESSION["score5"] = $_POST["errcount"];  		
	else {
		session_unset();
		session_destroy();
	}
	
	$invalid = False; // DEBUG
?>

<?php include("head.php"); ?>
<?php include("test-header.php"); ?>

	<!-- captcha form //-->
	<div class="alert-cover disappear"></div>
	<div id="alert1" class="alert disappear test-6-alert">
  		<div class="hundred" id="disrupt">
  		<form onsubmit="validateCaptcha()">
    		<div id="captcha">
    		</div>
    		<div class="hundred margin-bottom"><a href="#" class="test-6-new-captcha" onclick="createCaptcha()">Jiný obrazek</a></div>
    		<div class="hundred margin-bottom">
    			<input type="text" placeholder="Captcha" id="cpatchaTextBox"/>
    			<button type="submit" id="captcha-pain">Potvrdit</button>
    		</div>
    		<span id="captcha-error"></span>
  		</form>
  		</div>
	</div>
	<!-- captcha form - end //-->

<div class="outern test-outern">

	<div class="content test-content">

		<div class="inner-content test-inner-content">
	
			<?php if(!$invalid): ?>
		
			<!-- dialogy //-->
				<div class="dialog" id="dialog1">
					<div class="hundred margin-bottom">Zapamatujte si svůj nákup z následující účtenky. Máte na to 15 sekund.</div>
					<a class="button" href="#" id="submit1">Zobrazit účtenku</a>
				</div>

			<!-- dialogy end //-->
		
			<div class="test disappear">
			
				<div class="row disappear" id="helptext">
					<div class="hundred">
						Obchod s potravinami "LEMPL" se vás snaží podvést. Kliknutím začerněte položky na účtence, které na ní předtím rozhodně NEBYLY (předtím na ní bylo 7 položek):
					</div>
					<div class="hundred margin-bottom">
					<form class="default" id="dialogform3" action="test7.php" method="post">
						<input type="hidden" value="" id="errcount" name="errcount" />
					</form>
					</div>
					<div class="hundred margin-bottom">
						<a class="button" href="#" id="submit2">Další test</a>
					</div>
				</div>
			
				<div id="test-6-receipt"></div>
			</div>

			<?php else: ?>
			
				<?php include("hacker.php"); ?>
			
			<?php endif; ?>
			
		</div>
	</div>

</div>

<div class="test-nav">
	<div class="test-nav-inner">
	6 / 8
	</div>
</div>

<script type="text/javascript" src ="js/common.js"></script>
<script type="text/javascript" src ="js/test6.js"></script>

<?php include("footer.php"); ?>
