import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Box, Button, ButtonText, Center, FormControl, FormControlLabelText, Icon, Input, InputField, Select, SelectContent, SelectIcon, SelectInput, SelectItem, SelectTrigger } from '@gluestack-ui/themed';
import { FormControlLabel } from '@gluestack-ui/themed';
import { SelectPortal } from '@gluestack-ui/themed';
import { ChevronDownIcon } from '@gluestack-ui/themed';

export default function Main() {
  const [moedaOrigem, setMoedaOrigem] = useState('BRL')
  const [moedaDestino, setMoedaDestino] = useState('USD')
  const [valorOriginal, setValorOriginal] = useState('33.3333')
  const [valorConvertido, setValorConvertido] = useState ('aas')

  const handleConverter = async () => {
    //https://economia.awesomeapi.com.br/last/USD-BRL
    let URL = 'https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}'
    try {
      let page = await fetch(URL);
      let json = await page.json();
      //console.log(json);
      let indice = parseFloat(json['${moedaOrigem}${moedaDestino}'].high)
      let vlEntrada = parseFloat(valorOriginal)
      setValorConvertido ((indice*vlEntrada).toFixed(2))
      //console.log(indice)
    } catch (error){ 
      setValorConvertido('Error: ${error.message}')
    }
  }
  const handleLimpar = ()=>{
    setMoedaOrigem('BRL') 
    setMoedaDestino('USD')
    setValorOriginal('33.3333')
    setValorConvertido('')
  }
  return (

   <Box w={'full'} h={'full'}>
    <Center h={'full'} m={"$5"}>
        <FormControl>
            <FormControlLabel>
                <FormControlLabelText>moeda de origem</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <Select w={"$full"}      selectedLabel={moedaOrigem} 
            onValueChange={(itemValue, itemIndex) =>
            setMoedaOrigem (itemValue)}>
                <SelectTrigger variant="outline" size="md">
                 <SelectInputB placeholder="selecione uma opção" />
                  <SelectIcon>
                    <Icon as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>npx install
                <SelectPortal>
                <SelectBackdrop />
                    <SelectContent>
                        <SelectItem label="Real Brasileiro" value="BRL" />
                       <SelectItem label="Dolar Americano" value="USD" />
                      <SelectItem label="Ouro" value="XAU" />
                      <SelectItem label="Bitcoin" value="BTC" />
                    </SelectContent>
                </SelectPortal>
            </Select>
            </Input>
            <FormControlLabel mt={"$2"}>
                <FormControlLabelText>moeda de destino</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <Select w={"$full"}
            selectedLabel={moedaDestino} 
            onValueChange={(itemValue, itemIndex) =>
            setMoedaDestino (itemValue)}>
                <SelectTrigger variant="outline" size="md">
                 <SelectInputB placeholder="selecione uma opção" />
                  <SelectIcon>
                    <Icon as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>npx install
                <SelectPortal>
                <SelectBackdrop />
                    <SelectContent>
                        <SelectItem label="Real Brasileiro" value="BRL" />
                       <SelectItem label="Dolar Americano" value="USD" />
                      <SelectItem label="Ouro" value="XAU" />
                      <SelectItem label="Bitcoin" value="BTC" />
                    </SelectContent>
                </SelectPortal>
            </Select>
            </Input>
            <FormControlLabel mt={"$2"}>
                <FormControlLabelText>valor a ser convertido</FormControlLabelText>
            </FormControlLabel>
            <Input>
            <InputField keyboardType="numeric" value={valorOriginal} onChangeText={setValorOriginal}/>
            </Input>
      <View>
        <Text>moeda de origem</Text>
        <Picker
        style={{height:50, width: 200}}
          selectedValue={moedaOrigem}
          onValueChange={(itemValue, itemIndex) => setMoedaOrigem(itemValue)}
        >
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dolar Americano" value="USD" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
      </View>
      <View>
        <Text>moeda de destino</Text>
        <Picker
                style={{height:50, width: 200}}
          selectedValue={moedaDestino}
          onValueChange={(itemValue, itemIndex) => setMoedaDestino(itemValue)}
        >
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dolar Americano" value="USD" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
      </View>
      <Box>
        <Button  onPress={handleConverter} mt={"$2"}>
            <ButtonText>
                converter
            </ButtonText>
        </Button>
        <Button  onPress={handleLimpar} mt={"$2"}>
            <ButtonText>
                limpar
            </ButtonText>
        </Button>
      </Box>
      <Box mt={"$2"} flexDirection="row" justifyContent="space-between" h={"$12"}
       alignItems="center" p={"$3"} bg="$amber400" borderRadius={$nd} >
      <Text>resultado</Text>
        <Text>{valorConvertido}</Text>
      </Box>
      </FormControl>
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});