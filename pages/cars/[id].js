//[param]Dynamically add to the list of cars
//cars/tesla
//cars/jaguar
//cars/whatevs

//import use Router hook from next router
// import React from 'react'

//s.e.o. search friendly title in the "next" head component
//Could add meta tags for facebook & twitter cards easily added:
import Head from "next/head"

import { useRouter } from "next/router"

export default function Car({car}) {
  const router = useRouter()
  const { id } = router.query

  return (<>
    <Head>
      <title>{car.color} {car.id}</title>
    </Head>
    <div>Hello {id} !</div>
    <img src={car.image} width="300px"/>
   </>)
}

export async function getStaticProps({params}) {
 const req = await fetch(`http://localhost:3000/${params.id}.json`);
 const data = await req.json();

 return {
  props: { car: data },
 }
}

//next doesn't know how many pages. Needs to know all id's in advace:
export async function getStaticPaths() {
  //request data from api or db, return a paths object that contains an array of every route
  const req = await fetch("http://localhost:3000/cars.json");
  const data = await req.json();

  //map values to an array of objects
  const paths = data.map( car => {
    return { params: { id: car } }
  })

  //return them from the function along with additional options:
  return {
    paths,
    fallback: false
  };
}