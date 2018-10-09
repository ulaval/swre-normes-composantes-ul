/* global jQuery */
// ----------
// Tableaux "mobiles": si le contenu dépasse la largeur du contenant, un ombrage est affiché sur les côtés pour montrer à l'utilisateur qu'il y a du contenu et qu'il peut défiler à l'horizontal. Voir le CSS.
function gererOmbragesTableauMobile (tableau) {
  if (tableau.scrollLeft() === 0) {
    tableau.removeClass('scroll-left')
  } else {
    tableau.addClass('scroll-left')
  }
  if (tableau.scrollLeft() + tableau.width() === tableau.children('tbody').width()) {
    tableau.removeClass('scroll-right')
  } else {
    tableau.addClass('scroll-right')
  }
}
function hasScroll (el, index, match) {
  var $el = jQuery(el)
  var sX = $el.css('overflow-x')
  var sY = $el.css('overflow-y')
  var hidden = 'hidden' // Minifiers would like this better
  var visible = 'visible'
  var scroll = 'scroll'
  var axis = match[3] // Regex for filter -> 3 == args to selector
  if (!axis) { // Better check than undefined
    // Check both x and y declarations
    if (sX === sY && (sY === hidden || sY === visible)) { // Same check but shorter syntax
      return false
    }
    if (sX === scroll || sY === scroll) { return true }
  } else if (axis === 'x') { // Don't mix ifs and switches on the same variable
    if (sX === hidden || sX === visible) { return false }
    if (sX === scroll) { return true }
  } else if (axis === 'y') {
    if (sY === hidden || sY === visible) { return false }
    if (sY === scroll) { return true }
  }
  // Compare client and scroll dimensions to see if a scrollbar is needed
  return $el.innerHeight() < el.scrollHeight || // Make use of potential short circuit
        $el.innerWidth() < el.scrollWidth // innerHeight is the one you want
}
jQuery.expr[':'].hasScroll = hasScroll
jQuery(document).ready(function () {
  jQuery('table').not('.pleine-largeur').addClass('rtable')
  // Ajoute un div avec position: relative pour wrapper tous les tableaux. Empêche que les ombrages soient appliqués sur 100% de la hauteur de la page
  jQuery('table').not('.pleine-largeur').wrap('<div class="table-wrapper"></div>')
  // Vérifie s'il y a un ombrage à mettre en fonction du scroll au chargement de la page
  jQuery('table:hasScroll').not('.pleine-largeur').each(function () {
    // IE11 passe ici même quand il ne devrait pas, ce qui ajoute un ombrage à gauche sur tous les tableaux
    jQuery(this).addClass('scroll-right')
  })
  // Vérifie s'il reste du contenu à afficher et affiche les ombrages lors du défilement
  jQuery('table').not('.pleine-largeur').scroll(function () {
    gererOmbragesTableauMobile(jQuery(this))
  })
})
// Ajuste la largeur des boutons et regénère l'affichage des tableaux chaque fois que le navigateur est redimensionné
jQuery(window).resize(function () {
  jQuery('table').removeClass('scroll-left scroll-right')
  jQuery('table:hasScroll').not('.pleine-largeur').each(function () {
    gererOmbragesTableauMobile(jQuery(this))
  })
})
// Fin Tableaux mobiles
// ----------
