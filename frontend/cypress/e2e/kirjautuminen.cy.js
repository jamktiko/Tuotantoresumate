describe('Kirjautumissivu', () => {
  it('näyttää kirjautumiskentät ja ohjaa pääsivulle', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Sähköpostiosoite"]').type('test@example.com');
    cy.get('input[placeholder="Salasana"]').type('salasana123');

    cy.contains('Kirjaudu').click({ force: true });

    // Varmistetaan navigointi /paasivu
    cy.location('pathname', { timeout: 3000 }).should('eq', '/paasivu');
  });
});
