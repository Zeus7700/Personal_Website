'use client'

import { useState, useEffect } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const firstChar = text[0] || ''
  const [displayText, setDisplayText] = useState(firstChar)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanding, setIsExpanding] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(1) // Start at 1 since we show first char by default
  
  // Handle hover state
  useEffect(() => {
    if (isHovered) {
      setIsExpanding(true)
      setCurrentIndex(1) // Start from second character
    } else {
      // Start collapsing
      setCurrentIndex(1)
      setDisplayText(firstChar)
      setIsExpanding(false)
    }
  }, [isHovered, text, firstChar])

  // Handle letter-by-letter expansion
  useEffect(() => {
    if (!isExpanding || !isHovered) return
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(prev => prev + 1)
      }, 50) // Speed of letter appearance
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, isExpanding, isHovered, text])

  return (
    <span 
      className={`inline-flex ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        verticalAlign: 'bottom',
        height: '1.2em',
        alignItems: 'flex-end',
        color: isHovered ? 'var(--accent-hover)' : 'var(--text-muted)',
        transition: 'color 0.2s ease-in-out'
      }}
    >
      {displayText.split('').map((char, index) => (
        <span 
          key={index}
          className="inline-block"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            whiteSpace: 'pre',
            transition: 'all 0.2s ease-in-out',
            opacity: isHovered || index === 0 ? 1 : 0, // Always show first character
            transform: (isHovered || index === 0) ? 'translateY(0)' : 'translateY(0.5em)',
            transitionDelay: isHovered ? `${index * 0.05}s` : '0s'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
