jQuery(document).ready(function(){

  //////////
  //Accordéons
  jQuery( ".accordeon-titre" ).click( function() {
    jQuery( this ).next().slideToggle();
    jQuery( this ).parent().toggleClass( "ouvert" );
  });
  jQuery( "a" ).click( function() { //Si le lien cliqué comporte un #, on ouvre l'accordéon correspondant
    var lien = jQuery( this ).attr("href");
    if (typeof lien !== typeof undefined && lien !== false) {
      var positionHashtag = lien.indexOf("#");
      if( positionHashtag != -1 ) {
        var hashtag = lien.substring(positionHashtag, lien.length);
        jQuery( ".accordeon" + hashtag ).addClass( "ouvert" );
      }
    }
  });
  if( window.location.hash ) {
    jQuery( ".accordeon" + window.location.hash ).addClass( "ouvert" ); //Au chargement, si l'URL demandé comporte un #, on ouvre l'accordéon correspondant
  }
  //////////

});

//////////
//Tableaux "mobiles": si le contenu dépasse la largeur du contenant, un ombrage est affiché sur les côtés pour montrer à l'utilisateur qu'il y a du contenu et qu'il peut défiler à l'horizontal. Voir le CSS.
function gererOmbragesTableauMobile(tableau) {
	if ( tableau.scrollLeft() == 0) {
    tableau.removeClass('scroll-left');
  } else {
    tableau.addClass('scroll-left');
  }
  if ( tableau.scrollLeft() + tableau.width() == tableau.children('tbody').width()) {
    tableau.removeClass('scroll-right');
  } else {
    tableau.addClass('scroll-right');
  }
}
function hasScroll(el, index, match) {
    var $el = jQuery(el),
        sX = $el.css('overflow-x'),
        sY = $el.css('overflow-y'),
        hidden = 'hidden', // minifiers would like this better
        visible = 'visible',
        scroll = 'scroll',
        axis = match[3]; // regex for filter -> 3 == args to selector
    if (!axis) { // better check than undefined
        //Check both x and y declarations
        if (sX === sY && (sY === hidden || sY === visible)) { //same check but shorter syntax
            return false;
        }
        if (sX === scroll || sY === scroll) { return true; }
    } else if (axis === 'x') { // don't mix ifs and switches on the same variable
        if (sX === hidden || sX === visible) { return false; }
        if (sX === scroll) { return true; }
    } else if (axis === 'y') {
        if (sY === hidden || sY === visible) { return false; }
        if (sY === scroll) { return true; }
    }
    //Compare client and scroll dimensions to see if a scrollbar is needed
    return $el.innerHeight() < el.scrollHeight || //make use of potential short circuit
        $el.innerWidth() < el.scrollWidth; //innerHeight is the one you want
}
jQuery.expr[':'].hasScroll = hasScroll;
jQuery(document).ready(function() {
	/* Gestion des tableaux en mobile */
	jQuery('table').addClass('rtable');
	/* On ajoute un div avec position: relative pour wrapper tous les tableaux. C'est pour empêcher que les ombrages d'être appliqués sur 100% de la hauteur de la page */
	jQuery('table').wrap('<div class="table-wrapper"></div>');
    /* Au chargement de la page, on vérifie s'il y a un ombrage à mettre en fonction du scroll */
	jQuery('table:hasScroll').each(function(){
    /* IE11 passe ici même quand il ne devrait pas, ce qui ajoute un ombrage à gauche sur tous les tableaux. */
		jQuery(this).addClass('scroll-right');
	});
	/* Lorsque que la personne déroule le tableau, on vérifie s'il reste du contenu à afficher ou pas et on affichage les ombrages selon */
	jQuery('table').scroll(function() {
	   	gererOmbragesTableauMobile(jQuery(this));
	});
});
/* Chaque fois que le navigateur est resizé, on ajuste la largeur des boutons et on regénère l'affichage des tableaux mobiles */
jQuery( window ).resize(function() {
	/* Lorsqu'on modifie la largeur du navigateur, on doit ajuster le tableau en fonction de la largeur et de la présence de la barre de déroulement */
  jQuery('table').removeClass('scroll-left scroll-right');
    jQuery('table:hasScroll').each(function() {
      gererOmbragesTableauMobile(jQuery(this));
    });
});
//Fin Tableaux mobiles
//////////
