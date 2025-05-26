import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordField({
  label = 'Password',
  value,
  onChange,
  placeholder = 'Password',
  onKeyDown,
  required = false
}) {
  const [show, setShow] = useState(false)

  return (
    <div className="password-field" style={{ position: 'relative' }}>
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        required={required}
        className="password-input"
        style={{ width: '100%', paddingRight: '3rem' }}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        style={{
          position: 'absolute',
          right: '0rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {show ? <EyeOff size={18} color="black" /> : <Eye size={18} color="black" />}
      </button>
    </div>
  )
}