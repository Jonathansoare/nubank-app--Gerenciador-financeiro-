import React, { useState } from 'react';
import { TextInput } from 'react-native';

const CustomInput = ({style}) => {
  const [value, setValue] = useState('');
  console.log("VALOR CUSTOM: ",+value);

  const formatNumber = (text) => {
    // Remove todos os caracteres não numéricos
    const numericValue = text.replace(/\D/g, '');

    // Formata o número como desejado (por exemplo, adiciona pontos, vírgulas, etc.)
    // Aqui, estamos adicionando um ponto a cada 3 dígitos

    return formattedValue;
  };

  const handleChangeText = (text) => {
    const formattedValue = formatNumber(text);
    setValue(formattedValue);
    return formattedValue;
  }
  return (
    <TextInput
      value={value}
      onChangeText={handleChangeText}
      keyboardType="numeric"
      placeholder="Digite o valor"
      style={style}
    />
  );
};

export default CustomInput;
