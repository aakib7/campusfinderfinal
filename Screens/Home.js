import {TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, Pressable,
    StyleSheet, Text, View,SafeAreaView,Dimensions,FlatList,ActivityIndicator } from 'react-native'
import React from 'react'
import { db } from '../config'
import { getDocs,collection } from 'firebase/firestore'

const { height, width} = Dimensions.get('window')
const Home = ({navigation}) => {
    const [universities,setUniversities] = React.useState([])
    const [masterdata,setMasterData] = React.useState([])
    const [loading,setLoading] = React.useState(true)
    const [search, setSearch] = React.useState("")
    const [filters, setFilters] = React.useState([
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28baa",
          title: "Fee",
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63f",
          title: "Ranking",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72g",
          title: "Merit",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72h",
          title: "Type",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72k",
          title: "Admission",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d726",
          title: "Status",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72o",
  
          title: "Admission",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d74",
          title: "Status",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d76",
          title: "Location",
        },
      ])

    const getdata =async()=>{
        console.log("get")
        await getDocs(collection(db,'universities')).then(docSnap=>{
            let  Uni=[];
            docSnap.forEach((doc)=>{
            Uni.push({...doc.data(), id:doc.id})
            console.log(doc.data())
              
              
            })
            
            setUniversities(Uni);
            setMasterData(Uni);
            setLoading(false)
           
            // console.log("doc data",Uni)
            
          })
    }

    React.useEffect(()=>{
        getdata();
    },[])

    const searchFilter = (text) => {
      if (text) {
          const newData = masterdata.filter((item) => {
              const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase()
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
          
          setUniversities(newData);
          setSearch(text);
      }
      else {
          setUniversities(masterdata);
          setSearch(text);
      }
  }



  return (
    <ScrollView style={styles.container}>
      {loading ?
        <View style={{marginTop:300}}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View> :
      <>
      <View style={styles.subcontainer}>
            <ImageBackground source={require("../assets/images/NavbarHome.png")} style={styles.navbar}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Campus Finder</Text>
                    <View>
                        <TextInput style={styles.searchBar} 
                        placeholder='Find Best Match For You' 
                        placeholderTextColor="white" 
                        value={search} 
                        onChangeText={(text) => { searchFilter(text)}}
                        />
                  </View>
                    
                </View>
            </ImageBackground>

            <View style={styles.filterWrapper}>
                <TouchableOpacity style={styles.filter} onPress={()=>{}}>
                    <Text style={{color:"white",fontWeight:"600"}}>Filters</Text>
                </TouchableOpacity>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={filters}
                    renderItem={({ item }) => (
                    <View key={item.key} style={styles.singleFilter}>
                        <TouchableOpacity style={styles.filter} onPress={()=>{}}>
                            <Text style={{color:"white",fontWeight:"600"}}>{item.title}</Text>
                        </TouchableOpacity>
                </View>
                )}
            />
            </View>
        </View>

        <View style={styles.universitiesWrapper}>
          <FlatList
            data={universities}
            renderItem={({ item }) => (

              <View key={item.key} style={styles.singleUniversity} elevation={4}>
                <View style={styles.rankingTextWrapper}>
                  {/* <Text style={styles.rankingText}>Ranking {item.ranking}</Text> */}
                </View>
              
                <TouchableOpacity onPress={() => {navigation.navigate("Details",{name:item.name,
                    uri:item.uri,deadline:item.deadline,fee:item.fee,id:item.id})}}>
                  <View style={{ flex: 0.85, flexDirection: "row" }}>
                    <View style={styles.imageWrapper} >
                      <Image
                        style={{ height: "75%", width: "100%", borderRadius: 50, marginLeft: 5 }}
                        source={{uri:item.uri}}
                      />
                    </View>
                    <View style={styles.universityDetailWrapper}>
                      <Text style={[styles.universityDetailText, styles.usiversityName]}>{item.name}</Text>
                      <Text style={styles.universityDetailText}>Fee : {item.fee}</Text>
                      <Text style={styles.universityDetailText}>Admission :{item.admission_status?"Open":"Close"}</Text>

                      <View style={styles.locAndPhoneWrapper}>
                        <Text style={styles.universityDetailText}>Location : {item.location}</Text>
                        {/* <Text style={styles.phone}>Phone</Text> */}
                      </View>
                      <Text style={[styles.universityDetailText, styles.DeadlineText]}>Deadline : {item.deadline}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

          // ItemSeparatorComponent={() => <Separator />}
          />
        </View>

     </>}
        
    </ScrollView>
    
  )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:height+100

    },
    subcontainer: {
        flex: 1,
    },

    navbar: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 150,
        

    },

    header: {
        flex: .70,
        alignItems: "center",
    },
    heading: {
        textAlign: "center",
        marginTop:10,
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    searchBar: {
        width: 300,
        height: 40,
        borderWidth: 2,
        margin: 30,
        borderRadius: 20,
        borderColor: "white",
        textAlign: "center",
    },
    picker: {
        borderRadius: 25,
        borderWidth: 1.5,
        marginVertical: 5,
        width: "85%",
        flex: 0.30,
        justifyContent: 'center'
    },
    citypicker:{
      marginTop:-10
      ,borderWidth:1.5,
      padding:"4%",
      paddingHorizontal:"33%",
      borderRadius:50
    },
    inputFieldWrapper: {
        width: "100%",
        flex: 0.50
        , justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",

    },
    inputStyle: {
        borderWidth: 1.5,
        width: "25%",
        borderRadius: 20,
        fontSize:18,
        marginVertical:20
     
    },
    searchBtn: { 
        backgroundColor:"#F75656",
        width:"35%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: "white",
        textAlign: "center",
        borderRadius: 10,
        marginTop: 10
    },
    recommendation: {
        flex: 0.30,
        width: "100%",
        marginTop: 10,
        
    },
    recommendationContainer: {
        flex: 0.10,
        flexDirection: "row"
        , justifyContent: "space-between",
        marginHorizontal: "10%",
        marginVertical: "5%",
     

    },

    campusImg: {
        width: "100%"
        , height: 110,
        borderRadius: 50
    },
    recommendationHeading: {
        backgroundColor: "lightgrey",
        width: "100%",
        paddingLeft:15,
        height: "15%",
        fontSize: 20,
        fontWeight:"bold"
    },
    filterWrapper:{
        flex: 0.1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
        width:"100%"
    },
    singleFilter:{
        flex:0.3,
        flexDirection:"row",
        height:40,
        // width:80,
        marginLeft:10
    },
    filter:{
        alignItems: "center",
        backgroundColor: "#f8766e",
        padding: 10,
        borderRadius:5,
        width:100,
    },
    usiversityName:{
        color:"white",
        backgroundColor:"#F75656",
        padding:5,
        borderTopLeftRadius:10
    },
    DeadlineText:{
        color:"#F75656"
        , fontWeight:"300",
        fontSize:19
    },

    universitiesWrapper:{
        flex: 0.9,
        justifyContent:"flex-start",
        height:"100%",
        width:"100%"
    },
    singleUniversity:{
        flex: 0.25,
        height:"100%",
        width:"100%",
        borderWidth:0.3,
        marginVertical:5,
        
        
    },
    rankingTextWrapper:{
        flex: 0.15,
        justifyContent:"center",
        alignItems:"flex-end",
        height:"100%",
        width:"100%"
    },
    rankingText:{
        marginRight:20,
        color:"green",
        fontWeight:"800",
        fontSize:16,
    },
    imageWrapper:{
        flex: 0.3,
        justifyContent:"center",
        alignItems:"center",
        height:"100%",
        width:"100%",
        borderRadius:50, 
    },
    universityDetailWrapper:{
        flex: 0.70,
        height:"100%",
        width:"100%",
        
    },
    universityDetailText:{
        fontSize:17,
        marginLeft:15,
        fontWeight:"500",
        marginBottom:5,
        marginTop:5
    },
    locAndPhoneWrapper:{
       flexDirection:'row',
       justifyContent:"space-between"
    },
    phone:{
        fontSize:17,
        marginRight:15,
        fontWeight:"500",
        marginTop:12
    }
})