const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Ajouter des événements ou des plugins si nécessaire
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",  // Répertoire de destination des rapports
      reportFilename: "mochawesome", // Nom du fichier du rapport
      overwrite: false,
      html: true,   // Générer le rapport HTML
      json: true,   // Générer le rapport JSON
    },
    video: true,  // Enregistrer une vidéo des tests
    screenshotOnRunFailure
    : true, // Prendre des captures d'écran en cas d'échec
  },
});
