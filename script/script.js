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
var nbTours;
var tX; //translation sur X du chrono et du nombre de tours
var bgImg; //adresse de l'image du fond d'écran

/*
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        UTILISATION
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
*/

creerPlateau();

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

  if(theme >= 1 && theme <= 5) {
    bgImg = "url(https://i.pinimg.com/originals/8c/97/7d/8c977d06abc3eee45c0e696c3e325dc1.jpg)";
  }
  else if (theme == 6) {
    bgImg = "url(https://gameranx.com/wp-content/uploads/2016/02/Ratchet-Clank-4K-Wallpaper-3.jpg)";
  }
  else if (theme == 7) {
    bgImg = "url(https://cdn.hipwallpaper.com/i/90/16/7pGSPe.jpg)";
  }
  else {
    bgImg = "url(https://wallpapercave.com/wp/jb9W9vS.jpg)";
  }

  $("#bg").css("background-image", bgImg);

  $("#plateau").html(code);
  //définition de la taille du plateau
  $("#plateau").css("width", (colonne)*70+(2*colonne)*5 + "px");

  $("#voile").css("width", $("#plateau").outerWidth() + "px");
  $("#voile").css("height", $("#plateau").outerHeight() + "px");
  $("#voile").css("top", $("#plateau").position().top + 20 + "px");
  $("#voile").css("left", $("#plateau").position().left + "px");

  $("#bJouer").css("display", "unset");
  $("#bAbandonner").css("display", "none");
  $("#bAbandonner").css("top", $("#plateau").offset().top + $("#plateau").outerHeight() + 80 + "px");
  $("#bAbandonner").css("left", $("#plateau").position().left + $("#plateau").outerWidth()/2 - 53 + "px");
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
      pretendant = parseInt(Math.random()*imgPerTheme[theme])+1;
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
  var alea;
  do {
    alea = Math.floor(Math.random()*nbCartes);
  }while (couples[alea] == 0);
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
  $("#bJouer").css("opacity", "0");
  setTimeout(function() {
    $("#bJouer").css("display", "none");
  }, 1000);

  $("#bJouer").attr("disabled", "true");
  setTimeout(function() {
    $("#bJouer").removeAttr("disabled");
  }, 1000);

  $("#bAbandonner").attr("disabled", "true");
  setTimeout(function() {
    $("#bAbandonner").removeAttr("disabled");
  }, 1000);
  $("#bAbandonner").css("display", "unset");
  $("#bAbandonner").css("opacity", "1");

  $("#voile").css({"background-color" : "rgba(255,255,255,0)"})
  setTimeout(function(){
    $("#voile").css("opacity", "0");
    $("#voile").css("z-index", "-1");
    $("#score").css("z-index", "1");
  }, 350);
  $("#score").css("opacity", "1");
  $("#plateau").css("display", "flex");
  $("#plateau").css("z-index", "2");

  $("#nbLignes").unbind("change");
  $("#nbLignes").attr("disabled", "disabled");
  $("#nbColonnes").unbind("change");
  $("#nbColonnes").attr("disabled", "disabled");
  $("#theme").unbind("change");
  $("#theme").attr("disabled", "disabled");
  var theme = $("#theme").val();

  chrono();

  $("img.carte").attr("src", adresseMedia(theme, 0, 1));

  //remise à 0
  $(".carte").removeClass().addClass("carte");
  attribCouple(imgPerTheme);
  $("img.carte").click(retourneCarte);
  $(".divCarte").addClass("hover");
  $("#tours").text("0 tour");
  nbTours = 0;

  divCarte = $(".divCarte");

  //définition de la position du chrono et du nombre de tours


  $("#chrono").css("left", ($(document).width() - $("#plateau").outerWidth() - 2 * $("#chrono").outerWidth())/4);
  $("#chrono").css("top", $("#plateau").position().top + $("#plateau").outerHeight()/2);
  $("#tours").css("right", ($(document).width() - $("#plateau").outerWidth() - 2 * $("#chrono").outerWidth())/4);
  $("#tours").css("top", $("#plateau").position().top + $("#plateau").outerHeight()/2);
  $("#score").css("width", $("#milieu").width());

  $("#chrono").css({"transform" : "translate(0,0)"});
  $("#tours").css({"transform" : "translate(0,0)"});

  $("h2").css("display", "none");
  $("h2").css("transform", "scale(0)");
  $("#annonceScores").css("display", "none");
  $("#annoncePc").css("display", "none");
  $("#bRetour").css("display", "none");
  $("#bRejouer").css("display", "none");

  $("#options").css("display", "none");
  $("#plateau").css("opacity", "1");

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
    nbTours = parseInt($("#tours").text())+1;
    if (nbTours > 1) {
      $("#tours").text(nbTours + "  tours");
    }
    else {
      $("#tours").text(nbTours + "  tour");
    }

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
    nbTours = parseInt($("#tours").text())+1;
    if (nbTours > 1) {
      $("#tours").text(nbTours + "  tours");
    }
    else {
      $("#tours").text(nbTours + "  tour");
    }

    retourne = 0;
    setTimeout(function(){
      $("img.carte").not($(".found")).click(retourneCarte);
      $("img.carte").removeClass("retournee");
      for (var i = 0 ; i < divCarte.length ; i ++) {
        if (divCarte[i].getElementsByClassName("retournee").length == 0  && divCarte[i].getElementsByClassName("found").length == 0) {
          divCarte[i].className += " hover";
        }
      }
    }, 1700);

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
    setTimeout(function(){
      victoire();
    }, 500);
  }

}

