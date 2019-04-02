import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native'
import {
    FontAwesome,
    Entypo
} from '@expo/vector-icons'
import {
    gray,
    purple,
    white
} from "../utils/colors";

export default function UdaciStepper({max, unit, step, value, onIncrement, onDecrement}) {
    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center'
        },
        iosButton: {
            backgroundColor: white,
            borderRadius: 8,
            borderColor: purple,
            borderWidth: 3,
            padding: 5,
            paddingRight: 25,
            paddingLeft: 25
        },
        androidButton: {
            backgroundColor: purple,
            borderRadius: 8,
            borderColor: purple,
            padding: 5,
            paddingRight: 25,
            paddingLeft: 25
        },
        counterAndUnit: {
            width: 85,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    return (
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
            {Platform.OS === 'ios' ?
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onDecrement}
                                      style={[styles.iosButton, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
                        <Entypo name="minus" size={30} color={purple}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onIncrement}
                                      style={[styles.iosButton, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}>
                        <Entypo name="plus" size={30} color={purple}/>
                    </TouchableOpacity>
                </View> :
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onDecrement}
                                      style={[styles.androidButton, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
                        <FontAwesome name="minus" size={30} color={white}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onIncrement}
                                      style={[styles.androidButton, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}>
                        <FontAwesome name="plus" size={30} color={white}/>
                    </TouchableOpacity>
                </View>

            }
            <View style={styles.counterAndUnit}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
            </View>
        </View>
    )
}
