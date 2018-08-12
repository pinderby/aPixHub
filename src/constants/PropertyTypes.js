export const PropertyTypes = {
    'String':'string',
    'Integer':'integer',
    'Float':'float',
    'Boolean':'boolean',
    'Reference':'relationship', // TODO --DM-- Rename
    'Array':'array',
    'JSON':'json' // TODO --DM-- Rename
};

export const InputTypes = {
  TEXT: 0,
  CHECKBOX: 1,
  NUMBER: 2,
  SELECT: 3
};

export const DIRECTION = {
  IN: 'in',
  OUT: 'out'
}

export default PropertyTypes;
