import React from 'react'
import {
    StatusBar,
    View
} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {purple} from "./utils/colors";
import TabNavigation from './components/TabNavigation'
import {Constants} from 'expo'

function UdaciStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
                <View style={{flex: 1}}>
                    <TabNavigation/>
                </View>
            </Provider>
        )
    }
}

export default App
