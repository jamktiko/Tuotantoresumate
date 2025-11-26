describe('Unohtuiko salasana -sivu', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/reset');
  });

  it('näyttää sähköpostikentän ja lähetysnapin', () => {
    cy.contains('Unohtuiko salasana?').should('be.visible');
    cy.get('input[placeholder="Sähköpostiosoite"]').should('be.visible');
    cy.contains('Lähetä palautuslinkki').should('be.visible');
  });

  it('onnistuu kun sähköposti on olemassa (mockataan OK-vastaus)', () => {
    // Mockataan backendin vastaus: HTTP 200
    cy.intercept('POST', 'http://localhost:4000/forgot-password', {
      statusCode: 200,
      body: { message: 'ok' },
    }).as('resetPost');

    cy.get('input[placeholder="Sähköpostiosoite"]').type('test@example.com');
    cy.contains('Lähetä palautuslinkki').click();

    cy.wait('@resetPost');

    // Testataan viesti joka UI:ssa näkyy onnistuneessa tapauksessa
    cy.contains('Palautuslinkki on lähetetty sähköpostiisi').should(
      'be.visible'
    );
  });

  it('näyttää virheilmoituksen, jos palvelin palauttaa virheen', () => {
    cy.intercept('POST', 'http://localhost:4000/forgot-password', {
      statusCode: 400,
      body: { error: 'Sähköpostia ei löydy' },
    }).as('resetPostFail');

    cy.get('input[placeholder="Sähköpostiosoite"]').type('virhe@example.com');
    cy.contains('Lähetä palautuslinkki').click();

    cy.wait('@resetPostFail');

    cy.contains('Sähköpostia ei löydy').should('be.visible');
  });

  it('näyttää virheen, jos backend on kokonaan alhaalla', () => {
    cy.intercept('POST', 'http://localhost:4000/forgot-password', {
      forceNetworkError: true,
    }).as('netError');

    cy.get('input[placeholder="Sähköpostiosoite"]').type('down@example.com');
    cy.contains('Lähetä palautuslinkki').click();

    cy.wait('@netError');

    cy.contains('Palvelimeen ei saatu yhteyttä.').should('be.visible');
  });
});
