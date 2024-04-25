import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

/**
 * Componente que exibe um modal com informações detalhadas do usuário.
 * @param {Object} user - Dados do usuário a serem exibidos.
 * @param {Function} onClose - Função para fechar o modal.
 */
const UserModal = ({ user, onClose }) => {
  /**
   * Formata a data no formato "dd/mm/yyyy".
   * @param {String} dataISO - Data no formato ISO 8601.
   * @returns {String} - Data formatada.
   */
  function formatarData(dataISO) {
    const data = new Date(dataISO);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return data.toLocaleDateString('pt-BR', options);
  }

  /**
   * Traduz o gênero do usuário para exibição.
   * @param {String} gender - Gênero do usuário.
   * @returns {String} - Gênero traduzido.
   */
  function translateGender(gender) {
    return gender === "male" ? "Masculino" : "Feminino";
  }

  return (
    <Modal visible={!!user} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backgroundContainer}>
          <View style={styles.modalContainer}>
            {user && (
              <View style={styles.modalContent}>
                <Image
                  style={styles.userPhoto}
                  source={{ uri: user.picture.large }}
                />
                <Text style={styles.userInfo}>Nome do aluno: {user.name.first} {user.name.last}</Text>
                <Text style={styles.userInfo}>Email: {user.email}</Text>
                <Text style={styles.userInfo}>Gênero: {translateGender(user.gender)}</Text>
                <Text style={styles.userInfo}>Data de Nascimento: {formatarData(user.dob.date)}</Text>
                <Text style={styles.userInfo}>Idade: {user.dob.age} anos</Text>
                <Text style={styles.userInfo}>Telefone: {user.phone}</Text>
                <Text style={styles.userInfo}>Nacionalidade: {user.nat}</Text>
                <Text style={styles.userInfo}>Endereço: {user.location.street.name}, {user.location.street.number}</Text>
                <Text style={styles.userInfo}>ID do Usuário: {user.login.uuid}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  userPhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    alignSelf: 'center',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserModal;
