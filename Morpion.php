<!DOCTYPE html>
<html lang="fr">

  <head>
      <meta charset="utf-8">
      <meta name="author" content="Kevin Duchampt & Julien Guillaud">
      <link rel="stylesheet" type="text/css" href="Morpion.css">
      <script src="Morpion.js"></script>
  </head>

  <body onload="debutJeu('<?php echo $_GET["n"]; ?>')">
      <h1>Morpion</h1>
      <table>
		<tr id="j1">
		  <td id="c1" rowspan=3> <img id="rejou" src="Images/Recommencer.jpg" alt="Recommencer" onclick="rejouer();" onmouseover="survole('rejou')" onmouseout="enleve('rejou')"/> </td>
          <td id="i1"> <img src="Images/Vide.jpg" alt="Vide" onclick="utilisateur('i1', '<?php echo $_GET["n"]; ?>');"/> </td>
          <td id="i2"> <img src="Images/Vide.jpg" alt="Vide" onclick="utilisateur('i2', '<?php echo $_GET["n"]; ?>');"/> </td>
          <td id="i3"> <img src="Images/Vide.jpg" alt="Vide" onclick="utilisateur('i3', '<?php echo $_GET["n"]; ?>');"/> </td>
          <td id="c3" rowspan=3> <img id="menu" src="Images/Menulong.jpg" alt="Retour au Menu" onclick="retourMenu();" onmouseover="survole('menu')" onmouseout="enleve('menu')"/> </td>
        </tr>
        <tr id="j2">
          <td id="i4"> <img src="Images/Vide.jpg" alt="Vide" onclick="utilisateur('i4', '<?php echo $_GET["n"]; ?>');"/> </td>
          <td id="i5"> <img src="Images/Vide.jpg" alt="Vide" onclick="utilisateur('i5', '<?php echo $_GET["n"]; ?>');"/> </td>
          <td id="i6"> <img src="Images/Vide.jpg" alt="Vide" onclick="utilisateur('i6', '<?php echo $_GET["n"]; ?>');"/> </td>
        </tr>
        <tr id="j3">
          <td id="i7"> <img src="Images/Vide.jpg" alt="Vide" onclick="utilisateur('i7', '<?php echo $_GET["n"]; ?>');"/> </td>
          <td id="i8"> <img src="Images/Vide.jpg" alt="Vide" onclick="utilisateur('i8', '<?php echo $_GET["n"]; ?>');"/> </td>
          <td id="i9"> <img src="Images/Vide.jpg" alt="Vide" onclick="utilisateur('i9', '<?php echo $_GET["n"]; ?>');"/> </td>
        </tr>
      </table>
      <h2 id="resultat"></h2>
  </body>

</html>
