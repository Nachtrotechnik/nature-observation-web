<?php
// 1. Verbindung zur Datenbank herstellen (wie zuvor definiert)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "webtech_journal";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Verbindung fehlgeschlagen: " . mysqli_connect_error());
}

// 2. SQL SELECT-Anweisung ausführen
$sql = "SELECT observation_name, comment FROM favorites ORDER BY id DESC"; // Füge ORDER BY hinzu, um die neuesten zuerst anzuzeigen
$result = mysqli_query($conn, $sql);

?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meine gespeicherten Favoriten</title>
    <link rel="stylesheet" href="style.css"> 
</head>
<body>

    <header>
        <h1>Meine gespeicherten Beobachtungen</h1>
    </header>

    <main>
        
        <?php
        // 3. Überprüfen, ob Ergebnisse vorhanden sind
        if (mysqli_num_rows($result) > 0) {
            
            // 4. Ergebnisse in der Schleife durchlaufen und ausgeben
            while ($row = mysqli_fetch_assoc($result)) {
                echo "<article>";
                echo "<h3>" . htmlspecialchars($row['observation_name']) . "</h3>";
                echo "<p><strong>Kommentar:</strong> " . htmlspecialchars($row['comment']) . "</p>";
                echo "</article>";
            }
        } else {
            echo "<p>Sie haben noch keine Beobachtungen als Favoriten gespeichert.</p>";
        }
        
        // 5. Link zur Startseite (außerhalb der Schleife!)
        echo '<p><a href="index.html">Zurück zur Beobachtungsübersicht</a></p>';
        ?>

    </main>

    <footer>
        <p>&copy; 2025 Natur-Beobachtungs-Portal</p>
        <?php 
        // 6. Verbindung schließen, um Ressourcen freizugeben
        mysqli_close($conn); 
        ?>
    </footer>
</body>
</html>