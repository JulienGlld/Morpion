var vide = ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9"];
var win = ["i1 i2 i3", "i4 i5 i6", "i7 i8 i9", "i1 i4 i7", "i2 i5 i8", "i3 i6 i9", "i1 i5 i9", "i3 i5 i7"];
var uti = [];
var adv = [];
var coupsuiv = "";
var droitDeJouer = true;
var fini = false;



function survole(idd) {
	var img = document.getElementById(idd).src;
	var spl = img.split(".");
	var newImg = spl[0] + "Over." + spl[1];
	document.getElementById(idd).src = newImg;
}

function enleve(idd) {
	var img = document.getElementById(idd).src;
	var spl = img.split("Over");
	var newImg = spl[0] + spl[1];
	document.getElementById(idd).src = newImg;
}

function ouvreMorpion(player) {
	var url = "Morpion.php?n="+player;
	window.location.href = url;
}

function rejouer() {}
function retourMenu() {}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function debutJeu(player) {
	if (player == '2') {
		droitDeJouer = false;
		setTimeout(adversaire, 1000, 'i5', '2');
	}
}

function utilisateur(idd, p) {
	if (droitDeJouer) {
		if (p == '1') {
			var img = '<img src="Images/Croix.jpg" alt="Croix"/>';
			document.getElementById(idd).innerHTML = img;
			supprimeElmt(vide, idd);
			uti.push(idd);
		}
		else {
			var img = '<img src="Images/Rond.jpg" alt="Rond"/>';
			document.getElementById(idd).innerHTML = img;
			supprimeElmt(vide, idd);
			uti.push(idd);
		}
		
		for (var w=0; w<win.length; w++) {
			var lst = win[w].split(" ");
			var vic = troisElmtDsTab(uti, lst);
			if (vic.length == 4) {
				fini = true;
				victoireUti(vic[0], vic[1], vic[2], vic[3], p);
			}
		}
		
		if (vide.length == 0) {
			fini = true;
			matchNul();
		}
		
		if (!fini) {
			droitDeJouer = false;
			setTimeout(intelligence, 1000, p);
		}
	}
}

function intelligence(p) {
	var critique = false;
	
	if (p == '1' && uti.length == 1) {
		critique = true;
		if (uti == "i5") {
			var poss = ["i1", "i3", "i7", "i9"];
			var rand = Math.floor((Math.random() * 4));
			var idd = poss[rand];
			coupsuiv = autreAngle(idd);
			adversaire(idd, p);
		}
		else {
			var poss = ["i2", "i4", "i6", "i8"];
			var rand = Math.floor((Math.random() * 4));
			coupsuiv = poss[rand];
			adversaire("i5", p);
		}
	}
	else if (p == '2') {
		if (uti == "i2") {
			critique = true;
			coupsuiv = "i3";
			adversaire("i6", p);
		}
		else if (uti == "i4") {
			critique = true;
			coupsuiv = "i1";
			adversaire("i2", p);
		}
		else if (uti == "i6") {
			critique = true;
			coupsuiv = "i9";
			adversaire("i8", p);
		}
		else if (uti == "i8") {
			critique = true;
			coupsuiv = "i7";
			adversaire("i4", p);
		}
	}
	
	for (var i=0; i<win.length; i++) {
		var liste = win[i].split(" ");
		var idd = deuxElmtDsTab(adv, liste);
		if (elmtDsTab(vide, idd) && !critique) {
			critique = true;
			adversaire(idd, p);
		}
	}
	
	for (var j=0; j<win.length; j++) {
		var liste = win[j].split(" ");
		var idd = deuxElmtDsTab(uti, liste);
		if (elmtDsTab(vide, idd) && !critique) {
			critique = true;
			adversaire(idd, p);
		}
	}
	
	if (!critique) {
		if (elmtDsTab(vide, coupsuiv)) {
			adversaire(coupsuiv, p);
			coupsuiv = "";
		}
		else {
			var long = vide.length;
			var rand = Math.floor((Math.random() * long));
			var idd = vide[rand];
			adversaire(idd, p);
		}
	}
}

function adversaire(idd, p) {
	if (p == '1') {
		var img = '<img src="Images/Rond.jpg" alt="Rond"/>';
		document.getElementById(idd).innerHTML = img;
		supprimeElmt(vide, idd);
		adv.push(idd);
	}
	else {
		var img = '<img src="Images/Croix.jpg" alt="Croix"/>';
		document.getElementById(idd).innerHTML = img;
		supprimeElmt(vide, idd);
		adv.push(idd);
	}
	
	for (var w=0; w<win.length; w++) {
		var lst = win[w].split(" ");
		var vic = troisElmtDsTab(adv, lst);
		if (vic.length == 4) {
			victoireAdv(vic[0], vic[1], vic[2], vic[3], p);
			fini = true;
		}
	}
	
	if (vide.length == 0) {
		fini = true;
		matchNul();
	}
	
	if (!fini) {
		droitDeJouer = true;
	}
}



