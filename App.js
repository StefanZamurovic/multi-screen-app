import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, TextInput, FlatList, StatusBar, Page, Section } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatSheet from './assets/StatScreen';
import {ThemeContext, themes} from './assets/theme-context';
import ThemedButton from './assets/themed-button';
const MyContext = React.createContext("Black");

function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme} />
  );
}

function HomeScreen({ navigation }) {
  const [answer,setAnswer] = useState('')
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black"}}>
      <Text style={styles.text1}>!!STAT!! !!TRACKER!!</Text>
      <Text style={{color: "white"}}>By Sergapo Industries</Text>
      <View style={{ flex: 0.25, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: "black"}}>
      <Button
        title="Start"
        color
        onPress = {() => navigation.navigate('Stats')}
      />
    </View>
      <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: "black"}}>
      <Text style={{color: "white", justifyContent: 'center', textAlign: 'center',}}>Check out the About Page to learn more or Preference to make some changes</Text>
    </View>
    </View>

  );
}

function StatScreen({ navigation },{name}) {
  <StatSheet name={"Name"}/>
  const [catches,setCatches] = useState(0)
  const [catcheP,setCatcheP] = useState(0)
  const [drops,setDrops] = useState(0)
  const [throws,setThrows] = useState(0)
  const [hitP,setHitP] = useState(0)
  const [misses,setMisses] = useState(0)
  const [wins,setWins] = useState(0)
  const [loses,setLoses] = useState(0)
  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@mathquiz', jsonValue)
        } catch (e) {
          console.dir(e)
        }
  }

  const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@mathquiz')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setMisses(data.misses)
            setDrops(data.drops)
            setThrows(data.throws)
            setCatches(data.catches)
            setWins(data.wins)
            setLoses(data.loses)
          } else {
            setMisses(0)
            setDrops(0)
            setThrows(0)
            setCatches(0)
            setWins(0)
            setLoses(0)
          }
        } catch(e) {
          console.dir(e)
        }
  }

  const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          console.dir(e)
        }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: "black"}}>
    <Text style={styles.text1}>{name}</Text>
    <View style={{ justifyContent: 'space-around', flexDirection: "row"}}>
    <View style={{flexDirection: "column", justifyContent: 'space-around'}}>
    <Text style={styles.text2}>Catches  </Text>
    <Text style={styles.text2}>{catches}</Text>
      <Button
        title="+1"
        color
        onPress = {() => {setCatches(catches+1),setCatcheP(((catches+1)/((catches+1)+drops))*100),storeData({catches,drops})}}
      />
      </View>
    <View style={{flexDirection: "column"}}>
    <Text style={styles.text2}>Drops</Text>
    <Text style={styles.text2}>{drops}</Text>
    <Button
        title="+1"
        color
        onPress = {() => {setDrops(drops+1),setCatcheP((catches/(catches+(drops+1)))*100),storeData({catches,drops})}}
      />
    </View>
    </View>
    <Text style={styles.text2}>Catch: {catcheP}%</Text>
    <View style={{ justifyContent: 'space-around', flexDirection: "row"}}>
    <View style={{flexDirection: "column", justifyContent: 'space-around'}}>
    <Text style={styles.text2}>Throws  </Text>
    <Text style={styles.text2}>{throws}</Text>
      <Button
        title="+1"
        color
        onPress = {() => {setThrows(throws+1),setHitP((((throws+1) - misses)/(throws+1))*100),storeData({misses,throws})}}
      />
      </View>
    <View style={{flexDirection: "column"}}>
    <Text style={styles.text2}>Misses</Text>
    <Text style={styles.text2}>{misses}</Text>
    <Button
        title="+1"
        color
        onPress = {() => {setThrows(throws+1),setMisses(misses+1),setHitP((((throws+1) - (misses+1))/(throws+1))*100),storeData({misses,throws})}}
      />
    </View>
    </View>
    <Text style={styles.text2}>Hit: {hitP}%</Text>
    <View style={{ justifyContent: 'space-around', flexDirection: "row"}}>
    <View style={{flexDirection: "column", justifyContent: 'space-around'}}>
    <Text style={styles.text2}>Wins  </Text>
    <Text style={styles.text2}>{wins}</Text>
      <Button
        title="+1"
        color
        onPress = {() => {setWins(wins+1),storeData({wins,loses})}}
      />
      </View>
    <View style={{flexDirection: "column"}}>
    <Text style={styles.text2}>Loses</Text>
    <Text style={styles.text2}>{loses}</Text>
    <Button
        title="+1"
        color
        onPress = {() => {setLoses(loses+1),storeData({wins,loses})}}
      />
    </View>
    </View>
    <Text style={styles.text2}>win lose ratio: {wins}/{loses}</Text>
    </View>
  );
}

function AboutScreen({ navigation }) {
  const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '>This app is desgined to make tracking stats simpler and easier for everyone',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '>There are easy to use steps to add different types of stats you would like to track',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '>Also you can choose the weight of each stat and the app will calculate the value of the player',
  },
  ];
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (

    <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: "black" }}>
      <Text style={styles.text1}>ABOUT</Text>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
      <View style={{ flex: 0.5, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: "black" }}>
      <Image
        style={styles.box}
        source={require('./assets/download.png')}
      />
      </View>
    </View>
  );
}
class button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }
   render() {
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}
function PreferenceScreen({ navigation }) {
  class button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }
  }
  const [answer,setAnswer] = useState('')
  const [answered,setAnswered] = useState(0)
  const [name,setName] = useState('Name Change')
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: "black"}}>
      <Text style={{fontSize: 60, justifyContent: 'center', textAlign: 'center', color: 'white'}}>
      PREFERENCE
      </Text>
      <Text style={styles.text2}>{name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter New Name"
        onChangeText={text => {setAnswer(text)}}
        value={answer}
      />
      <Button
        title="Submit"
        color
        onPress = {() => setName(answer)}
      />

    </View>
  );
}




const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={StatScreen} />
        <Tab.Screen name="Preference" component={PreferenceScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Preference" component={PreferenceScreen} />
      <Stack.Screen name="Stats" component={StatScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

  text1:{
    fontSize: 64,
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white'
  },
  text2:{
    fontSize: 20,
    justifyContent: 'space-around',
    textAlign: 'center',
    color: 'white'
  },
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'black',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "white",
  },
});
