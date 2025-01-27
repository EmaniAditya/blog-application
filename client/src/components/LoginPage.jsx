import { useState } from 'react'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('Logging in', { email, password })
    // need to add axios call here
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl">Login</h1>
      <form onSubmit={(e) => { e.preventDefault(), handleLogin() }}>
        <input
          type="email"
          className="border p-2 m-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 m-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
