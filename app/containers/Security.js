import React, { Component } from 'react'
import {StyleSheet, View, Text, TextInput} from 'react-native'
import {List, Icon, Toast, Modal, WhiteSpace, Button, DatePicker} from '@ant-design/react-native';
import NavHeader from './NavHeader'


export default class Security extends Component {
  static navigationOptions = {
    header: (navigation) => (
      <NavHeader
        nav={navigation}
        title="安全管理"
        bgSrc={require('./bg_01.png')}
        icon={require('./path.png')}
        height={80}
        iconStyle={{width: 30, height: 32}}
        textStyle={{color: '#fff', fontSize: 28}}
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      password: null,
      checkPassword: null,
      smsCode: null,
      phone: null,
      key: `${new Date()}-key`
    };
  }

  componentDidMount() {

  }

  handleClick = () => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
  };

  handleShowMod = (value) => {
    this.type = value;
    this.setState({
      visible: true,
      key: `${new Date()}-key`
    });
  };

  handleOk = () => {
    console.log(this.type)
    let {smsCode, password, checkPassword, phone} = this.state;
    let data = null;
    if(this.type === 1 || this.type === 2) {
      if(!password || password.length < 6) {
        this.setState({password: ''});
        return;
      }
      if(!checkPassword || checkPassword !== password) {
        this.setState({checkPassword: ''});
        return;
      }
      data = {
        smsCode,
        password,
        checkPassword
      };
    } else {
      if(!phone || !(/^1[34578]\d{9}$/.test(phone))) {
        this.setState({phone: ''});
        return;
      }
      data = {
        smsCode,
        phone
      };
    }
    if(!smsCode || smsCode.length !== 6) {
      this.setState({smsCode: ''});
      return;
    }
    // 发送请求，请求成功后执行下方this.handleClose方法
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      visible: false,
      password: null,
      checkPassword: null,
      smsCode: null,
      phone: null,
    });
  };

  render() {
    let {key, visible, smsCode, password, checkPassword, phone} = this.state;
    const footerButtons = [
      { text: '取消', onPress: this.handleClose },
      { text: '确认', onPress: this.handleOk },
    ];
    return (
        <View style={styles.box}>
          <Modal
            key={key}
            style={{width: '98%'}}
            title={this.type == 1 ? '修改账号密码' : this.type == 2 ? '修改支付密码' : '修改密保手机'}
            transparent
            maskClosable
            visible={visible}
            footer={footerButtons}
          >
            {
              this.type == 3 ? (
                <View>
                  <WhiteSpace size="xs" />
                  <View style={styles.a}>
                    <Text style={styles.f}>新手机号码</Text>
                    <View style={[styles.b,{flex:4}]}>
                      <TextInput
                        placeholder={'请输入手机号码'}
                        keyboardType={'numeric'}
                        autoFocus
                        style={[styles.teCor, {borderColor: (phone === '' || phone && !(/^1[34578]\d{9}$/.test(phone))) ? '#f00' : '#ccc'}]}
                        underlineColorAndroid="transparent"
                        onChangeText={(value) => this.setState({phone: value})}
                      />
                    </View>
                  </View>
                  <WhiteSpace size="xs" />
                  <View style={styles.a}>
                    <Text style={styles.f}>短信验证码</Text>
                    <View style={[styles.b,{flex:4, flexDirection: 'row'}]}>
                      <TextInput
                        placeholder={'请输入验证码'}
                        keyboardType={'numeric'}
                        maxLength={6}
                        style={[styles.code, {borderColor: (smsCode === '' || smsCode && smsCode.length !== 6) ? '#f00' : '#ccc'}]}
                        underlineColorAndroid="transparent"
                        onChangeText={(value) => this.setState({smsCode: value})}
                      />
                      <Button
                        size="small"
                        type="primary"
                        style={{width: '45%', marginLeft: '10%', height: 46}}
                        onPress={this.handleClick}
                      >
                        获取短信验证码
                      </Button>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <WhiteSpace size="xs" />
                  <View style={styles.a}>
                    <Text style={styles.f}>设置新密码</Text>
                    <View style={[styles.b,{flex:4}]}>
                      <TextInput
                        placeholder={'请输入密码'}
                        keyboardType={'numeric'}
                        autoFocus
                        style={[styles.teCor, {borderColor: password === '' || password && password.length < 6 ? '#f00' : '#ccc'}]}
                        underlineColorAndroid="transparent"
                        onChangeText={(value) => this.setState({password: value})}
                      />
                    </View>
                  </View>
                  <WhiteSpace size="xs" />
                  <View style={styles.a}>
                    <Text style={styles.f}>确认新密码</Text>
                    <View style={[styles.b,{flex:4}]}>
                      <TextInput
                        placeholder={'请输入密码'}
                        keyboardType={'numeric'}
                        style={[styles.teCor, {borderColor: checkPassword === '' || checkPassword && password !== checkPassword ? '#f00' : '#ccc'}]}
                        underlineColorAndroid="transparent"
                        onChangeText={(value) => this.setState({checkPassword: value})}
                      />
                    </View>
                  </View>
                  <WhiteSpace size="xs" />
                  <View style={styles.a}>
                    <Text style={styles.f}>短信验证码</Text>
                    <View style={[styles.b,{flex:4, flexDirection: 'row'}]}>
                      <TextInput
                        placeholder={'请输入验证码'}
                        keyboardType={'numeric'}
                        maxLength={6}
                        style={[styles.code, {borderColor: (smsCode === '' || smsCode && smsCode.length !== 6) ? '#f00' : '#ccc'}]}
                        underlineColorAndroid="transparent"
                        onChangeText={(value) => this.setState({smsCode: value})}
                      />
                      <Button
                        size="small"
                        type="primary"
                        style={{width: '45%', marginLeft: '10%', height: 46}}
                        onPress={this.handleClick}
                      >
                        获取短信验证码
                      </Button>
                    </View>
                  </View>
                </View>
              )
            }
          </Modal>
          <List>
            <List.Item
              style={styles.listItem}
              thumb={<Icon name="lock" style={{fontSize: 30, marginRight: 20, color: '#2b2b2b'}} />}
              arrow="horizontal"
              onPress={() => this.handleShowMod(1)}
            >
              账户密码
            </List.Item>
            <List.Item
              style={styles.listItem}
              thumb={<Icon name="property-safety" style={{fontSize: 30, marginRight: 20, color: '#2b2b2b'}} />}
              arrow="horizontal"
              onPress={() => this.handleShowMod(2)}
            >
              支付密码
            </List.Item>
            <List.Item
              style={styles.listItem}
              thumb={<Icon name="mobile" style={{fontSize: 30, marginRight: 20, color: '#2b2b2b'}} />}
              arrow="horizontal"
              onPress={() => this.handleShowMod(3)}
            >
              密保手机
            </List.Item>
          </List>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  box: {
    backgroundColor:"#f5f6f7",
    paddingTop: 10,
  },
  listItem: {
    paddingTop: 6,
    paddingBottom: 6
  },
  teCor:{
    minWidth:'100%',
    padding:10,
    height: 46,
    borderRadius:5,
    borderWidth:1
  },
  code:{
    width:'45%',
    padding:10,
    height: 46,
    borderRadius:5,
    borderWidth:1
  },
  a:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff",
    marginTop: 6
  },
  b:{
    marginLeft:10,
    flex:1,
  },
  f:{
    textAlign: 'right',
    flex:1,
    color:"#333"
  },

});

