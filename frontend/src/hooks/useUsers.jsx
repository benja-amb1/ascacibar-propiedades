import React, { useState } from 'react'

const useUsers = () => {

  const backendUrl = import.meta.env.VITE_API_URL + '/auth'

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const [msgError, setMsgError] = useState('');
  const [msgSuccess, setMsgSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [userById, setUserById] = useState(null);

  const clearMessages = () => {
    setTimeout(() => {
      setMsgError('');
      setMsgSuccess('');
    }, 5000);
  }

  const registerUser = async () => {
    setMsgError('');
    setMsgSuccess('');
    try {
      const res = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!data.success) {
        setMsgError(data.error);
        clearMessages();
        return;
      }

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

  const registerAdmin = async () => {
    setMsgError('');
    setMsgSuccess('');
    try {
      const res = await fetch(`${backendUrl}/register-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!data.success) {
        setMsgError(data.error);
        clearMessages();
        return;
      }

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

  const login = async () => {
    setMsgError('');
    setMsgSuccess('');
    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
        credentials: 'include'
      });

      const data = await res.json();


      if (!data.success) {
        setMsgError(data.error);
        clearMessages();
        return;
      }

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

  const logout = async () => {
    setMsgError('');
    setMsgSuccess('');
    try {
      const res = await fetch(`${backendUrl}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      const data = await res.json();

      if (!data.success) {
        setMsgError(data.error);
        clearMessages();
        return;
      }

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

  const getUser = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/${id}`, { method: 'GET', credentials: 'include' });
      const data = await res.json();
      setUserById(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const updateUser = async (id) => {
    setMsgError('');
    setMsgSuccess('');
    try {
      const res = await fetch(`${backendUrl}/${id}`, { method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });

      const data = await res.json();

      if (!data.success) {
        setMsgError(data.error);
        clearMessages();
        return;
      }

      setUserById(data.data);
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

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${backendUrl}/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();

      if (!data.success) {
        setMsgError(data.error);
        clearMessages();
        return;
      }

      setUserById(null);
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
    registerUser, formData, setFormData, msgError, setMsgError, msgSuccess, setMsgSuccess, loading, setLoading, userById, setUserById, registerAdmin, login, logout, getUser, updateUser, deleteUser
  }
}

export { useUsers }