import "../auth.form.scss"
import {useState} from 'react'
import {useNavigate, Link} from 'react-router'
import { useAuth } from "../hooks/useAuth"



const Login = () => {

  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin({ email, password });
    navigate("/")
  };

  if(loading){
    return (<main className='loading-screen'>
            <div className="spinner" />
            <h1>Loading...</h1>
        </main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder='enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            placeholder='enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <button className="btn primary-btn" type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login
