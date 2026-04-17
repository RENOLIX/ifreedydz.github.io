import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <Input placeholder="Nom complet" aria-label="Nom complet" />
      <Input placeholder="Telephone" aria-label="Telephone" />
      <Textarea
        placeholder="Decrivez votre panne ou votre besoin de recuperation de donnees"
        aria-label="Besoin client"
      />
      <Button type="submit">Demander un diagnostic</Button>
      {sent ? (
        <p className="form-feedback">
          Merci. Votre demande est prete pour une prise en charge rapide.
        </p>
      ) : null}
    </form>
  );
}
