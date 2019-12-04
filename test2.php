<?php 

	$nonvalid = False;

	// uvodni validace
	if(!isset($_SESSION))
		session_start();
	else {
		$nonvalid = True;
	}
	
	// zvaliduj prvky formulare
	if(!$nonvalid) {	
		if(empty($_POST["final_age"]) || empty($_POST["final_spec"]) || empty($_POST["final_child"]) || empty($_POST["final_tv"]) || empty($_POST["final_fb"]) || empty($_POST["final_game"]) || empty($_POST["final_book"]) || empty($_POST["final_music"]) || empty($_POST["final_pc"]) || empty($_POST["final_time"])) {
			$nonvalid = True;
		}
		
		else {
			$_SESSION["age"] = $_POST["final_age"];
			$_SESSION["spec"] = $_POST["final_spec"];
			$_SESSION["child"] = $_POST["final_child"];
			$_SESSION["tv"] = $_POST["final_tv"];
			$_SESSION["fb"] = $_POST["final_fb"];
			$_SESSION["game"] = $_POST["final_game"];
			$_SESSION["book"] = $_POST["final_book"];
			$_SESSION["music"] = $_POST["final_music"];
			$_SESSION["pc"] = $_POST["final_pc"];
		}
		
		if(!is_numeric($_SESSION["age"])) {
			$nonvalid = True;
		}
		if(!$nonvalid && ($_SESSION["age"] > 120 || $_SESSION["age"] < 5))
			$nonvalid = True;
		if(!$nonvalid && !is_string($_SESSION["spec"]))
			$nonvalid = True;
		if(!$nonvalid && !($_SESSION["spec"] == "h" || $_SESSION["spec"] == "t" || $_SESSION["spec"] == "n" || $_SESSION["spec"] == "s"))
			$nonvalid = True;
		if(!$nonvalid && !is_numeric($_SESSION["child"]))
			$nonvalid = True;
		if(!$nonvalid && ($_SESSION["child"] < 0 || $_SESSION["child"] > 25))
			$nonvalid = True;
		
		if(!$nonvalid && ($_SESSION["tv"] < 0 || $_SESSION["tv"] > 5))
			$nonvalid = True;
		if(!$nonvalid && ($_SESSION["fb"] < 0 || $_SESSION["fb"] > 5))
			$nonvalid = True;
		if(!$nonvalid && ($_SESSION["game"] < 0 || $_SESSION["game"] > 5))
			$nonvalid = True;
		if(!$nonvalid && ($_SESSION["book"] < 0 || $_SESSION["book"] > 5))
			$nonvalid = True;
		if(!$nonvalid && ($_SESSION["pc"] < 0 || $_SESSION["pc"] > 5))
			$nonvalid = True;
		if(!$nonvalid && ($_SESSION["music"] < 0 || $_SESSION["music"] > 5))
			$nonvalid = True;
			
		if(!$nonvalid && $_POST["final_married"] != "")
			$_SESSION["married"] = False;
		else
			$_SESSION["married"] = True;
		
		if(!$nonvalid && (!is_numeric($_SESSION["tv"]) || !is_numeric($_SESSION["fb"]) || !is_numeric($_SESSION["game"]) ||
						  !is_numeric($_SESSION["pc"]) || !is_numeric($_SESSION["music"]) || !is_numeric($_SESSION["book"])))	
			$nonvalid = True;
		

	
		if(!$nonvalid && !is_numeric($_POST["final_time"]))
			$nonvalid = True;
	
		if(!$nonvalid && ($_POST["final_time"] <= 0 || $_POST["final_time"] > 10000))
			$nonvalid = True;		
		else
			$_SESSION["score1"] = $_POST["final_time"]; // uloz cas jako skore

	}

	if($nonvalid) {
		session_unset();
		session_destroy();
	}
	
	$nonvalid = False; // DEBUG
?>
	
	<?php include("head.php"); ?>
	<?php include("test-header.php"); ?>
	
	<div class="outern test-outern">
	
		<div class="content test-content">
	
			<div class="inner-content test-inner-content">

<?php if(!$nonvalid): ?>
			
				<!-- dialogy //-->
					<div class="dialog" id="dialog1">
						<div class="hundred margin-bottom">Zapamatujte si následující slovo. Máte na to 8 sekund.</div>
						<a class="button" href="#" id="submit1">Zobrazit slovo</a>
					</div>
	
					<div class="dialog disappear" id="dialog2">
						<div class="hundred margin-bottom">
							<input class="test-2-word disappear" id="confused-word" readonly />
						</div>
					</div>
					
					<div class="dialog disappear" id="dialog3">
						<div class="hundred margin-bottom">Zadejte původní slovo (10 písmen, nezáleží na velikosti):</div>
						<div class="hundred margin-bottom">
						<form class="default" id="dialogform3" action="test3.php" method="post">
							<input type="text" class="test-2-word" id="finalword" name="finalword">
							<input type="hidden" value="" id="errcount" name="errcount" />
						</form>
						</div>
						<a class="button" href="#" id="submit2">Další test</a>
					</div>
	
				<!-- dialogy end //-->

<?php else: ?>

	<?php include("hacker.php"); ?>	
			
<?php endif; ?>
				<div class="test disappear">
					<input class="test-2-word" id="original-word" value="" readonly /> <!-- sem dat random sekvenci znaku s rnd uppercase //-->	
				</div>
				
			</div>
		</div>
	
	</div>
	
	<div class="test-nav">
		<div class="test-nav-inner">
		2 / 8
		</div>
	</div>
	
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.0.1/Tone.min.js"></script>
	<script type="text/javascript" src ="js/common.js"></script>
	<script type="text/javascript" src ="js/test2.js"></script>
	
	<?php include("footer.php"); ?>
