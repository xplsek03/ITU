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
   	
   	// DEBUG,smaz
	$invalid = False; // DEBUG, SMAZAT
	$_SESSION["age"] = 14;
	$_SESSION["spec"] = "h";
	$_SESSION["child"] = 5;
	$_SESSION["married"] = False;
	$_SESSION["tv"] = 1;
	$_SESSION["fb"] = 2;
	$_SESSION["game"] = 3;
	$_SESSION["book"] = 2;
	$_SESSION["pc"] = 1;
	$_SESSION["music"] = 2;
	$_SESSION["score1"] = 5;
	$_SESSION["score2"] = 6;
	$_SESSION["score3"] = 3;
	$_SESSION["score4"] = 0;
	$_SESSION["score5"] = 1;
	$_SESSION["score6"] = 1;
	$_SESSION["score7"] = 2;
	$_SESSION["score8"] = 5;
	
   	if(!$invalid) {
		$_SESSION["score8"] = $_POST["errcount"];  	
		
		// tady se vypocita vysledek
		// 1: cas, cim min tim lip
		// 2-7 : errcount, cim min tim lip
		// 8: cim vyssi tim lip
		
		// cim vyssi tim lepsi
		$score = $_SESSION["score8"] - (0.5 * $_SESSION["score1"]) - $_SESSION["score2"] - $_SESSION["score3"] - $_SESSION["score4"] - $_SESSION["score5"] - $_SESSION["score6"] - $_SESSION["score7"];
		
		// DEBUG
		$score = 5;
		
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
			<p>Váš výsledek byl uložen do databáze a bude použit jako údaj pro srovnání testovacích subjektů za Vámi (a dokonce i před Vámi). Získané skóre: <strong><?php echo $score; ?></strong>.</p>					<br />
			<h2>Výsledky v rámci uvedené skupiny (
				<?php 
				if($_SESSION["spec"] == "h")
					echo "Humanitní zaměření";
				else if($_SESSION["spec"] == "s")
					echo "Sociální studia";
				else if($_SESSION["spec"] == "t")
					echo "Technologie";
				else
					echo "Neuvedeno";
				?>
			)</h2>
			
			<p>Za Vámi: <strong>

		<?php
			$d = $link->prepare("SELECT COUNT(*) FROM Results WHERE spec=:spec AND score<:score;");
			$d->execute(['spec' => $_SESSION["spec"],'score' => $score]); 
			$data = $d->fetch();

			$d = $link->prepare("SELECT COUNT(*) FROM Results;");
			$d->execute(); 
			$data2 = $d->fetch();
			$res = $data[0]/$data2[0] * 100;
			
			echo round($res,2);		

		?>
	
		 %</strong></p>
		 
		 <p>Před Vámi: <strong><?php echo round(100-$res,2); ?> %</strong></p>
			
			<br />
			
			<h2>Výsledky v rámci všech uživatelských skupin</h2>
			
			<p>Za Vámi: <strong>

		<?php
			$d = $link->prepare("SELECT COUNT(*) FROM Results WHERE score<:score;");
			$d->execute(['score' => $score]); 
			$data = $d->fetch();

			$res = $data[0]/$data2[0] * 100;
			
			echo round($res,2);		

		?>
	
		 %</strong></p>
		 
		 <p>Před Vámi: <strong><?php echo round(100-$res,2); ?> %</strong></p>

		<br />
		<h2>Kdo dosáhnul nejlepších výsledků?</h2>

		<p>V tabulce si můžete prohlédnout údaje o 10 subjektech, které získaly nejvyšší skóre (hodnoty Facebook - Knihy: 1 = vůbec, 5 = hodně).</p>

		<?php
			$d = $link->prepare("SELECT * FROM Results ORDER BY score DESC LIMIT 10;");
			$d->execute(); 
			$data = $d->fetchAll();
			echo "<table class=\"rezult\">";

				echo "<tr class=\"rezult-head\">";
				
    				echo "<td>Věk</td>";
    				echo "<td>Obor</td>";
    				echo "<td>Manžel/ka</td>";
    				echo "<td>Děti</td>";
    				
    				echo "<td>Facebook</td>";
    				echo "<td>Hudba</td>";
    				echo "<td>PC</td>";
    				echo "<td>PC hry</td>";
    				echo "<td>TV</td>";
    				echo "<td>Knihy</td>";
    				
    				echo "<td>Skóre</td>";
    				
    			echo "</tr>";

			foreach ($data as $row) {
				echo "<tr>";
				
    				echo "<td>" . $row['age'] . "</td>";
    				echo "<td>";

						if($row['spec'] == "h")
							echo "Humanitní zaměření";
						else if($row['spec'] == "s")
							echo "Sociální studia";
						else if($row['spec'] == "t")
							echo "Technologie";
						else
							echo "Neuvedeno";

    				echo "</td>";
    				echo "<td>";  
    				
    				if($row['married'])
    					echo "ano";
    				else
    					echo "ne";
    				
    				echo "</td>";
    				echo "<td>" . $row['child'] . "</td>";
    				
    				echo "<td>" . $row['fb'] . "</td>";
    				echo "<td>" . $row['music'] . "</td>";
    				echo "<td>" . $row['pc'] . "</td>";
    				echo "<td>" . $row['game'] . "</td>";
    				echo "<td>" . $row['tv'] . "</td>";
    				echo "<td>" . $row['book'] . "</td>";
    				
    				echo "<td><strong>" . $row['score'] . "</strong></td>";
    				
    			echo "</tr>";
			}
			echo "</table>";
		?>	
	
		<br />
		<a href="/" class="button">Zpátky na hlavní stranu</a>
		
		<?php else: ?>
		
			<?php include("hacker.php"); ?>
		
		<?php endif; ?>
	
		</div>
	</div>

</div>

<? include("footer.php"); ?>

<?php 

	// konec, vymaz session	
	session_unset();
	session_destroy();
	
?>
