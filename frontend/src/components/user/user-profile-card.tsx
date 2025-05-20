"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { LensUsernameBadge } from "@/components/lens/username-badge";
import { LensAddressDisplay } from "@/components/lens/lens-address-display";

interface UserProfileCardProps {
  address: string;
  displayName?: string;
  profileImageUrl?: string;
  username?: string;
  joinedDate?: Date;
  bio?: string;
  predictionsCount?: number;
  accuracy?: number;
}

export function UserProfileCard({
  address,
  displayName,
  profileImageUrl,
  username,
  joinedDate,
  bio,
  predictionsCount = 0,
  accuracy,
}: UserProfileCardProps) {

  return (
    <Card className="w-full mb-6">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileImageUrl} alt={displayName || address} />
            <AvatarFallback>{(displayName || address.substring(0, 2)).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-xl md:text-2xl">
              {displayName || <LensAddressDisplay address={address} fallbackLength={6} />}
            </CardTitle>

            {!displayName && username && (
              <div className="mt-1">
                <LensUsernameBadge localName={username.replace('@', '').split('.')[0]} showFullHandle={true} />
              </div>
            )}

            {!displayName && !username && (
              <div className="mt-1">
                <LensAddressDisplay address={address} className="text-sm" />
              </div>
            )}

            <div className="flex items-center mt-2 space-x-2 text-sm text-muted-foreground">
              {joinedDate && <span>Joined {formatDistanceToNow(joinedDate, { addSuffix: true })}</span>}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {bio && <p className="mb-4 text-muted-foreground">{bio}</p>}

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex flex-col">
            <span className="text-lg font-medium">{predictionsCount}</span>
            <span className="text-sm text-muted-foreground">Predictions</span>
          </div>

          {accuracy !== undefined && (
            <div className="flex flex-col">
              <span className="text-lg font-medium">{Math.round(accuracy * 100)}%</span>
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
