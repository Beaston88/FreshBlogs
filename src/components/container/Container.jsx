// S-9 : We are making a container which will have height, width , styling elements, this is usually done in production level work. We can pass the children to the container and use it. Also if we want any changes in whole container we can do it by doing it from here.
import React from 'react'

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
  
}

export default Container