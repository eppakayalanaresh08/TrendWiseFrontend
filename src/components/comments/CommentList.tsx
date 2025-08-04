import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from '../../types';

interface CommentListProps {
  comments: Comment[];
  onLikeComment: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onLikeComment }) => {
   console.log(comments,'commentscommentscomments')
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-medium text-gray-900">{comment.user.name}</h4>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt))} ago
                </span>
              </div>
              <p className="text-gray-700 mb-3">{comment.content}</p>
              {/* <div className="flex items-center space-x-4">
                <button
                  onClick={() => onLikeComment(comment.id)}
                  className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                    comment.isLiked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                  <span>{comment.likes}</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;