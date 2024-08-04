'use client'
import { ShieldMinus, Trash2Icon } from 'lucide-react'
import React from 'react'

function Remove({ suspendAccount, id }) {
  return (
    <Trash2Icon
      onClick={() => suspendAccount(id)}
      size={20}
      className='cursor-pointer hover:text-purple-700 text-center'
    />
  )
}

function Add({ EnableAccount, id }) {
  return (
    <ShieldMinus
      onClick={() => EnableAccount(id)}
      size={20}
      className='cursor-pointer hover:text-purple-700 text-center'
    />
  )
}

export { Remove, Add }
