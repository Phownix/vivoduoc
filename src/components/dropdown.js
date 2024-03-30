import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import StyleSheet from 'react-native-media-query';
import Close from '../icons/close';

const Dropdown = ({ options, selectedValue, onValueChange }) => {
    const [visible, setVisible] = useState(false);
  
    const toggleModal = () => {
      setVisible(!visible);
    };
  
    const handleOptionSelect = (option) => {
      onValueChange(option);
      toggleModal();
    };
  
    return (
      <View>
        {visible && <StatusBar style="dark" backgroundColor="rgba(0, 0, 0, 0.483)"/>}
        <TouchableOpacity onPress={toggleModal} style={styles.button}>
          <Text style={styles.textBtn}>{selectedValue}</Text>
        </TouchableOpacity>
        <Modal visible={visible} transparent={true} animationType="fade">
          <TouchableOpacity style={styles.containerClose} onPress={toggleModal}>
              <Close/>
          </TouchableOpacity>
          <View style={styles.modalContainer}>
            <View style={styles.modalMain}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => handleOptionSelect(option)}>
                  <Text style={selectedValue === option ? styles.textOptionActive : styles.textOption}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  

const { styles } = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#012C56',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 1024px)': {
      height: 50,
      borderWidth: 3,
      borderRadius: 50,
      width:150,
    },
    '@media (max-width: 412px)': {
      height: 40,
      borderWidth: 2,
      borderRadius: 20,
      width:100,
    },
  },
  textBtn: {
    '@media (max-width: 1024px)': {
      fontSize: 26,
      fontWeight: '700',
    },
    '@media (max-width: 412px)': {
      fontSize: 16,
      fontWeight: '700',
    },
  },
  modalContainer: {
    paddingHorizontal: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.483) ',
  },
  modalMain: {
    backgroundColor: '#012C56',
    width: '100%',
    borderRadius: 20,
  },
  containerClose: {
    position: 'absolute',
    zIndex: 2,
    right: 20,
    top: 60,
    width: 64,
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textOption: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
  },
  textOptionActive: {
    color: 'rgb(252, 189, 27)',
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default Dropdown;