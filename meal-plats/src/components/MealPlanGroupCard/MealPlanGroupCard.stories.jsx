import React from 'react';
import MealPlanGroupCard from './MealPlanGroupCard';
import refreshIcon from '../../asset/refresh.png';

export default {
    component: MealPlanGroupCard,
    title: 'Component/mealPlanGroupCard',
};

const Template = (args) => <MealPlanGroupCard {...args} />;

export const recipe = Template.bind({});

recipe.args = {
  recipe1 :
  {
    img: "https://img-3.journaldesfemmes.fr/87UPumvDI14qEg_1F-VFfdFwWE4=/750x500/smart/7ec9c7cc57a844c4acf11ea8313519b2/recipe-jdf/10018962.jpg",
    title: 'Boeuf Yakitori',
    description: 'Assortiment de boeuf dans une sauce spécial',
    type: 'Petit déjeuner'
  },
  recipe2 :
  {
    img: "https://resize.prod.femina.ladmedia.fr/rblr/652,438/img/var/2021-09/istock-1335861186.jpg",
    title: 'Boeuf Yakitori',
    description: 'Assortiment de boeuf dans une sauce spécial',
    type: 'Déjeuner'
  },
  recipe3 :
  {
    img: "https://img.cuisineaz.com/680x357/2018/11/20/i144358-risotto-aux-legumes-au-cookeo.jpeg",
    title: 'Boeuf Yakitori',
    description: 'Assortiment de boeuf dans une sauce spécial fvxdxv  ezikln frjn si fs ils  slsi s sil rsl sli j',
    type: 'Dinner'
  }
}



