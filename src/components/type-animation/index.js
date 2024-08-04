'use client'

import React from 'react'
import { TypeAnimation } from 'react-type-animation'

function TypeAnime() {
  return (
    <TypeAnimation
      sequence={[
        'UI design',
        1000,
        'UX design',
        1000,
        'Product design',
        1000,
        'Interaction design',
        1000,
        'Frontend Dev',
        1000,
        'Backend Dev',
        1000,
        'Full-stack Dev',
        1000,
        'DevOps Eng.',
        1000,
        'Data science',
        1000,
        'ML Eng.',
        1000,
        'AI Eng.',
        1000,
      ]}
      wrapper='span'
      speed={20}
      style={{ display: 'inline-block' }}
      repeat={Infinity}
    />
  )
}

export default TypeAnime
