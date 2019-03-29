import React from 'react'
import {View, Text, Slider} from 'react-native'

export default function UdaciSlider ({max, unit, step, value, onChange}) {
    return (
        <View>
            <Text>UdaciSlider</Text>
            <Slider
                maximumValue={max}
                minimumValue={0}
                unit={unit}
                step={step}
                value={value}
                onValueChange={onChange}/>
            <Text>{value}</Text>
            <Text>{unit}</Text>
        </View>
    )
}
