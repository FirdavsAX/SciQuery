import { Component } from "react";

interface User {
    userId: string | null;
    userName: string;
    email: string;
    reputation: number;
    createdDate: string;
    lastLoginDate: string;
  }
  
  interface Vote {
    id: number;
    voteEnum: number;
    questionId: number;
    answerId: number;
    userId: string;
    user: User | null;
  }
  
  interface Comment {
    id: number;
    body: string;
    questionId: number;
    answerId: number;
    userId: string;
    user: User | null;
  }
  
 QuestionData {
    id: number;
    title: string;
    body: string;
    createdDate: string;
    updatedDate: string;
    userId: string;
    user: User;
    votes: Vote[];
    answers: any[];
    comments: Comment[];
    tags: any[];
  }
  