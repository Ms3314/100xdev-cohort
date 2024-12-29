"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./pae.module.css";
import {TextInput } from '@repo/ui/Text-inpit'
import { useRouter } from "next/navigation";


type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};
const router = useRouter()



export default function Home() {
  return (
    <div>
      <TextInput  placeholder="Hello to the world" />
      <button onClick={()=>
        router.push("/chat/123")
      }></button>
    </div>
  );
}