/*Ces quatre fonctions permettent de :
 * Supprimer un élément d'un tableau en donnant son nom
 * Vérifier si un élément est dans un tabeleau en donnant son nom
 * Vérifier si deux éléments d'un tableau sont dans un autre tabelau
 * Vérifier si trois éléments d'un tableau sont dans un autre tabelau
*/



function supprimeElmt(arr, e) {
	let trouve = false;
	var l = arr.length;
	for (i=0; i<l; i++) {
		if (arr[i] == e) {
			trouve = true;
			break;
		}
	}
	if (trouve) {
		arr.splice(i, 1);
	}
}

function elmtDsTab(arr, e) {
	var l = arr.length;
	for (i=0; i<l; i++) {
		if (arr[i] == e) {
			return true;
		}
	}
	return false;
}

function deuxElmtDsTab(coupJoue, udt) {
	var ind = [0, 1, 2];
	var compteur = 0;
	for (var i=0; i<udt.length; i++) {
		if (elmtDsTab(coupJoue, udt[i])) {
			compteur++;
			var loc = udt.indexOf(udt[i]);
			supprimeElmt(ind, loc);
		}
	}
	if (compteur == 2) {
		return udt[ind[0]];
	}
	else {
		return "e";
	}
}

function troisElmtDsTab(coupJoue, udt) {
	var compteur = 0;
	for (var i=0; i<udt.length; i++) {
		if (elmtDsTab(coupJoue, udt[i])) {
			compteur++;
		}
	}
	if (compteur == 3) {
		if ((udt[0] == "i1" && udt[1] == "i2" && udt[2] == "i3") || (udt[0] == "i4" && udt[1] == "i5" && udt[2] == "i6") || (udt[0] == "i7" && udt[1] == "i8" && udt[2] == "i9")) {
			udt.push('1');
		}
		else if ((udt[0] == "i1" && udt[1] == "i4" && udt[2] == "i7") || (udt[0] == "i2" && udt[1] == "i5" && udt[2] == "i8") || (udt[0] == "i3" && udt[1] == "i6" && udt[2] == "i9")) {
			udt.push('2');
		}
		else if (udt[0] == "i1" && udt[1] == "i5" && udt[2] == "i9") {
			udt.push('3');
		}
		else {
			udt.push('4');
		}
		return udt;
	}
	else {
		return [];
	}
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function autreAngle(ang) {
	var quatreAng = ["i1", "i3", "i7", "i9"];
	supprimeElmt(quatreAng, ang);
	if (ang == "i1") { supprimeElmt(quatreAng, "i9"); }
	else if (ang == "i3") { supprimeElmt(quatreAng, "i7"); }
	else if (ang == "i7") { supprimeElmt(quatreAng, "i3"); }
	else { supprimeElmt(quatreAng, "i1"); }
	var rand = Math.floor((Math.random() * 2));
	return quatreAng[rand];
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function victoireUti(id1, id2, id3, typ, p) {
	var list = [id1, id2, id3];
	
	for (var l=0; l<3; l++) {
		if (p == '1') {
			var ih = '<img src="Images/CroixV' + typ + '.jpg" alt="Croix"/>';
		}
		else {
			var ih = '<img src="Images/RondV' + typ + '.jpg" alt="Rond"/>';
		}
		document.getElementById(list[l]).innerHTML = ih;
	}
	
	for (var v=0; v<vide.length; v++) {
		var blanc = '<img src="Images/Vide.jpg" alt="Vide"/>';
		document.getElementById(vide[v]).innerHTML = blanc;
	}
	
	var res = document.getElementById("resultat");
	res.innerHTML = "VOUS AVEZ GAGNÉ !";
	res.style.color = "#0077ff";
	res.style.visibility = "visible";
	
	document.getElementById("rejou").src = "Images/Rejouer.jpg";
	document.getElementById("menu").src = "Images/Menucourt.jpg";
}

function victoireAdv(id1, id2, id3, typ, p) {
	var list = [id1, id2, id3];
	
	for (var l=0; l<3; l++) {
		if (p == '1') {
			var ih = '<img src="Images/RondV' + typ + '.jpg" alt="Rond"/>';
		}
		else {
			var ih = '<img src="Images/CroixV' + typ + '.jpg" alt="Croix"/>';
		}
		document.getElementById(list[l]).innerHTML = ih;
	}
	
	for (var v=0; v<vide.length; v++) {
		var blanc = '<img src="Images/Vide.jpg" alt="Vide"/>';
		document.getElementById(vide[v]).innerHTML = blanc;
	}
	
	var res = document.getElementById("resultat");
	res.innerHTML = "VOUS AVEZ PERDU !";
	res.style.color = "#ff0000";
	res.style.visibility = "visible";
	
	document.getElementById("rejou").src = "Images/Rejouer.jpg";
	document.getElementById("menu").src = "Images/Menucourt.jpg";
}

function matchNul() {
	var doc = document.getElementById("resultat")
	doc.innerHTML = "MATCH NUL ...";
	doc.style.color = "#777777";
	doc.style.visibility = "visible";
	
	document.getElementById("rejou").src = "Images/Rejouer.jpg";
	document.getElementById("menu").src = "Images/Menucourt.jpg";
}
