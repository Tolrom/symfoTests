describe('Test d\'ajout de catégorie', () => {
    beforeEach(() => {
        cy.visit('https://127.0.0.1:8000/category');
    });

    it('Ajout réussi d\'une catégorie', () => {
        cy.get('a[href="/category/new"]').click();
        cy.get('input[name="category[label]"]').type('Nouvelle Catégorie');
        cy.get('button[class="btn"]').click();

        cy.contains('a', 'back to list').click();
        cy.contains('table tr', 'Nouvelle Catégorie').should('exist');
    });

    it('Ajout échoué d\'une catégorie (erreur)', () => {
        cy.get('a[href="/category/new"]').click();
        cy.get('input[name="category[label]"]').type(''); // Champ vide pour forcer l'erreur
        cy.get('button[class="btn"]').click();
    });

    it('Ajout en double d\'une catégorie', () => {
        cy.get('a[href="/category/new"]').click();
        cy.get('input[name="category[label]"]').type('Nouvelle Catégorie'); // Champ déjà utilisé pour forcer l'erreur
        cy.get('button[class="btn"]').click();
    })
    it('Modification du nom d\'une catégorie', () => {
        cy.get('tr')
        .contains('td', 'Nouvelle Catégorie')
        .closest('tr')
        .find('td')
        .eq(2)
        .find('a')
        .contains('edit')
        .click();
        cy.get('input[name="category[label]"]')
        .clear()
        .type('Nouveau nom!');
        cy.contains('button', 'Update').click();

        cy.contains('a', 'back to list').click();
        cy.contains('table tr', 'Nouveau nom!').should('exist');
    
    })
});