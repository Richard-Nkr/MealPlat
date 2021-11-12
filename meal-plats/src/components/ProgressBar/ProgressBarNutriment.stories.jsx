import React from 'react';
import ProgressBarNutriment from './ProgressBarNutriment';

export default {
    component: ProgressBarNutriment,
    title: 'Component/progressBar',
};

const Template = (args) => <ProgressBarNutriment {...args} />;

export const proteineProgress = Template.bind({});

proteineProgress.args = {
    title : "Protéines",
    pourcent: 80,
    color: 'success'
}

export const glucideProgress = Template.bind({});

glucideProgress.args = {
    title : "Glucides",
    pourcent: 60,
    color: 'warning'
}

export const lipideProgress = Template.bind({});

lipideProgress.args = {
    title : "Lipides",
    pourcent: 10,
    color: 'info'
}

