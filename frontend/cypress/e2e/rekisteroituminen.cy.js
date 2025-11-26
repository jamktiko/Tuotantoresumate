describe('Rekisteröityminen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/rekisteroidy');
  });

  it('näyttää rekisteröitymislomakkeen', () => {
    cy.contains('Aloita nyt').should('be.visible');
    cy.get('input[placeholder="Nimi"]').should('be.visible');
    cy.get('input[placeholder="Sähköposti"]').should('be.visible');
    cy.get('input[placeholder="Salasana"]').should('be.visible');
    cy.get('input[type="checkbox"]').should('exist');
  });

  it('ei anna rekisteröityä ilman ehtojen hyväksyntää', () => {
    cy.get('input[placeholder="Nimi"]').type('Testi Käyttäjä');
    cy.get('input[placeholder="Sähköposti"]').type('test@example.com');
    cy.get('input[placeholder="Salasana"]').type('salasana123');

    // kuunnellaan alert-viestiä
    cy.on('window:alert', (txt) => {
      expect(txt).to.contain('Hyväksy ehdot ensin!');
    });

    cy.contains('Rekisteröidy').click();
  });

  it('antaa rekisteröityä kun ehdot on hyväksytty', () => {
    cy.get('input[placeholder="Nimi"]').type('Uusi Käyttäjä');
    cy.get('input[placeholder="Sähköposti"]').type('uusi@example.com');
    cy.get('input[placeholder="Salasana"]').type('salasana456');
    cy.get('input[type="checkbox"]').check();

    cy.contains('Rekisteröidy').click();

    // koska teillä ei vielä ole navigointia,
    // testataan vain että alert EI tule.
    cy.on('window:alert', () => {
      throw new Error('Ei pitäisi tulla alertia kun ehdot hyväksytty');
    });
  });
});
