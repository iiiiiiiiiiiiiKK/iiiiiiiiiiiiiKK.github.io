"use client";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { config } from "@/data/config";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

/**
 * Static-site friendly contact form. There is no backend on this deployment,
 * so submitting opens the visitor's mail client with everything pre-filled —
 * nothing is sent anywhere until they hit send themselves.
 */
const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<FieldErrors>({});

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse({ fullName, email, message });
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const subject = `Hello from ${fullName}`;
    const body = `${message}\n\n——\n${fullName}\n${email}`;
    window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    toast({
      title: "邮件已准备好",
      description: "已打开你的邮件客户端，点发送即可。",
      variant: "default",
      className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
    });
  };

  return (
    <form className="w-full mx-auto sm:mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">称呼</Label>
          <Input
            id="fullname"
            placeholder="你的名字"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setErrors((p) => ({ ...p, fullName: undefined }));
            }}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">邮箱</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: undefined }));
            }}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">想聊的事</Label>
        <Textarea
          placeholder="项目、合作，或者只是打个招呼。"
          id="content"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors((p) => ({ ...p, message: undefined }));
          }}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message}</p>
        )}
        <p className="text-sm text-muted-foreground">
          点击发送会调用你自己的邮件客户端，内容不经过任何第三方服务。
        </p>
      </div>
      <Button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        <div className="flex items-center justify-center">
          发送邮件 <ChevronRight className="w-4 h-4 ml-4" />
        </div>
        <BottomGradient />
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
