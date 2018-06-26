export default {
  plates: [
    {
      id: 'plat-du-jour',
      category: 'food',
      label: 'Plat du jour',
      price: 10.5,
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
      formules: {
        small: 8.5,
        big: 11.5,
      },
    },
    {
      id: 'tarte',
      category: 'food',
      label: 'Tarte salée',
      price: 5,
      variations: [
        {
          id: 'seule',
          label: 'Seule',
        },
        {
          id: 'crudites',
          label: 'Avec crudités',
          price: 9.5,
          formules: {
            small: 12,
            big: 15,
          },
        },
      ],
      choices: [],
    },
    {
      id: 'entree',
      category: 'food',
      label: 'Entrée',
      price: 3.5,
      choices: [],
      entreeFormule: true,
    },
    {
      id: 'soupe',
      category: 'food',
      label: 'Soupe',
      price: 3.5,
      variations: [
        {
          id: 'petite',
          label: 'Petite',
          entreeFormule: true,
        },
        {
          id: 'grande',
          label: 'Grande',
          price: 5.5,
        },
      ],
    },
    {
      id: 'dessert',
      category: 'food',
      label: 'Dessert',
      price: 3.5,
      choices: [],
      dessertFormule: true,
    },
    {
      id: 'cookie',
      category: 'food',
      label: 'Cookie',
      price: 2,
      dessertFormule: true,
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
      label: 'Thé - Latte - Cappuccino - Chocolat',
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
