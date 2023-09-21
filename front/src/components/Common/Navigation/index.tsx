import useSignOut from "@hooks/mutations/useSignOut";
import Link from "next/link";
import { useCallback } from "react";

const Navigation = () => {
  const { mutate: signOutMutate } = useSignOut();

  const handleSignOut = useCallback(() => {
    signOutMutate();
  }, [signOutMutate]);
  return (
    <nav>
      <Link href='/'>홈 </Link>
      <Link href='/signin'>로그인 </Link>
      <Link href='/signup'>가입 </Link>
      <Link href='/profile'>프로필 </Link>

      <button onClick={handleSignOut}>로그아웃</button>
    </nav>
  );
};

export default Navigation;
