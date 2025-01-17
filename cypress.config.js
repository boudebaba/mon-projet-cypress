const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Tu peux ajouter des événements ou des plugins ici si nécessaire
    },
    reporter: 'mochawesome', // Utilisation de Mochawesome comme reporter
    reporterOptions: {
      reportDir: 'cypress/reports', // Dossier où seront sauvegardés les rapports
      overwrite: true,             // Écraser les anciens rapports à chaque exécution
      html: true,                  // Générer un rapport HTML
      json: true                   // Générer un fichier JSON pour la fusion des rapports
    },
    video: true, // Enregistrer une vidéo des tests
    screenshotOnRunFailure: true, // Prendre des captures d'écran en cas d'échec des tests
  },
});
