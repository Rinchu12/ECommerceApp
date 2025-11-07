import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { LocalizedStrings } from '../localization/LocalizedStrings';

interface Props {
  visible: boolean;
  onClose: () => void;
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

const LanguageModal: React.FC<Props> = ({ visible, onClose, onLanguageChange }) => {
  // Get current language from context
  const { language } = useLanguage();

  /**
   * Renders a single language option with a tick if it's the selected language
   * @param lang - language code ('en' | 'ar')
   * @param label - display label for the language
   */
  const renderOption = (lang: 'en' | 'ar', label: string) => (
    <TouchableOpacity
      onPress={() => onLanguageChange(lang)}
      style={styles.option}
      activeOpacity={0.7} // slight feedback for touch
    >
      <Text style={styles.optionText}>{label}</Text>
      {/* Show tick mark if this option is selected */}
      {language === lang && <Text style={styles.tick}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Modal title */}
          <Text style={styles.title}>{LocalizedStrings.SELECT_LANGUAGE}</Text>

          {/* Language options */}
          {renderOption('en','English')}
          {renderOption('ar', 'Arabic')}

          {/* Close button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>{LocalizedStrings.CLOSE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  tick: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  closeText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LanguageModal;
