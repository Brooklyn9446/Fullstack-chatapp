import React from 'react'
import themes from 'daisyui/theme/object'
import { useThemeStore } from '../store/useTheme'

const SettingsPage = () => {
  const{chatTheme,setTheme}=useThemeStore()
  function setChatTheme(key){
    localStorage.setItem("Theme",key)
    setTheme()

  }
  return (
    <div className="grid grid-rows-4 grid-cols-6  gap-7 p-2">
      {Object.entries(themes).map(([key, theme]) => (
        <button
          key={key}
          className="px-4 py-2 rounded bg-primary text-white"
          onClick={()=>{setChatTheme(key)}}
        >
          {key} {/* or theme['color-scheme'] if available */}
        </button>
      ))}
    </div>
  )
}

export default SettingsPage
