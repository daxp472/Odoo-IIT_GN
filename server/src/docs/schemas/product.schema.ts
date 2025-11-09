export const productSchemas = {
  CreateProductRequest: {
    type: 'object',
    required: ['name', 'unit_price'],
    properties: {
      name: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      category: {
        type: 'string'
      },
      unit_price: {
        type: 'number'
      },
      currency: {
        type: 'string',
        default: 'USD'
      },
      sku: {
        type: 'string'
      },
      barcode: {
        type: 'string'
      },
      unit_of_measure: {
        type: 'string',
        default: 'unit'
      },
      tax_rate: {
        type: 'number',
        default: 0
      },
      is_active: {
        type: 'boolean',
        default: true
      },
      image_url: {
        type: 'string',
        format: 'uri'
      }
    }
  },
  UpdateProductRequest: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      category: {
        type: 'string'
      },
      unit_price: {
        type: 'number'
      },
      currency: {
        type: 'string'
      },
      sku: {
        type: 'string'
      },
      barcode: {
        type: 'string'
      },
      unit_of_measure: {
        type: 'string'
      },
      tax_rate: {
        type: 'number'
      },
      is_active: {
        type: 'boolean'
      },
      image_url: {
        type: 'string',
        format: 'uri'
      }
    }
  }
};