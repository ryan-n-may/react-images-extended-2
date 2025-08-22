import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import { Lightbox, IImage } from "react-images-extended-2-stable";
import "react-images-extended-2-stable/dist/styles.css";

// Demo images from public APIs
const demoImages: IImage[] = [
  {
    src: "https://raw.githubusercontent.com/ryan-n-may/react-images-extended-2/refs/heads/master/demos/lightbox-demo/src/images/billy-bookcase-with-glass-doors-green__AA-2587918-1-100_page-0001.jpg",
    caption: "Beautiful Landscape 1",
  },
  {
    src: "https://raw.githubusercontent.com/ryan-n-may/react-images-extended-2/refs/heads/master/demos/lightbox-demo/src/images/billy-bookcase-with-glass-doors-green__AA-2587918-1-100_page-0002.jpg",
    caption: "Beautiful Landscape 2",
  },
  {
    src: "https://raw.githubusercontent.com/ryan-n-may/react-images-extended-2/refs/heads/master/demos/lightbox-demo/src/images/billy-bookcase-with-glass-doors-green__AA-2587918-1-100_page-0003.jpg",
    caption: "Beautiful Landscape 1",
  },
  {
    src: "https://raw.githubusercontent.com/ryan-n-may/react-images-extended-2/refs/heads/master/demos/lightbox-demo/src/images/billy-bookcase-with-glass-doors-green__AA-2587918-1-100_page-0004.jpg",
    caption: "Beautiful Landscape 2",
  },
  {
    src: "https://raw.githubusercontent.com/ryan-n-may/react-images-extended-2/refs/heads/master/demos/lightbox-demo/src/images/billy-bookcase-with-glass-doors-green__AA-2587918-1-100_page-0005.jpg",
    caption: "Beautiful Landscape 1",
  },
  {
    src: "https://raw.githubusercontent.com/ryan-n-may/react-images-extended-2/refs/heads/master/demos/lightbox-demo/src/images/billy-bookcase-with-glass-doors-green__AA-2587918-1-100_page-0006.jpg",
    caption: "Beautiful Landscape 2",
  },
  {
    src: "https://raw.githubusercontent.com/ryan-n-may/react-images-extended-2/refs/heads/master/demos/lightbox-demo/src/images/billy-bookcase-with-glass-doors-green__AA-2587918-1-100_page-0007.jpg",
    caption: "Beautiful Landscape 1",
  },
];

const demoPdf =
  "https://raw.githubusercontent.com/ryan-n-may/react-images-extended-2/3cea4f8c3b7742bccbecdf17013034c3b030ca3f/demos/lightbox-demo/src/images/billy-bookcase-with-glass-doors-green__AA-2587918-1-100.pdf";

export function BasicDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<IImage[] | undefined>([]);
  const [pdfSource, setPdfSource] = useState<string | undefined>("");

  const openLightbox = (images: IImage[]) => {
    setCurrentImages(images);
    setPdfSource(undefined);
    setIsOpen(true);
  };

  const openLightboxPDF = (source: string) => {
    setCurrentImages(undefined);
    setPdfSource(source);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <Box p={8} maxWidth="1200px" margin="0 auto">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={4}>
            React Images Extended Demo
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Click the buttons below to open the lightbox with different image
            sets
          </Text>
        </Box>

        <VStack spacing={6}>
          <Card width="100%">
            <CardBody>
              <VStack spacing={4}>
                <Heading as="h3" size="md">
                  Billi bookcase image gallery
                </Heading>
                <Text color="gray.600" textAlign="center">
                  A collection of beautiful images of the ikea billi bookcase
                </Text>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={() => openLightbox(demoImages)}
                >
                  Open the bookcase gallery
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card width="100%">
            <CardBody>
              <VStack spacing={4}>
                <Heading as="h3" size="md">
                  Billi bookcase PDF gallery
                </Heading>
                <Text color="gray.600" textAlign="center">
                  The full Billi bookcase PDF document
                </Text>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={() => openLightboxPDF(demoPdf)}
                >
                  Open PDF
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </VStack>

      {/* Lightbox Component */}
      {isOpen && (
        <Lightbox
          images={currentImages}
          pdfSource={pdfSource}
          onClose={closeLightbox}
          onClickNext={() => console.log("Next clicked")}
          onClickPrev={() => console.log("Previous clicked")}
          onClickImage={() => console.log("Image clicked")}
          showThumbnails={true}
        />
      )}
    </Box>
  );
}

export default BasicDemo;
