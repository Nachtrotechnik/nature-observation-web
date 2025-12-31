<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "webtech_journal";
    $table = "favorites";
    $comment = $_POST['comment'];
    $observation = $_POST['observation_name'];

    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if (!$conn) {
        die("Verbindung fehlgeschlagen: " . mysqli_connect_error());
    }

    // Die Platzhalter (?) ersetzen die Variablen
    $sql = "INSERT INTO favorites (observation_name, comment) VALUES (?, ?)";

    // Die Funktion bereitet die Abfrage vor
    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param($stmt, "ss", $observation, $comment);

    if (mysqli_stmt_execute($stmt)) {
        header("Location: favorites.php");
        exit();
    }
    else{
        echo "Fehler beim Speichern: " . mysqli_error($conn);
    }
    
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
?>