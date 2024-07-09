import { Button } from "@/components/Button";
import { handleSignInWithGoogle, login, signup } from "./_actions/login";

export default function LoginPage() {
  return (
    <form className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </div>
      <Button formAction={login}>Log in</Button>
      <Button formAction={signup}>Sign up</Button>
      <Button formAction={handleSignInWithGoogle}>Sign in with Google</Button>
    </form>
  )
}