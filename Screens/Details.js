import { StyleSheet, Text, View,SafeAreaView,Image,ActivityIndicator} from 'react-native'
import React from 'react'
import { db } from '../config'
import { getDocs,collection } from 'firebase/firestore'

const Details = ({navigation,route}) => {
    const [details,setDetails] = React.useState();
    const [loading,setLoading] = React.useState(true)
    const getdata = async()=>{
       
        await getDocs(collection(db,`universities/${route.params.id}/details`)).then(docSnap=>{
            let  Uni=[];
            docSnap.forEach((doc)=>{
            Uni.push({...doc.data()})
            })
            
            setDetails(Uni)
            setLoading(false);
           
            console.log("doc data",details[0].address)
            
          })
    }

    React.useEffect(()=>{
        getdata();
    },[])
  return (
    <SafeAreaView>
        {loading ?
            <View style={{marginTop:300}}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>:
        <>
            <Image
                style={{ height:330, width: 360, borderRadius: 50, marginLeft: 5,marginTop:5,alignSelf:"center"}}
                source={{uri:route.params.uri}}
            />
            <View style={{marginTop:30,marginLeft:75}}>
                <Text style={{fontSize:16,fontWeight:"600"}}>Name: {route.params.name} University</Text>
                <Text style={{fontSize:16,fontWeight:"600",marginTop:10}}>Fee: Rs {route.params.fee} Per Semester</Text>
                <Text style={{fontSize:16,fontWeight:"600",marginTop:10,color:"red"}}>Deadline: Till {route.params.deadline}</Text>
                <Text style={{fontSize:16,fontWeight:"600",marginTop:10}}>Address: {details[0].address}</Text>
                <Text style={{fontSize:16,fontWeight:"600",marginTop:10}}>Students: {details[0].student}</Text>
            <View style={{flexDirection:"row"}}>
                <Text style={{fontSize:16,fontWeight:"600",marginTop:10}}>Majors: </Text>
                {details[0].mapor.map((major)=>{
                    return(<Text style={{fontSize:14,fontWeight:"500",marginTop:10}}>{major}, </Text>)
                })}
            </View>
            </View>
        </>
        }
    </SafeAreaView>
  )
}

export default Details

const styles = StyleSheet.create({})