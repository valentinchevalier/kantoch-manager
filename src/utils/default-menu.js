export default {
  plates: [
    {
      id: 'entree',
      category: 'food',
      label: 'Entrée',
      price: 3.5,
      isFormuleEntree: true,
    },
    {
      id: 'tarte-crudites',
      category: 'food',
      label: 'Tarte salée',
      labelExtra: 'Avec crudités',
      price: 9.5,
      isFormuleMain: true,
      formules: {
        small: 12,
        big: 15,
      },
    },
    {
      id: 'plat-du-jour',
      category: 'food',
      label: 'Plat du jour',
      price: 10.5,
      isFormuleMain: true,
      formules: {
        small: 13,
        big: 16,
      },
    },
    {
      id: 'sandwich',
      category: 'food',
      label: 'Sandwich',
      price: 5.5,
      isFormuleMain: true,
      formules: {
        small: 8.5,
        big: 11.5,
      },
    },
    {
      id: 'soupe-petite',
      category: 'food',
      label: 'Soupe',
      labelExtra: 'Petite',
      price: 3.5,
      isFormuleEntree: true,
    },
    {
      id: 'soupe-grande',
      category: 'food',
      label: 'Soupe',
      labelExtra: 'Grande',
      price: 5.5,
    },
    {
      id: 'tarte-seule',
      category: 'food',
      label: 'Tarte salé',
      labelExtra: 'Seule',
      price: 5,
    },
    {
      id: 'dessert',
      category: 'food',
      label: 'Dessert',
      price: 3.5,
      isFormuleDessert: true,
    },
    {
      id: 'cookie',
      category: 'food',
      label: 'Cookie',
      price: 2,
      isFormuleDessert: true,
    },
    {
      id: 'eau',
      category: 'drink',
      label: 'Eau plate',
      price: 1.5,
    },
    {
      id: 'eau-gazeuse',
      category: 'drink',
      label: 'Eau gazeuse',
      price: 2,
    },
    {
      id: 'boisson-fraiche',
      category: 'drink',
      label: 'Soda - Jus de fruits',
      price: 3,
    },
    {
      id: 'biere-vin',
      category: 'drink',
      label: 'Bière - Vin',
      price: 2.5,
    },
    {
      id: 'cafe',
      category: 'drink',
      label: 'Café',
      price: 1.5,
    },
    {
      id: 'noisette',
      category: 'drink',
      label: 'Noisette',
      price: 1.8,
    },
    {
      id: 'boisson-chaude',
      category: 'drink',
      label: 'Autre boisson chaude',
      price: 3,
    },
    {
      id: 'supplement',
      category: 'drink',
      label: 'Supplément',
      price: 0.2,
    },
  ],
};
