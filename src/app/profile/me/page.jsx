'use client'
import { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  Input,
  Button,
  Divider,
  HStack,
  Spinner,
  Icon
} from '@chakra-ui/react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { PhoneIcon } from '@chakra-ui/icons';
import { FaUpload } from 'react-icons/fa';
import { LuUpload } from 'react-icons/lu';
import { dataURItoBlob } from '@/lib/toBlob';

const UPLOAD_AVATAR = gql`
mutation UPLOAD_AVATAR($userInputs: UpdateUserInput!) {
    updateUser(input: $userInputs) {
    user{
      avatar
    }
        clientMutationId
    }
  }
`;

const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      avatar
    }
  }
`;

const ProfilePage = () => {
    const { loading, error, data } = useQuery(ME_QUERY);

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const [avatar, setAvatar] = useState(data?.me?.avatar || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
  
    const [uploadAvatar] = useMutation(UPLOAD_AVATAR);
  
    useEffect(() => {
      if (!loading && data && data.me) {
        setUsername(data.me.username);
        setPhoneNumber(data.me.username);
        setAvatar(data.me.avatar || '');
      }
    }, [loading, data]);
  
    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
  
    const handleFileChange =  (event) => {


        const fileReader = new FileReader();

        const file =  event.target.files[0];
        console.log(file)

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                try {
                    setUploading(true);
                    const { data } =  uploadAvatar({
                      variables: {
                        userInputs: {
                          avatar: dataURItoBlob(fileReader.result),
                        },
                      },
                    });
              
                    if (data && data.updateUser && data.updateUser.user) {
                      // Update the local state with the new avatar URL
                      setAvatar(data.updateUser.user.avatar);
                    } else {
                      console.error('Avatar upload failed:', data?.updateUser?.message || 'Unknown error');
                    }
                  } catch (error) {
                    console.error('Avatar upload failed:', error.message || 'Unknown error');
                  } finally {
                    setUploading(false);
                    // Reset the file input
                    setSelectedFile(null);
                  }
            }
          };
          fileReader.readAsDataURL(event.target.files[0]);
    
        

      };

    
      const handleSaveSettings = () => {
        // Implement logic to save updated settings (username, phone number, password)
        console.log('Settings saved:', { username, phoneNumber, password });
      };
    
  
    if (loading) {
      return (
        <VStack minH="80vh" spacing={4} align="center" mt="7">
          <Spinner size="xl" />
        </VStack>
      );
    }

  return (
    <VStack minH="80vh" spacing={4} align="center" mt="7">
      <Box position="relative" mb={4}>
        <Avatar size="2xl" src={avatar || '/placeholder-user.jpg'} />
        {/* <Box
          position="absolute"
          right="0"
          bottom="0"
          transform="translate(-150%, 50%)"
          bg={"gray.100"}
          borderRadius="full"
          p="2"
          cursor="pointer"
          onClick={() => document.getElementById('fileInput').click()}
          w="2rem" h="2rem"
        >
          <Icon as={LuUpload} w="1rem" h="1rem"/>
        </Box>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {uploading && <Spinner position="absolute" top="0" left="0"transform="translate(-150%, -150%)" />} */}
      </Box>
      <HStack>
      <Text fontSize="xl">{phoneNumber}</Text>
        <PhoneIcon />
      </HStack>
        <Divider/>
      <Tabs variant="soft-rounded" colorScheme="telegram" >
        <TabList>
          <Tab>مهارت‌های در حال مطالعه</Tab>
          <Tab>تنظیمات کاربری</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Lessons Tab Content */}
            <Box>
              {/* Add content related to lessons here */}
              <Text>لیست دروس</Text>
            </Box>
          </TabPanel>

          <TabPanel>
            {/* Settings Tab Content */}
            <Box>
              <VStack spacing={4} align="start" >
                <Text>نام کاربری</Text>
                <Input
                  placeholder="نام کاربری جدید"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <Input
                  placeholder="شماره تلفن جدید"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                <Input
                  type="password"
                  placeholder="رمز عبور جدید"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Input
                  type="password"
                  placeholder="تکرار رمز عبور جدید"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button colorScheme="telegram" onClick={handleSaveSettings}>
                  ذخیره تنظیمات
                </Button>
              </VStack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default ProfilePage;
