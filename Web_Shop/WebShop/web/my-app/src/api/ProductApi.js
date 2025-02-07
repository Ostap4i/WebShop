import axios from 'axios';

// Налаштування базового URL для API
const api = axios.create({
  baseURL: 'http://localhost:5152/api/v1/product', // Ваш правильний URL
});

// Отримання всіх продуктів
export const getAllProducts = async () => {
  try {
    const response = await api.get('/getallproducts');
    return response.data; // Повертаємо дані продуктів
  } catch (error) {
    console.error('Помилка при отриманні продуктів:', error);
    throw error;
  }
};

// Отримання продукту за ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/getproductbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні продукту:', error);
    throw error;
  }
};

// Додавання нового продукту
export const addProduct = async (product) => {
  try {
    const response = await api.post('/addproduct', product);
    return response.data;
  } catch (error) {
    console.error('Помилка при додаванні продукту:', error);
    throw error;
  }
};

// Оновлення продукту
export const updateProduct = async (id, product) => {
  try {
    const response = await api.put(`/updateproduct/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Помилка при оновленні продукту:', error);
    throw error;
  }
};

// Видалення продукту
export const deleteProduct = async (id) => {
  try {
    await api.delete(`/deleteproduct/${id}`);
  } catch (error) {
    console.error('Помилка при видаленні продукту:', error);
    throw error;
  }
};
