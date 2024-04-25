import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

/**
 * Componente de modal para filtrar por gênero.
 * @param {Function} onClose - Função para fechar o modal.
 * @param {Boolean} visible - Visibilidade do modal.
 * @param {Function} updateFilter - Função para atualizar o filtro de gênero.
 */
const FilterModal = ({ onClose, visible, updateFilter }) => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    updateFilter(gender); 
    onClose();
  };
  
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backgroundContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.userInfo}>Filtrar por:</Text>
              <TouchableOpacity
                style={[styles.button, selectedGender === 'male' && styles.buttonSelected]}
                onPress={() => handleGenderSelection('male')}
              >
                <Text style={styles.buttonText}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, selectedGender === 'female' && styles.buttonSelected]}
                onPress={() => handleGenderSelection('female')}
              >
                <Text style={styles.buttonText}>Feminino</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, selectedGender === '' && styles.buttonSelected]}
                onPress={() => handleGenderSelection('')}
              >
                <Text style={styles.buttonText}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>Fechar</Text>
              </TouchableOpacity>
            </View>
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
  modalContent: {
    alignItems: 'center',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSelected: {
    backgroundColor: '#28a745',
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

export default FilterModal;
