import React from 'react';
import { ActivityIndicator , TextInput , View, StyleSheet, TouchableOpacity, Text, Image , AsyncStorage , Dimensions  , ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Destination extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Destination',
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
      type:'',
      restriction:'',
      budget:'',
      flavor:'',
      allergies:'',
      time:'',
      occasion:'',
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
    if(this.state.city!=""){
      if(this.state.type!=""){
        if(this.state.wildlife!=""){
          if(this.state.beaches!=""){
            if(this.state.cultural!=""){
              if(this.state.heritage!=""){
                if(this.state.sport!=""){
                  if(this.state.natural!=""){
                    if(this.state.botanical!=""){
                      if(this.state.weather!=""){
                        this.setState({loader:true})
                        const url="http://"+LocalIP+":3333/destination"
                        const data = JSON.stringify({ city : this.state.city , type:this.state.type , wildlife:this.state.wildlife , beaches:this.state.beaches , cultural:this.state.cultural , heritage:this.state.heritage , sport:this.state.sport , natural:this.state.natural , botanical:this.state.botanical , weather:this.state.weather});
                        await axios.post(url,data,{
                          headers: { "Content-Type": "application/json" }
                        }).then( async(res) =>{
                            console.log(res.data)
                            this.setState({loader:false,result:true,resultTxt:" Destination : "+res.data.results+" \n"+res.data.resultsDes})
                        })
                      }else{
                        this.setState({title:"Error!",message:"Please weather!"})
                        this.showAlert()
                      }
                    }else{
                      this.setState({title:"Error!",message:"Please botanical!"})
                      this.showAlert()
                    }
                  }else{
                    this.setState({title:"Error!",message:"Please natural!"})
                    this.showAlert()
                  }
                }else{
                  this.setState({title:"Error!",message:"Please sport!"})
                  this.showAlert()
                }
              }else{
                this.setState({title:"Error!",message:"Please heritage!"})
                this.showAlert()
              }
            }else{
              this.setState({title:"Error!",message:"Please cultural!"})
              this.showAlert()
            }
          }else{
            this.setState({title:"Error!",message:"Please beaches!"})
            this.showAlert()
          }
        }else{
          this.setState({title:"Error!",message:"Please wildlife!"})
          this.showAlert()
        }
      }else{
        this.setState({title:"Error!",message:"Please type!"})
        this.showAlert()
      }
    }else{
        this.setState({title:"Required!",message:"Please city!"})
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

        <Text  style={styles.labelText}>Destination City :</Text>
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
              selectedValue={this.state.city}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue})}
            >
              <Picker.Item label="Select Destination City" value="" />
              <Picker.Item label="Galle" value="Galle" />
              <Picker.Item label="Matara" value="Matara" />
              <Picker.Item label="Dickwella" value="Dickwella" />
              <Picker.Item label="Sigiriya" value="Sigiriya" />
              <Picker.Item label="Hikkaduwa" value="Hikkaduwa" />
              <Picker.Item label="Ella" value="Ella" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Indoor/Outdoor	:</Text>
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
              selectedValue={this.state.type}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}
            >
              <Picker.Item label="Select Indoor/Outdoor	" value="" />
              <Picker.Item label="Indoor" value="Indoor" />
              <Picker.Item label="Outdoor" value="Outdoor" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Wildlife	:</Text>
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
              selectedValue={this.state.wildlife}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({wildlife: itemValue})}
            >
              <Picker.Item label="Select Wildlife" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Beaches	:</Text>
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
              selectedValue={this.state.beaches}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({beaches: itemValue})}
            >
              <Picker.Item label="Select beaches" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Cultural Sites	:</Text>
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
              selectedValue={this.state.cultural}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({cultural: itemValue})}
            >
              <Picker.Item label="Select cultural" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Heritage	:</Text>
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
              selectedValue={this.state.heritage}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({heritage: itemValue})}
            >
              <Picker.Item label="Select heritage" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Sports & Adventure	:</Text>
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
              selectedValue={this.state.sport}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({sport: itemValue})}
            >
              <Picker.Item label="Select Sport" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Natural Sceneries	:</Text>
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
              selectedValue={this.state.natural}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({natural: itemValue})}
            >
              <Picker.Item label="Select Wildlife" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Botanical Gardens	:</Text>
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
              selectedValue={this.state.botanical}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({botanical: itemValue})}
            >
              <Picker.Item label="Select Botanical Gardens" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Weather Conditions	:</Text>
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
              selectedValue={this.state.weather}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({weather: itemValue})}
            >
              <Picker.Item label="Select Weather Conditions" value="" />
              <Picker.Item label="Dry Zone" value="Dry Zone" />
              <Picker.Item label="Wet Zone" value="Wet Zone" />
            </Picker>
          </View>
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