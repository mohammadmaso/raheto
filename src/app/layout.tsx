// app/layout.tsx
import { Providers } from './providers'
import Header from "@/components/header";
import Footer from "@/components/footer";
import { MAX_WIDTH } from "../../config";
import { Box } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='fa' dir='rtl' >
      <body>
      <Header />
    <Box as="main" px={[4, 6, 10, 14, 20]} maxW={MAX_WIDTH} mx="auto">
    <Providers>{children}</Providers>
    </Box>
    <Footer />
        
      </body>
    </html>
  )
}