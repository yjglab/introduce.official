"use client";

import { RootState } from "@/store";
import { Container } from "@app/_common/Parts/Container";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export enum AuthOption {
  REQUIRED = "required",
  FORBIDDEN = "forbidden",
  ANY = "any",
}

export const withAuth = (option: AuthOption, Component: React.FC<{ data: any }>) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [data, setData] = useState<boolean>(true);
    const [message, setMessage] = useState("");
    const userState = useSelector((state: RootState) => state.user);
    const { authenticated } = userState;
    useEffect(() => {
      const getUser = async () => {
        switch (option) {
          case AuthOption.REQUIRED:
            authenticated === true
              ? setData(true)
              : (setData(false), router.push("/login"), setMessage("로그인이 필요한 페이지입니다."));
            break;
          case AuthOption.FORBIDDEN:
            authenticated === false
              ? setData(true)
              : (setData(false),
                router.push("/"),
                setMessage("현재 로그인되어 있으므로 접근할 수 없는 페이지입니다."));
            break;
          case AuthOption.ANY:
            setData(true);
            break;

          default:
            break;
        }
      };

      getUser();
    }, []);

    return !!data ? (
      <Component data={data} />
    ) : (
      <>
        <Head>
          <title>introduce</title>
          <meta name='description' content='내 작품을 가장 바르게 검증할 수 있는 곳' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Container>
          <div>
            <h1 className='text-5xl'>{message}</h1>
          </div>
        </Container>
      </>
    );
  };

  return AuthenticatedComponent;
};
