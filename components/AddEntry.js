import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import {
    getDailyReminderValue,
    getMetricMetaInfo,
    timeToString
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from "../utils/api"
import {connect} from 'react-redux'
import {addEntry} from "../actions"


function SubmitButton ({onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
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

        // TODO: navigate to home

        submitEntry({key, entry})

        // TODO: clear local notification
    }

    reset = () => {
        const key = timeToString()

        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))

        // TODO: return to home

        // TODO: update db

        removeEntry(key)
    }

    render () {
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons name="md-happy" size={100} color={"black"}/>
                    <Text>You already logged your information for today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <ScrollView>
                <Text>{JSON.stringify(this.state)}</Text>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key}>
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

function mapStateToProps (state) {
    const key = timeToString()

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)
