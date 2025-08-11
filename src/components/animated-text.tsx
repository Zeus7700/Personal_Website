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
  const [currentIndex, setCurrentIndex] = useState(1)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Check for dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  // Handle hover state
  useEffect(() => {
    if (isHovered) {
      setIsExpanding(true)
      setCurrentIndex(1)
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
      }, 50)
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, isExpanding, isHovered, text])

  // Set the color based on hover state and theme
  const textColor = isHovered 
    ? (isDarkMode ? '#abdbe3' : '#5d9aa5')
    : 'var(--text-muted)'

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
        color: textColor,
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
            opacity: isHovered || index === 0 ? 1 : 0,
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
