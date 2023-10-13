import { useState, useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios';


export default function NasaInfo() {
    const [data, setData] = useState();

    const myAPI = process.env.EXPO_PUBLIC_API;

    const monthName=["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const year = '2023';
    const month = '01';
    const day = '01';

    const url = `https://api.nasa.gov/EPIC/api/natural/date/${year}-${month}-${day}?api_key=${myAPI}`;

    useEffect(() => {
    axios.get(url)
    .then((response)=> {
        console.clear();
        console.log(response);
        setData(response.data)
        console.log(response.data);
    } ).catch (err => {
        console.log(err)
    })
 }, [])

 return (
    <View>
      
      {data && data.map((a, index) => {
          return (
            <View key={index} classNAme={styles.container}>
                <Text>Image # { index +1 }</Text>
                <Text>{a.caption.toUpperCase()}</Text>
                <Text> Coordinates </Text>
                <Text> x:{a.centroid_coordinates.lat.toFixed(2)} y: {a.centroid_coordinates.lon.toFixed(2)} </Text>
              <Text> Date: {monthName[Number(a.date.slice(5, 7))-1]} {Number(a.date.slice(8,10))}, {a.date.slice(0,4)} </Text>
              <Image src={`https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${a.image}.png`} alt="" />

            </View>
          );
        })}
    </View>
  );
}

const styles={
    container: {
        margin: 20,
    }, 

    image: {
        width:200, 
        height: 200, 
    }
}