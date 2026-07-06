import "../auth.form.scss"


const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form action="/login" method="post">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required placeholder='enter your email'/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required placeholder='enter your password'/>
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </main>
  )
}

export default Login
