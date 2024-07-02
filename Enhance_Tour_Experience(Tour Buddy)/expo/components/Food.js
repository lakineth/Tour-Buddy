import React from 'react';
import { ActivityIndicator , TextInput , View, StyleSheet, TouchableOpacity, Text, Image , AsyncStorage , Dimensions  , ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from "axios";
import LocalIP from "./localIPAddress";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Food extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Food',
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
    if(this.state.type!=""){
      if(this.state.restriction!=""){
        if(this.state.flavor!=""){
          if(this.state.allergies!=""){
            if(this.state.time!=""){
              if(this.state.occasion!=""){
                if(this.state.budget!=""){
                  this.setState({loader:true})
                  const url="http://"+LocalIP+":2222/food"
                  const data = JSON.stringify({ type : this.state.type , restriction:this.state.restriction , flavor:this.state.flavor , allergies:this.state.allergies , time:this.state.time , occasion:this.state.occasion , budget:this.state.budget });
                  await axios.post(url,data,{
                    headers: { "Content-Type": "application/json" }
                  }).then( async(res) =>{
                      console.log(res.data)
                      this.setState({loader:false,result:true,resultTxt:" Food : "+res.data.results})
                  })
                }else{
                  this.setState({title:"Error!",message:"Please budget!"})
                  this.showAlert()
                }
              }else{
                this.setState({title:"Error!",message:"Please occasion!"})
                this.showAlert()
              }
            }else{
              this.setState({title:"Error!",message:"Please time!"})
              this.showAlert()
            }
          }else{
            this.setState({title:"Error!",message:"Please allergies!"})
            this.showAlert()
          }
        }else{
          this.setState({title:"Error!",message:"Please flavor!"})
          this.showAlert()
        }
      }else{
        this.setState({title:"Error!",message:"Please restriction!"})
        this.showAlert()
      }
    }else{
        this.setState({title:"Required!",message:"Please type!"})
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

        <Text  style={styles.labelText}>Cuisine Type:</Text>
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
              <Picker.Item label="Select Cuisine Type" value="" />
              <Picker.Item label="Indian" value="Indian" />
              <Picker.Item label="Japanese" value="Japanese" />
              <Picker.Item label="Italian" value="Italian" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Dietary Restrictions:</Text>
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
              selectedValue={this.state.restriction}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({restriction: itemValue})}
            >
              <Picker.Item label="Select Dietary Restrictions" value="" />
              <Picker.Item label="Vegan" value="Vegan" />
              <Picker.Item label="Gluten-Free" value="Gluten-Free" />
              <Picker.Item label="NaN" value="NaN" />
              <Picker.Item label="Vegetarian" value="Vegetarian" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Flavor Profiles	:</Text>
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
              selectedValue={this.state.flavor}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({flavor: itemValue})}
            >
              <Picker.Item label="Select Flavor Profiles	" value="" />
              <Picker.Item label="Savory" value="Savory" />
              <Picker.Item label="Umami" value="Umami" />
              <Picker.Item label="Spicy" value="Spicy" />
              <Picker.Item label="Fresh" value="Fresh" />
              <Picker.Item label="Smoky" value="Smoky" />
              <Picker.Item label="Creamy" value="Creamy" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Allergies:</Text>
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
              selectedValue={this.state.allergies}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({allergies: itemValue})}
            >
              <Picker.Item label="Select Allergies" value="" />
              <Picker.Item label="Nuts" value="Nuts" />
              <Picker.Item label="Dairy" value="Dairy" />
              <Picker.Item label="NaN" value="NaN" />
            </Picker>
          </View>
        </View>


        <Text  style={styles.labelText}>Time of Day:</Text>
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
              selectedValue={this.state.time}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({time: itemValue})}
            >
              <Picker.Item label="Select Time of Day" value="" />
              <Picker.Item label="Dessert" value="Dessert" />
              <Picker.Item label="Snack" value="Snack" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Occasion:</Text>
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
              selectedValue={this.state.occasion}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({occasion: itemValue})}
            >
              <Picker.Item label="Select Time of Day" value="" />
              <Picker.Item label="Special" value="Special" />
              <Picker.Item label="Formal" value="Formal" />
              <Picker.Item label="Casual" value="Casual" />
            </Picker>
          </View>
        </View>

        <Text  style={styles.labelText}>Budget:</Text>
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
              selectedValue={this.state.budget}
              style={{width: 100 + '%',
              height:45}}
              onValueChange={(itemValue, itemIndex) => this.setState({budget: itemValue})}
            >
              <Picker.Item label="Select Time of Day" value="" />
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Moderate" value="Moderate" />
              <Picker.Item label="High" value="High" />
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