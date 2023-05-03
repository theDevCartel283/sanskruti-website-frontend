import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { selectNotification } from '@/slice/notification.slice';
import Notification from '@/components/notification';
import Layout from '../layout';

const SignLayout: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const notification = useAppSelector(selectNotification);
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="relative grid min-h-screen place-content-center bg-white py-20 font-ysabeau text-black">
          {notification.notify && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
          <div className="relative flex min-h-[70vh] w-full border-gray-300 sm:border-2 lg:min-w-[50vw] xl:min-w-[40vw]">
            {children}
            <Link href="/">
              <RxCross2
                className="absolute right-5 top-5 h-7 w-7 text-black"
                title="back to home"
              />
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignLayout;
