import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {getLocation, postState} from "./util";
import {ref, onValue} from "firebase/database";
import {db} from "./firebase";



export default function App() {
  const [danger, setDanger] = useState(false)

  useEffect(() => {
    const re = ref(db, 'state')
    const c = onValue(re, (snapshot) => {
      setDanger(snapshot.val() == 'danger')
    })

    return c
  }, [])

  return (
    <View style={styles.container}>
      {
        !danger ? <Safe/> : <NotSafe/>
      }
      <StatusBar style="auto"/>
    </View>
  );
}

export const Safe = () => {
  return (
    <View style={styles.safeContainer}>
      <Text style={styles.safeText}>No Earthquake Detected. You're safe</Text>
      <AntDesign name="Safety" size={240} color="green"/>
    </View>
  );
}

type SafetyState = 'safe' | 'not safe' | 'unknown'

// make a pop-up appear on the screen after one second asking the user if they are safe, with buttons to click
export const NotSafe = () => {
  const [state, setState] = useState<SafetyState>('unknown')

  const changeState = (newState: SafetyState) => {
    return async () => {
      alert('Thank you for your response. Stay Safe!')
      setState(newState)
      try {
        const loc = await getLocation()
        await postState({
          state: newState,
          ...(loc as { lng: number, lat: number, id: number })
        })
      } catch (e) {
        alert('Failed to send state to server')
        setState('unknown')
      }
    }
  }

  return (
    <View style={styles.danger}>
      <View style={styles.notSafeTextContainer}>
        <Text style={styles.notSafeText}>Earthquake Detected!</Text>
        <Text style={styles.notSafeText}>Deprem Tespit Edildi</Text>
        <Text style={styles.notSafeText}>تم التعرف على زلزال</Text>
      </View>
      <Entypo name="warning" size={256} color="yellow"/>
      <View style={styles.tlContainer}>
        <View style={styles.safetyContainer}>
          <Text style={styles.safetyText}>Are you safe?</Text>
          <Text style={styles.safetyText}>iyi misin?</Text>
          <Text style={styles.safetyText}>هل انت بخير؟</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.whiteBg, state === 'safe' && styles.highlighted]}
                            onPress={changeState('safe')}>
            <AntDesign name={'checkcircle'} size={128} color="#0f0"/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.whiteBg, state === 'not safe' && styles.highlighted]}
                            onPress={changeState('not safe')}>
            <AntDesign name={'closecircle'} size={128} color="#f00"/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeText: {
    fontSize: 32,
    marginBottom: 128,
    textAlign: 'center',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 'auto',
  },
  danger: {
    flex: 1,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notSafeText: {
    fontSize: 32,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 32,
  },
  whiteBg: {
    backgroundColor: '#000',
    borderRadius: 100,
    padding: 4,
  },
  safetyText: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tlContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
  },
  highlighted: {
    backgroundColor: '#fff',
  },
  notSafeTextContainer: {
    marginBottom: 'auto',
    marginTop: 32,
  },
  safetyContainer: {
    marginVertical: 16,
  },
});
