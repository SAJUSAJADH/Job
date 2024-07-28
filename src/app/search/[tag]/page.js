


import { currentUser } from '@clerk/nextjs';
import React from 'react'

async function Search({params}) {

    let {tag} = params;
    const  user  = await currentUser();
    tag = decodeURIComponent(tag)

    return (
      <div className='pb-10'>
        <div className="container px-3 lg:px-16">
          <h1 className="text-xl my-6">{jobsDocs ? `search result for - ${tag}`: 'no jobs found'}</h1>
        </div>
        {/* <Jobs jobs={jobsDocs} header={''} /> */}
        <div className='container px-3 lg:px-16'>
        <p className='text-lg py-4'>People also search for </p>
        </div>
        {/* <Jobs jobs={fulljobs} header={''}/> */}
      </div>
    );
}

export default Search