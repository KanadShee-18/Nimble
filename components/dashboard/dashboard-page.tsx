import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import BackButton from "../auth/back-button";

export interface UserProps {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | null | undefined;
}

const Dashboard = ({ name, email, image, id }: UserProps) => {
  return (
    <Card className="flex items-center justify-center flex-col p-6">
      {image && (
        <CardContent className="mt-6">
          <Image
            src={image}
            alt={"I"}
            width={50}
            height={50}
            className="rounded-full"
          />
        </CardContent>
      )}
      <CardContent className="w-full">
        <div className="flex bg-gray-800 rounded-md mt-7 mb-2 justify-between p-3 gap-x-6 text-blue-400 shadow-sm shadow-blue-600">
          <span>ID:</span>
          <p>{id}</p>
        </div>
      </CardContent>
      <CardContent className="w-full">
        <div className="flex bg-gray-800 rounded-md mb-2 justify-between p-3 gap-x-6 text-blue-400 shadow-sm shadow-blue-600">
          <span>Name:</span>
          <p>{name}</p>
        </div>
      </CardContent>
      <CardContent className="w-full">
        <div className="flex bg-gray-800 rounded-md mb-2 justify-between p-3 gap-x-6 text-blue-400 shadow-sm shadow-blue-600">
          <span>Email:</span>
          <p>{email}</p>
        </div>
      </CardContent>
      <BackButton href="/" label="Back to home" />
    </Card>
  );
};

export default Dashboard;
