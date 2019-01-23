/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        VARIABLES
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

var imgPerTheme = [0, 21, 33, 33];
var theme;
var couple;
var retourne;
var jeu = 0;
var compteur;
var bufCarte;
var bufCarteBis;
var nbCartesTrouvees = 0;
var timeOutRetourne;

/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        UTILISATION
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

creerPlateau();
$("#bAbandonner").attr("disabled", "disabled");

/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                         ECOUTEURS
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

$("#nbColonnes, #nbLignes").change(creerPlateau);
$("#theme").change(creerPlateau);
$("#bJouer").unbind("click").click(jouer);

/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        FONCTIONS
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

/* CREATION DU PLATEAU */
function creerPlateau() {
  var code = "";
  var colonne = $("#nbColonnes").val();
  var ligne = $("#nbLignes").val();
  var theme =  $("#theme").val();

  for (var i = 0 ; i < ligne ; i++)
  {
    code = code + "<div>";
    for (var j = 0 ; j < colonne ; j++)
    {
      code = code + "<div class='divCarte'><img src='" + adresseMedia(theme, 0, 0) + "' class='carte' alt='image dos carte' height='83px' width='70px'></div>";
    }
    code = code + "</div>";
  }

  $("#plateau").html(code);

  $("#plateau").css("width", (colonne)*70+(2*colonne)*5 + "px");

}

/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

/* CREATION DU VECTEUR COUPLE */
function creerVectCouples(imgPerTheme, theme, nbCartes) {
  var pretendant = Math.floor(Math.random()*imgPerTheme[theme])+1;
  var vectCouples = new Array();
  for (var i = 1 ; i <= (nbCartes/2) ; i++)
  {
    while(vectCouples.includes(pretendant))
    {
      pretendant = Math.floor(Math.random()*imgPerTheme[theme])+1;
    }
    vectCouples.push(pretendant, pretendant);
  }
  return vectCouples;
}

/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

/* ATTRIBUTION DES COUPLES */
function attribCouple(imgPerTheme) {
  var theme = $("#theme").val();
  var ligne = $("#nbLignes").val();
  var colonne = $("#nbColonnes").val();

  var carte;

  var nbCartes = ligne * colonne;
  var couples = creerVectCouples(imgPerTheme, theme, nbCartes);
  var couple;
  for (var i = 0 ; i < nbCartes ; i++)
  {
      couple = trouveCouple(nbCartes, couples);
      ($("img.carte")[i]).classList.add(couple);
  }
}

/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

/* CALCUL DU COUPLE */
function trouveCouple(nbCartes, couples) {
  var alea = Math.floor(Math.random()*nbCartes);
  while (couples[alea] == 0)
  {
    alea = Math.floor(Math.random()*nbCartes);
  }
  var couple = couples[alea];
  couples[alea] = 0;
  return couple;
}

/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

/* RECHERCHE DE L'ADRESSE DES IMAGES */
function adresseMedia(theme, couple, jeu) {
  // L'image verso dépend du thème et du couple
  // L'image recto ne dépend que du thème
  // Si on cherche l'image verso, on donne theme et couple
  // Si on cherche l'image recto, on donne uniquement theme et couple = 0

  var adresse;
  //recherche de l'adresse de l'image verso
  if (couple != 0)
  {
    adresse = "media/cartes/verso/" + theme + "/" + couple + ".png";
  }
  //recherche de l'adresse de l'image recto
  else {
    if (jeu == 0)
    {
      adresse = "media/cartes/recto/" + theme + "_off.png";
    }
    else {
      adresse = "media/cartes/recto/" + theme + ".png";
    }
  }
  return adresse;
}

/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

/* LANCEMENT DU JEU */
function jouer() {
  retourne = 0;

  $("#bJouer").unbind("click");
  $("#bJouer").attr("disabled", "disabled");
  $("#bAbandonner").removeAttr("disabled");

  $("#nbLignes").unbind("change");
  $("#nbLignes").attr("disabled", "disabled");
  $("#nbColonnes").unbind("change");
  $("#nbColonnes").attr("disabled", "disabled");
  $("#theme").unbind("change");
  $("#theme").attr("disabled", "disabled");
  var theme = $("#theme").val();

  chrono();

  $("img.carte").attr("src", adresseMedia(theme, 0, 1));

  attribCouple(imgPerTheme);
  $("img.carte").click(retourneCarte);
  $("plateau").css( "zIndex", 1);
  $(".divCarte").addClass("hover");

  divCarte = $(".divCarte");
}



