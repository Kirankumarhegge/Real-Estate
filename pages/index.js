import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button} from '@chakra-ui/react';
import {baseUrl, fetchApi} from '../utils/fetchApi';

import Property from "../components/Property";

//..bascic model for all the layout..//
//..here m stands for margin and p stands for padding..//
const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="grey.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1}<br />{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="grey.700">{desc1}<br />{desc2}</Text>
      <Button fontSize="xl" >
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

//..input for basic models..//
export default function Home({ propertiesForSale,  propertiesForRent }) {
  //..these properties are passed from api mapping the wanted info..//
  return (
     <Box>
     {/* input 1 */}
     <Banner 
     purpose="RENT A HOME"
       title1="Rental Homes for"
       title2="Everyone"
       desc1="Explore Apartments, villas, Homes"
       desc2="and more"
       buttonText="Explore Renting"
       linkName="/search?purpose=for-rent"
       imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
     />
     <Flex flexWrap="wrap">
       {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
       {/* so here we jump to subgroup where we can get into this category and search for more rent homes */}
     </Flex>


     {/* input 2 */}
     <Banner 
    purpose="BUY A HOME"
       title1="Find, Buy and Own Your"
       title2="Dream Home"
       desc1="Explore Apartments, villas, Homes"
       desc2="and more"
       buttonText="Explore Renting"
       linkName="/search?purpose=for-sale"
       imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008" 
     />
     <Flex flexWrap="wrap">
       {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
     </Flex>
     </Box>
             

)
}

//
///...getStaticProps (Static Generation): Fetch data at build time.
////....If you export an async function called getStaticProps from a page, 
///....Next.js will pre-render this page at build time using the props returned by getStaticProps.
///.......example given below........////
//... export async function getStaticProps(context) {
//    return {
//     props: {}, // will be passed to the page component as props
//   }
//  } 
//
export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
 
 return {
   props: {
     propertiesForSale: propertyForSale?.hits,
     propertiesForRent: propertyForRent?.hits,
   }
 }
}

/////.....this is similar example of above async function........///// 
//  //posts will be populated at build time by getStaticProps()
// function Blog({ posts }) {
//   return (
//     <ul>
//       {posts.map((post) => (
//         <li>{post.title}</li>
//       ))}
//     </ul>
//   )
// }
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   }
// }

// export default Blog