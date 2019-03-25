import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import Password from './InputPassword'
import DottedLine from './DottedLine'

import { Button } from '../components'

import { NavigationActions } from '../utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


@connect()
class Home extends Component {
  static navigationOptions = {
    title: '编辑资料',
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      password: ''
    }
  };

  gotoDetail = () => {
    const { navigate } = this.props.navigation;
    navigate('Login', { name: 'Login' });
  }

  onChange = () => {

  };

  render() {
    return (
      <View style={styles.container}>
        <FontAwesome
          name={'wpforms'}
          size={30}
          color={'#f00'}
        />
        <MaterialCommunityIcons
          name={'face'}
          size={30}
          color={'#f00'}
        />
        {/*<View>*/}
          {/*<Password*/}
            {/*maxLength={6}*/}
            {/*onChange={this.onChange}*/}
          {/*/>*/}
        {/*</View>*/}
        {/*dotted, dashed*/}
        <View style={{margin: 20}}>
          <DottedLine
            size={2} // 边框的大小，默认为1
            type='dashed' // 边框类型，支持dotted, dashed，默认为dashed
            color="#f00" // 边框颜色
            border={['left', 'right', 'top']} // 需要展示的边框数组
          >
            <View style={{ padding: 100 }}>
              <Text>虚线展示</Text>
            </View>
          </DottedLine>
        </View>
        <Button style={{marginTop: 20}} text="Goto Detail" onPress={this.onChange} />
        <Button style={{marginTop: 20}} text="Goto Detail" onPress={this.gotoDetail} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default Home