function abandonner() {
  //empêche des cartes retournées temporairement de se re-retourner
  //après l'arrêt de la partie
  clearTimeout(timeOutRetourne);
  $(".divCarte").removeClass("hover");
  //réactive le bouton jouer
  $("#bJouer").attr("disabled", "true");
  $("#bJouer").css("display", "unset");
  $("#bJouer").css("opacity", "1");
  setTimeout(function() {
    $("#bJouer").removeAttr("disabled");
  }, 1000);
  $("#bJouer").unbind("click").click(jouer);
  //désactive le bouton abandonner
  $("#bAbandonner").unbind("click");
  $("#bAbandonner").css("opacity", "0");
  setTimeout(function() {
    $("#bAbandonner").css("display", "none");
  }, 1000);
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

  $("#bRetour").css("display", "none");
  $("#bRejouer").css("display", "none");

  setTimeout(function() {
    $("#options").css("display", "flex");
  }, 300)
  $("#plateau").css("opacity", "0");

  $("#score").css("opacity", "0");
  $("#voile").css("opacity", "1");
  $("#voile").css({"background-color" : "rgba(255,255,255,0.7)"});
  $("#voile").css("z-index", "2");
  $("#plateau").css("z-index", "1");
  $("h2").text("");
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

  $("#voile").css("opacity", "1");
  $("#voile").css("z-index", "2");
  $("#plateau").css("z-index", "1");
  $("#score").css("z-index", "3");
  //définition des dimensions du voile
  $("#voile").css("width", $("#plateau").outerWidth() + "px");
  $("#voile").css("height", $("#plateau").outerHeight() + "px");
  $("#voile").css("top", $("#plateau").position().top + 20 + "px");
  $("#voile").css("left", $("#plateau").position().left + "px");

  $("#voile").css({"background-color" : "rgba(255,255,255,1"});
  setTimeout(function(){
    $("#plateau").css({"display" : "none"});
    $("#voile").css({"background-color" : "rgba(255,255,255,0.7"});
  }, 450);

    //positionnement des boutons
    $("#bRetour").css("top", $("#voile").position().top + $("#voile").outerHeight() - 50 + "px");
    $("#bRetour").css("left", $("#voile").position().left + $("#voile").outerWidth()/2 - $("#bRetour").width()/2 + "px");
    setTimeout(function(){
        $("#bRetour").css("display", "unset");
    }, 1200);

    $("#bRejouer").css("top", $("#voile").position().top + $("#voile").outerHeight() - 90 + "px");
    $("#bRejouer").css("left", $("#voile").position().left + $("#voile").outerWidth()/2 - $("#bRetour").width()/2 + "px");
    setTimeout(function(){
        $("#bRejouer").css("display", "unset");
    }, 1200);

    $("#bAbandonner").css("opacity", "0");
    setTimeout(function() {
      $("#bAbandonner").css("display", "none");
    }, 1000);

    //déplacement du chrono et du nombre de nbTours
    $("#chrono").css({"transform" : "translate(" + ($(document).width()/2 - $("#chrono").position().left - ($("#chrono").outerWidth()/2)) + "px , -20px)"});
    $("#tours").css({"transform" : "translate(" + ($(document).width()/2 - $("#tours").position().left - ($("#tours").outerWidth()/2)) + "px , 25px)"});

    $("h2").text("FÉLICITATIONS !");
    $("h2").css("display", "unset");
    setTimeout(function() {
      $("h2").css("transform", "scale(3)");
      setTimeout(function() {
        $("h2").css("transform", "scale(1)");
      }, 1000);
    }, 800);
    $("h2").css("top", ($("#plateau").position().top) + 10 + "px");

    $("#annonceScores").text("Vous avez terminé la partie en :");
    setTimeout(function() {
      $("#annonceScores").css("display", "unset");
    }, 650);
    $("#annonceScores").css("top", ($("#chrono").position().top) - 65 + "px");

    $("#annoncePc").text("Soit " + Math.round(($("#nbLignes").val() * $("#nbColonnes").val()/2)/nbTours*100) + "% de réussite");
    setTimeout(function() {
      $("#annoncePc").css("display", "unset");
    }, 650);
    $("#annoncePc").css("top", ($("#tours").position().top) + 50 + "px");


}
