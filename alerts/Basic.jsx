import React from 'react'
import InfoIcon from './icons/InfoIcon'
import SuccessIcon from './icons/SuccessIcon'
import ErrorIcon from './icons/ErrorIcon'
import CloseIcon from './icons/CloseIcon'

const alertStyle = {
  backgroundColor: '#151515',
  color: 'white',
  padding: '10px',
  textTransform: 'uppercase',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  fontFamily: 'Arial',
  width: '60wv',
  boxSizing: 'border-box'
}

const buttonStyle = {
  marginLeft: '20px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#FFFFFF'
}

const AlertTemplate = ({ message, options, style, close }) => {
  let m
  if (typeof message === 'string') {
    m = message
  }
  else {
    const error = message
    console.log('error: %o', error)
    m = 'Error occurred while processing the request'
  }

  return (
    <div style={{ ...alertStyle, ...style }}>
      {options.type === 'info' && <InfoIcon />}
      {options.type === 'success' && <SuccessIcon />}
      {options.type === 'error' && <ErrorIcon />}
      <span style={{ flex: 2 }}>{m}</span>
      <button onClick={close} style={buttonStyle}>
        <CloseIcon />
      </button>
    </div>
  )
}

export default AlertTemplate