function retourneCarte() {
  var carte = $(this);
  var theme = $("#theme").val();
  var couple =  carte.attr('class').split(' ')[1];
  var nbCartes = $("#nbColonnes").val() * $("#nbLignes").val();

  divCarte.removeClass("hover");

  //désactivation des cartes
  $("img.carte").unbind("click");
  // animation de retournement
  $("img.carte").css('transition','0.3s');
  carte.css('transform','rotateY(90deg)');
  setTimeout(function(){
    carte.attr("src", adresseMedia(theme, couple, 1));
    carte.css('transform','rotateY(180deg)');
  }, 400);


  carte.addClass("retournee");

  if (retourne == couple)
  {
    // si une deuxième carte est retournée et correspond
    $("img.carte." + couple).addClass("found");
    retourne = 0;
    $("#tours").text(parseInt($("#tours").text())+1);

    // réautorise les cartes qui n'ont pas été retournées, à être retournées
    setTimeout(function(){
      $("img.carte").not($(".found")).click(retourneCarte);
      for (var i = 0 ; i < divCarte.length ; i ++) {
        if (divCarte[i].getElementsByClassName("retournee").length == 0  && divCarte[i].getElementsByClassName("found").length == 0) {
          divCarte[i].className += " hover";
        }
      }
    }, 500);
  }
  else if (retourne != 0){
    // si une deuxième carte est retournée et ne correspond pas
    timeOutRetourne = setTimeout(function(){
      $("img.carte").css('transition', '0.1s');
      carte.css('transform','rotateY(90deg)');
      bufCarte.css('transform','rotateY(90deg)');
      setTimeout(function(){
        carte.attr("src", adresseMedia(theme, 0, 1));
        bufCarte.attr("src", adresseMedia(theme, 0, 1));
        carte.css('transform','rotateY(180deg)');
        bufCarte.css('transform','rotateY(180deg)');
      }, 200);
    }, 1400);
    $("#tours").text(parseInt($("#tours").text())+1);
    retourne = 0;
    setTimeout(function(){
      $("img.carte").not($(".found")).click(retourneCarte);
      $("img.carte").removeClass("retournee");
      for (var i = 0 ; i < divCarte.length ; i ++) {
        if (divCarte[i].getElementsByClassName("retournee").length == 0  && divCarte[i].getElementsByClassName("found").length == 0) {
          divCarte[i].className += " hover";
        }
      }
    }, 1600);

  }
  else if (retourne == 0) {
    // si une première carte est retournée
    retourne = couple;
    $("img.carte").not($(".found, .retournee")).click(retourneCarte);
    for (var i = 0 ; i < divCarte.length ; i ++) {
      if (divCarte[i].getElementsByClassName("retournee").length == 0  && divCarte[i].getElementsByClassName("found").length == 0) {
        divCarte[i].className += " hover";
      }
    }
    carte.unbind("click");
    bufCarte = carte;

  }

  if ($("img.carte.found").length == nbCartes) {
    victoire();
  }

}

function abandonner() {
  //empêche des cartes retournées temporairement de se re-retourner
  //après l'arrêt de la partie
  clearTimeout(timeOutRetourne);
  $(".divCarte").removeClass("hover");
  //réactive le bouton jouer
  $("#bJouer").removeAttr("disabled");
  $("#bJouer").unbind("click").click(jouer);
  //désactive le bouton abandonner
  $("#bAbandonner").unbind("click");
  $("#bAbandonner").attr("disabled", "disabled");
  $("img.carte").removeClass().addClass("carte");

  //redonne la possibilité de choisir la taille du jeu
  $("#nbLignes").removeAttr("disabled");
  $("#nbColonnes").removeAttr("disabled");
  $("#nbColonnes, #nbLignes").change(creerPlateau);

  //redonne la possibilité de choisir un thème
  $("#theme").removeAttr("disabled");
  $("#theme").change(creerPlateau);
  var theme = $("#theme").val();

  //désactive les cartes
  $("img.carte").unbind("click");
  $("img.carte").attr("src", adresseMedia(theme, 0, 0));

  //réinitialise le compteur
  $("#tours").text(0);
  clearInterval(compteur);
  $("#m, #s, #cs").text("00");
  retourne = 0;
}

function chrono() {
  var t1 = Date.now();
  var tInst;

  var m = 0;
  var s = 0;
  var ms = 0;

  //update du compteur toutes les 800ms
  compteur = setInterval(function() {
    tInst = Date.now();
    dt = (tInst - t1)/10;
    m = Math.floor(dt/6000);
    s = (Math.floor(dt/100))%60;
    cs = Math.floor(dt)%100;

    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    if (cs < 10) {
      cs = "0" + cs;
    }

    $("#m").text(m);
    $("#s").text(s);
    $("#cs").text(cs);
  }, 80);
}

function victoire() {
  clearInterval(compteur);
  var wPlateau = document.getElementById("plateau").clientWidth;
  var hPlateau = document.getElementById("plateau").clientHeight;

  var wChrono = document.getElementById("chrono").clientWidth;
  var wTours = document.getElementById("tours").clientWidth;

  $("#plateau").css( "zIndex", 10);


  var code = $("#plateau").html();
}
