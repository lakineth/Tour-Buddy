import React from 'react';
import { ActivityIndicator , TextInput , View, StyleSheet, TouchableOpacity, Text, Image , AsyncStorage , Dimensions  , ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Transport extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Transport',
    headerStyle: {
      backgroundColor: '#00c3ff',
      elevation: 0,
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24,
    },

    headerLeft: () => (
      <View style={{marginLeft: 10, marginTop:5}}>
        <TouchableOpacity  onPress={ () =>  navigation.navigate('HomePage') }>
          <MaterialCommunityIcons name="menu" color='#000000' size={30} />
        </TouchableOpacity>
      </View>
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      current:'',
      destination:'',
      level:'',
      passengers:'',
      condition:'',
      time:'',
      resultTxt: '',
      result: false,
      message:'',
      showAlert: false,
      title:'',
    };

  }
  
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false,
      message: '',
      title: ''
    });
  };

  onInsert = async(e)  =>{
    if(this.state.current!=""){
      if(this.state.destination!=""){
        if(this.state.level!=""){
          if(this.state.passengers!=""){
            if(this.state.condition!=""){
              if(this.state.time!=""){
                this.setState({loader:true})
                const url="http://"+LocalIP+":1111/transport"
                const data = JSON.stringify({ current : this.state.current , destination:this.state.destination , level:this.state.level , passengers:this.state.passengers , condition:this.state.condition , time:this.state.time });
                await axios.post(url,data,{
                  headers: { "Content-Type": "application/json" }
                }).then( async(res) =>{
                    console.log(res.data)
                    this.setState({loader:false,result:true,resultTxt:" Transport Mode : "+res.data.results})
                })
              }else{
                this.setState({title:"Error!",message:"Please Time!"})
                this.showAlert()
              }
            }else{
              this.setState({title:"Error!",message:"Please condition!"})
              this.showAlert()
            }
          }else{
            this.setState({title:"Error!",message:"Please passengers!"})
            this.showAlert()
          }
        }else{
          this.setState({title:"Error!",message:"Please level!"})
          this.showAlert()
        }
      }else{
        this.setState({title:"Error!",message:"Please destination!"})
        this.showAlert()
      }
    }else{
        this.setState({title:"Required!",message:"Please current!"})
        this.showAlert()
    }
  }

  render() {
    const {showAlert} = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>

        <View style={styles.center}>
          <Image
            source={require("./../assets/logo.png")}
            style={{ width: 150, height: 150, marginBottom: 20, marginTop: 10 }}
          />
        </View>

        <Text  style={styles.labelText}>Current Location:</Text>
        <View style={styles.center}>
          <View
            style={{
              borderBottomWidth: 1,
              width: 80 + '%',
              height:45,
              marginBottom:20,
              flexDirection: 'row',
              alignItems:'center',
              borderBottomColor: '#c4c4c4',
              color: '#000000'
            }}>
            <Picker
              selectedValue={this.state.current}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({current: itemValue})}
            >
              <Picker.Item label="Select Location" value="" />
              <Picker.Item label="Matara" value="Matara" />
              <Picker.Item label="Habaraduwa" value="Habaraduwa" />
              <Picker.Item label="Bata Atha" value="Bata Atha" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Destination:</Text>
        <View style={styles.center}>
          <View
            style={{
              borderBottomWidth: 1,
              width: 80 + '%',
              height:45,
              marginBottom:20,
              flexDirection: 'row',
              alignItems:'center',
              borderBottomColor: '#c4c4c4',
              color: '#000000'
            }}>
            <Picker
              selectedValue={this.state.destination}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({destination: itemValue})}
            >
              <Picker.Item label="Select Destination" value="" />
              <Picker.Item label="Galle" value="Galle" />
              <Picker.Item label="Mirissa" value="Mirissa" />
              <Picker.Item label="Tangalle" value="Tangalle" />
              <Picker.Item label="Hambantota" value="Hambantota" />
              <Picker.Item label="Kataragama" value="Kataragama" />
              <Picker.Item label="Mirijjawila" value="Mirijjawila" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Level:</Text>
        <View style={styles.center}>
          <View
            style={{
              borderBottomWidth: 1,
              width: 80 + '%',
              height:45,
              marginBottom:20,
              flexDirection: 'row',
              alignItems:'center',
              borderBottomColor: '#c4c4c4',
              color: '#000000'
            }}>
            <Picker
              selectedValue={this.state.level}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({level: itemValue})}
            >
              <Picker.Item label="Select Level" value="" />
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Passengers:</Text>
        <View style={styles.center}>
          <TextInput 
            value={this.state.passengers}
            keyboardType = {'numeric'}
            onChangeText={(passengers) => this.setState({ passengers })}
            placeholder={'passengers'}
            style={styles.input}
          />
        </View>

        <Text  style={styles.labelText}>Vehicle Condition:</Text>
        <View style={styles.center}>
          <View
            style={{
              borderBottomWidth: 1,
              width: 80 + '%',
              height:45,
              marginBottom:20,
              flexDirection: 'row',
              alignItems:'center',
              borderBottomColor: '#c4c4c4',
              color: '#000000'
            }}>
            <Picker
              selectedValue={this.state.condition}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({condition: itemValue})}
            >
              <Picker.Item label="Select Location" value="" />
              <Picker.Item label="A/C" value="A/C" />
              <Picker.Item label="Non A/C" value="Non A/C" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Time Duration:</Text>
        <View style={styles.center}>
          <TextInput 
            value={this.state.time}
            keyboardType = {'numeric'}
            onChangeText={(time) => this.setState({ time })}
            placeholder={'Time Duration'}
            style={styles.input}
          />
        </View>

        <View style={styles.center}>
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.onInsert}>
            {!this.state.loader ? (
              <Text style={{color: '#000000', fontWeight: 'bold'}}>Submit</Text>
            ) : null}
            {this.state.loader ? (
                <ActivityIndicator size="large" color={"#000000"} />
            ) : null}
          </TouchableOpacity>
        </View>
        
        { this.state.result == true ? ([
          <View style={styles.center}>
            <View>
              <Text style={{ fontWeight: 'bold' , fontSize: 18 }}>{ this.state.resultTxt }</Text>
            </View>
          </View>]):null}

          <AwesomeAlert
              show={showAlert}
              title={this.state.title}
              message={this.state.message}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              cancelText="Close"
              cancelButtonColor="#AEDEF4"
              onCancelPressed={() => {
                this.hideAlert();
              }}
            />

        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center:{
    alignItems: 'center',
  },
  labelText:{
    fontWeight: 'bold' ,
    fontSize: 14 , 
    marginLeft: 10+'%'
  },
  firstLabelText:{
    fontWeight: 'bold' ,
    fontSize: 14 , 
    marginLeft: 10+'%',
    marginTop: 2+'%',
  },
  input: {
    borderBottomWidth: 1,
    width: 80 + '%',
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    borderBottomColor: '#c4c4c4',
    color: '#000000'
  },
  TextInputStyleClass:{
    borderBottomWidth: 1,
    width: 80 + '%',
    height:100,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 4, 
    borderBottomColor: '#c4c4c4',
    color: '#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:10,
    width: 80 + '%',
    height: 40,
    borderRadius: 60
  },
  loginButton: {
    backgroundColor: "#00c3ff",
  },
  registerButton: {
    backgroundColor: "#000000",
  }
});