/********************
Configurations Grunt des composantes réutilisables
Bureau des services Web de l'Université Laval
web@bsw.ulaval.ca
*********************/
'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt); // Utilise le module load-grunt-tasks pour charger automatiquement les tâches à partir du fichier package.json
  grunt.initConfig({
    copy: {
      build: { // Copie les dépendances du dossier node_modules (téléchargées grace au fichier package.json) vers le dossier de travail. JQuery est dans les normes (sous-module git).
        files: [
          {
            expand: true,
            flatten: true,
            src: ['node_modules/normalize.css/normalize.css'],
            dest: 'css/sass/common/',
            filter: 'isFile',
            rename: function(dest, src) {
              return dest + '_normalize.scss';
            }
          },
        ]
      },
    },
    /********************
    Linters
    Ils fontionnent tous différemment. Voir le wiki pour des détails.
    *********************/
    standard: { // Javascript (https://standardjs.com/)
        src: ['scripts/**/*.js'] // On scan tout le dossier script et ses sous dossiers. Les configurations sont intégrés dans le module. Utiliser le CLI pour réparer les erreurs automatiquements.
    },
    stylelint: { // CSS et SASS (https://stylelint.io/)
      all: ['css/sass/**/*.scss'] // On scan tout le dossier sass et ses sous dossiers. Les configurations viennent des modules stylelint-config-standard et stylelint-order. Utiliser le CLI pour réparer les erreurs automatiquements.
    },
    htmllint: { // HTML et Twig (http://htmllint.github.io/). Non utile dans le cas d'un thème WordPress si aucune intégration statique n'est faite avant d'ajouter le PHP. Les erreurs doivent être réparé manuellement. CLI en développement.
      options: {
        htmllintrc: '.htmllintrc', //fichier de configuration
      },
      src: ['dossier-des-gabarits/**/*.twig']
    },
    /* Fin Linters
    ********************/
    sass: {
      main: {
        options: {
          style: 'compressed',
          unixNewlines: true,
        },
        files: {
          'css/composantes-ul.css': 'css/sass/assemblage.scss',
        },
      },
    },
    watch: {
      configFiles: {
        files: [ 'Gruntfile.js'],
        options: {
          reload: true
        }
      },
      sass: {
        files: ['css/sass/**/*.scss'],
        tasks: ['stylelint', 'sass:main'],
      },
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['standard'],
      },
    },
  })
  grunt.registerTask('build', [ // Construit un environnement de test local
    'ci',
    'copy:build',
    'sass:main',
  ]);
  grunt.registerTask('serve', [ // Démarre les services nécessaires au développement
    'build',
    'watch',
  ]);
  grunt.registerTask('ci', [ // Validation du code
    'standard',
    'stylelint',
  ]);
  grunt.registerTask('default', [ // Exécuté avec la commande "grunt" seule
    'build'
  ]);
};
