import React, {Component} from 'react'
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native'
import {
    getDailyReminderValue,
    getMetricMetaInfo,
    timeToString
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import {
    submitEntry,
    removeEntry
} from "../utils/api"
import {connect} from 'react-redux'
import {addEntry} from "../actions"
import {
    purple,
    white
} from "../utils/colors";
import {NavigationActions} from 'react-navigation'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iosSubmitButton: {
        backgroundColor: purple,
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    androidSubmitButton: {
        backgroundColor: purple,
        padding: 10,
        marginRight: 30,
        marginLeft: 30,
    },
    textSubmitButton: {
        color: white,
        fontSize: 22
    },
    submittedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function SubmitButton({onPress}) {
    return (
        <TouchableOpacity style={Platform.OS === 'ios' ? styles.iosSubmitButton : styles.androidSubmitButton} onPress={onPress}>
            <Text style={styles.textSubmitButton}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }))

        this.toHome()

        submitEntry({key, entry})

        // TODO: clear local notification
    }

    reset = () => {
        const key = timeToString()

        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
 
        this.toHome()

        removeEntry(key)
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry'
        }))
    }

    render() {
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadyLogged) {
            return (
                <View style={styles.submittedContainer}>
                    <Ionicons name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'} size={100} color={"black"}/>
                    <Text>You already logged your information for today</Text>
                    <TextButton style={{padding: 10}} onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <ScrollView style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View style={styles.row} key={key}>
                            {getIcon()}
                            {type === 'slider' ?
                                <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}/> :
                                <UdaciStepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}/>}
                        </View>
                    )
                })}
                <SubmitButton onPress={this.submit}/>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    const key = timeToString()

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)
