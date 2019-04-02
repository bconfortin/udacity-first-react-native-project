import React from 'react'
import {
    View,
    Text,
    Slider,
    StyleSheet
} from 'react-native'
import {gray} from "../utils/colors";

export default function UdaciSlider({max, unit, step, value, onChange}) {
    return (
        <View style={styles.row}>
            <Slider
                maximumValue={max}
                minimumValue={0}
                unit={unit}
                step={step}
                value={value}
                onValueChange={onChange}
                style={{flex: 1}}/>
            <View style={styles.counterAndUnit}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    counterAndUnit: {
        width: 85,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
