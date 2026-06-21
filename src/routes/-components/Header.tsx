import { Link } from "@tanstack/react-router";
import { useAuth } from "../../auth";

export const Header = () => {
  const { authState, logout } = useAuth();

  return (
    <>
      <header>
        {authState.isLogin && (
          <>
            <Link to="/">Home</Link>
            <button onClick={logout} type="button">
              Logout
            </button>
          </>
        )}
      </header>
      <hr />
    </>
  );
};
