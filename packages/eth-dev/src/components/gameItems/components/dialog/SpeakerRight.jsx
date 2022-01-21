import React from 'react'
import ReactMarkdown from 'react-markdown'
import SpeechBubble from './SpeechBubble'

const SpeakerRight = ({ text, pathToAvatar }) => {
  return (
    <div
      style={{
        float: 'right',
        width: '100%',
        marginTop: '15px',
        paddingRight: '60px',
        position: 'relative'
      }}
    >
      <img
        src={pathToAvatar || './assets/punk5950.png'}
        alt='avatar'
        className='background-image'
        style={{
          position: 'absolute',
          right: 0,
          bottom: 8,
          minWidth: '60px',
          transform: 'scaleX(1)'
        }}
      />
      <SpeechBubble direction='right'>
        <ReactMarkdown>{text}</ReactMarkdown>
      </SpeechBubble>
    </div>
  )
}

export default SpeakerRight
