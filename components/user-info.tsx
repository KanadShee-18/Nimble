import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ExtendedUser } from "@/next-auth";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ label, user }: UserInfoProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <p className="text-2xl font-semibold text-center text-blue-400 tracking-wide">
          {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm shadow-blue-700">
          <p className="text-sm font-medium text-muted-foreground">ID:</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-800 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm shadow-blue-700">
          <p className="text-sm font-medium text-muted-foreground">Name:</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-800 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm shadow-blue-700">
          <p className="text-sm font-medium text-muted-foreground">Email:</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-800 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm shadow-blue-700">
          <p className="text-sm font-medium text-muted-foreground">
            OAuth Login:
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-800 rounded-md">
            {JSON.stringify(user?.isOauth)}
          </p>
        </div>
        {!user?.isOauth && (
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm shadow-blue-700">
            <p className="text-sm font-medium text-muted-foreground">
              Two Factor Enabled:
            </p>
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled == false ? "OFF" : "ON"}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
