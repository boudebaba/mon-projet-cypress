describe('Remplissage dynamique du formulaire Campus France', () => {
  // Charger les données utilisateur depuis le fichier JSON
  beforeEach(() => {
    cy.fixture('utilisateur.json').as('usersData'); // Associe les données à un alias
  });

  it('Formulaire pour chaque utilisateur', function () {
    // Parcourir chaque jeu de données utilisateur
    this.usersData.forEach((userData) => {
      cy.visit('https://www.campusfrance.org/fr/user/register');
      
      // Accepter les cookies
      cy.get('#tarteaucitronPersonalize2').click();
      
      // Remplir les champs du formulaire avec les données JSON
      cy.get('.username[id="edit-name"]').type(userData.email); // Adresse e-mail
      cy.get('.password-field[id="edit-pass-pass1"]').type(userData.password); // Mot de passe
      cy.get('.password-confirm[id="edit-pass-pass2"]').type(userData.confirmPassword); // Confirmation mot de passe
      
      // Cliquer sur la civilité en utilisant le label associé
      cy.get('label[for="edit-field-civilite-mr"]').click(); 

      // Remplir le nom et prénom
      cy.get('#edit-field-nom-0-value').type(userData.nom);
      cy.get('#edit-field-prenom-0-value').type(userData.prenom);

      // Sélectionner le pays
      cy.get('div input[id="edit-field-pays-concernes-selectized"]').click();
      cy.get('div .option[data-value="78"]').click(); 

      // Remplir les autres informations
      cy.get('#edit-field-nationalite-0-target-id').should('be.visible').type('France');
      cy.get('#ui-id-4').click();
      cy.get('#edit-field-code-postal-0-value').type(userData.codePostal);
      cy.get('#edit-field-ville-0-value').type(userData.ville);
      cy.get('#edit-field-telephone-0-value').type(userData.telephone);

      // Sélectionner l'étudiant
      cy.get('#edit-field-publics-cibles-2')
        .scrollIntoView() // Faire défiler l'élément dans la vue
        .click({ force: true }); // Forcer le clic, si nécessaire

      // Sélectionner le domaine
      cy.xpath('//*[@id="edit-field-domaine-etudes-wrapper"]/div/div/div[1]/div').click();

      // Sélectionner l'option du domaine
      cy.xpath(`//*[@id="edit-field-domaine-etudes-wrapper"]//div[text()="${userData.domaineEtudes}"]`).click();

      // Sélectionner le niveau d'études
      cy.xpath('//*[@id="edit-field-niveaux-etude-wrapper"]/div/div/div[1]/div').click();
      cy.xpath(`//*[@id="edit-field-niveaux-etude-wrapper"]//div[text()="${userData.niveauEtudes}"]`).click();

      // Accepter les conditions générales
      cy.get('#edit-field-accepte-communications-value')
        .scrollIntoView()  // Faire défiler l'élément pour s'assurer qu'il est visible
        .click({ force: true });  // Forcer le clic pour contourner les problèmes de visibilité

      // Attendre que le bouton "Créer un compte" soit visible, puis vérifier le texte
      cy.get('#edit-actions').should('be.visible').contains('Créer un compte');
    });
  });
});
