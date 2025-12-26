import React, { useState } from 'react'

const useProperties = () => {

  const backendUrl = import.meta.env.VITE_API_URL + '/properties'

  const [formData, setFormData] = useState({
    title: '',
    category: 'Casa' | 'Departamento',
    listingType: 'Venta' | 'Alquiler',
    price: 0,
    baths: 0,
    rooms: 0,
    address: '',
    area: '',
    images: [],
  });

  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState(null);
  const [msgError, setMsgError] = useState('');
  const [msgSuccess, setMsgSuccess] = useState('');
  const [loading, setLoading] = useState(true)

  const clearMessages = () => {
    setTimeout(() => {
      setMsgError('');
      setMsgSuccess('');
    }, 5000);
  }

  const getProperties = async () => {
    try {
      const res = await fetch(`${backendUrl}`, { method: 'GET' });
      const data = await res.json();
      setProperties(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const getProperty = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/${id}`, { method: 'GET' });
      const data = await res.json();
      setProperty(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const addProperty = async () => {
    setMsgError('');
    setMsgSuccess('');
    try {
      const res = await fetch(`${backendUrl}/`, { method: 'POST', headers: { 'Content-Type': 'applcation/json' }, credentials: 'include', body: JSON.stringify(formData) });
      const data = await res.json();

      if (!data.success) {
        setMsgError(data.error);
        clearMessages();
        return;
      }

      setProperty(data.data);
      setMsgSuccess(data.message);
      clearMessages();

    } catch (error) {
      console.log(error);
      setMsgError('Internal server error.');
      clearMessages();
    } finally {
      setLoading(false);
    }
  }

  const updateProperty = async (id) => {
    setMsgError('');
    setMsgSuccess('');
    try {
      const res = await fetch(`${backendUrl}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'applcation/json' }, credentials: 'include', body: JSON.stringify(formData) });
      const data = await res.json();

      if (!data.success) {
        setMsgError(data.error);
        clearMessages();
        return;
      }

      setProperty(data.data);
      setMsgSuccess(data.message);
      clearMessages();

    } catch (error) {
      console.log(error);
      setMsgError('Internal server error.');
      clearMessages();
    } finally {
      setLoading(false);
    }
  }

  const deleteProperty = async (id) => {
    setMsgError('');
    setMsgSuccess('');
    try {
      const res = await fetch(`${backendUrl}/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();

      if (!data.success) {
        setMsgError(data.error);
        clearMessages();
        return;
      }

      setProperty(null);
      setMsgSuccess(data.message);
      clearMessages();

    } catch (error) {
      console.log(error);
      setMsgError('Internal server error.');
      clearMessages();
    } finally {
      setLoading(false);
    }
  }

  return {
    formData, setFormData, msgError, setMsgError, msgSuccess, setMsgSuccess, properties, setProperties, property, setProperty, loading, setLoading, getProperties, getProperty, addProperty, updateProperty, deleteProperty
  }
}

export { useProperties }