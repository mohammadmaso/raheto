'use client';
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Stack,
  Heading,
  Text,
  TableContainer,
  Divider,
  Image,
  Spinner,
  Select
} from "@chakra-ui/react";
import { useQuery, useMutation } from '@apollo/client';
import { gql } from "@apollo/client";
import JobZoneComponent from "../../components/jobZones"

const GET_ALL_QUESTIONS = gql`query AllQuestions {allQuestions{
    edges{
      node{
        text
        id
        questionType
      }
    }
  }}
`;

const SUBMIT_ANSWERS = gql`
mutation ImportSurveyResults($AScore: Int!, $CScore: Int!, $EScore: Int!, $IScore: Int!, $RScore: Int!, $SScore: Int!, $jobeZone: Int!) {
    importSurveyResults(
      AScore: $AScore
      CScore: $CScore
      EScore: $EScore
      IScore: $IScore
      RScore: $RScore
      SScore: $SScore
      jobeZone: $jobeZone
    ) {
        surveyResult {
        id
        RScore
        IScore
        AScore
        SScore
        EScore
        CScore
        jobeZone
      }
    }
  }
`



const WelcomePage = ({ onStart }) => (
  <Stack justify={"center"} align={"center"}  minH={"78vh"}>
    <Box width={"2xl"} shadow={"md"} p="6" size="xl" rounded={"md"}>
      <Heading as="h1" size="xl" mb="4">
        به نمایه‌گر علاقه راه‌تو خوش‌آمدید.
      </Heading>
      <Text>
        نمایه گر علاقه می تواند به شما کمک کند تا بدانید علایق شما چیست و چگونه با دنیای کار ارتباط دارد. می توانید بفهمید که دوست دارید چه کاری انجام دهید.
        نمایه گر علاقه به شما کمک می کند تصمیم بگیرید که چه نوع مشاغلی را می خواهید کشف کنید.
        در هر صفحه، برای ادامه روی دکمه بعدی در پایین کلیک کنید. می توانید از دکمه برگشت در پایین برای خواندن مجدد دستورالعمل ها یا تغییر پاسخ های خود استفاده کنید.
      </Text>
      <Divider m="3"/>
      <Text>
        نمایه‌گر شغلی راه‌تو شامل ۶۰ سوال در رابطه با فعالیت‌های شغلی می‌باشد که برخی افراد در هنگام کار انجام می‌دهند.
        تمام سوالات را با دقت بخوانید و تصمیم بگیرید چه حسی نسبت به انجام آن کار‌ها دارید
      </Text>
      <Divider m="3"/>
      <Text>
        <strong>سعی کنید به موارد پایین فکر نکنید:</strong>
       <br/>
       <ul>
        <li>اینکه سطح تحصیلات یا توانمندی و آموزش شما در سطح آن کار هست یا نه و </li>
        <li>
            با انجام آن کار چه مقدار پول به دست می‌آورید.
        </li>
       </ul>
       تنها به این فکر کنید که ان فعالیت را دوست دارید یا نه.
      </Text>
      <Button mt={4} onClick={onStart}>
        شروع
      </Button>
    </Box>
  </Stack>
);


