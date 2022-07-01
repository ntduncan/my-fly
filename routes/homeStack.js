import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {Dashboard} from '../screens/Dashboard';
import { FishingLogListView } from '../screens/FishingLogListView';
import { AddNewLogView } from '../screens/AddNewLogView';

const screens = {
    MyFlyHome: {
        screen: Dashboard,
    },
    FishingLogListView: {
        screen: FishingLogListView,
    },
    AddNewLogView: {
        screen: AddNewLogView
    },
    // Settings: {}
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);