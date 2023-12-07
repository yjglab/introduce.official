import useSignOut from "@hooks/mutations/useSignOut";
import Link from "next/link";
import { memo, useCallback, useEffect } from "react";

const Navigation = memo(() => {
  const { mutate: signOutMutate } = useSignOut();
  // const { data: myInfo } = useMyInfoQuery();
  const handleSignOut = useCallback(() => {
    signOutMutate();
  }, [signOutMutate]);
  // useEffect(() => {
  //   console.log(myInfo);
  // }, [myInfo]);
  return (
    <nav>
      <Link href='/'>홈 </Link>

      <Link href='/profile'>프로필 </Link>
      <Link href='/register'>가입 </Link>
      <Link href='/login'>로그인 </Link>
      {/* 
      {myInfo ? (
        <button onClick={handleSignOut}>로그아웃</button>
      ) : (
        <>
          <Link href='/signup'>가입 </Link>
          <Link href='/signin'>로그인 </Link>
        </>
      )} */}
    </nav>
  );
});

export default Navigation;
