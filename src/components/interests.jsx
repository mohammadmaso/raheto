'use client';
import { useState } from 'react';
import { Box, Flex, Text, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, SimpleGrid } from '@chakra-ui/react';
import { BsFillPersonFill, BsBriefcaseFill, BsPaletteFill, BsPeopleFill, BsLightningFill, BsArchiveFill } from 'react-icons/bs';

const CardWithModal = ({ title, icon, content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        cursor="pointer"
        onClick={handleOpenModal}
      >
        <Flex align="center" >
          <Icon as={icon} boxSize={6} ml={2} />
          <Text fontWeight="bold">{title}</Text>
          
        </Flex>
        <Text fontSize={"sm"} color={"gray.500"}>{children}</Text>
      </Box>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader mt={6}>{title}</ModalHeader>
          <ModalBody m="5" dangerouslySetInnerHTML={{ __html: content }} />
          <ModalCloseButton/>
        </ModalContent>
      </Modal>
    </>
  );
};

const Interests = ({largestScoreName}) => {
  console.log(largestScoreName)
  return (
    <SimpleGrid columns={"2"} spacing={2}>
     
        <CardWithModal
          title="واقع‌بین"
          icon={BsFillPersonFill}
          style={largestScoreName === 'RScore' ? { backgroundColor: 'green' } : null}
          content="<ul>
          افرادی با علاقه‌های واقع‌گرایانه، از کارهایی که مسائل عملی و عملکردی را در بر می‌گیرند لذت می‌برند. اغلب افراد با علاقه‌های واقع‌گرایانه از حرفه‌هایی که شامل کاغذکاری یا همکاری نزدیک با دیگران است، خوششان نمی‌آید.</li>
          <li>آنها علاقه‌مندند به:
            <ul>
              <li>کار با گیاهان و حیوانات</li>
              <li>مواد واقعی مانند چوب، ابزار و ماشین‌آلات</li>
              <li>کارهای خارج از ساختمان</li>
            </ul>
          </li>
        </ul>"
        >{largestScoreName === 'RScore' && <Text>علاقه‌مندی غالب شما</Text>}</CardWithModal>
        <CardWithModal
          title="تحقیقی"
          style={largestScoreName === 'IScore' ? { backgroundColor: 'green' } : null}
          icon={BsBriefcaseFill}
          content="
          افرادی با علاقه‌های تحقیقاتی، از کارهایی که با ایده‌ها و تفکر درگیر هستند و نه فعالیت‌های جسمانی یا رهبری افراد، لذت می‌برند.
          <br/>
          آنها علاقه‌مندند به:
            <ul>
              <li>جستجوی حقایق</li>
              <li>حل مسائل</li>
            </ul>
          
        "
        > {largestScoreName === 'IScore' && <Text>علاقه‌مندی غالب شما</Text>}</CardWithModal>
        <CardWithModal
          title="هنری"
          style={largestScoreName === 'AScore' ? { backgroundColor: 'green' } : null}
          icon={BsPaletteFill}
          content="<ul>
          <li>افرادی با علاقه‌های هنری، از کارهایی که به جنبه هنری مرتبط هستند مانند بازیگری، موسیقی، هنر و طراحی لذت می‌برند.</li>
          <li>آنها علاقه‌مندند به:
            <ul>
              <li>خلاقیت در کارشان</li>
              <li>کاری که بدون رعایت یک مجموعه قوانین و مقررات انجام شود</li>
            </ul>
          </li>
        </ul>"
        >{largestScoreName === 'AScore' && <Text>علاقه‌مندی غالب شما</Text>}</CardWithModal>
        <CardWithModal
          title="اجتماعی"
          icon={BsPeopleFill}
          style={largestScoreName === 'SScore' ? { backgroundColor: 'green' } : null}
          content="<ul>
          <li>افرادی با علاقه‌های اجتماعی، از همکاری با دیگران برای کمک به یادگیری و رشد آنها لذت می‌برند. آنها از کار با افراد بیشتر از کار با اشیا، ماشین‌آلات یا اطلاعات لذت می‌برند.</li>
          <li>آنها علاقه‌مندند به:
            <ul>
              <li>تدریس</li>
              <li>دادن مشاوره</li>
              <li>کمک و خدمت به افراد</li>
            </ul>
          </li>
        </ul>"
        >{largestScoreName === 'SScore' && <Text>علاقه‌مندی غالب شما</Text>}</CardWithModal>
        <CardWithModal
          title="کارآفرینی"
          icon={BsLightningFill}
          style={largestScoreName === 'EScore' ? { backgroundColor: 'green' } : null}
          content="<ul>
          <li>افرادی با علاقه‌های کارآفرینانه، از کارهایی که مربوط به راه‌اندازی و اجرای پروژه‌های تجاری است، لذت می‌برند. این افراد از انجام اقدامات بیشتر از فکر کردن به مسائل لذت می‌برند.</li>
          <li>آنها علاقه‌مندند به:
            <ul>
              <li>متقاعد کردن و رهبری افراد</li>
              <li>تصمیم‌گیری</li>
              <li>پذیرفتن ریسک برای کسب سود</li>
            </ul>
          </li>
        </ul>"
        >{largestScoreName === 'EScore' && <Text>علاقه‌مندی غالب شما</Text>}</CardWithModal>
        <CardWithModal
          title="مرسوم"
          icon={BsArchiveFill}
          style={largestScoreName === 'CScore' ? { backgroundColor: 'green' } : null}
          content="<ul>
          <li>افرادی با علاقه‌های سنتی، از کارهایی که طبق روال‌ها و روش‌های مشخصی انجام می‌شود، لذت می‌برند. آنها ترجیح می‌دهند با اطلاعات کار کنند و به جزئیات توجه کنند تا با ایده‌ها کار کنند.</li>
          <li>آنها علاقه‌مندند به:
            <ul>
              <li>کار با قوانین و قواعد روشن</li>
              <li>پیروی از یک رهبر قوی</li>
            </ul>
          </li>
        </ul>"
        >{largestScoreName === 'CScore' && <Text>علاقه‌مندی غالب شما</Text>}</CardWithModal>
    </SimpleGrid>
  );
};

export default Interests;