import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';
import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Colors } from './contants/Colors';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import Map from './screens/Map';
import PlaceDetails from './screens/PlaceDetails';
import IconButton from './UI/IconButton';
import { init } from './utils/database';


const Stack = createNativeStackNavigator()

function App() {
  const [dbInit, setDbInit] = React.useState(false)
  React.useEffect(() => {
    init().then(() => {
      setDbInit(true)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  if(!dbInit) {
    return <DialogLoading></DialogLoading>
  }
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'}></StatusBar>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}>
          <Stack.Screen name='AllPlaces' component={AllPlaces} options={({ navigation }) =>
          ({
            title: 'Your Favorite Places',
            headerRight: ({ tintColor }) =>
              <IconButton name='add' color={tintColor} size={24} onPress={() => navigation.navigate('AddPlace')} />
          })} />
          <Stack.Screen name='AddPlace' component={AddPlace} options={{
            title: 'Add a new Place'
          }} />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={{
            title: 'Loading place...'
          }
          }/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App;