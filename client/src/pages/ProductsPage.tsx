import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useApp } from '../context/AppContext';

interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  unit_price: number;
  currency: string;
  sku?: string;
  barcode?: string;
  unit_of_measure: string;
  tax_rate: number;
  is_active: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export const ProductsPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    unit_price: 0,
    currency: 'USD',
    sku: '',
    barcode: '',
    unit_of_measure: 'unit',
    tax_rate: 0,
    is_active: true,
    image_url: ''
  });

  useEffect(() => {
    // Data is loaded in the AppContext, so we just need to set loading to false
    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, { ...formData, unit_price: Number(formData.unit_price), tax_rate: Number(formData.tax_rate) });
        setIsModalOpen(false);
        setEditingProduct(null);
        resetForm();
      } else {
        await addProduct({ ...formData, unit_price: Number(formData.unit_price), tax_rate: Number(formData.tax_rate) });
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category || '',
      unit_price: product.unit_price,
      currency: product.currency,
      sku: product.sku || '',
      barcode: product.barcode || '',
      unit_of_measure: product.unit_of_measure,
      tax_rate: product.tax_rate,
      is_active: product.is_active,
      image_url: product.image_url || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      unit_price: 0,
      currency: 'USD',
      sku: '',
      barcode: '',
      unit_of_measure: 'unit',
      tax_rate: 0,
      is_active: true,
      image_url: ''
    });
  };

  const getStatusBadgeClass = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            New Product
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                          {product.image_url ? (
                            <img className="h-10 w-10 rounded-md" src={product.image_url} alt={product.name} />
                          ) : (
                            <span className="text-gray-500">No Image</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description || 'No description'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.currency} {product.unit_price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(product.is_active)}`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-purple-600 hover:text-purple-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          resetForm();
        }}
        title={editingProduct ? "Edit Product" : "Create New Product"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Unit Price"
              name="unit_price"
              type="number"
              step="0.01"
              value={formData.unit_price}
              onChange={handleInputChange}
              required
            />
            
            <Input
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
            />
            
            <Input
              label="Barcode"
              name="barcode"
              value={formData.barcode}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Unit of Measure"
              name="unit_of_measure"
              value={formData.unit_of_measure}
              onChange={handleInputChange}
            />
            
            <Input
              label="Tax Rate (%)"
              name="tax_rate"
              type="number"
              step="0.01"
              value={formData.tax_rate}
              onChange={handleInputChange}
            />
          </div>
          
          <Input
            label="Image URL"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
          />
          
          <div className="flex items-center">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setEditingProduct(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};