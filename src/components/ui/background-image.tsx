"use client"

import React from "react"
import Image from "next/image"

import backgroundImage from "../../../public/images/paul-pastourmatzis-mqO0Rf-PUMs-unsplash.jpg"

function BackgroundImage() {
  return (
    <Image
      src={backgroundImage}
      onDragStart={(e) => e.preventDefault()}
      alt=""
      placeholder="blur"
      fill
      quality={100}
      sizes="100vw"
      className="absolute z-10 select-none object-cover object-center"
    />
  )
}

export default BackgroundImage
