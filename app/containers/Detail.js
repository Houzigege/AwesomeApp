import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'

@connect()
class Detail extends Component {
  static navigationOptions = {
    title: 'Detail',
  }
  constructor(props) {
    super(props);
    this.state = {
      modelArr: []
    };
  }

  handlePressButton = () => {
    let {modelArr} = this.state;
    let data = {
      id: modelArr.length,
      num: null,
      name: null
    };
    modelArr.push(data);
    this.setState({modelArr})
  };

  handleDeleteItem = (id) => {
    let {modelArr} = this.state;
    modelArr = modelArr.filter(_item => _item.id !== id);
    this.setState({modelArr})
  };

  render() {

    let {modelArr} = this.state;
    return (
        <View style={styles.box}>
          <TouchableHighlight onPress={this.handlePressButton}>
            <Text style={styles.Text}>点击添加</Text>
          </TouchableHighlight>
          {
            modelArr.map((item, index) => (
                <View style={styles.a} key={`model-${index}`}>
                  <Text style={styles.f}>型号:</Text>
                  <View style={[styles.b,{flex:3}]}>
                    <TextInput
                        placeholder={item.name?item.name:'请输入商品名称'}
                        style={styles.teCor}
                        underlineColorAndroid="transparent"
                        onChangeText={(name) => this.setState({name})}
                    />
                  </View>
                  <View style={[styles.b,{flex:3}]}>
                    <TextInput
                        placeholder={item.num?item.num:'请输入商品数量'}
                        style={styles.teCor}
                        underlineColorAndroid="transparent"
                        onChangeText={(name) => this.setState({name})}
                    />
                  </View>
                  <TouchableHighlight onPress={() => this.handleDeleteItem(item.id)}>
                    <Text style={styles.f}>删除</Text>
                  </TouchableHighlight>
                </View>
            ))
          }
        </View>
    )
  }
}
const styles = StyleSheet.create({
  teCor:{
    minWidth:'100%',
    padding:10,
    backgroundColor:"#fff",
    borderRadius:5,
    borderColor:"#ccc",
    borderWidth:1},
  Text: {
    color: '#333',
    fontSize: 30
  },
  a:{
    flexDirection:"row",
    alignItems:"center"
    ,marginTop:5
  },
  b:{
    marginLeft:10,
    flex:1,
  },
  f:{
    flex:1,
    color:"grey"
  },
});


export default Detail
