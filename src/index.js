import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
    Home,
    Login,
    Registration,
} from './screens';

const Router = createStackNavigator({
    Home,
    Login,
    Registration,
}, {
    initialRouteName: 'Home',
    headerMode: 'none',
});

export default createAppContainer(Router);