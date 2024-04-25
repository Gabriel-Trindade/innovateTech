import axios from 'axios';

// Criação da instância base da API com a URL da API randomuser.me
const baseApi = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

/**
 * Função para buscar dados da API.
 * @param {String} params - Parâmetros da consulta à API (ex: '?page=1&results=20&seed=abc').
 * @returns {Promise} - Retorna uma Promise com os dados da API ou uma mensagem de erro em caso de falha.
 */
export const fetchApi = async (params) => {
  try {
    const response = await baseApi.get(params);
    return response.data; // Retorna os dados da API
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw new Error('Falha ao buscar dados da API.'); // Lança um erro em caso de falha na requisição
  }
};

export default fetchApi;
