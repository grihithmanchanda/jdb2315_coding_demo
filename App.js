import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
// import { Container, Row, Col } from "react-bootstrap";
// import { StatusBar } from 'expo-status-bar';
import EquipmentList from './src/components/EquipmentList'
// import { getDocs } from 'firebase/firestore/lite';
// import { auth, firestoredb } from './firebase-config'

class NextGymApp extends Component {

  render() {
    return (
      // <>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>

        {/* <Container>
          <Row>
            <Col>
              <StatusBar style="auto" />
            </Col>
          </Row>
          <Row>
            <Col> <EquipmentList/> </Col>
          </Row>
        </Container> */}
        <EquipmentList/>
      </View>
      // </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NextGymApp;