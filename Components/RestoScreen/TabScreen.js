import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import menuScreen from './menuScreen';
import photosScreen from './photosScreen';
import servicesScreen from './servicesScreen';
import drinksScreen from './drinksScreen';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        tabBarOptions={{
            style: {
                marginTop: 10,
                backgroungColor: 'white',
                size: 10,
            },
            indicatorStyle: {
                backgroundColor: 'black'
            },
            labelStyle: {
              fontSize: 12,
            }
        }}
    >
      <Tab.Screen name="Photos" component={photosScreen} />
      <Tab.Screen name="Menu" component={menuScreen} />
      <Tab.Screen name="Boissons" component={drinksScreen} />
      <Tab.Screen name="Services" component={servicesScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;