import Link from "next/link";

const Navigation = () => {
  return (
    <nav>
      <Link href='/'>홈 </Link>
      <Link href='/signin'>로그인 </Link>
      <Link href='/signup'>가입 </Link>
      <Link href='/profile'>프로필 </Link>
    </nav>
  );
};

export default Navigation;
