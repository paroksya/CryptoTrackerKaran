 

import React from 'react';
 

import { Text, View, StyleSheet ,FlatList, ActivityIndicator,AsyncStorage, TouchableOpacity, Keyboard,Image, RefreshControl, TextInput, LogBox} from 'react-native';
 

import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swipeout from 'react-native-swipeout';

LogBox.ignoreAllLogs(true);
export default class App extends React.Component {

    state={
        res:[],fetching:false,index:null,add:false,new_value:null,
        filter:"30",num:null,
        loading:true,flat:"flex",flat2:"none",lod:"none",isenabled:false,domain:null,
        id:null,dis:"none",
    }
 loading =()=>
{
    
        return(
            <ActivityIndicator
            color='#17868b'
            animating={true}
            style={styles.indicator}
            size={50}
        />
        );
    }

    getData = async () => {

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("https://data.messari.io/api/v1/assets?with-metrics", requestOptions)
          .then(response => response.json())
          .then(result => this.setState({res:result.data,loading:false,fetching:false})).then(()=>console.log(this.state.res))
          .catch(error => console.log('error', error));
          console.log(this.state.res);
          
      }




    





  componentDidMount(){
      this.getData();
  }
    renderSeparator = () => {  
        return (  
            <View  
               
            />  
        );  
    };  

onswipeopen=(index)=>{
  this.setState({index:index});
}


delete_data=()=>{
  console.log(this.state.index);
this.setState({
  res:this.state.res.filter((_,i)=>i!== this.state.index)
});
}
    onRefresh=()=> {
      this.setState({loading:true,fetching:true});
      this.getData();
      }

add=()=>{
  this.setState({add:true});
}
addd = (text) => {
     
  this.setState({ new_value: text })


}
add_new=()=>{
  console.log(this.state.new_value);
  var newv = this.state.new_value;
  var join =this.state.res.concat({
    "symbol": newv,
            "name":newv,
            "metrics": {
              "market_data": {
                  "price_usd": 0,
                  "percent_change_usd_last_24_hours": 0,
                }}
  })
 
  this.setState({res:join,add:false});
}
    render() {   var swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { this.delete_data() }
      }
    ]
        if (this.state.loading === true) {
            return (
                this.loading()
            );
        }

        return (  
           this.state.add

?         
<SafeAreaView style={{flex:1,backgroundColor:'white'}}>
<View style={{flexGrow:1,justifyContent:"center",marginHorizontal:20,backgroundColor:'white'}}>
 <Text onPress={()=>this.setState({add:false})} style={{fontSize:18, textAlign:"right",margin:5,alignSelf:"flex-start",top:12,position:"absolute"}}>{'< '}Back to list</Text>
  
 <Text style={{fontSize:20,fontWeight:"bold",textAlign:"left",margin:10}}>Add a CryptoCurrency</Text>
<TextInput placeholder="Use a name or ticker symbol"  placeholderTextColor="grey"
style={{height:50,alignSelf:"stretch",borderWidth:0.5,borderColor:"grey",margin:10,padding:5,color:"black"}}   
onChangeText={(text)=>this.addd(text)}/>
<TouchableOpacity style={{alignSelf:"flex-end",alignItems:'center',justifyContent:"center",height:50,width:200,margin:20,backgroundColor:'#f7d24d'}} onPress={()=>this.add_new()} >
  <Text style={{fontSize:20,fontWeight:"bold",color:"#d9bc53"}}>Add</Text>
</TouchableOpacity>
</View>
</SafeAreaView>
 : 
<SafeAreaView style={{flex:1}}>
  <View style={{flexGrow:1,justifyContent:"center",backgroundColor:'white'}}>  
       
         
           

<View style={{margin:10, backgroundColor:'#385675',height:100,justifyContent:"center",alignItems:"center"}}>
  <Text style={{fontSize:25,fontWeight:"bold",color:'white',alignSelf:'flex-start',margin:5}}>Crypto Tracker Pro</Text>
</View>

<View style={{flex:1}}> 
<FlatList style={{flex:1  }}
    data={this.state.res}  
    extraData={this.state.res}
    renderItem={({item,index}) =>  

    <View >
         <Swipeout right={swipeoutBtns}
         onOpen={()=>this.onswipeopen(index)}
autoClose='true'
backgroundColor= 'transparent'>
        <Card containerStyle={{elevation:10,borderRadius:10,justifyContent:"center"}} >
      <View style={{flexDirection:"row",justifyContent:"center"}}>
       <View style={{height:70,width:60}}>
         <Image source={require('./assets/paid.png')} style={{height:50,width:50}}/>
       </View>
        <View style={{alignItems:"flex-start",width:'40%'}}>
      <Text style={{fontSize:20,textAlign:"left"}}>{item.symbol}</Text>
      <Text style={{fontSize:20,textAlign:'left'}}>{item.name}</Text>
      </View>
      <View style={{width:"40%",alignItems:"flex-end"}}>
      <Text style={{fontSize:20}}>${item.metrics.market_data.price_usd.toFixed(2)}</Text>
      <Text style={{fontSize:20}}>{item.metrics.market_data.percent_change_usd_last_24_hours.toFixed(2)}</Text>
      </View>
      </View>
           </Card>   
           </Swipeout>
           </View>
            }  

            refreshControl={<RefreshControl refreshing={this.state.fetching} onRefresh={this.onRefresh} />}

/>  
<TouchableOpacity  onPress={this.add} style={{justifyContent:"center",alignItems:"center",height:50,width:"100%"}}>
<Text style={{fontSize:20,color:'blue'}}>+ Add a Crypto Currency</Text>
</TouchableOpacity>

</View>

</View></SafeAreaView>
        );  
    }  
}  






const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    justifyContent: 'flex-start',
   marginBottom:10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },item: {  
    paddingBottom:5,  
    fontSize: 15,  
     
}, 
txtinput: {
    color: 'black',
alignSelf:"stretch",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    fontSize: 15,
    backgroundColor:"white"
},indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
},ImageIconStyle:{
    height:150,
    width:150,
    }
});
