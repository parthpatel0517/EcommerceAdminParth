
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import React, { useEffect, useState } from 'react';
//   import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Metrics/Metrics';
import { useDispatch, useSelector } from 'react-redux';
import { getorderdata, ordergetData } from '../redux/Slice/order.slice';

const DataStructure = ({ v, n }) => (
    <TouchableOpacity onPress={() => n.navigate("OrderDetail",
        v
    )}>
        <View style={Styles.orderDatamainBody}>
            <View style={{ marginTop: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={Styles.orderData11111}>Order Num : {v.Ordernum}</Text>
                    <Text style={Styles.orderData2}>{v.Date}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={Styles.orderData2}>Tracking number:</Text>
                    <Text style={Styles.orderData1}>{v.tracking_number}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={Styles.orderData2}>Quantity:</Text>
                        <Text style={Styles.orderData1}>{v?.cart.reduce((sum, v1) => sum + v1.qty, 0)}</Text>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={Styles.orderData2}>Total Amount:</Text>
                        <Text style={Styles.orderData1}>{v.TotalAmount}$</Text>
                    </View>
                </View>
                
                <View style={Styles.detailBtnHead}>
                    <View style={Styles.detaildBtn}>
                        <TouchableOpacity >
                            <Text style={Styles.detaildBtnText}>Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text style={Styles.delieverdText}>{v.Status}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

export default function Order({navigation}) {
    // const [orders, setOrders] = useState([]);

    const dispatch = useDispatch()
    const orderdetails = useSelector(state => state.order)
//   console.log("orderdetailsdbehfrjbebjfejbe",orderdetails?.order[0]?.order);

useEffect(() => {
    const back = navigation.addListener('focus', () => {
      dispatch(ordergetData());
    });
  
    return back;
  }, [navigation]);


    return (
        <ScrollView>
            <StatusBar backgroundColor="#F4F4F4" barStyle="dark-content" />
            <View style={{ width: '100%', height: 1000, backgroundColor: '#F4F4F4' }}>
                {/* <View style={Styles.mainIcon}>
          <TouchableOpacity>
            <EvilIcons name="chevron-left" size={45} color="#222222" />
          </TouchableOpacity>

          <TouchableOpacity>
            <EvilIcons name="search" size={35} color="#222222" />
          </TouchableOpacity>
        </View>

        <Text style={Styles.myOrderText}>My orders</Text> */}

                <View style={Styles.delievered}>
                    <TouchableOpacity>
                        <Text style={Styles.delieveredBtn}>Delivered</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={Styles.process}>Processing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={Styles.process}>Cancelled</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={orderdetails?.order?.[0]?.order}
                    renderItem={({ item }) => <DataStructure v={item} n={navigation}/>}
                    keyExtractor={item => item.id}
                />
            </View>
        </ScrollView>
    );

}

const Styles = StyleSheet.create({
    mainIcon: {
        width: 1000,
        height: 30,
        // borderWidth: 1,
        flexDirection: 'row',
        // marginHorizontal: 16,
        columnGap: 240,
        marginTop: 10,
    },
    myOrderText: {
        // width:"90%",
        // height:30,
        // borderWidth:1,
        marginHorizontal: 16,
        marginTop: 18,
        fontFamily: 'Metropolis-Bold',
        fontSize: 34,
        color: '#222222',
    },
    delievered: {
        width: 90,
        height: 30,
        flexDirection: 'row',
        // borderWidth:1,
        marginHorizontal: 16,
        marginTop: 15,
        columnGap: 35,
    },
    delieveredBtn: {
        width: 100,
        height: 30,
        backgroundColor: '#222222',
        borderRadius: 50,
        fontSize: 14,
        textAlign: 'center',
        padding: 6,
        padding: 6,
        color: '#FFFFFF',
        fontFamily: 'Metropolis-Regular',
    },
    process: {
        textAlign: 'center',
        padding: 5,
        padding: 5,
    },
    orderDatamainBody: {
        flex: 1,
        // borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 5,
        marginHorizontal: 18,
        marginTop: 30,
        padding: 10,
        padding: 10,
    },
    orderData1: {
        fontFamily: 'Metropolis-Bold',
        color: '#222222',
        lineHeight: 24,
        marginLeft: 5
    },
    orderData11111: {
        fontFamily: 'Metropolis-Bold',
        color: '#222222',
        lineHeight: 24
    },
    addresssss: {

        fontFamily: 'Metropolis-Bold',
        color: '#222222',
        lineHeight: 24,
        // fontSize:13.5
    },
    orderData2: {
        fontFamily: 'Metropolis-Regular',
        color: '#9B9B9B',
        lineHeight: 24,
    },
    detaildBtn: {
        width: 100,
        height: 38,
        borderWidth: 1,
        borderRadius: 50,
    },
    detaildBtnText: {
        fontFamily: 'Metropolis-Regular',
        color: '#222222',
        textAlign: 'center',
        padding: 8,
        padding: 8,
    },
    detailBtnHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: 128,
        marginTop: 30,
    },
    delieverdText: {
        textAlign: 'center',
        color: '#2AA952',
        fontFamily: 'Metropolis-Regular',
        marginTop: 10,
    },
});
