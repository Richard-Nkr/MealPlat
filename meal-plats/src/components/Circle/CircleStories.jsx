import React from "react";
import Circle from "./Circle";

export default {
  component: Circle,
  title: "Component/Circle",
};

const Template = (args) => <Circle {...args} />;

export const UnderAverage = Template.bind({});

UnderAverage.args = {
  number: "1500",
};

export const OverAverage = Template.bind({});

OverAverage.args = {
  number: "2200",
};