const SurveyPage = ({ onSubmit }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [jobZone, setJobZone] = useState(1);
  const handleZoneChange = (event) => {
    setJobZone(event.target.value);
  };


  const handleRadioChange = (questionId, value) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: parseInt(value),
    }));
  };
  

  const { loading, error, data, refetch } = useQuery(GET_ALL_QUESTIONS);

  const [submitAnswers] = useMutation(SUBMIT_ANSWERS);


  if (loading) {
    return (
      <Box height={"80vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Spinner
          textAlign={"center"}
          thickness='2px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='md'
        />
      </Box>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  const questions = data.allQuestions.edges;


  const handleFormSubmit = () => {
    if (data && data.allQuestions) {
      const questions = data.allQuestions.edges.map((edge) => edge.node);
      const questionTypes = {
        A: 0,
        C: 0,
        E: 0,
        I: 0,
        R: 0,
        S: 0,
      };

      questions.forEach((question) => {
        const questionId = question.id;
        const selectedAnswer = selectedAnswers[questionId];
        const score = selectedAnswer 

        switch (question.questionType) {
          case "A":
            questionTypes.A += score;
            break;
          case "C":
            questionTypes.C += score;
            break;
          case "E":
            questionTypes.E += score;
            break;
          case "I":
            questionTypes.I += score;
            break;
          case "R":
            questionTypes.R += score;
            break;
          case "S":
            questionTypes.S += score;
            break;
          default:
            break;
        }
      });

      console.log("Question type scores:", questionTypes);

    // Submit the answers
    submitAnswers({
    variables: {
      AScore: questionTypes.A,
      CScore: questionTypes.C,
      EScore: questionTypes.E,
      IScore: questionTypes.I,
      RScore: questionTypes.R,
      SScore: questionTypes.S,
      jobeZone: jobZone, // Replace with the actual jobeZone value
    },
  })
    .then((response) => {
      console.log("Answers submitted successfully:", response);
      console.log("Success message in Persian: نتایج با موفقیت ثبت شد.");
    })
    .catch((error) => {
      console.error("Error submitting answers:", error);
      console.log("Error message in Persian: خطا در ثبت نتایج.");
    });



    }

    // Call the submitAnswers mutation
    
  };

  return (
    <Stack  justify={"center"} align={"center"}>
      <Box justify={"center"} align={"center"}  size="xl" my={8} shadow={"md"} minW={"70%"} rounded={"md"} pb="4">
        <TableContainer >
        <Table variant='striped'  minW={"70%"} >
          {/* <TableCaption>پرسشنامه نمایه‌گر مسیرشغلی</TableCaption> */}
          <Thead>
            <Tr>
            <Th>سوالات</Th>
            <Th><Image src="/ques_header_strongly_like.png"title="بسیار علاقه‌مند"/></Th>
            <Th><Image src="/ques_header_like.png"title="علاقه‌مند"/></Th>
            <Th><Image src="/ques_header_unsure.png"title="بی‌تفاوت"/></Th>
            <Th><Image src="/ques_header_dislike.png"title="بی‌علاقه"/></Th>
            <Th><Image src="/ques_header_strongly_dislike.png" title="بسیار بی‌علاقه"/></Th>
            </Tr>
          </Thead>
          <Tbody>
            {questions.map((question) => (
              <Tr key={question.node.id}>
                <Td  style={{ wordBreak: 'break-word', width: '100px', overflowWrap: 'break-word' }}>{question.node.text}</Td>

                {Array.from({ length: 5 }, (_, index) => (
                    <Td textAlign={"center"} >

                    <label key={index}>
                    <input
                        type="radio"
                        name={`question-${question.node.id}`}
                        value={index + 1}
                        checked={selectedAnswers[question.node.id] === (index + 1)}
                        onChange={(e) => handleRadioChange(question.node.id, e.target.value)}
                        required={true}
                    />
                    
                    </label>
                    </Td>

                )).reverse()}
              </Tr>
            ))}
          </Tbody>
        </Table></TableContainer>



        { (Object.keys(selectedAnswers).length === questions.length) && 
        <Stack m="6" align={"start"} justify={"start"}>
        <Text  fontSize={"lg"} fontWeight={"bold"} textAlign={'right'} color={"blue.500"}>
            لطفا انتخاب زیر را با دقت انجام دهید.
        </Text>
        <Text textAlign={"right"}>برای تمرکز بر جستجوی خود، به سؤال زیر فکر کنید:
<br></br>
برای انجام کار به چه میزان تحصیلات، آموزش و تجربه نیاز دارم؟

هر شغل راه‌تو در یکی از پنج منطقه شغلی است، که گروه‌هایی از مشاغل هستند که به همان سطح تجربه، آموزش و آموزش نیاز دارند.

مشاغل مختلف به آمادگی های متفاوتی نیاز دارند. از شما خواسته می شود که یک منطقه شغلی را انتخاب کنید. با استفاده از منطقه شغلی و علایق شما، نمایه گر علاقه به شما کمک می کند تا مشاغلی را که ممکن است برای شما مناسب باشد شناسایی و کشف کنید.</Text>



            <Text textAlign={"right"}>
            هنگام انتخاب منطقه شغلی خود، می توانید موارد زیر را انتخاب کنید:
<br/>
<strong>منطقه شغلی فعلی -</strong>منطقه شغلی را انتخاب کنید که با نوع تجربه، تحصیلات و آموزش شما مطابقت دارد.
<br/>
یا
<br/>
<strong>منطقه شغلی آینده -</strong> منطقه شغلی را انتخاب کنید که با میزان تجربه، تحصیلات و آموزشی که قصد دارید در آینده دریافت کنید مطابقت دارد.

در هر دو مورد، منطقه شغلی شما شامل مشاغلی می شود که ممکن است بخواهید انجام دهید.

نگران انتخاب اشتباه نباشید. می توانید بعداً یک منطقه شغلی متفاوت را کشف کنید.
<br/><br/>
برای مطالعه بیشتر در مورد تجربه، تحصیلات و آموزش مورد نیاز، هر منطقه شغلی را در زیر انتخاب کنید. با دقت بخوانید تا منطقه شغلی مناسب خود را پیدا کنید.

برای کسب اطلاعات بیشتر می توانید بر روی هر منطقه شغلی زیر کلیک کنید. وقتی آماده شدید، یکی از آنها را انتخاب کنید و فرم را ارسال کنید.
            </Text>

        </Stack>
        }

        <JobZoneComponent/>
        <select
      placeholder="انتخاب منطقه شغلی"
      value={jobZone}
      onChange={handleZoneChange}
    >
      <option value="1">
        منطقه شغلی یک: آمادگی کمی یا بدون نیاز است
      </option>
      <option value="2">
        منطقه شغلی دو: مقداری آمادگی لازم است
      </option>
      <option value="3">
        منطقه شغلی سه: آمادگی متوسط مورد نیاز است
      </option>
      <option value="4">
        منطقه شغلی چهار: آمادگی بالا مورد نیاز است
      </option>
      <option value="5">
        منطقه شغلی پنجم: آماده سازی گسترده مورد نیاز است
      </option>
    </select>

        { ((Object.keys(selectedAnswers).length !== questions.length) ) && <Text p="2" color={"red"}>لطفا به تمامی سوالات پاسخ دهید</Text>}

<br/>
        <Button mt={4} onClick={handleFormSubmit} isDisabled={Object.keys(selectedAnswers).length !== questions.length}>
          ثبت پرسشنامه
        </Button>
      </Box>
    </Stack>
  );
};

const App = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <Box p={8}>
      {isStarted ? (
        <SurveyPage/>
      ) : (
        <WelcomePage onStart={handleStart} />
      )}
    </Box>
  );
};

export default App;