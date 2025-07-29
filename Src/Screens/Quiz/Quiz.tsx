import React, { useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 ScrollView,
 StyleSheet,
 Image,
 FlatList
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { ATTEMPT, MARKS, QUESTION, TIMER, WARNING } from '../../Constant/Icons';
import {
 responsiveScreenHeight,
 responsiveScreenWidth
} from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native';

const questions = [
 {
  id: 3,
  question: 'What tool is commonly used to curl hair?',
  options: [
   { id: 9, text: 'Curling iron' },
   { id: 10, text: 'Curling Iron' },
   { id: 11, text: 'Curling iron' },
   { id: 12, text: 'Curling Iron' }
  ]
 },
 {
  id: 4,
  question: 'Which is a styling tool?',
  options: [
   { id: 13, text: 'Straightener' },
   { id: 14, text: 'Shampoo' },
   { id: 15, text: 'Conditioner' },
   { id: 16, text: 'Serum' }
  ]
 }
 // Add more questions like this...
];

const QuizScreen = () => {
 const [selectedAnswers, setSelectedAnswers] = useState<any>({});
 console.log('selectedId', selectedAnswers);
 const renderAnswer = ({
  item,
  index,
  questionId
 }: {
  item: any;
  index: number;
  questionId: number;
 }) => {
  const handleOptionSelect = (questionId: number, optionId: number) => {
   setSelectedAnswers((prev: never[][]) => {
    const currentSelections = prev[questionId] || [];

    const isAlreadySelected = currentSelections.includes(optionId);

    const updatedSelections = isAlreadySelected
     ? currentSelections.filter((id) => id !== optionId) // unselect if already selected
     : [...currentSelections, optionId]; // select if not selected

    return {
     ...prev,
     [questionId]: updatedSelections
    };
   });
  };

  const isOptionSelected = (questionId: number, optionId: number) => {
   return selectedAnswers[questionId]?.includes(optionId);
  };

  const selected = isOptionSelected(questionId, item.id);

  return (
   <View style={{ flexDirection: 'row', width: moderateScale(150), margin: 5 }}>
    <TouchableOpacity
     style={[
      {
       flexDirection: 'row',
       width: moderateScale(145),
       padding: 2,
       alignItems: 'center',
       borderRadius: 3,
       borderWidth: 1,
       borderColor: selected ? colors.darkGreen : colors.black,
       margin: 3,
       backgroundColor: selected ? colors.darkGreen : 'white'
      }
     ]}
     onPress={() => handleOptionSelect(questionId, item.id)}>
     <View
      style={[
       styles.radioCircle,
       {
        backgroundColor: selected ? colors.white : 'transparent',
        borderColor: selected ? colors.white : colors.black
       }
      ]}
     />
     <Text
      allowFontScaling={false}
      style={[
       styles.optionText,
       { color: selected ? colors.white : colors.black }
      ]}>
      {item.text}
     </Text>
    </TouchableOpacity>
   </View>
  );
 };

 const renderItem = ({ item, index }: any) => {
  return (
   <View>
    <View style={styles.questionCard}>
     <Text style={styles.questionText}>{`${index + 1}. ${
      item?.question
     }`}</Text>
     <View style={{ right: 12 }}>
      <FlatList
       data={item?.options}
       keyExtractor={(item) => item.id.toString()}
       numColumns={2}
       renderItem={({ item: optionItem, index: optionIndex }) =>
        renderAnswer({
         item: optionItem,
         index: optionIndex,
         questionId: item.id // use question.id not index
        })
       }
       contentContainerStyle={{ padding: 16 }}
      />
     </View>
    </View>
   </View>
  );
 };

 return (
  <SafeAreaView style={styles.container}>
   {/* Header Info */}
   <View style={{ width: moderateScale(335) }}>
    <Text allowFontScaling={false} style={styles.subtitle}>
     Quiz
    </Text>
   </View>
   <View style={styles.headerRow}>
    <View style={styles.headerBox}>
     <Image style={styles.topImage} source={MARKS} />
     <Text allowFontScaling={false} style={styles.headerBigText}>
      7/10
     </Text>
     <Text allowFontScaling={false} style={styles.headerLabel}>
      Minimum Marks
     </Text>
    </View>
    <View style={styles.headerBox}>
     <Image style={styles.topImage} source={ATTEMPT} />
     <Text allowFontScaling={false} style={styles.headerBigText}>
      1/5
     </Text>
     <Text allowFontScaling={false} style={styles.headerLabel}>
      Attempts
     </Text>
    </View>
    <View style={styles.headerBox}>
     <Image style={styles.topImage} source={QUESTION} />

     <Text allowFontScaling={false} style={styles.headerBigText}>
      10
     </Text>
     <Text allowFontScaling={false} style={styles.headerLabel}>
      Questions
     </Text>
    </View>
    <View style={styles.headerBox}>
     <Image style={styles.topImage} source={TIMER} />

     <Text allowFontScaling={false} style={styles.headerBigText}>
      10:10:00
     </Text>
     <Text allowFontScaling={false} style={styles.headerLabel}>
      Remaining time
     </Text>
    </View>
   </View>

   <View style={styles.warningBox}>
    <Image style={styles.warningImage} source={WARNING} />
    <Text allowFontScaling={false} style={styles.warningText}>
     Please note that you have to complete all the questions and submit before
     remaining time. The form will be submitted automatically if remaining time
     ends.
    </Text>
   </View>

   <View
    style={{
     height: responsiveScreenHeight(60),
     backgroundColor: colors.white,
     borderRadius: 9,
     borderWidth: 1,
     justifyContent: 'center',
     //  alignItems: 'center',
     width: '100%'
    }}>
    <FlatList
     data={questions}
     showsVerticalScrollIndicator={false}
     keyExtractor={(item) => item.id?.toString()}
     renderItem={renderItem}
     contentContainerStyle={{ padding: 5 }}
    />
   </View>
   <TouchableOpacity style={styles.loginButton}>
    <Text allowFontScaling={false} style={styles.loginText}>
     Submit
    </Text>
   </TouchableOpacity>
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#f5d6be',
  padding: moderateScale(22)
 },
 headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
  //   width: '95%',
  alignItems: 'center',
  alignSelf: 'center'
 },
 subtitle: {
  fontFamily: fonts.medium,
  marginVertical: 1,
  fontSize: 16,
  color: colors.textColor,
  marginTop: responsiveScreenHeight(1)
 },
 headerBox: {
  width: moderateScale(80),
  marginHorizontal: 4,
  backgroundColor: '#fff',
  padding: 8,
  borderRadius: 10,
  borderWidth: 1,
  alignItems: 'center',
  marginTop: responsiveScreenHeight(1)
 },
 headerBigText: {
  fontFamily: fonts.medium,
  fontSize: 16
 },
 headerLabel: {
  fontSize: 9,
  color: colors.textColor,
  textAlign: 'center',
  fontFamily: fonts.regular
 },
 topImage: {
  width: moderateScale(20),
  height: moderateScale(20)
 },
 warningBox: {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  alignContent: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: colors.white,
  borderRadius: 8,
  padding: 10,
  marginBottom: 10
 },
 warningText: {
  color: colors.black,
  fontSize: 11,
  fontFamily: fonts.medium
 },
 warningImage: {
  height: moderateScale(25),
  width: moderateScale(25),
  right: moderateScale(5)
 },
 questionCard: {
  backgroundColor: '#fff',
  padding: 15,
  justifyContent: 'center',
  alignSelf: 'center',
  width: responsiveScreenWidth(85)
 },
 questionText: {
  fontWeight: 'bold',
  marginBottom: 10
 },
 optionButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 6,
  marginBottom: 6,
  borderWidth: 1,
  borderColor: '#ddd'
 },
 selectedOption: {
  backgroundColor: '#d4fcd2',
  borderColor: '#0f0'
 },
 radioCircle: {
  width: 12,
  height: 12,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.black,
  marginLeft: '4%',
  marginRight: 10
 },

 optionText: {
  fontSize: 12,
  fontFamily: fonts.regular,
  color: colors.textColor
 },
 loginButton: {
  backgroundColor: '#000',
  paddingVertical: moderateScale(12),
  paddingHorizontal: moderateScale(12),
  borderRadius: 11,
  width: '72%',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '7%'
 },
 loginText: {
  color: colors.white,
  fontFamily: fonts.medium,
  fontSize: 16
 }
});

export default QuizScreen;
