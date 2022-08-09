import React from 'react'

const Events = () => {
  return (
    <div>Events</div>
  )
}

export async function getServerSideProps(context) {
    const ingredients = await axios
      .get("/api/top-new/ingredients", {
        headers: {
          Cookie: context.req.headers.cookie,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
    return {
      props: {
        ingredients: ingredients,
      },
    };
  }

export default Events