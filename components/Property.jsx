import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar} from '@chakra-ui/react'
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import DefaultImage from '../assets/house.jpg'

const Property = ({ property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } }) => (
    <Link href={`/property/${externalID}`} passHref>
    {/* passHref - Forces Link to send the href property to its child. Defaults to false */}
      <Flex flexWrap="wrap" w="420px" p="5" paddingTop="5" justifyContent="center" cursor="pointer">
      {/* flexwrap makes all the content to get into box */}
      {/* this box is for image */}
        <Box>
          <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={260} alt="house-img"/>
        </Box>
        {/* this box is for content of tht image */}
        <Box w="full">
            {/* this flex is for rent cost and image of company */}
            <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                    <Box paddingRight="3" color="green.400">{isVerified && <GoVerified />}</Box>
                    {/* millify is making of 2000 into 2k */}
                    <Text fontWeight="bold" fontSize="lg">AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
                </Flex>
                {/* this box is for company logo  */}
                <Box>
                    <Avatar size="sm" src={agency?.logo?.url} />
                </Box>
            </Flex>
                <Flex alignItems="center" p="1" paddingTop="0" justifyContent="space-between" w="250px" color="blue.400">
                    {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} <BsGridFill />
                </Flex>
            <Flex alignItems="center">
                <Text fontSize="lg">
                    {title.length > 40 ? `${title.substring(0, 42)}` + "..." : title}
                </Text>
            </Flex>    
            
        </Box>
      </Flex>
    </Link>
);

export default Property;