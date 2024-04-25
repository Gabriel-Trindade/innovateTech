import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import fetchApi from "./api/Api.js";
import UserModal from "./components/UserModal.js";
import FilterModal from "./components/FilterModal.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Componente principal da aplicação.
 */
export default function App() {
  const [users, setUsers] = useState([]); // Lista de usuários
  const [filteredUsers, setFilteredUsers] = useState([]); // Lista de usuários filtrados
  const [modalVisible, setModalVisible] = useState(false); // Visibilidade do modal de usuário
  const [modalFilterVisible, setModalFilterVisible] = useState(false); // Visibilidade do modal de filtro
  const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado para exibição no modal
  const [filter, setFilter] = useState(""); // Filtro de gênero
  const [loadingMore, setLoadingMore] = useState(false); // Indicador de carregamento de mais resultados
  const [page, setPage] = useState(1); // Página inicial
  const [searchActive, setSearchActive] = useState(false); // Indicador de pesquisa ativa
  const resultsPerPage = 20; // Resultados por página

  /**
   * Abre o modal com detalhes do usuário.
   * @param {Object} item - Usuário selecionado.
   */
  const openModal = (item) => {
    setSelectedUser(item);
    setModalVisible(true);
  };

  /**
   * Carrega dados do cache ao iniciar o componente.
   */
  const loadFromCache = async () => {
    try {
      const cachedData = await AsyncStorage.getItem("cachedUsers");
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setUsers(parsedData);
        setLoadingMore(false);
      } else {
        setLoadingMore(true);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do cache:", error);
      setLoadingMore(true);
    }
  };

  /**
   * Salva dados no cache.
   * @param {Array} data - Dados a serem salvos.
   */
  const saveToCache = async (data) => {
    try {
      await AsyncStorage.setItem("cachedUsers", JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao salvar dados no cache:", error);
    }
  };

  /**
   * Carrega mais resultados da API.
   */
  const loadMoreResults = async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    setPage(page + 1);

    try {
      const response = await fetchApi(
        `?page=${page + 1}&results=${resultsPerPage}&seed=abc${
          filter ? `&gender=${filter}` : ""
        }`
      );
      setUsers([...users, ...response.results]);
      setLoadingMore(false);
    } catch (error) {
      console.error("Erro ao carregar mais resultados:", error);
      setLoadingMore(false);
    }
  };

  /**
   * Carrega dados da API ao montar o componente.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi(
          `?page=1&results=${resultsPerPage}&seed=abc${filter ? `&gender=${filter}` : ""}`
        );
        setUsers(response.results);
        setLoadingMore(false);
        saveToCache(response.results);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setLoadingMore(false);
      }
    };

    loadFromCache();
    fetchData();
  }, [filter]);

  /**
   * Aplica filtro quando os usuários são atualizados.
   */
  useEffect(() => {
    if (!searchActive && filter) {
      const filtered = users.filter((user) => user.gender === filter);
      setFilteredUsers(filtered);
    } else if (!searchActive) {
      setFilteredUsers(users);
    }
  }, [users, filter, searchActive]);

  /**
   * Traduz o gênero do usuário para exibição.
   * @param {String} gender - Gênero do usuário.
   * @returns {String} - Gênero traduzido.
   */
  function translateGender(gender) {
    return gender === "male" ? "Masculino" : "Feminino";
  }

  /**
   * Atualiza o filtro de pesquisa de usuários.
   * @param {String} text - Texto de pesquisa.
   */
  const updateSearchFilter = (text) => {
    setSearchActive(true);
    const filterPerText = users.filter(
      (user) =>
        user.name.first.toLowerCase().includes(text.toLowerCase()) ||
        user.name.last.toLowerCase().includes(text.toLowerCase()) ||
        (text.includes(" ") &&
          user.name.first.toLowerCase().includes(text.split(" ")[0].toLowerCase()) &&
          user.name.last.toLowerCase().includes(text.split(" ")[1].toLowerCase()))
    );
    setFilteredUsers(filterPerText);
    setLoadingMore(false);
  
    if (!text) {
      setSearchActive(false);
      setFilteredUsers(users);
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Innovate Tech</Text>
        {/* Barra de pesquisa e filtro */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar por nome"
            onChangeText={updateSearchFilter}
          />
          <TouchableOpacity
            style={styles.filterIcon}
            onPress={() => setModalFilterVisible(true)}
          >
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>
          {/* Modal de filtro */}
          <FilterModal
            visible={modalFilterVisible}
            onClose={() => setModalFilterVisible(false)}
            updateFilter={setFilter} // Atualiza diretamente o filtro
          />
        </View>
      </View>
      {/* Lista de usuários */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.login.uuid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.box} onPress={() => openModal(item)}>
            <Image
              style={styles.userPhoto}
              source={{ uri: item.picture.thumbnail }}
            />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.userName}>
                {item.name.first} {item.name.last}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 5,
                  width: "100%",
                }}
              >
                <Text style={styles.userGender}>
                  {translateGender(item.gender)}
                </Text>
                <Text style={styles.userBirthDate}>{item.dob.age} anos</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() =>
          !searchActive && !filter && loadingMore ? (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color="#007bff" />
              <Text style={styles.loadingMoreText}>CARREGANDO MAIS</Text>
            </View>
          ) : null
        }
        onEndReachedThreshold={0.1} // Define quando carregar mais dados (10% antes do fim da lista)
        onEndReached={loadMoreResults} // Função para carregar mais dados ao chegar ao fim da lista
      />
      {/* Modal de detalhes do usuário */}
      {modalVisible && (
        <UserModal user={selectedUser} onClose={() => setModalVisible(false)} />
      )}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  filterIcon: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  box: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userGender: {
    fontSize: 14,
  },
  userBirthDate: {
    fontSize: 14,
  },
  loadingMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  loadingMoreText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007bff',
  },
});
