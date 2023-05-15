import React from 'react'

interface HC {
  handler: {
    setOF: React.Dispatch<React.SetStateAction<boolean>>
    setALL: React.Dispatch<React.SetStateAction<boolean>>
    setPF: React.Dispatch<React.SetStateAction<boolean>>
    setBF: React.Dispatch<React.SetStateAction<boolean>>
    setADD: React.Dispatch<React.SetStateAction<boolean>>
  }
}
