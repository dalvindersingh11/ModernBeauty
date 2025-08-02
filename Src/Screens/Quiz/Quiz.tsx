import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 ScrollView,
 StyleSheet,
 Image,
 FlatList,
 Modal,
 ActivityIndicator,
 BackHandler
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../Constant/apiUrl';
import { showToast } from '../../Constant/showToast';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const QuizScreen = (props: any) => {
 const [quizData, setQuizData] = useState<any>([]);
 const [quizDetail, setQuizDetail] = useState<any>([]);
 const [modalVisible, setModalVisible] = useState(false);
 const [selectedAnswers, setSelectedAnswers] = useState<any>({});
 const [loading, setLoading] = useState(false);
 const quizId = props?.route?.params?.id;
 const isDisabled = Object.keys(selectedAnswers).length === 0;
 const navigation = useNavigation<any>();
 console.log('quizId', quizId);
 useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
   navigation.goBack(); // Go back to the previous screen
   return true; // Prevent default behavior (exit app)
  });

  return () => backHandler.remove(); // Clean up the event on unmount
 }, []);
 const getQuiz = async () => {
  setLoading(true);
  try {
   const token = await AsyncStorage.getItem('token');
   console.log('Token:', token);

   const response = await fetch(
    `https://api.addmelocal.in/api/course/${quizId}/quizzes`,
    {
     method: 'GET',
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // ✅ Space after "Bearer"
     }
    }
   );

   if (!response.ok) {
    throw new Error('Failed to fetch profile');
   }

   const data = await response.json();
   setLoading(false);

   setQuizData(data?.data[0]?.questions);
   setQuizDetail(data?.data[0]);
   console.log('quiz list Data:', data?.data);
  } catch (error) {
   setLoading(false);

   console.error('Error fetching profile:', error);
   // showToast('Something went wrong'); // Optional
  }
 };
 useEffect(() => {
  getQuiz();
 }, []);

 const submitQuiz = async () => {
  const token = await AsyncStorage.getItem('token');

  const payload = {
   answers: selectedAnswers // 👈 Must be in the form { "3": [9], "4": [14], ... }
  };

  try {
   const response = await axios.post(
    `${BASE_URL}quizzes/${quizId}/submit`, // 👈 Your actual endpoint
    payload,
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   console.log('✅ Quiz Submitted:', response.data);
   showToast(response?.data?.message);
   setModalVisible(!modalVisible);
  } catch (error: any) {
   showToast(error?.response?.data?.message || error.message);
   showToast(error?.response?.data?.message || 'Submission failed!');
  }
 };
 const [remainingTime, setRemainingTime] = useState<number>(0);
 const [timerStarted, setTimerStarted] = useState(false);
 // Start timer AFTER quizDetail is set
 useEffect(() => {
  if (quizDetail?.time && !timerStarted) {
   const quizTimeInSeconds = Number(quizDetail.time) * 60;
   setRemainingTime(quizTimeInSeconds);
   setTimerStarted(true);
  }
 }, [quizDetail]);

 useEffect(() => {
  if (remainingTime <= 0 || !timerStarted) return;

  const interval = setInterval(() => {
   setRemainingTime((prev) => {
    if (prev <= 1) {
     clearInterval(interval);
     submitQuiz(); // Auto submit here
     return 0;
    }
    return prev - 1;
   });
  }, 1000);

  return () => clearInterval(interval);
 }, [remainingTime, timerStarted]);

 const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
 };

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
     ? currentSelections.filter((id) => id !== optionId) // Unselect
     : [...currentSelections, optionId]; // Select

    return {
     ...prev,
     [questionId]: updatedSelections
    };
   });
  };

  const isOptionSelected = (questionId: number, optionId: number): boolean => {
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
     <View style={{ width: moderateScale(100) }}>
      <Text
       allowFontScaling={false}
       style={[
        styles.optionText,
        { color: selected ? colors.white : colors.black }
       ]}>
       {item.title}
      </Text>
     </View>
    </TouchableOpacity>
   </View>
  );
 };

 const renderItem = ({ item, index }: any) => {
  return (
   <View>
    <View style={styles.questionCard}>
     <Text style={styles.questionText}>{`${index + 1}. ${item?.title}`}</Text>
     <View style={{ right: 12 }}>
      <FlatList
       data={item?.answers}
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
   {/* <ScrollView showsVerticalScrollIndicator={false}>/ */}
   <Text allowFontScaling={false} style={styles.subtitle}>
    Quiz
   </Text>
   {loading == true ? (
    <View style={{ top: responsiveScreenHeight(20) }}>
     <ActivityIndicator size={30} color={colors.black} />
    </View>
   ) : (
    <View>
     <View style={{ width: moderateScale(335) }}></View>
     <View style={styles.headerRow}>
      <View style={styles.headerBox}>
       <Image style={styles.topImage} source={MARKS} />
       <Text allowFontScaling={false} style={styles.headerBigText}>
        {quizDetail?.pass_mark || '0'}/{quizDetail?.total_mark || '0'}
       </Text>
       <Text allowFontScaling={false} style={styles.headerLabel}>
        Minimum Marks
       </Text>
      </View>
      <View style={styles.headerBox}>
       <Image style={styles.topImage} source={ATTEMPT} />
       <Text allowFontScaling={false} style={styles.headerBigText}>
        {quizDetail?.attempt || '0'}/{quizDetail?.total_mark || '0'}
       </Text>
       <Text allowFontScaling={false} style={styles.headerLabel}>
        Attempts
       </Text>
      </View>
      <View style={styles.headerBox}>
       <Image style={styles.topImage} source={QUESTION} />

       <Text allowFontScaling={false} style={styles.headerBigText}>
        {quizData?.length || '0'}
       </Text>
       <Text allowFontScaling={false} style={styles.headerLabel}>
        Questions
       </Text>
      </View>
      <View style={styles.headerBox}>
       <Image style={styles.topImage} source={TIMER} />

       <Text allowFontScaling={false} style={styles.headerBigText}>
        {formatTime(remainingTime)}
       </Text>
       <Text allowFontScaling={false} style={styles.headerLabel}>
        Remaining time
       </Text>
      </View>
     </View>

     <View style={styles.warningBox}>
      <Image style={styles.warningImage} source={WARNING} />
      <View style={{ width: moderateScale(300) }}>
       <Text allowFontScaling={false} style={styles.warningText}>
        Please note that you have to complete all the questions and submit
        before remaining time. The form will be submitted automatically if
        remaining time ends.
       </Text>
      </View>
     </View>

     <View
      style={{
       height: responsiveScreenHeight(56),
       backgroundColor: colors.white,
       borderRadius: 9,
       borderWidth: 1,
       justifyContent: 'center',
       //  alignItems: 'center',
       width: '100%'
      }}>
      <FlatList
       data={quizData}
       showsVerticalScrollIndicator={false}
       keyExtractor={(item) => item.id?.toString()}
       renderItem={renderItem}
       contentContainerStyle={{ padding: 5 }}
       ListEmptyComponent={
        <View
         style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: responsiveScreenHeight(10)
         }}>
         <Text
          allowFontScaling={false}
          style={{
           color: colors.black,
           fontFamily: fonts.regular,
           fontSize: 14
          }}>
          No Quiz Found
         </Text>
        </View>
       }
      />
     </View>
     <Modal transparent={true} visible={modalVisible}>
      <View
       style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
       }}>
       <View style={styles.popupContainer}>
        <Icon name="check-circle" size={60} color="green" />
        <Text allowFontScaling={false} style={styles.successText}>
         Quiz Submitted Successfully!
        </Text>
        <TouchableOpacity
         style={styles.button}
         onPress={() => setModalVisible(!modalVisible)}>
         <Text allowFontScaling={false} style={styles.buttonText}>
          OK
         </Text>
        </TouchableOpacity>
       </View>
      </View>
     </Modal>
     <TouchableOpacity
      //   disabled={isDisabled}
      onPress={() => navigation?.navigate('PlanScreen')}
      style={styles.loginButton}>
      <Text allowFontScaling={false} style={styles.loginText}>
       Submit
      </Text>
     </TouchableOpacity>
     <View style={{ height: responsiveScreenHeight(5) }} />
    </View>
   )}
   {/* </ScrollView> */}
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
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
  fontSize: 8,
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
  padding: 14,
  marginBottom: 10
 },
 warningText: {
  color: colors.black,
  fontSize: 12,
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
  fontSize: 11,
  fontFamily: fonts.regular,
  color: colors.textColor
 },
 popupContainer: {
  backgroundColor: 'white',
  padding: 24,
  borderRadius: 12,
  alignItems: 'center'
 },
 successText: {
  fontSize: 18,
  marginVertical: 16,
  color: 'green',
  fontFamily: fonts.regular,
  textAlign: 'center'
 },
 button: {
  backgroundColor: '#4CAF50',
  paddingHorizontal: 24,
  paddingVertical: 10,
  borderRadius: 8
 },
 buttonText: {
  color: 'white',
  fontSize: 14,
  fontFamily: fonts.medium
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
  marginTop: '4%'
 },
 loginText: {
  color: colors.white,
  fontFamily: fonts.medium,
  fontSize: 16,
  bottom: 2
 }
});

export default QuizScreen;
