"use client";

import React from "react";
import { Button } from "../ui/button";

interface Props {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

export const DefaultView = ({ setView }: Props) => {
  return (
    <div className="space-y-4">
      <h3>Options</h3>
      <div className="flex flex-col items-start gap-4">
        <Button
          className="w-full justify-start bg-zinc-200 text-xl font-medium text-black hover:bg-zinc-300"
          onClick={() => setView("key")}
        >
          Key
        </Button>
        <Button
          className="w-full justify-start bg-zinc-200 text-xl font-medium text-black hover:bg-zinc-300"
          onClick={() => setView("phrase")}
        >
          Phrase
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-start text-xl font-medium"
          onClick={() => setView("remove")}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export const RemoveWallet = ({ setView }: Props) => {
  return (
    <div className="space-y-4">
      <h3>Are you sure you?</h3>
      <p className="text-muted-foreground">
        You haven&apos;t backed up your wallet yet. If you remove it, you could
        lose access forever. We suggest tapping and backing up your wallet first
        with a valid recovery method.
      </p>

      <FooterButtons setView={setView} />
    </div>
  );
};

export const Phrase = ({ setView }: Props) => {
  return (
    <div className="space-y-4">
      <h3>
        Secret Recovery <br /> Phrase
      </h3>
      <p className="text-muted-foreground">
        Your Private Key is the key used to back up your wallet. Keep it secret
        and secure at all times.
      </p>
      <FooterButtons setView={setView} />
    </div>
  );
};

export const Key = ({ setView }: Props) => {
  return (
    <div className="space-y-4">
      <h3>Private Key</h3>
      <p className="text-muted-foreground">
        Your Private Key is the key used to back up your wallet. Keep it secret
        and secure at all times.
      </p>
      <FooterButtons setView={setView} />
    </div>
  );
};

const FooterButtons = ({ setView }: Props) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        onClick={() => setView("default")}
        className="grow rounded-full"
      >
        Cancel
      </Button>
      <Button
        variant="destructive"
        onClick={() => setView("default")}
        className="grow rounded-full"
      >
        Continue
      </Button>
    </div>
  );
};
