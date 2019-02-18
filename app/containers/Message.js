import React, { Component } from 'react'
import {StyleSheet, View, TouchableOpacity, Text, TextInput, Image} from 'react-native'
import { WhiteSpace, WingBlank, Checkbox, DatePicker, List, Icon, Toast, Modal } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
ImagePicker.openPicker({
  multiple: true
}).then(images => {
  console.log(images);
});


export default class Message extends Component {
  static navigationOptions = {
    title: '基本信息',
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      birthday: new Date("2018-12-24 00:00:00"),
      email: "Houzi123456@qq.com",
      loginId: "houzi",
      mobile: "123456",
      phone: "13718004250",
      realName: "猴哥",
      registrationId: null,
      resume: "憨货猴子！",
      role: 1,
      sex: 1,
      image: 'http://47.95.116.56:8080/file_upload/distributorImage/images/426/48ed626e9be685ac36fcf4e662a96c71.jpg'
    };
  }

  componentDidMount() {

  }

  handleChangeEmail = (value, type) => {
    if(!type) {
      this.setState({email: value})
    } else {
      let {email} = this.state;
      console.log(email)
    }
  };

  handleChangeName = (value, type) => {
    if(!type) {
      this.setState({realName: value});
    } else {
      let {realName} = this.state;
      console.log(realName)
    }
  };

  handleChangeRole = (value) => {
    this.role = value;
    this.setState({visible: true});
  };

  handleDateChange = value => {
    this.setState({birthday: value});
  };

  handleChangeAllText = (value, type) => {
    if(!type) {
      this.setState({resume: value});
    } else {
      let {resume} = this.state;
      console.log(resume)
    }
  };

  setRole = () => {
    let {role} = this.state;
    this.setState({role: (role == 1 || role == 2) ? 3 : this.role, visible: false});
  };

  handleClose = () => {
    this.setState({visible: false});
  };

  //选择图片
  selectPhotoTapped = () => {
    const options = {
        title: '选择图片',
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '选择照片',
        cameraType: 'back',
        mediaType: 'photo',
        videoQuality: 'high',
        durationLimit: 10,
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8,
        angle: 0,
        allowsEditing: false,
        noData: false,
        // storageOptions: {
        //     skipBackup: true
        // }
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            let source = { uri: response.uri };
            this.setState({
              image: source
            });
        }
    });
  };

  render() {
    let {image, birthday, email, realName, resume, role, visible} = this.state;
    const footerButtons = [
      { text: '取消', onPress: this.handleClose },
      { text: '确认', onPress: this.setRole },
    ];
    return (
        <View style={styles.box}>
          <Modal
            title="申请开通"
            transparent
            onClose={this.handleClose}
            maskClosable
            visible={visible}
            footer={footerButtons}
          >
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ textAlign: 'center' }}>{`您确定要开通${this.role == 1 ? '买家' : '卖家'}吗？`}</Text>
            </View>
          </Modal>
          <WhiteSpace size="xs" />
          <View style={styles.a}>
            <Text style={styles.f}>头像:</Text>
              <View style={[styles.b,{flex:4}]}>
                  <TouchableOpacity onPress={this.selectPhotoTapped}>
                      <View>
                          { !this.state.image ? (
                              <View style={{flexDirection: 'row'}}>
                                  <Text>{' '}</Text>
                                  <Text style={{position: 'absolute', fontSize: 16, right: 40}}>上传头像</Text>
                                  <Icon name="right" style={{position: 'absolute', right: 10, fontSize: 20,}} />
                              </View>
                          ) : (
                            <View style={{flexDirection: 'row'}}>
                              <Text>{' '}</Text>
                              <Image
                                style={styles.icon}
                                source={{uri: image}}
                              />
                            </View>
                          )}
                      </View>
                  </TouchableOpacity>
              </View>
          </View>
          <WhiteSpace size="xs" />
          <View style={styles.a}>
            <Text style={styles.f}>邮箱:</Text>
            <View style={[styles.b,{flex:4}]}>
              <TextInput
                  placeholder={'请输入邮箱'}
                  value={email || email}
                  style={styles.teCor}
                  underlineColorAndroid="transparent"
                  onChangeText={this.handleChangeEmail}
                  onBlur={(value) => this.handleChangeEmail(value, true)}
              />
            </View>
          </View>
          <WhiteSpace size="xs" />
          <View style={styles.a}>
            <Text style={styles.f}>昵称:</Text>
            <View style={[styles.b,{flex:4}]}>
              <TextInput
                  placeholder={'请输入昵称'}
                  value={realName || realName}
                  style={styles.teCor}
                  underlineColorAndroid="transparent"
                  onChangeText={this.handleChangeName}
                  onBlur={(value) => this.handleChangeName(value, true)}
              />
            </View>
          </View>
          <WhiteSpace size="xs" />
          <View style={styles.a}>
            <Text style={styles.f}>当前角色:</Text>
            <View style={[styles.b,{flex:4, flexDirection: 'row'}]}>
                <WingBlank size="md">
                    <Checkbox disabled={role == 3 || role == 1} checked={role != 2} onChange={() => this.handleChangeRole(1)}>买家</Checkbox>
                </WingBlank>
                <WingBlank size="md">
                    <Checkbox disabled={role == 3 || role == 2} checked={role != 1} onChange={() => this.handleChangeRole(2)}>卖家</Checkbox>
                </WingBlank>
            </View>
          </View>
          <WhiteSpace size="xs" />
          <View style={styles.a}>
            <Text style={styles.f}>生日:</Text>
            <View style={[styles.b,{flex:4}]}>
              <List>
                <DatePicker
                    value={birthday}
                    mode="date"
                    minDate={new Date(1950, 1, 1)}
                    maxDate={new Date()}
                    onChange={this.handleDateChange}
                    format="YYYY-MM-DD"
                >
                  <List.Item arrow="horizontal" />
                </DatePicker>
              </List>
            </View>
          </View>
          <WhiteSpace size="xs" />
          <View style={styles.a}>
          <Text style={styles.f}>个人简介:</Text>
          <View style={[styles.b,{flex:4}]}>
            <TextInput
                multiline={true}
                numberOfLines={2}
                placeholder={'请输入个人简介'}
                value={resume || null}
                style={[styles.teCor, {textAlignVertical: 'top'}]}
                underlineColorAndroid="transparent"
                onChangeText={this.handleChangeAllText}
                onBlur={(value) => this.handleChangeAllText(value, true)}
            />
          </View>
          </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  box: {
    backgroundColor:"#f5f6f7",
  },
  teCor:{
    minWidth:'100%',
    padding:10,
    borderRadius:5,
    borderColor:"#ccc",
    borderWidth:1},
  Text: {
    color: '#333',
    fontSize: 30
  },
  icon: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 10,
    top: -10,
    borderRadius: 20
  },
  a:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:5,
    minHeight: 60,
    backgroundColor:"#fff",
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
