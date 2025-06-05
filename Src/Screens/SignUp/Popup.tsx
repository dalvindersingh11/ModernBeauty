import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { moderateScale } from 'react-native-size-matters';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

const Popup = (props: any) => {
 return (
  <>
   <Modal
    transparent
    animationType="fade"
    visible={props?.modalVisible}
    onRequestClose={props?.requestModal}>
    <View style={styles.modalBackground}>
     <View style={styles.modalContainer}>
      <View
       style={{
        width: moderateScale(250),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
       }}>
       <Text allowFontScaling={false} style={styles.modalHeading}>
        A verification link has been send to your mail
       </Text>
       <Text allowFontScaling={false} style={styles.modalHeading}>
        please verify and enjoy our service
       </Text>
      </View>
      <View style={{ height: moderateScale(40) }} />
      <TouchableOpacity style={styles.doneButton} onPress={props?.closeModal}>
       <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
     </View>
    </View>
   </Modal>
  </>
 );
};

const styles = StyleSheet.create({
 openButton: {
  padding: 12,
  backgroundColor: colors.black,
  borderRadius: 8,
  marginTop: 40,
  alignSelf: 'center'
 },
 buttonText: {
  color: '#fff',
  fontWeight: 'bold'
 },
 modalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center'
 },
 modalContainer: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  width: '90%',
  justifyContent: 'center',
  //   borderWidth: 3,
  //   borderColor: colors.backgrounColor,
  height: responsiveScreenHeight(30),
  alignItems: 'center'
 },
 modalHeading: {
  fontSize: 13,
  fontFamily: fonts?.regular,
  marginBottom: 2
 },
 doneButton: {
  backgroundColor: colors.black,
  paddingVertical: 10,
  paddingHorizontal: 45,
  borderRadius: 6
 },
 doneText: {
  color: '#fff',
  fontFamily: fonts.medium
 }
});

export default Popup;
