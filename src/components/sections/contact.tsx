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
      {/* Two columns on desktop, card in the LEFT one on purpose:
          `motion.ts` shifts the 3D keyboard to the right at this section
          (`right = 3.8` scene units), so the right half must stay empty for it.
          Do not "fix" this into a centered single column — that puts the card
          on top of the keyboard. On mobile the keyboard is centered and the
          card goes full width on top of it instead. */}
      <div className="grid grid-cols-1 md:grid-cols-2 z-[9999] mx-4 gap-8">
        <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20">
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
