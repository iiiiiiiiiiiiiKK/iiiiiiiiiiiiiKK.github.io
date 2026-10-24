"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ContactSection = () => {
  const { titleLines, cardTitle, descriptionPrefix, descriptionSuffix } =
    config.contact;

  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto ">
      <SectionHeader
        id="contact"
        className="relative mb-14"
        title={
          <>
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </>
        }
      />
      {/* 单列居中：原来用 grid-cols-2 只放了一张卡片，卡片被挤在左半边。
          min-w-7xl 也不是有效的 Tailwind 类（min-w 不认 7xl），等于完全失效。 */}
      <div className="mx-4 z-[9999] flex justify-center">
        <Card className="w-full max-w-3xl bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl">{cardTitle}</CardTitle>
            <CardDescription>
              {descriptionPrefix}{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-gray-200 cursor-can-hover rounded-lg underline underline-offset-4"
              >
                {config.email}
              </a>{" "}
              {descriptionSuffix}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
