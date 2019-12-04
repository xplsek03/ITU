<?php 

	session_start();

	$invalid = False;

	if(!isset($_SESSION["score7"]) || empty($_SESSION["score7"]))
   		$invalid = True;
   		
   	if(!isset($_POST["errcount"]) || empty($_POST["errcount"]))
   		$invalid = True;
   	if(!is_numeric($_POST["errcount"]))
   		$invalid = True;
   	if(!$invalid && ($_POST["errcount"] < 0 || $_POST["errcount"] > 10000)) // :)
   		$invalid = True;
   	
	$invalid = False; // DEBUG, SMAZAT
	
   	if(!$invalid) {
		$_SESSION["score8"] = $_POST["errcount"];  	
		
		// tady se vypocita vysledek
		// 1: cas, cim min tim lip
		// 2-7 : errcount, cim min tim lip
		// 8: cim vyssi tim lip
		
		// cim vyssi tim lepsi
		$score = $_SESSION["score8"] - (0.5 * $_SESSION["score1"]) - $_SESSION["score2"] - $_SESSION["score3"] - $_SESSION["score4"] - $_SESSION["score5"] - $_SESSION["score6"] - $_SESSION["score7"];
		
		// napoj se na db a uloz do ni vysledky

   		$dbhost = "md67.wedos.net";
    	$dbname = "d231780_test25";
    	$dbusername = "a231780_test25";
    	$dbpassword = "97#5TrToi?";
	
    	$link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
    	$link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
    	//$statement = $link->prepare("INSERT INTO Results(age,spec,child,married,tv,fb,game,book,pc,music,score) VALUES(?,?,?,?,?,?,?,?,?,?,?)");
	
    	//$statement->execute(array($_SESSION["age"],$_SESSION["spec"],$_SESSION["child"],$_SESSION["married"],$_SESSION["tv"],$_SESSION["fb"],$_SESSION["game"],$_SESSION["book"],$_SESSION["pc"],$_SESSION["music"],$score));
		
	}		
	
	$invalid = False; // DEBUG

?>

<?php include("head.php"); ?>

	<header>
	<a class="logo" href="/"></a>
	www.stackoverflow.cz
	<br>
	<span class="logo-inner">Všechno jednou přeteče.</span>
	</header>

<div class="outern">

	<div class="content">
	
		<div class="inner-content">

		<?php if(!$invalid): ?>
		
			<h1>Gratulujeme, subjekte!</h1>
			
			<p>Váš výsledek byl uložen do databáze a bude použit jako údaj pro srovnání testovacích subjektů za Vámi (a dokonce i před Vámi). V rámci své skupiny dosahujete: DODELAT TABULKY SE SROVNAVACIMI VYSLEDKY PRO JEHO SKUPINY PRACE, VEKU ATD A PAK ZAJIMAVA FAKTA O TOM KDO JE V CEM NEJLEPSI A CO TI NEJLEPSI MAJI ZA VLASTNOSTI (book, game, pc atd.)</p>
	
		<?php
			$d = $link->prepare("SELECT * FROM Results WHERE spec=:spec");
			$d->execute(['spec' => "h"]); 
			$data = $d->fetchAll();
			foreach ($data as $row) {
    			echo $row['age']."\t".$row['score']."\n";
			}
		?>	
		
		<?php else: ?>
		
			<?php include("hacker.php"); ?>
		
		<?php endif; ?>
	
		</div>
	</div>

</div>

<footer>
&copy; xplsek03 + xholas05, 2019
</footer>

<? include("footer.php"); ?>

<?php 

	// konec, vymaz session	
	session_unset();
	session_destroy();
	
?>
