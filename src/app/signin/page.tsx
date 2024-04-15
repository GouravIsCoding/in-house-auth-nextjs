"use client";
import axios from "axios";
import { signinSchema } from "@/utils/validators";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormWrapper from "@/components/wrapper/formWrapper";
import CONFIG from "@/config";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signinSchema>) {
    setErr(() => null);
    setMsg(() => null);
    axios
      .post(`${CONFIG.DOMAIN}/api/user/signin`, values)
      .then((res) => {
        const { error, message } = res.data;
        if (error) return setErr(() => error);
        if (message) {
          setMsg(() => message);
          return router.push("/");
        }
      })
      .catch((error) => {
        setErr(() => error.response.data.message);
      });

    console.log(values);
  }
  return (
    <>
      {msg && <div className="bg-green-300">{msg}</div>}
      {err && <div className="bg-red-300">{err}</div>}
      <FormWrapper>
        <h1 className="text-2xl font-semibold text-center my-3">Signup Now</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-gray-800"
                      placeholder="any@example.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-gray-800"
                      placeholder="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </>
  );
}
