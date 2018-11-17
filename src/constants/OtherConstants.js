export const TemplateTypes = {
  NODE: 0,
  RELATIONSHIP: 1,
  INTERFACE: 2,
  0: "NODE",
  1: "RELATIONSHIP",
  2: "INTERFACES"
};

TemplateTypes.getTypeTitle = (type) => { 
  // Initialize titles
  let titles = {
    0: "Node Template",
    1: "Relationship Template",
    2: "Interface"
  }

  // Return title
  return titles[type];
}

export default TemplateTypes