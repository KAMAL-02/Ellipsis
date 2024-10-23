"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Users, Github } from "lucide-react";

interface Comment {
  id: number;
  feedback: string;
  createdAt: Date;
}

interface User {
  avatar: string;
  bio: string;
  createdAt: string;
  followers: number;
  following: number;
  id: string;
  username: string;
}

interface ProfileSectionProps {
  user: User;
  comments: Comment[];
}

export default function ProfileSection({ user, comments }: ProfileSectionProps) {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-muted-foreground mt-2">{user.bio}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">{user.followers}</span>
                </div>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">{user.following}</span>
                </div>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  Joined {formatDistanceToNow(new Date(user.createdAt))} ago
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                <a
                  href={`https://github.com/${user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="md:col-span-2">
          <Tabs defaultValue="comments" className="w-full">
            <TabsContent value="comments">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Recent Comments</h3>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {comments.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No comments yet
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <Card key={comment.id}>
                            <CardContent className="py-4">
                              <p className="text-sm">{comment.feedback}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {formatDistanceToNow(new Date(comment.createdAt))} ago
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
